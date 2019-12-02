<?php

use App\Models\Client;
use App\Models\MachinesAndProcedure;
use App\Models\Order;

/** @var  \Illuminate\Database\Eloquent\Factory $factory */
$factory->define(Client::class, static function (Faker\Generator $faker) {
    return [
        'first_name' =>$faker->firstName,
        'last_name' => $faker->lastName,
        'phone' => $faker->phoneNumber(),
        'active' => $faker->boolean(),
        'has_multisport_card' => $faker->boolean(),
        'is_gdpr' => $faker->boolean(),
        'note' => $faker->sentence,
        'created_at' => $faker->dateTime,
        'updated_at' => $faker->dateTime,
    ];
});

/** @var  \Illuminate\Database\Eloquent\Factory $factory */
$factory->define(MachinesAndProcedure::class, static function (Faker\Generator $faker) {
    return [
        'name' => $faker->sentence,
        'active' => $faker->boolean(),
        'is_for_multisport_card' => $faker->boolean(),
        'created_at' => $faker->dateTime,
        'updated_at' => $faker->dateTime,
    ];
});


/** @var  \Illuminate\Database\Eloquent\Factory $factory */
$factory->define(Order::class, static function (Faker\Generator $faker) {
    if (Client::count() > 0 && MachinesAndProcedure::count() > 0) {
        $client = Client::inRandomOrder()->first();
        $machinesAndProcedures = MachinesAndProcedure::inRandomOrder()->first();
    }

    return [
        'start_time' => $faker->dateTime,
        'end_time' => $faker->dateTime,
        'note' => $faker->sentence,
        'client_id' => isset($client) ? $client->id : null,
        'machine_id' => isset($machinesAndProcedures) ? $machinesAndProcedures->id : null,
        'created_at' => $faker->dateTime,
        'updated_at' => $faker->dateTime,
    ];
});
