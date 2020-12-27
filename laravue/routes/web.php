<?php

use App\Http\Controllers\taskController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

Route::get('/task', [taskController::class, 'index']);

Route::post('/task', [taskController::class, 'store']);

Route::get('/task/{task}/edit', [taskController::class, 'edit']);

Route::patch('/task/{task}/edit', [taskController::class, 'update']);

Route::delete('/task/{task}', [taskController::class, 'destroy']);






