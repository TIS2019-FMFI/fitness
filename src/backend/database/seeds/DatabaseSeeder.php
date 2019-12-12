<?php

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        factory(\App\Models\Client::class, 35)->create();
        factory(\App\Models\MachinesAndProcedure::class, 5)->create();
        factory(\App\Models\Order::class, 10)->create();
    }
}
