<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Cooperator extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'name',
        'cpf_cnpj',
        'birth_constitution_date',
        'income_revenue',
        'phone',
        'email',
    ];

    protected $casts = [
        'birth_constitution_date' => 'date',
    ];
}
