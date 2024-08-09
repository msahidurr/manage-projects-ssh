<?php

use App\Http\Controllers\WordpressSiteController;
use App\Http\Controllers\ConnectSSHController;
use App\Http\Controllers\ProfileController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::redirect('/', '/login');

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::get('/connect-ssh', [ConnectSSHController::class, 'index'])->name('ssh.connection');
    Route::post('/connect-ssh', [ConnectSSHController::class, 'store'])->name('ssh.connection');
    Route::resource('wordpress-sites', WordpressSiteController::class);
    Route::get('update-wp-core/{id}', [WordpressSiteController::class, 'updateWpCore'])->name('update-wp-core');
});

require __DIR__.'/auth.php';
