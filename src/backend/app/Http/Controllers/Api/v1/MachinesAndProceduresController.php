<?php

namespace App\Http\Controllers\Api\v1;

use App\Http\Controllers\Controller;

use App\Http\Requests\Api\v1\MachinesAndProcedure\DestroyMachinesAndProcedure;
use App\Http\Requests\Api\v1\MachinesAndProcedure\IndexMachinesAndProcedure;
use App\Http\Requests\Api\v1\MachinesAndProcedure\StoreMachinesAndProcedure;
use App\Http\Requests\Api\v1\MachinesAndProcedure\UpdateMachinesAndProcedure;
use App\Models\MachinesAndProcedure;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Collection;

class MachinesAndProceduresController extends Controller
{

    /**
     * Display data of the resource.
     *
     * @param IndexMachinesAndProcedure $request
     * @return Collection
     */
    public function index(IndexMachinesAndProcedure $request): Collection {
        return MachinesAndProcedure::all();
    }

    /**
     * Display the specified resource history.
     *
     * @param IndexMachinesAndProcedure $request
     * @return Collection
     */
    public function showHistory(IndexMachinesAndProcedure $request): Collection {
        $orders = Order::with('orders')->get();
        return $orders;
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param StoreMachinesAndProcedure $request
     * @return JsonResponse
     */
    public function store(StoreMachinesAndProcedure $request): JsonResponse {
        $sanitized = $request->validated();
        $machinesAndProcedure = MachinesAndProcedure::create($sanitized);

        return response()->json($machinesAndProcedure, 201);
    }


    /**
     * Display the specified resource.
     *
     * @return void
     */
    public function show() {
        //TODO implement me pls
    }

    /**
     * Update the specified resource in storage.
     *
     * @param UpdateMachinesAndProcedure $request
     * @param int $machinesAndProcedureId
     * @return JsonResponse
     */
    public function update(UpdateMachinesAndProcedure $request, int $machinesAndProcedureId): JsonResponse {
        $machinesAndProcedure = MachinesAndProcedure::findOrFail($machinesAndProcedureId);
        $data = $request->validated();
        $machinesAndProcedure->update($data);

        return response()->json($machinesAndProcedure, 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param DestroyMachinesAndProcedure $request
     * @param int $machinesAndProcedureId
     * @return JsonResponse
     */
    public function destroy(DestroyMachinesAndProcedure $request, int $machinesAndProcedureId): JsonResponse {
        $machinesAndProcedure = MachinesAndProcedure::findOrFail($machinesAndProcedureId);
        $machinesAndProcedure->delete();

        return response()->json(null, 204);
    }
}
