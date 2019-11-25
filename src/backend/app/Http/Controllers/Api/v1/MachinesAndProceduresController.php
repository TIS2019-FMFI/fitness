<?php

namespace App\Http\Controllers\Api\v1;

use App\Http\Controllers\Controller;
use App\Http\Requests\Api\v1\MachinesAndProcedures\DestroyMachinesAndProcedure;
use App\Http\Requests\Api\v1\MachinesAndProcedures\IndexMachinesAndProcedure;
use App\Http\Requests\Api\v1\MachinesAndProcedures\ShowMachinesAndProcedure;
use App\Http\Requests\Api\v1\MachinesAndProcedures\StoreMachinesAndProcedure;
use App\Http\Requests\Api\v1\MachinesAndProcedures\UpdateMachinesAndProcedure;


class MachinesAndProceduresController extends Controller
{

    public function index(IndexMachinesAndProcedure $request) {

    }

    public function showHistory(IndexMachinesAndProcedure $request) {

    }

    public function store(StoreMachinesAndProcedure $request) {

    }

    //TODO implement me pls
    public function show() {}

    public function update(UpdateMachinesAndProcedure $request) {

    }

    public function destroy(DestroyMachinesAndProcedure $request) {

    }
}
