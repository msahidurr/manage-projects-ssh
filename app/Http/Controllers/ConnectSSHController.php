<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProfileUpdateRequest;
use App\Models\Ssh;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;

class ConnectSSHController extends Controller
{
    /**
     * Display the user's profile form.
     */
    public function index(Request $request): Response
    {
        $ssh = $request->user()->ssh()->first();
        return Inertia::render('SSH/Index', compact('ssh'));
    }

    /**
     * Display the user's profile form.
     */
    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'host' => ['required', 'string'],
            'port' => ['nullable', 'string'],
            'username' => ['required', 'string'],
            'password' => ['required', 'string'],
        ]);

        $ssh = $request->user()->ssh;

        if(empty($ssh)) {
            $ssh = new Ssh();
            $validated['user_id'] = $request->user()->id;
        }

        $ssh->fill($validated)->save();

        return Redirect::route('ssh.connection', [
            'status' => 'Connecting'
        ]);
    }
}
