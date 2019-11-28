<?php

namespace App\Http\Controllers\Api\v1;

use App\Http\Controllers\Controller;
use App\Http\Requests\DestroyClient;
use App\Http\Requests\IndexOrder;
use App\Http\Requests\StoreClient;
use App\Http\Requests\StoreOrder;
use App\Http\Requests\UpdateOrder;
use App\Models\Client;
use App\Models\Order;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Psy\Util\Json;

class OrdersController extends Controller
{
    /**
     * Display data of all orders.
     *
     * @param IndexOrder $request
     * @return Collection
     */
    public function index(IndexOrder $request) : Collection {
        return Order::all();
    }

    //TODO: implement me pls
    public function history(IndexOrder $request) : Response {
        return Response::create();
    }

    /**
     * Store a newly created order in storage.
     *
     * @param StoreOrder $request
     * @return JsonResponse
     */
    public function store(StoreOrder $request) : JsonResponse {
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
    public function update(UpdateOrder $request, int $orderId) : JsonResponse {
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
    public function destroy(DestroyClient $request, int $orderId) : JsonResponse {
        $order = Order::findOrFail($orderId);
        $order->delete();
        return response()->json(null, 204);
    }

    //TODO: implement me pls
    public function findOrder(){}
}
