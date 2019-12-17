<?php

namespace App\Http\Controllers\Api\v1;

use App\Http\Controllers\Controller;
use App\Http\Requests\Api\v1\Client\DestroyClient;
use App\Http\Requests\Api\v1\Client\StoreClient;
use App\Http\Requests\Api\v1\Client\UpdateClient;
use App\Http\Requests\Api\v1\Client\IndexClient;
use App\Models\Client;
use App\Services\PaginationService;
use Carbon\Carbon;
use Illuminate\Http\JsonResponse;

class ClientsController extends Controller
{
    /**
     * Display data of all clients.
     *
     * @param IndexClient $request
     * @return JsonResponse
     */
    public function index(IndexClient $request): JsonResponse {
        $paginationData = app(PaginationService::class)->getPagination($request);

        $clients = Client::orderBy($paginationData['orderBy'], $paginationData['orderDirection'])
            ->offset($paginationData['offset'])
            ->limit($paginationData['perPage'])
            ->get();

        $data = [
            'items' => $clients,
            'total' => $clients->count(),
            'perPage' => $paginationData['perPage'],
            'currentPage' => $paginationData['page'],
            'lastPage' => $clients->count() / $paginationData['perPage'],
        ];

        return response()->json($data, 200);
    }

    /**
     * Display the clients history.
     *
     * @param IndexClient $request
     * @return JsonResponse
     */
    public function history(IndexClient $request): JsonResponse {
        $orders = Client::join('orders', 'orders.client_id', '=', 'clients.id')
            ->where("end_time", "<", Carbon::now())
            ->orderByDesc("end_time")
            ->get();

        return response()->json($orders, 200);
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
     * @return JsonResponse
     */
    public function findClient(String $string): JsonResponse {
        $clients = Client::where('first_name', 'ILIKE', '%' . $string . '%')
            ->orWhere('last_name', 'ILIKE', '%' . $string . '%')
            ->orWhere('phone', 'ILIKE', '%' . $string . '%')->get();

        return response()->json($clients, 200);
    }
}
