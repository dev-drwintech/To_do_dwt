


<?php
use Illuminate\Http\Request;
use App\Http\Controllers\TaskController;

Route::get('test', function () {
    return response() -> json(['message' => 'Ok']);
});

Route::get('/tasks',[TaskController::class, 'index'])->name('tasks.index');

Route::post('/tasks',[TaskController::class, 'store']);

Route::delete('/tasks/{id}',[TaskController::class, 'destroy']);

Route::patch('/tasks/{id}',[TaskController::class, 'complete']);

Route::put('/tasks/{id}',[TaskController::class,'update']);
