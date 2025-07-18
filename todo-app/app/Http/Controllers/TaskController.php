<?php

namespace App\Http\Controllers;

use App\Models\Task;
use Illuminate\Http\Request;

class TaskController extends Controller
{
    // Récupérer la liste des tâches de l'utilisateur connecté
    public function index()
    {
        // On récupère uniquement les tâches liées à l'utilisateur connecté
        $tasks = Task::where('user_id', auth()->id())->get();

        return response()->json($tasks);
    }

    // Afficher une tâche précise (s'assurer qu'elle appartient à l'utilisateur)
    public function show($id)
    {
        $task = Task::where('id', $id)
                    ->where('user_id', auth()->id())
                    ->firstOrFail();

        return response()->json($task);
    }

    // Créer une nouvelle tâche liée à l'utilisateur connecté
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
            'user_id' => auth()->id(), // important pour lier la tâche à l'utilisateur
        ]);

        return response()->json($task, 201);
    }

    // Mettre à jour une tâche (vérifier aussi que l'utilisateur est bien propriétaire)
    public function update(Request $request, $id)
    {
        $validated = $request->validate([
            'name' => 'sometimes|required|string',
            'description' => 'nullable|string',
            'completed' => 'boolean',
        ]);

        $task = Task::where('id', $id)
                    ->where('user_id', auth()->id())
                    ->firstOrFail();

        $task->update($validated);

        return response()->json($task);
    }

    // Supprimer une tâche (vérifier la propriété)
    public function destroy($id)
    {
        $task = Task::where('id', $id)
                    ->where('user_id', auth()->id())
                    ->firstOrFail();

        $task->delete();

        return response()->json(['message' => 'Tâche supprimée avec succès']);
    }
}
