<?php

namespace App\Http\Controllers\Api\v1;

use App\Http\Controllers\Controller;
use App\Http\Requests\Api\v1\Client\DestroyClient;
use App\Http\Requests\Api\v1\Client\StoreClient;
use App\Http\Requests\Api\v1\Client\UpdateClient;
use App\Http\Requests\Api\v1\Client\IndexClient;
use App\Models\Client;
use App\Models\Order;
use Carbon\Carbon;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\DB;

class ClientsController extends Controller
{
    /**
     * Display data of all clients.
     *
     * @param IndexClient $request
     * @return Collection
     */
    public function index(IndexClient $request): Collection {
        return Client::all();
    }

    /**
     * Display the clients history.
     *
     * @param IndexClient $request
     * @return void
     */
    public function history(IndexClient $request): Collection {
        $orders =  Client::join('orders', 'orders.client_id', '=', 'clients.id')
            ->where("end_time", "<", Carbon::now())
            ->orderByDesc("end_time")
            ->get();
        return $orders;
    }

    /**
     * Store a newly created client in storage.
     *
     * @param StoreClient $request
     * @return JsonResponse
     */
    public function store(StoreClient $request): JsonResponse {
        $sanitized = $request->validated();
        $client = Client::create($sanitized);
        return response()->json($client, 201);
    }

    /**
     * Update the specified client in storage.
     *
     * @param UpdateClient $request
     * @param int $clientId
     * @return JsonResponse
     */
    public function update(UpdateClient $request, int $clientId): JsonResponse {
        $client = Client::findOrFail($clientId);
        $data = $request->validated();
        $client->update($data);
        return response()->json($client, 200);
    }

    /**
     * Remove the specified client from storage.
     *
     * @param DestroyClient $request
     * @param int $clientId
     * @return JsonResponse
     */
    public function destroy(DestroyClient $request, int $clientId): JsonResponse {
        $client = Client::findOrFail($clientId);
        $client->delete();
        return response()->json(null, 204);
    }

    /**
     * Display the specified client.
     *
     * @param String $string
     * @return Collection
     */
    public function findClient(String $string): Collection {
        $clients = Client::where('first_name', 'ILIKE', '%' . $string . '%')
            ->orWhere('last_name', 'ILIKE', '%' . $string . '%')
            ->orWhere('phone', 'ILIKE', '%' . $string . '%')->get();
        return $clients;
    }
}
