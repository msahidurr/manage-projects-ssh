<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Services\SSHService;
use Illuminate\Support\Facades\Auth;

class WordpressSite extends Model
{
    use HasFactory;

    const WP_UPDATE_SH = 'wp-site-update.sh';

    protected $fillable = [
        'user_id',
        'site_name',
        'path',
    ];

    public function setPathAttribute($value)
    {
        $value = ltrim($value, '/');
        $value = rtrim($value, '/');
        
        $this->attributes['path'] = $value;
    }

    public function checkWpSiteUpdates()
    {
        $sshData = Auth::user()->ssh()->first();

        if($sshData) {
            
            // $ssh = new SSHService($sshData->host, $sshData->username, $sshData->password);
            
            // return $ssh->exec("cd /{$this->path}; ". self::WP_UPDATE_SH);
        }

        return '';
    }
}
