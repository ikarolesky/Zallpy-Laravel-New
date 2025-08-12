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
        'birth_date',
        'income',
        'phone',
        'email',
    ];

    protected $dates = [
        'birth_date',
        'deleted_at',
    ];
}
