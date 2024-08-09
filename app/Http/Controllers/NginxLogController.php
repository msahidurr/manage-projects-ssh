<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Facades\Auth;
use App\Services\SSHService;

class NginxLogController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Nginx/Index', [
            'status' => session('status'),
        ]);
    }

    public function show(Request $request): Response
    {
        $validated = $request->validate([
            'start_date' => 'required|date',
            'end_date' => 'required|date',
        ]);

        $sshData = Auth::user()->ssh;

        if($sshData) {
            $ssh = new SSHService($sshData['host'], $sshData['username'], $sshData['password']);
            $output = $ssh->getNgnixLog($validated['start_date'], $validated['end_date']);
            
            print_r('<pre>');
            echo $output;die();
        }

        return Inertia::render('Nginx/Index', [
            'status' => session('status'),
            'request' => $request->all(),
        ]);
    }
}
