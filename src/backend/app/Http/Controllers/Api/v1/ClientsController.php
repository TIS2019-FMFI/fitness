<?php

namespace App\Http\Controllers\Api\v1;

use App\Http\Controllers\Controller;
use App\Http\Requests\DestroyClient;
use App\Http\Requests\EditClient;
use App\Http\Requests\IndexClient;
use App\Http\Requests\StoreClient;
use App\Http\Requests\UpdateClient;
use App\Models\Client;
use Illuminate\Http\Response;

class ClientsController extends Controller
{
    //TODO: implement me pls
    public function index(/*IndexClient $request*/) : Response{
        return Response::create();
    }

    //TODO: implement me pls
    public function create() : Response{
        return Response::create();
    }

    //TODO: implement me pls
    public function history(/*IndexClient $request*/) : Response{
        return Response::create();
    }

    //TODO: implement me pls
    public function store(/*StoreClient $request*/) : Response{
        return Response::create();
    }

    //TODO: implement me pls
    public function edit(/*EditClient $request, Client $client*/) : Response{
        return Response::create();
    }

    //TODO: implement me pls
    public function update(/*UpdateClient $request, Client $client*/) : Response{
        return Response::create();
    }

    //TODO: implement me pls
    public function destroy(/*DestroyClient $request, Client $client*/) : Response{
        return Response::create();
    }

    //TODO: implement me pls
    public function findClient($id) : Client{
        return Client::with()->find($id);
    }

}
