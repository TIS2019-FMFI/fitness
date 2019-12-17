<?php

namespace App\Http\Controllers\Api\v1;

use App\Http\Controllers\Controller;
use App\Http\Requests\Api\v1\MachinesAndProcedure\DestroyMachinesAndProcedure;
use App\Http\Requests\Api\v1\MachinesAndProcedure\IndexMachinesAndProcedure;
use App\Http\Requests\Api\v1\MachinesAndProcedure\StoreMachinesAndProcedure;
use App\Http\Requests\Api\v1\MachinesAndProcedure\UpdateMachinesAndProcedure;
use App\Models\MachinesAndProcedure;
use Carbon\Carbon;
use Illuminate\Http\JsonResponse;

class MachinesAndProceduresController extends Controller
{

    /**
     * Display data of the resource.
     *
     * @param IndexMachinesAndProcedure $request
     * @return JsonResponse
     */
    public function index(IndexMachinesAndProcedure $request): JsonResponse {
        $orderDirection = 'asc';
        $perPage = 10;
        $page = 1;
        $orderBy = 'id';

        if($request->has('orderDirection')){
            $orderDirection = $request->orderDirection;
        }

        if($request->has('perPage')) {
            $perPage = $request->perPage;
        }

        if($request->has('page')){
            $page = $request->page;
        }

        if($request->has('orderBy')){
            $orderBy = $request->orderBy;
        }

        $machinesAndProcedures = MachinesAndProcedure::orderBy($orderBy, $orderDirection)
            ->offset(($perPage * $page) - $perPage)
            ->limit($perPage)
            ->get();

        $data = [
            'items' => $machinesAndProcedures,
            'total' => $machinesAndProcedures->count(),
            'perPage' => $perPage,
            'currentPage' => $page,
            'lastPage' => $machinesAndProcedures->count() / $perPage,
        ];

        return response()->json($data, 200);
    }

    /**
     * Display the specified resource history.
     *
     * @param IndexMachinesAndProcedure $request
     * @return JsonResponse
     */
    public function history(IndexMachinesAndProcedure $request): JsonResponse {
        $orders = MachinesAndProcedure::join('orders', 'orders.machine_id', '=', 'machines_and_procedures.id')
            ->where("end_time", "<", Carbon::now())
            ->orderByDesc("end_time")
            ->get();

        return response()->json($orders, 200);
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
