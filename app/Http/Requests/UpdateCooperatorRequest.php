<?php

namespace App\Http\Requests;

use App\Rules\CpfCnpj;
use App\Rules\PhoneBR;
use Illuminate\Foundation\Http\FormRequest;

class UpdateCooperatorRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        $cooperatorId = $this->route('cooperator')->id;

        return [
            'name' => 'required|string|max:255',
            // cpf_cnpj não pode ser editado
            'birth_date' => 'required|date',
            'income' => 'required|numeric|min:0',
            'phone' => ['required', new PhoneBR],
            'email' => 'nullable|email',
        ];
    }
}
