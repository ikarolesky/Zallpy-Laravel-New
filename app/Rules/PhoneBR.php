<?php

namespace App\Rules;

use Illuminate\Contracts\Validation\Rule;

class PhoneBR implements Rule
{
    public function passes($attribute, $value)
    {
        // Remove tudo que não for número
        $digits = preg_replace('/\D/', '', $value);

        // Valida telefone fixo ou celular (10 ou 11 dígitos) com DDD válido (sem 00 ou 1x)
        if (preg_match('/^(?:[1-9]{2})(?:9?[0-9]{8})$/', $digits)) {
            return true;
        }

        return false;
    }

    public function message()
    {
        return 'O campo :attribute deve conter um telefone válido no padrão brasileiro.';
    }
}
