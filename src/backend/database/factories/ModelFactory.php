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
        'created_at' => $faker->dateTimeBetween('+0 days', '+1 month'),
        'updated_at' => $faker->dateTimeBetween('+0 days', '+1 month'),
    ];
});

/** @var  \Illuminate\Database\Eloquent\Factory $factory */
$factory->define(MachinesAndProcedure::class, static function (Faker\Generator $faker) {
    return [
        'name' => $faker->sentence,
        'active' => $faker->boolean(),
        'is_for_multisport_card' => $faker->boolean(),
        'created_at' => $faker->dateTimeBetween('+0 days', '+1 month'),
        'updated_at' => $faker->dateTimeBetween('+0 days', '+1 month'),
    ];
});


/** @var  \Illuminate\Database\Eloquent\Factory $factory */
$factory->define(Order::class, static function (Faker\Generator $faker) {
    if (Client::count() > 0 && MachinesAndProcedure::count() > 0) {
        $client = Client::inRandomOrder()->first();
        $machinesAndProcedures = MachinesAndProcedure::inRandomOrder()->first();
    }

    $startTime = $faker->dateTimeBetween('+1 week', '+1 month');
    $endTime = $faker->dateTimeBetween($startTime, $startTime->format('Y-m-d H:i:s').' +45 minutes');

    return [
        'start_time' => $startTime,
        'end_time' => $endTime,
        'note' => $faker->sentence,
        'client_id' => isset($client) ? $client->id : null,
        'machine_id' => isset($machinesAndProcedures) ? $machinesAndProcedures->id : null,
        'created_at' => $faker->dateTimeBetween('+1 week', '+1 month'),
        'updated_at' => $faker->dateTimeBetween('+1 week', '+1 month'),
    ];
});
