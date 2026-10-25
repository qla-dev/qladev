<?php

declare(strict_types=1);

// qla.dev redeploy: replaces the site's own files and nothing else.
//
// dist/ on the server also holds other projects (hideya/endpoints, planika,
// omnisignum, structura-ai, ...) that are not in this repo, so the site is never
// pulled or built in place. The repo is fetched into a checkout outside the web
// root, then dist/, .htaccess and this script are copied over the live files.
// Nothing on the server is ever deleted: old hashed assets simply stay behind.

set_time_limit(0);
ini_set('memory_limit', '512M');
ini_set('output_buffering', '0');
ini_set('zlib.output_compression', '0');

$siteDir = __DIR__;
$repository = 'https://github.com/qla-dev/qladev.git';
$branch = 'main';
$deployPaths = ['dist/', '.htaccess', 'redeploy.php'];
$homeDir = (string) (getenv('HOME') ?: dirname($siteDir, 2));
$sourceDir = $homeDir.DIRECTORY_SEPARATOR.'.qladev-deploy';

if (PHP_SAPI !== 'cli') {
    header('Content-Type: text/plain; charset=utf-8');
    header('Cache-Control: no-store, no-cache, must-revalidate');
    header('X-Content-Type-Options: nosniff');
    header('X-Accel-Buffering: no');
}

while (ob_get_level() > 0) {
    ob_end_flush();
}
ob_implicit_flush(true);

$write = static function (string $message): void {
    echo $message;
    flush();
};

$fail = static function (string $message, int $code = 1) use ($write): never {
    if (PHP_SAPI !== 'cli') {
        http_response_code(500);
    }
    $write($message."\n");
    exit($code);
};

$lockFile = sys_get_temp_dir().DIRECTORY_SEPARATOR.'qladev-redeploy.lock';
$lock = fopen($lockFile, 'c');

if ($lock === false || ! flock($lock, LOCK_EX | LOCK_NB)) {
    if (PHP_SAPI !== 'cli') {
        http_response_code(409);
    }
    $write("Another redeploy is already running.\n");
    exit(1);
}

$run = static function (string $command, string $cwd) use ($write): int {
    $process = proc_open($command, [0 => ['pipe', 'r'], 1 => ['pipe', 'w'], 2 => ['pipe', 'w']], $pipes, $cwd);

    if (! is_resource($process)) {
        $write("Could not start: {$command}\n");

        return 1;
    }

    fclose($pipes[0]);
    stream_set_blocking($pipes[1], false);
    stream_set_blocking($pipes[2], false);
    $exitCode = null;

    do {
        foreach ([1, 2] as $pipeNumber) {
            while (($line = fgets($pipes[$pipeNumber])) !== false) {
                $write($line);
            }
        }

        $status = proc_get_status($process);
        if (! $status['running']) {
            $exitCode = $status['exitcode'];
            break;
        }

        usleep(100000);
    } while (true);

    foreach ([1, 2] as $pipeNumber) {
        while (($line = fgets($pipes[$pipeNumber])) !== false) {
            $write($line);
        }
        fclose($pipes[$pipeNumber]);
    }

    $closeCode = proc_close($process);

    return is_int($exitCode) && $exitCode >= 0 ? $exitCode : $closeCode;
};

$step = static function (string $label, string $command, string $cwd) use ($write, $run, $fail): void {
    $write("\n=== {$label} ===\nCommand: {$command}\n");
    $exitCode = $run($command, $cwd);
    if ($exitCode !== 0) {
        $fail("{$label} failed with exit code {$exitCode}.", $exitCode);
    }
};

$startedAt = time();
$quotedBranch = escapeshellarg($branch);

if (! is_dir($sourceDir.DIRECTORY_SEPARATOR.'.git')) {
    $step('Cloning qla.dev', 'git clone --depth 1 --branch '.$quotedBranch.' '.escapeshellarg($repository).' '.escapeshellarg($sourceDir), $homeDir);
} else {
    $step('Fetching latest qla.dev', 'git fetch --depth 1 origin '.$quotedBranch, $sourceDir);
    $step('Checking out latest qla.dev', 'git reset --hard FETCH_HEAD', $sourceDir);
}
$step('Deploying revision', 'git log -1 --oneline', $sourceDir);

// Files to deploy: what git tracks under the deploy paths.
$listing = shell_exec('cd '.escapeshellarg($sourceDir).' && git ls-files -z');
if (! is_string($listing) || $listing === '') {
    $fail('Could not list repository files.');
}
$files = array_values(array_filter(
    explode("\0", $listing),
    static function (string $file) use ($deployPaths): bool {
        foreach ($deployPaths as $path) {
            if ($file === $path || (str_ends_with($path, '/') && str_starts_with($file, $path))) {
                return true;
            }
        }

        return false;
    },
));

if (! in_array('dist/index.html', $files, true)) {
    $fail('Refusing to deploy: dist/index.html is not in the repository.');
}

$write("\n=== Copying ".count($files)." files ===\n");
$copied = 0;
foreach ($files as $file) {
    $source = $sourceDir.DIRECTORY_SEPARATOR.$file;
    $target = $siteDir.DIRECTORY_SEPARATOR.$file;
    if (! is_file($source)) {
        continue;
    }
    if (is_file($target) && hash_file('sha256', $source) === hash_file('sha256', $target)) {
        continue;
    }
    if (! is_dir(dirname($target)) && ! mkdir(dirname($target), 0755, true) && ! is_dir(dirname($target))) {
        $fail("Could not create directory for {$file}.");
    }
    // Write next to the target and rename, so a request never sees half a file.
    $temporary = $target.'.redeploy-tmp';
    if (! copy($source, $temporary) || ! rename($temporary, $target)) {
        @unlink($temporary);
        $fail("Could not copy {$file}.");
    }
    $copied++;
}
$write("Updated {$copied} changed files. Nothing was deleted.\n");

$write("\nRedeploy completed successfully in ".(time() - $startedAt)."s.\n");
