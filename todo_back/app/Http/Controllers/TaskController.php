<?php

namespace App\Http\Controllers;

use App\Models\Tasks;
use Illuminate\Http\Request;

class TaskController extends Controller
{
    // Liste toutes les tâches de l'utilisateur connecté
    public function index()
    {
        return Tasks::where('user_id', auth()->id())->get();
    }

    // Crée une nouvelle tâche liée à l'utilisateur connecté
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string',
            'description' => 'nullable|string|max:250',
            'priority' => 'required|in:lower,medium,higher',
            'completed' => 'boolean',
            'end_date' => 'required|date',
        ]);

        $validated['user_id'] = auth()->id();

        $task = Tasks::create($validated);

        return response()->json($task, 201);
    }

    // Met à jour une tâche spécifique si elle appartient à l'utilisateur connecté
    public function update(Request $request, Tasks $task)
    {
        if ($task->user_id !== auth()->id()) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $validated = $request->validate([
            'name' => 'sometimes|string',
            'description' => 'sometimes|string|max:250',
            'priority' => 'sometimes|in:lower,medium,higher',
            'completed' => 'sometimes|boolean',
            'end_date' => 'sometimes|date',
        ]);

        $task->update($validated);

        return response()->json($task);
    }

    // Supprime une tâche si elle appartient à l'utilisateur connecté
    public function destroy(Tasks $task)
    {
        if ($task->user_id !== auth()->id()) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $task->delete();

        return response()->json(null, 204);
    }

    // Marque une tâche comme complète, si elle appartient à l'utilisateur connecté
    public function complete(Tasks $task)
    {
        if ($task->user_id !== auth()->id()) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $task->completed = true;
        $task->save();

        return response()->json($task);
    }

    public function show(Tasks $task)
{
    if ($task->user_id !== auth()->id()) {
        return response()->json(['message' => 'Unauthorized'], 403);
    }

    return response()->json($task);
}

}
