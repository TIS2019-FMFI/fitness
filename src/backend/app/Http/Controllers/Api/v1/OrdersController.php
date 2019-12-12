<?php

namespace App\Http\Controllers\Api\v1;

use App\Http\Controllers\Controller;
use App\Http\Requests\Api\v1\Order\DestroyOrder;
use App\Http\Requests\Api\v1\Order\IndexOrder;
use App\Http\Requests\Api\v1\Order\StoreOrder;
use App\Http\Requests\Api\v1\Order\UpdateOrder;
use App\Models\Order;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Collection;

class OrdersController extends Controller
{
    /**
     * Display data of all orders.
     *
     * @param IndexOrder $request
     * @return Collection
     */
    public function index(IndexOrder $request): Collection {
        return Order::all();
    }

    /**
     * Store a newly created order in storage.
     *
     * @param StoreOrder $request
     * @return JsonResponse
     */
    public function store(StoreOrder $request): JsonResponse {
        $sanitized = $request->validated();
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
        $data = $request->validated();
        $order->update($data);
        return response()->json($order, 200);
    }

    /**
     * Remove the specified order from storage.
     *
     * @param DestroyClient $request
     * @param int $orderId
     * @return JsonResponse
     */
    public function destroy(DestroyOrder $request, int $orderId): JsonResponse {
        $order = Order::findOrFail($orderId);
        $order->delete();
        return response()->json(null, 204);
    }

    //TODO: implement me pls
    public function findOrder(){}
}
