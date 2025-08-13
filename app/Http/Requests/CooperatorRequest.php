<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use App\Rules\CpfCnpj;
use App\Rules\PhoneBR;

class CooperatorRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        $cooperator = $this->route('cooperator');

        $unique = 'unique:cooperators,cpf_cnpj';
        if ($cooperator) {
            $unique = 'unique:cooperators,cpf_cnpj,' . $cooperator->id . ',id,deleted_at,NULL';
        }

        return [
            'name' => ['required','string','max:255'],
            'cpf_cnpj' => ['required','string','max:18', new CpfCnpj(), $unique],
            'birth_constitution_date' => ['required','date'],
            'income_revenue' => ['required','numeric','min:0'],
            'phone' => ['required', new Phone()],
            'email' => ['nullable','email','max:255'],
        ];
    }
}
