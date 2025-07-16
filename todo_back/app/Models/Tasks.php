<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Tasks extends Model
{
    protected $fillable = [
        'name',
        'description',
        'priority',
        'completed',
        'end_date',
    ];

    protected $casts = [
        'completed'=>'boolean',
        'end_date'=>'datetime'
    ];
}
