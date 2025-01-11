<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\StudentController;

// CRUD routes for students
Route::get('students', [StudentController::class, 'index']); // List all students
Route::post('students', [StudentController::class, 'store']); // Create a new student
Route::get('students/{id}', [StudentController::class, 'show']); // Show a specific student
Route::put('students/{id}', [StudentController::class, 'update']); // Update a student
Route::delete('students/{id}', [StudentController::class, 'destroy']); // Delete a student
