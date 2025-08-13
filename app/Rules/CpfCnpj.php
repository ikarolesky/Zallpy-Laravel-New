<?php

namespace App\Rules;

use Closure;
use Illuminate\Contracts\Validation\ValidationRule;

class CpfCnpj implements ValidationRule
{
    public function validate(string $attribute, mixed $value, Closure $fail): void
    {
        $number = preg_replace('/\D/', '', (string)$value);

        if (strlen($number) === 11) {
            if (! $this->validateCpf($number)) {
                $fail('O CPF informado é inválido.');
            }
            return;
        }

        if (strlen($number) === 14) {
            if (! $this->validateCnpj($number)) {
                $fail('O CNPJ informado é inválido.');
            }
            return;
        }

        $fail('O campo :attribute deve conter um CPF (11 dígitos) ou CNPJ (14 dígitos) válido.');
    }

    private function validateCpf(string $cpf): bool
    {
        if (preg_match('/(\d)\1{10}/', $cpf)) return false;

        for ($t = 9; $t < 11; $t++) {
            $d = 0;
            for ($c = 0; $c < $t; $c++) {
                $d += (int)$cpf[$c] * (($t + 1) - $c);
            }
            $d = ((10 * $d) % 11) % 10;
            if ((int)$cpf[$c] !== $d) return false;
        }
        return true;
    }

    private function validateCnpj(string $cnpj): bool
    {
        if (preg_match('/(\d)\1{13}/', $cnpj)) return false;

        $tamanho = strlen($cnpj) - 2;
        $numeros = substr($cnpj, 0, $tamanho);
        $digitos = substr($cnpj, $tamanho);
        $soma = 0;
        $pos = $tamanho - 7;
        for ($i = $tamanho; $i >= 1; $i--) {
            $soma += (int)$numeros[$tamanho - $i] * $pos--;
            if ($pos < 2) $pos = 9;
        }
        $resultado = ($soma % 11 < 2) ? 0 : 11 - ($soma % 11);
        if ($resultado != (int)$digitos[0]) return false;

        $tamanho++;
        $numeros = substr($cnpj, 0, $tamanho);
        $soma = 0;
        $pos = $tamanho - 7;
        for ($i = $tamanho; $i >= 1; $i--) {
            $soma += (int)$numeros[$tamanho - $i] * $pos--;
            if ($pos < 2) $pos = 9;
        }
        $resultado = ($soma % 11 < 2) ? 0 : 11 - ($soma % 11);
        return $resultado == (int)$digitos[1];
    }
}
