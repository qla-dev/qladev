<?php
declare(strict_types=1);
set_time_limit(300);
ini_set('memory_limit', '512M');
ini_set('output_buffering', '0');
ini_set('zlib.output_compression', '0');
if (PHP_SAPI !== 'cli') { header('Content-Type: text/plain; charset=utf-8'); header('Cache-Control: no-store'); header('X-Accel-Buffering: no'); }
while (ob_get_level() > 0) { ob_end_flush(); }
ob_implicit_flush(true);
$write = static function (string $m): void { echo $m; flush(); };
$run = static function (string $cmd, string $cwd) use ($write): int {
    $write("$ {$cmd}\n");
    $p = proc_open($cmd, [0=>['pipe','r'],1=>['pipe','w'],2=>['pipe','w']], $pipes, $cwd);
    if (!is_resource($p)) { $write("Could not start.\n"); return 1; }
    fclose($pipes[0]); stream_set_blocking($pipes[1],false); stream_set_blocking($pipes[2],false);
    $exit = null;
    do { foreach([1,2] as $n) { while(($l=fgets($pipes[$n]))!==false) $write($l); }
    $s=proc_get_status($p); if(!$s['running']){$exit=$s['exitcode'];break;} usleep(100000); } while(true);
    foreach([1,2] as $n){while(($l=fgets($pipes[$n]))!==false)$write($l);fclose($pipes[$n]);}
    proc_close($p); return is_int($exit)?$exit:1;
};
$distDir = __DIR__;
$targetDir = $distDir.'/gta-vi-ai-companion/endpoints';
$repo = 'https://github.com/qla-dev/gta-backend.git';
$write("=== GTA VI OS Backend Setup ===\n\nTarget: {$targetDir}\n");
$isGit = is_dir($targetDir.'/.git');
$write("Is git repo: ".($isGit?'yes':'no')."\n\n");
if ($isGit) { $write("Pulling...\n"); $run('git pull --ff-only',$targetDir); }
else {
    $parentDir = $distDir.'/gta-vi-ai-companion';
    if (is_dir($targetDir)) { $write("Removing non-git dir...\n"); $run('rm -rf '.escapeshellarg($targetDir),$parentDir); }
    if (!is_dir($parentDir)) mkdir($parentDir,0755,true);
    $write("Cloning...\n");
    if ($run('git clone '.escapeshellarg($repo).' endpoints',$parentDir)!==0) { $write("Clone failed.\n"); exit(1); }
}
$envFile=$targetDir.'/.env';
if(!is_file($envFile)){
    $write("\nCopying .env.example to .env\n");
    copy($targetDir.'/.env.example',$envFile);
    $write("WARNING: Set DB_PASSWORD in .env via cPanel File Manager!\n");
} else { $write(".env exists.\n"); }
$php=null;
foreach(['/usr/local/bin/php','/usr/bin/php','/opt/cpanel/ea-php82/root/usr/bin/php','/opt/cpanel/ea-php83/root/usr/bin/php','/opt/cpanel/ea-php84/root/usr/bin/php'] as $p)
    if(is_file($p)&&is_executable($p)){$php=$p;break;}
if(!$php){$write("No PHP CLI.\n");exit(127);}
$write("PHP: {$php}\n");
// Set HOME/COMPOSER_HOME so Composer can write its cache
$composerHome=$targetDir.'/.composer';
$composerCache=$composerHome.'/cache';
foreach([$composerHome,$composerCache] as $d){if(!is_dir($d))mkdir($d,0755,true);}
putenv('HOME='.$composerHome);
putenv('COMPOSER_HOME='.$composerHome);
putenv('COMPOSER_CACHE_DIR='.$composerCache);
putenv('COMPOSER_ALLOW_SUPERUSER=1');
putenv('COMPOSER_NO_INTERACTION=1');

$phar=$targetDir.'/composer.phar'; $composer=null;
if(is_file($phar)&&filesize($phar)>1000){$composer=escapeshellarg($php).' '.escapeshellarg($phar);$write("composer.phar: ".filesize($phar)." bytes\n");}
else{$write("Downloading composer via curl...\n");$run('curl -sS -o '.escapeshellarg($phar).' https://getcomposer.org/download/latest-stable/composer.phar',$targetDir);
if(is_file($phar)&&filesize($phar)>1000){chmod($phar,0755);$composer=escapeshellarg($php).' '.escapeshellarg($phar);}
else{$write("Composer download failed.\n");exit(127);}}
$env=file_get_contents($envFile);
if(is_string($env)&&str_contains($env,"APP_KEY=\n")){$write("\nGenerating key...\n");$run(escapeshellarg($php).' artisan key:generate --no-ansi',$targetDir);}
$write("\n=== Composer install ===\n");
if($run($composer.' install --no-interaction --prefer-dist --no-progress --optimize-autoloader --no-dev --no-ansi',$targetDir)!==0){$write("Failed.\n");exit(1);}
$write("\n=== Storage dirs ===\n");
foreach(['storage/framework/cache/data','storage/framework/sessions','storage/framework/views','storage/logs','bootstrap/cache'] as $d){$f=$targetDir.'/'.$d;if(!is_dir($f))mkdir($f,0755,true);}
$run('chmod -R 775 storage bootstrap/cache',$targetDir);
$write("\n=== Migrations ===\n");
if($run(escapeshellarg($php).' artisan migrate --force --no-ansi',$targetDir)!==0){$write("Migration failed. Check DB_PASSWORD in .env.\n");exit(1);}
$write("\n=== Caching ===\n");
$run(escapeshellarg($php).' artisan config:cache --no-ansi',$targetDir);
$run(escapeshellarg($php).' artisan route:cache --no-ansi',$targetDir);
$write("\n=== Done! Test: https://qla.dev/gta-vi-ai-companion/endpoints/api/health ===\n");
