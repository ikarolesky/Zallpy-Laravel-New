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
        $query = Cooperator::query();

        if ($request->filled('search')) {
            $search = $request->input('search');
            $query->where('name', 'like', "%{$search}%")
                  ->orWhere('cpf_cnpj', 'like', "%{$search}%");
        }

        return response()->json($query->paginate(10));
    }

    public function store(StoreCooperatorRequest $request)
    {
        $data = $request->validated();
        $cooperator = Cooperator::create($data);
        return response()->json($cooperator, 201);
    }

    public function show(Cooperator $cooperator)
    {
        return response()->json($cooperator);
    }

    public function update(UpdateCooperatorRequest $request, Cooperator $cooperator)
    {
        $data = $request->validated();
        $cooperator->update($data);
        return response()->json($cooperator);
    }

    public function destroy(Cooperator $cooperator)
    {
        $cooperator->delete();
        return response()->json(null, 204);
    }
}
