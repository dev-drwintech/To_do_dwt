<?php

namespace App\Http\Controllers;

use App\Models\Task;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class TaskController extends Controller
{
    // GET /api/tasks
    public function index()
    {
        return response()->json(Task::all());
    }

    // GET /api/tasks/{id}
    public function show($id)
    {
        $task = Task::findOrFail($id);
        return response()->json($task);
    }

    // POST /api/tasks
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string',
            'description' => 'nullable|string',
        ]);

        $task = Task::create([
            'name' => $validated['name'],
            'description' => $validated['description'] ?? null,
            'completed' => false,
        ]);

        return response()->json($task, 201);
    }

    // PUT /api/tasks/{id}
    public function update(Request $request, $id)
    {
        $validated = $request->validate([
            'name' => 'sometimes|required|string',
            'description' => 'nullable|string',
            'completed' => 'boolean',
        ]);

        $task = Task::findOrFail($id);
        $task->update($validated);

        return response()->json($task);
    }

    // DELETE /api/tasks/{id}
    public function destroy($id)
    {
        $task = Task::findOrFail($id);
        $task->delete();

        return response()->json(['message' => 'Deleted successfully']);
    }
}
