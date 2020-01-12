<?php

namespace App\Http\Controllers\Api\v1;

use App\Http\Controllers\Controller;
use App\Http\Requests\Api\v1\Availability\MachinesAndProceduresAvailability;
use App\Http\Requests\Api\v1\Availability\OrdersTimeAvailability;
use Illuminate\Http\JsonResponse;

class AvailabilityController extends Controller
{
    //to do
    public function ordersTime(OrdersTimeAvailability $request): JsonResponse {

        return response()->json(['public' => 'ordersTime', 200]);
    }

    //to do
    public function machinesAndProcedures(MachinesAndProceduresAvailability $request): JsonResponse {

        return response()->json(['public' => 'machinesAndProcedures', 200]);
    }
}
