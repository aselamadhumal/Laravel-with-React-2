<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\StudentController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');


// CRUD routes for students
Route::get('students', [StudentController::class, 'index']); // List all students
Route::post('students', [StudentController::class, 'store']); // Create a new student
Route::get('students/{id}', [StudentController::class, 'show']); // Show a specific student
Route::get('students/{id}/edit', [StudentController::class, 'edit']); // Update a student
Route::put('students/{id}/update', [StudentController::class, 'update']); // Update a
Route::delete('students/{id}/destroy', [StudentController::class, 'destroy']); // Delete a student