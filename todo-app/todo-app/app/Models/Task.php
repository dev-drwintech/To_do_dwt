<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Task extends Model
{
    protected $fillable = [
        'name',
        'description',
        'completed',
        'user_id', 
    ];

    protected $casts = [
        'completed' => 'boolean',
    ];

     public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}

