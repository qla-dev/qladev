<?php
// Bonaco Media website (https://qla.dev/bonaco): the qla-dev/bonaco repo is fetched
// into dist/bonaco, dependencies installed, then built with `npm run build:qla`.
// Opened as https://qla.dev/bonaco/redeploy.php (see .htaccess).

declare(strict_types=1);

header('Content-Type: text/plain; charset=utf-8');
header('Cache-Control: no-store');
header('X-Accel-Buffering: no');
set_time_limit(300);
while (ob_get_level() > 0) ob_end_flush();
ob_implicit_flush(true);

$dir = __DIR__ . DIRECTORY_SEPARATOR . 'bonaco';
$repo = 'https://github.com/qla-dev/bonaco.git';
$branch = 'main';

$lock = fopen(sys_get_temp_dir() . '/bonaco-qla-redeploy.lock', 'c');
if ($lock === false || !flock($lock, LOCK_EX | LOCK_NB)) {
    http_response_code(409);
    exit("Another redeploy is already running.\n");
}

if (!is_dir($dir) && !mkdir($dir, 0755, true)) {
    http_response_code(500);
    exit("Could not create {$dir}\n");
}

$run = static function (string $command, string $cwd): int {
    $process = proc_open($command, [0 => ['pipe', 'r'], 1 => ['pipe', 'w'], 2 => ['pipe', 'w']], $pipes, $cwd);
    if (!is_resource($process)) {
        echo "Could not start: {$command}\n";
        return 1;
    }
    fclose($pipes[0]);
    stream_set_blocking($pipes[1], false);
    stream_set_blocking($pipes[2], false);
    $exitCode = null;
    $lastOutputAt = time();
    do {
        foreach ([1, 2] as $p) {
            while (($line = fgets($pipes[$p])) !== false) {
                $lastOutputAt = time();
                echo $line;
                flush();
            }
        }
        $status = proc_get_status($process);
        if (!$status['running']) { $exitCode = $status['exitcode']; break; }
        if (time() - $lastOutputAt >= 15) { $lastOutputAt = time(); echo '... still running at ' . date('H:i:s') . "\n"; flush(); }
        usleep(100000);
    } while (true);
    foreach ([1, 2] as $p) { while (($line = fgets($pipes[$p])) !== false) echo $line; fclose($pipes[$p]); }
    $closeCode = proc_close($process);
    return is_int($exitCode) && $exitCode >= 0 ? $exitCode : $closeCode;
};

$step = static function (string $label, string $command, string $cwd) use ($run): void {
    echo "\n=== {$label} ===\n";
    $exitCode = $run($command, $cwd);
    flush();
    if ($exitCode !== 0) {
        http_response_code(500);
        exit("{$label} failed with exit code {$exitCode}.\n");
    }
};

// --- Find npm ---
$npmCandidates = [
    '/opt/cpanel/ea-nodejs24/bin/npm', '/opt/cpanel/ea-nodejs22/bin/npm', '/opt/cpanel/ea-nodejs20/bin/npm',
    '/opt/alt/alt-nodejs24/root/usr/bin/npm', '/opt/alt/alt-nodejs22/root/usr/bin/npm', '/opt/alt/alt-nodejs20/root/usr/bin/npm',
    '/usr/local/bin/npm', '/usr/bin/npm',
];
foreach (['/opt/cpanel/ea-nodejs*/bin/npm', '/opt/alt/alt-nodejs*/root/usr/bin/npm'] as $pattern) {
    foreach (glob($pattern) ?: [] as $c) $npmCandidates[] = $c;
}
$npm = null;
foreach (array_unique($npmCandidates) as $c) { if (is_file($c) && is_executable($c)) { $npm = $c; break; } }
if ($npm === null) { http_response_code(500); exit("Could not find npm. Enable Node.js 20+ in cPanel.\n"); }
$nodeBinDir = dirname($npm);
putenv('PATH=' . $nodeBinDir . PATH_SEPARATOR . ((string) (getenv('PATH') ?: '/usr/local/bin:/usr/bin:/bin')));
$npmCmd = escapeshellarg($npm);

// --- Git fetch ---
$started = time();
if (!is_dir($dir . DIRECTORY_SEPARATOR . '.git')) {
    $step('Cloning Bonaco', 'git clone --branch ' . escapeshellarg($branch) . ' ' . escapeshellarg($repo) . ' .', $dir);
} else {
    $step('Fetching latest Bonaco', 'git fetch origin ' . escapeshellarg($branch) . ' 2>&1', $dir);
    $step('Checking out', 'git reset --hard FETCH_HEAD 2>&1', $dir);
}
$step('Current revision', 'git log -1 --oneline', $dir);

// --- Build ---
$step('Installing dependencies', $npmCmd . ' ci --no-audit --no-fund', $dir);
$step('Building Bonaco Media', $npmCmd . ' run build:qla', $dir);

if (!is_file($dir . '/dist/index.html')) {
    http_response_code(500);
    exit("\ndist/index.html is missing after build.\n");
}

echo "\nRedeploy completed in " . (time() - $started) . "s. https://qla.dev/bonaco/\n";
