<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCooperatorsTable extends Migration
{
    public function up()
    {
        Schema::create('cooperators', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('cpf_cnpj')->unique();
            $table->date('birth_date');
            $table->decimal('income', 15, 2);
            $table->string('phone');
            $table->string('email')->nullable();
            $table->softDeletes();
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('cooperators');
    }
}
