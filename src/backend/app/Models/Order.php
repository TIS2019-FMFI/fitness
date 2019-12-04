<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Order extends Model
{

    protected $fillable = [
        "note",
        "client_id",
        "machine_id",
        "start_time",
        "end_time",
    ];

    protected $dates = [
        "created_at",
        "updated_at",
    ];

    public function client() : BelongsTo {
        return $this->belongsTo(Client::class, 'client_id');
    }

    public function machinesAndProcedure(): BelongsTo {
        return $this->belongsTo(MachinesAndProcedure::class, 'machine_id');
    }
}
