<?php

use App\Http\Controllers\AuthController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\TaskController;

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);


Route::middleware('auth:sanctum')->group(function () {
    Route::get('/user', [AuthController::class, 'user']);
    Route::post('/logout', [AuthController::class, 'logout']);


    Route::get('/tasks', [TaskController::class, 'index']);     
    Route::post('/tasks', [TaskController::class, 'store']);      
    Route::delete('/tasks/{id}', [TaskController::class, 'destroy']); 
    Route::get('/tasks/{id}', [TaskController::class, 'show']);
    Route::put('/tasks/{id}/toggle', [TaskController::class, 'toggleCompletion']);
    Route::put('/tasks/{id}', [TaskController::class, 'update']);

    });

