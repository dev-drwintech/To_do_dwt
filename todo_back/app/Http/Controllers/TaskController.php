<?php

namespace App\Http\Controllers;
use App\Models\Tasks;
use Illuminate\Http\Request;

class TaskController extends Controller
{

    public function store(Request $request){

        $validated = $request->validate([
            'name'=>'string|required',
            'description'=>'nullable|required|max:250|nullable',
            'priority'=>'in:lower,medium,higher|required',
            'completed'=>'boolean',

            'end_date'=>'date|required',
        ]);


        $task = Tasks::create($validated);
        return response()->json($task,201);
    }
public function index(){
        return Tasks::all();
    }

    public function destroy($id){
        Tasks::destroy($id);
        return response()->json('task delete succesfully',204);
    }

    public function complete($id){
        $task = Tasks::find($id);
        if( !$task ){
            return response()->json(["message" => "no task for this id",404]);
        }

        $task->completed = true;
        $task->save();
        return response()->json($task,200);
    }


    public function update(Request $request,$id){

        $validated = $request->validate([
            'name'=>'string|required',
            'description'=>'nullable|max:250|nullable',
            'priority'=>'required|in:lower,medium,higher',
            'completed'=>'boolean',
            'end_date'=>'date|required',
        ]);

    // 2. Récupérer la tâche à modifier
    $task = Tasks::findOrFail($id);

    // 3. Mettre à jour les champs
    $task->name = $validated['name'];
    $task->end_date = $validated['end_date'];
    $task->description = $validated['description'] ?? $task->description;
    $task->completed = $validated['completed'] ?? false;
    $task->priority = $validated['priority'];

    // 4. Enregistrer les modifications
    $task->save();

    // 5. Rediriger avec un message de succès
    return redirect()->route('tasks.index')->with('success', 'Tâche mise à jour avec succès.');

    }


}
