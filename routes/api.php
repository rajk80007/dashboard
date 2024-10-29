<?php

use App\Http\Controllers\InsightController;
use App\Models\Insight;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::get('/download', function () {
    return response([
        'status' => 'success',
    ]);
});

Route::get('/show', function () {
    $data = Insight::all();
    return response([
        'data' => $data,
        'status' => 'success',
    ]);
});

Route::post('/insert',[InsightController::class, 'insert']);

// Route::get('/insert', function (Request $request) {
//     Insight::create([
//         'title' => 'title1',
//         'start_year' => '2018',
//         'end_year' => '2019',
//         'city' => 'city1',
//         'country' => 'Country1',
//         'intensity' => '4',
//         'likelihood' => '5',
//         'relevance' => '6',
//         'topic' => 'topic1',
//         'region' => 'region1',
//         'sector' => 'sector1',
//         'source' => 'source1',
//         'url' => 'url1',
//         'pest' => 'pest1',
//         'swot' => 'swot1',
//     ]);
//     return response([
//         'status' => 'success',
//     ]);
// });

Route::get('/delete', function () {
    Insight::truncate();
    return response([
        'status' => 'success',
    ]);
});