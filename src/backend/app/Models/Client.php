<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Client extends Model
{

    protected $fillable = [
        "first_name",
        "last_name",
        "phone",
        "active",
        "has_multisport_card",
        "note",
        "is_gdpr",
    ];

    protected $dates = [
        "created_at",
        "updated_at",
    ];

    public function orders() : HasMany {
        return $this->hasMany(Order::class);
    }
}
