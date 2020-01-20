<?php

namespace App\Http\Controllers\Api\v1;

use App\Http\Controllers\Controller;
use App\Http\Requests\Api\v1\MachinesAndProcedure\DestroyMachinesAndProcedure;
use App\Http\Requests\Api\v1\MachinesAndProcedure\IndexMachinesAndProcedure;
use App\Http\Requests\Api\v1\MachinesAndProcedure\StoreMachinesAndProcedure;
use App\Http\Requests\Api\v1\MachinesAndProcedure\UpdateMachinesAndProcedure;
use App\Models\MachinesAndProcedure;
use App\Services\Api\v1\PaginationService;
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
        $paginationData = app(PaginationService::class)->getPagination($request);

        $machinesAndProcedures = MachinesAndProcedure::orderBy($paginationData['orderBy'], $paginationData['orderDirection'])
            ->offset($paginationData['offset'])
            ->limit($paginationData['perPage'])
            ->get();

        $machinesAndProceduresCount = MachinesAndProcedure::count();

        $data = [
            'items' => $machinesAndProcedures,
            'total' => $machinesAndProcedures->count(),
            'perPage' => $paginationData['perPage'],
            'currentPage' => $paginationData['page'],
            'lastPage' => (int) ceil($machinesAndProceduresCount / $paginationData['perPage']),
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
        $paginationData = app(PaginationService::class)->getPagination($request);

        $orders = MachinesAndProcedure::join('orders', 'orders.machine_id', '=', 'machines_and_procedures.id')
            ->where("end_time", "<", Carbon::now())
            ->orderByDesc("end_time")
            ->offset($paginationData['offset'])
            ->limit($paginationData['perPage'])
            ->get();

        $ordersCount = MachinesAndProcedure::join('orders', 'orders.machine_id', '=', 'machines_and_procedures.id')
            ->where("end_time", "<", Carbon::now())
            ->count();

        $data = [
            'items' => $orders,
            'total' => $orders->count(),
            'perPage' => $paginationData['perPage'],
            'currentPage' => $paginationData['page'],
            'lastPage' => (int) ceil($ordersCount / $paginationData['perPage']),
        ];

        return response()->json($data, 200);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param StoreMachinesAndProcedure $request
     * @return JsonResponse
     */
    public function store(StoreMachinesAndProcedure $request): JsonResponse {
        Log::info('Ulozenie aktivity do databazy: ', $request->only(['name']));

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
        Log::info('Aktualizovanie aktivity s id ' . $machinesAndProcedureId);

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
        Log::info('Odstranenie aktivity s id ' . $machinesAndProcedureId);

        $machinesAndProcedure = MachinesAndProcedure::findOrFail($machinesAndProcedureId);
        $machinesAndProcedure->delete();

        return response()->json(null, 204);
    }
}
