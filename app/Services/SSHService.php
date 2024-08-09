<?php

namespace App\Services;

use Exception;
use phpseclib3\Net\SSH2;

use function PHPUnit\Framework\throwException;

class SSHService
{
    protected $ssh;

    public function __construct($host, $username, $password)
    {
        $this->ssh = new SSH2($host);
        $this->ssh->login($username, $password);
    }

    public function exec($command)
    {
        return $this->ssh->exec($command);
    }

    public function createPath($path)
    {
        $command = "mkdir -p $path";
        
        $output = $this->ssh->exec($command);

        if (!empty($output)) {
            throw new Exception($output);
        }

        $this->ssh->disconnect();
    }

    public function renamePath($oldPath, $newPath)
    {
        $command = "mv $oldPath $newPath";
        
        $output = $this->ssh->exec($command);

        if (!empty($output)) {
            throw new Exception($output);
        }

        $this->ssh->disconnect();
    }

    public function getNgnixLog($startDate, $endDate)
    {
        $logFile = '/var/log/nginx/access.log';
        $startDate = date('d/M/Y:H:i:s', strtotime($startDate));
        $endDate = date('d/M/Y:H:i:s', strtotime($endDate));

        $command = <<<EOL
        awk -v start="[$startDate" -v end="[$endDate" '
        \$4 >= start && \$4 <= end {print \$1}' $logFile | sort | uniq -c | sort -nr | awk '{if(\$1 >= 10) print "IP: "\$2 " - Requests: "\$1}'
        EOL;

        $output = $this->ssh->exec($command);

        if (empty($output)) {
            throw new Exception("log not found");
        }

        $this->ssh->disconnect();

        return $output;
    }
}
