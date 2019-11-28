<?php

namespace App\Http\Controllers\Api\v1;

use App\Http\Controllers\Controller;
use App\Http\Requests\DestroyClient;
use App\Http\Requests\IndexClient;
use App\Http\Requests\StoreClient;
use App\Http\Requests\UpdateClient;
use App\Models\Client;
use Illuminate\Http\Response;
use Illuminate\Support\Collection;

class ClientsController extends Controller
{
    /**
     * Display data of all clients.
     *
     * @param IndexClient $request
     * @return Collection
     */
    public function index(IndexClient $request) : Collection {
        return Client::all();
    }

    //TODO: implement me pls
    public function history(IndexClient $request) : Response {
        return Response::create();
    }

    /**
     * Store a newly created client in storage.
     *
     * @param StoreClient $request
     * @return JsonResponse
     */
    public function store(StoreClient $request) : JsonResponse {
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
    public function update(UpdateClient $request, int $clientId) : JsonResponse {
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
    public function destroy(DestroyClient $request, int $clientId) : JsonResponse {
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
    public function findClient(String $string) : JsonResponse {
        $clients = Client::where('first_name', 'ILIKE', '%' . $string . '%')
            ->orWhere('last_name', 'ILIKE', '%' . $string . '%')
            ->orWhere('phone', 'ILIKE', '%' . $string . '%');
        return response()->json($clients);
    }

}
