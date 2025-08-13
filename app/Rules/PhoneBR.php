<?php

namespace App\Rules;

use Closure;
use Illuminate\Contracts\Validation\ValidationRule;

class PhoneBR implements ValidationRule
{
    public function validate(string $attribute, mixed $value, Closure $fail): void
    {
        $clean = preg_replace('/\D/', '', (string)$value);

        if (!preg_match('/^(?:[1-9]{2})(?:9?[0-9]{8})$/', $clean)) {
            $fail('O telefone informado não é válido (use DDD + número, ex: 11987654321).');
        }
    }
}
