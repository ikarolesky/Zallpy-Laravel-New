<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use App\Rules\CpfCnpj;
use App\Rules\PhoneBR;
use Illuminate\Validation\Rule;


class CooperatorRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        $cooperator = $this->route('cooperator'); // pega o ID se for edição
        Rule::unique('cooperators', 'cpf_cnpj')
        ->ignore($cooperator?->id)
        ->whereNull('deleted_at');
        
        return [
            'name' => ['required', 'string', 'max:255'],
            'cpf_cnpj' => [
                'required',
                'string',
                Rule::unique('cooperators', 'cpf_cnpj')
                    ->ignore($cooperator?->id)
                    ->whereNull('deleted_at'), // ignora registros deletados
            ],
            'birth_constitution_date' => ['required', 'date'],
            'income_revenue' => ['required', 'numeric'],
            'phone' => ['required', 'string', new PhoneBR],
            'email' => ['nullable', 'email'],
        ];
    }
}
