<?php

namespace App\Http\Controllers;

use App\Models\Ssh;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;
use App\Services\SSHService;

class ConnectSSHController extends Controller
{
    /**
     * Display the user's profile form.
     */
    public function index(Request $request): Response
    {
        $ssh = $request->user()->ssh()->first();
        return Inertia::render('SSH/Index', [
            'ssh' => $ssh,
            'status' => session('status'),
        ]);
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

        try {
            $ssh = $request->user()->ssh;

            if(empty($ssh)) {
                $ssh = new Ssh();
                $validated['user_id'] = $request->user()->id;
            }

            $ssh->fill($validated)->save();

            $output = $this->connect($validated);

            return Redirect::route('ssh.connection')->withStatus($output);
        } catch (\Throwable $th) {
            return Redirect::route('ssh.connection')->withStatus($th->getMessage());
        }
    }

    public function connect($validated)
    {
        $ssh = new SSHService($validated['host'], $validated['username'], $validated['password']);

        // $output = $ssh->exec('ls'); // example command

        print_r('<pre>');
        echo $ssh->exec('ls -latr');die();

        // print_r('<pre>');
        // print_r($output);die();
        // return $output;
    }
}
