<?php
// Bonaco Media website (https://qla.dev/bonaco): the qla-dev/bonaco repo lives in
// dist/bonaco and commits its build in dist/ (npm run build:qla), so a redeploy only
// syncs the checkout to the latest commit. Works for an empty or fresh clone too.
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

$steps = [];
if (!is_dir($dir . DIRECTORY_SEPARATOR . '.git')) {
    $steps[] = ['Initializing repository', 'git init -q'];
}
$steps[] = ['Setting origin', 'git remote remove origin >/dev/null 2>&1; git remote add origin ' . escapeshellarg($repo)];
$steps[] = ['Fetching latest Bonaco', 'git fetch --depth 1 origin ' . escapeshellarg($branch) . ' 2>&1'];
$steps[] = ['Checking out', 'git checkout -q -f -B ' . escapeshellarg($branch) . ' FETCH_HEAD 2>&1 && git reset -q --hard FETCH_HEAD 2>&1'];
$steps[] = ['Current revision', 'git log -1 --oneline 2>&1'];

$started = time();
foreach ($steps as [$label, $command]) {
    echo "\n=== {$label} ===\n";
    $output = [];
    exec('cd ' . escapeshellarg($dir) . ' && ' . $command, $output, $code);
    echo implode("\n", $output), "\n";
    flush();
    if ($code !== 0) {
        http_response_code(500);
        exit("{$label} failed with exit code {$code}.\n");
    }
}

if (!is_file($dir . '/dist/index.html')) {
    http_response_code(500);
    exit("\ndist/index.html is missing: commit a build made with `npm run build:qla`.\n");
}

echo "\nRedeploy completed in " . (time() - $started) . "s. https://qla.dev/bonaco/\n";
