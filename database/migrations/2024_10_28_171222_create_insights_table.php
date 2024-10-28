<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('insights', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->integer('start_year');
            $table->integer('end_year');
            $table->string('city');
            $table->string('country');
            $table->float('intensity');
            $table->float('likelihood');
            $table->float('relevance');
            $table->string('topic');
            $table->string('region');
            $table->string('sector');
            $table->string('source');
            $table->string('url');
            $table->string('pest');
            $table->string('swot');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('insights');
    }
};
