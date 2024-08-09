<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Ssh extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id', 
        'host', 
        'port', 
        'username', 
        'password',
    ];
}
