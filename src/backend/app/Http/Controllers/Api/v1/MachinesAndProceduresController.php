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
use Illuminate\Support\Facades\Log;

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
     * Store a newly created resource in storage.
     *
     * @param StoreMachinesAndProcedure $request
     * @return JsonResponse
     */
    public function store(StoreMachinesAndProcedure $request): JsonResponse {
        $sanitized = $request->validated();
        $machinesAndProcedure = MachinesAndProcedure::create($sanitized);

        Log::info('Uloženie aktivity do databázy: ', [$sanitized['name']]);

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

        Log::info('Aktualizovanie aktivity s id ' . $machinesAndProcedureId);

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

        Log::info('Odstránenie aktivity s id ' . $machinesAndProcedureId);

        return response()->json(null, 204);
    }
}
