<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\User;  // <<-- N'oublie pas d'importer User

class Task extends Model
{
    use HasFactory;  // <<-- Ajoute ce trait pour la factory, c'est standard

    protected $fillable = ['name', 'description', 'completed', 'user_id'];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
