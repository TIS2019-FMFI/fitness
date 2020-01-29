<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class MachinesAndProcedure extends Model
{
    use SoftDeletes;

    protected $fillable = [
        "name",
        "active",
        "is_for_multisport_card",
    ];

    protected $dates = [
        "created_at",
        "updated_at",
    ];

    public function orders() : HasMany {
        return $this->hasMany(Order::class);
    }
}
