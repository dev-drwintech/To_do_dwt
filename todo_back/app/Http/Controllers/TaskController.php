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
}
