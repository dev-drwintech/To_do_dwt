<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Task; 

class TaskController extends Controller
{
    // GET /api/tasks
    public function index()
    {   
        return response()->json(Task::all(), 200);
    }

    // POST /api/tasks
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'completed' => 'boolean',
        ]);

        $task = Task::create($validated);

        return response()->json($task, 201);
    }

    // GET /api/tasks/{id}
    public function show($id)
    {
        $task = Task::find($id);

        if (!$task) {
            return response()->json(['message' => 'Tâche non trouvée'], 404);
        }

        return response()->json($task, 200);
    }

    // PUT /api/tasks/{id}
    public function update(Request $request, $id)
    {
        $task = Task::find($id);

        if (!$task) {
            return response()->json(['message' => 'Tâche non trouvée'], 404);
        }

        $validated = $request->validate([
            'name' => 'string|max:255',
            'description' => 'nullable|string',
            'completed' => 'boolean',
        ]);

        $task->update($validated);

        return response()->json($task, 200);
    }

    // DELETE /api/tasks/{id}
    public function destroy($id)
    {
        $task = Task::find($id);

        if (!$task) {
            return response()->json(['message' => 'Tâche non trouvée'], 404);
        }

        $task->delete();

        return response()->json(['message' => 'Tâche supprimée avec succès'], 200);
    }
}
