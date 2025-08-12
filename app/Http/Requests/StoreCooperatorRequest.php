<?php

namespace App\Http\Requests;

use App\Rules\CpfCnpj;
use App\Rules\PhoneBR;
use Illuminate\Foundation\Http\FormRequest;

class StoreCooperatorRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [
            'name' => 'required|string|max:255',
            'cpf_cnpj' => ['required', 'string', 'unique:cooperators,cpf_cnpj', new CpfCnpj],
            'birth_date' => 'required|date',
            'income' => 'required|numeric|min:0',
            'phone' => ['required', new PhoneBR],
            'email' => 'nullable|email',
        ];
    }
}
