<?php

namespace App\Http\Controllers\Api\v1;

use App\Http\Controllers\Controller;
use App\Http\Requests\Api\v1\Order\DestroyOrder;
use App\Http\Requests\Api\v1\Order\IndexOrder;
use App\Http\Requests\Api\v1\Order\StoreOrder;
use App\Http\Requests\Api\v1\Order\UpdateOrder;
use App\Models\Order;
use App\Services\Api\v1\PaginationService;
use Carbon\Carbon;
use Illuminate\Http\JsonResponse;

class OrdersController extends Controller
{
    /**
     * Display data of all orders.
     *
     * @param IndexOrder $request
     * @return JsonResponse
     * @throws \Exception
     */
    public function index(IndexOrder $request): JsonResponse {
        $paginationData = app(PaginationService::class)->getPagination($request);
        $from = $request->input('from') ? Carbon::createFromFormat('d/m/Y H:i', $request->input('from')) : Carbon::now()->subWeek();
        $to = $request->input('to') ?  Carbon::createFromFormat('d/m/Y H:i', $request->input('to')) : Carbon::now();

        $orders = Order::whereBetween('start_time', [$from, $to])
            ->join('clients', 'clients.id', '=', 'orders.client_id')
            ->join('machines_and_procedures', 'orders.machine_id', '=', 'machines_and_procedures.id')
            ->orderBy('orders.id', $paginationData['orderDirection'])
            ->offset($paginationData['offset'])
            ->limit($paginationData['perPage'])
            ->select('machines_and_procedures.*', 'clients.*', 'orders.id as order_id', 'orders.end_time as order_end_time', 'orders.start_time as order_start_time',
                'orders.note as order_note', 'orders.client_id as order_client_id', 'orders.machine_id as order_machine_id')
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
     * Store a newly created order in storage.
     *
     * @param StoreOrder $request
     * @return JsonResponse
     */
    public function store(StoreOrder $request): JsonResponse {
        $sanitized = $request->getSanitized();
        $order = Order::create($sanitized);

        return response()->json($order, 201);
    }

    /**
     * Update the specified order in storage.
     *
     * @param UpdateOrder $request
     * @param int $orderId
     * @return JsonResponse
     */
    public function update(UpdateOrder $request, int $orderId): JsonResponse {
        $order = Order::findOrFail($orderId);
        $data = $request->getSanitized();
        $order->update($data);

        return response()->json($order, 200);
    }

    /**
     * Remove the specified order from storage.
     *
     * @param DestroyOrder $request
     * @param int $orderId
     * @return JsonResponse
     */
    public function destroy(DestroyOrder $request, int $orderId): JsonResponse {
        $order = Order::findOrFail($orderId);
        $order->delete();

        return response()->json(null, 204);
    }

    //TODO: implement me pls
    public function findOrder(String $string): JsonResponse {
        /*
        $orders = Order::where('first_name', 'ILIKE', '%' . $string . '%')
            ->orWhere('last_name', 'ILIKE', '%' . $string . '%')
            ->orWhere('phone', 'ILIKE', '%' . $string . '%')->get();
        */

        return response()->json([], 200);
    }
}
