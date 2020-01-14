<?php

namespace App\Http\Controllers\Api\v1;

use App\Http\Controllers\Controller;
use App\Http\Requests\Api\v1\MachinesAndProcedure\IndexMachinesAndProcedure;
use App\Http\Requests\Api\v1\Order\IndexOrder;
use App\Models\MachinesAndProcedure;
use App\Models\Order;
use App\Services\Api\v1\PaginationService;
use Carbon\Carbon;
use Illuminate\Http\JsonResponse;

class AvailabilityController extends Controller
{
    /**
     * Display data of all orders.
     *
     * @param IndexOrder $request
     * @return JsonResponse
     */
    public function ordersTime(IndexOrder $request): JsonResponse {
        $paginationData = app(PaginationService::class)->getPagination($request);
        $from = $request->input('from') ? Carbon::createFromFormat('d/m/Y H:i', $request->input('from')) : Carbon::now()->subWeek();
        $to = $request->input('to') ?  Carbon::createFromFormat('d/m/Y H:i', $request->input('to')) : Carbon::now();

        $orders = Order::whereBetween('start_time', [$from, $to])
            ->join('clients', 'clients.id', '=', 'orders.client_id')
            ->join('machines_and_procedures', 'orders.machine_id', '=', 'machines_and_procedures.id')
            ->orderBy('orders.id', $paginationData['orderDirection'])
            ->offset($paginationData['offset'])
            ->limit($paginationData['perPage'])
            ->select('machines_and_procedures.*', 'orders.id as order_id', 'orders.end_time as order_end_time', 'orders.start_time as order_start_time',
                'orders.machine_id as order_machine_id')
            ->get();

        $ordersCount = Order::whereBetween('start_time', [$from, $to])
            ->join('clients', 'clients.id', '=', 'orders.client_id')
            ->join('machines_and_procedures', 'orders.machine_id', '=', 'machines_and_procedures.id')
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
     * Display data of the resource.
     *
     * @param IndexMachinesAndProcedure $request
     * @return JsonResponse
     */
    public function machinesAndProcedures(IndexMachinesAndProcedure $request): JsonResponse {
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
}
