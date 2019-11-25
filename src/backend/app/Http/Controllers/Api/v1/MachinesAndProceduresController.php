<?php

namespace App\Http\Controllers\Api\v1;

use App\Http\Controllers\Controller;
use App\Http\Requests\Api\v1\MachinesAndProcedures\DestroyMachinesAndProcedure;
use App\Http\Requests\Api\v1\MachinesAndProcedures\IndexMachinesAndProcedure;
use App\Http\Requests\Api\v1\MachinesAndProcedures\StoreMachinesAndProcedure;
use App\Http\Requests\Api\v1\MachinesAndProcedures\UpdateMachinesAndProcedure;
use App\Models\MachinesAndProcedure;
use Illuminate\Http\Response;
use Illuminate\Support\Collection;

class MachinesAndProceduresController extends Controller
{

    public function index(IndexMachinesAndProcedure $request): Collection {
        return MachinesAndProcedure::all();
    }

    public function showHistory(IndexMachinesAndProcedure $request) {

    }

    public function store(StoreMachinesAndProcedure $request): Response {
        $sanitized = $request->validated();
        $machinesAndProcedure = MachinesAndProcedure::create($sanitized);

        return response()->json($machinesAndProcedure, 201);
    }

    //TODO implement me pls
    public function show() {}

    public function update(UpdateMachinesAndProcedure $request, int $id): Response {
        $machinesAndProcedure = MachinesAndProcedure::findOrFail($id);
        $data = $request->validated();
        $machinesAndProcedure->update($data);

        return response()->json($machinesAndProcedure, 200);
    }

    public function destroy(DestroyMachinesAndProcedure $request, int $id): Response {
        $machinesAndProcedure = MachinesAndProcedure::findOrFail($id);
        $machinesAndProcedure->delete();

        return response()->json(null, 204);
    }
}
