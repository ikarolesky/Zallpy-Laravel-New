<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('cooperators', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('cpf_cnpj', 18)->unique();
            $table->date('birth_constitution_date');
            $table->decimal('income_revenue', 15, 2);
            $table->string('phone', 20);
            $table->string('email')->nullable();
            $table->softDeletes();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('cooperators');
    }
};
