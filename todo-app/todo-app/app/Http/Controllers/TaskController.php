<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Task;

class TaskController extends Controller
{
    
    public function index()
    {
        $tasks = Task::where('user_id', auth()->id())->get();
        return response()->json($tasks, 200);
    }

   
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'completed' => 'boolean',
        ]);

        $task = Task::create([
            ...$validated,
            'user_id' => auth()->id(),//liaison de la tâche à l'utilisateur connecté.
        ]);

        return response()->json($task, 201);
    }

    
    public function show($id)
    {
        $task = Task::where('id', $id)
                    ->where('user_id', auth()->id())
                    ->first();

        if (!$task) {
            return response()->json(['message' => 'Tâche non trouvée'], 404);
        }

        return response()->json($task, 200);
    }

    
    public function update(Request $request, $id)
    {
        $task = Task::where('id', $id)
                    ->where('user_id', auth()->id())
                    ->first();

        if (!$task) {
            return response()->json(['message' => 'Tâche non trouvée ou non autorisée'], 404);
        }

        $validated = $request->validate([
            'name' => 'string|max:255',
            'description' => 'nullable|string',
            'completed' => 'boolean',
        ]);

        $task->update($validated);

        return response()->json($task, 200);
    }

    public function destroy($id)
    {
        $task = Task::where('id', $id)
                    ->where('user_id', auth()->id())
                    ->first();

        if (!$task) {
            return response()->json(['message' => 'Tâche non trouvée ou non autorisée'], 404);
        }

        $task->delete();

        return response()->json(['message' => 'Tâche supprimée avec succès'], 200);
    }
}
