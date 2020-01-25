<?php

namespace App\Http\Controllers\Api\v1;

use App\Http\Controllers\Controller;
use App\Http\Requests\Api\v1\Client\DestroyClient;
use App\Http\Requests\Api\v1\Client\StoreClient;
use App\Http\Requests\Api\v1\Client\UpdateClient;
use App\Http\Requests\Api\v1\Client\IndexClient;
use App\Models\Client;
use App\Services\Api\v1\PaginationService;
use Carbon\Carbon;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Log;

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

        $clientsCount = Client::count();

        $data = [
            'items' => $clients,
            'total' => $clients->count(),
            'perPage' => $paginationData['perPage'],
            'currentPage' => $paginationData['page'],
            'lastPage' => (int) ceil( $clientsCount / $paginationData['perPage']),
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
        $sanitized = $request->validated();
        $query = isset($sanitized['data']) ? $sanitized['data'] : '';
        $queryContidion = '(concat(first_name, last_name) ILIKE \'%' . $query . '%\' OR ' . 'phone ILIKE \'%' . $query . '%\')';
        $paginationData = app(PaginationService::class)->getPagination($request);

        $orders = Client::join('orders', 'orders.client_id', '=', 'clients.id')
            ->join('machines_and_procedures', 'machines_and_procedures.id', '=', 'orders.machine_id')
            ->where("end_time", "<", Carbon::now())
            ->whereRaw($queryContidion)
            ->orderByDesc("end_time")
            ->offset($paginationData['offset'])
            ->limit($paginationData['perPage'])
            ->get();

        $ordersCount =  Client::join('orders', 'orders.client_id', '=', 'clients.id')
            ->join('machines_and_procedures', 'machines_and_procedures.id', '=', 'orders.machine_id')
            ->where("end_time", "<", Carbon::now())
            ->whereRaw($queryContidion)
            ->count();

        $data = [
            'items' => $orders,
            'total' => $orders->count(),
            'perPage' => $paginationData['perPage'],
            'currentPage' => $paginationData['page'],
            'lastPage' => (int) ceil( $ordersCount / $paginationData['perPage']),
        ];

        return response()->json($data, 200);
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

        Log::info('Uloženie klienta do databázy: ', ['meno' => $sanitized['first_name'], 'priezvisko' => $sanitized['last_name']]);

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

        Log::info('Aktualizovanie klienta s id ' . $clientId);

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

        Log::info('Odstránenie klienta s id ' . $clientId);

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

        Log::info('Vyhľadanie klienta s kľúčom ' . $string);

        return response()->json($clients, 200);
    }
}
