<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreCooperatorRequest;
use App\Http\Requests\UpdateCooperatorRequest;
use App\Models\Cooperator;
use Illuminate\Http\Request;

class CooperatorController extends Controller
{
    public function index(Request $request)
    {
        $query = Cooperator::query()->whereNull('deleted_at');

        if ($request->filled('name')) {
            $query->where('name', 'like', "%{$request->name}%");
        }
        if ($request->filled('cpf_cnpj')) {
            $query->where('cpf_cnpj', $request->cpf_cnpj);
        }

        return response()->json($query->paginate(10));
    }

    public function store(CooperatorRequest $request)
    {
        $cooperator = Cooperator::create($request->validated());
        return response()->json($cooperator, 201);
    }

    public function show($id)
    {
        $cooperator = Cooperator::whereNull('deleted_at')->findOrFail($id);
        return response()->json($cooperator);
    }

    public function update(CooperatorRequest $request, $id)
    {
        $cooperator = Cooperator::whereNull('deleted_at')->findOrFail($id);
        $data = $request->validated();
        unset($data['cpf_cnpj']); // não pode editar CPF/CNPJ
        $cooperator->update($data);
        return response()->json($cooperator);
    }

    public function destroy($id)
    {
        $cooperator = Cooperator::whereNull('deleted_at')->findOrFail($id);
        $cooperator->update(['deleted_at' => now()]);
        return response()->json(['message' => 'Cooperado removido com sucesso (exclusão lógica)']);
    }
}
