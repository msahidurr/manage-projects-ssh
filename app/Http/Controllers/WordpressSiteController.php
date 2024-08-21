<?php

namespace App\Http\Controllers;

use App\Models\WordpressSite;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use App\Services\SSHService;

class WordpressSiteController extends Controller
{
    public function index(Request $request): Response
    {
        $sitesItems = WordpressSite::where('user_id', $request->user()->id)->paginate();

        $mappedItems = $sitesItems->getCollection()->map(function ($item) {
            $item->update_available = !!$item->checkWpSiteUpdates();
            return $item;
        });

        $sites = $sitesItems->setCollection($mappedItems);

        return Inertia::render('WordpressSites/Index', [
            'sites' => $sites,
            'status' => session('status'),
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('WordpressSites/Create');
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'site_name' => 'required|string',
            'path' => 'required|string',
        ]);

        try {
            $wordpressSite = new WordpressSite();
            $wordpressSite->user_id = $request->user()->id;
            $wordpressSite->path = $validated['path'];
            $wordpressSite->site_name = $validated['site_name'];
            $wordpressSite->save();

            $sshData = Auth::user()->ssh;

            if($sshData) {
                $ssh = new SSHService($sshData['host'], $sshData['username'], $sshData['password']);
                 $ssh->createPath($validated['path']);
            }
            
            return Redirect::route('wordpress-sites.index')->withStatus('Successfully created.');
        } catch (\Throwable $th) {
            return Redirect::route('wordpress-sites.index')->withStatus($th->getMessage());
        }
    }

    public function edit($id)
    {
        $userId = Auth::user()->id;
        $wordpressSite = WordpressSite::where('user_id', $userId)->find($id);
        return Inertia::render('WordpressSites/Edit', ['site' => $wordpressSite]);
    }

    public function update(Request $request, $id): RedirectResponse
    {
        $validated = $request->validate([
            'path' => 'required|string',
            'site_name' => 'required|string',
        ]);

        try {
            $userId = Auth::user()->id;
            $wordpressSite = WordpressSite::where('user_id', $userId)->findOrFail($id);

            $oldPath = $wordpressSite->path;
            $newPath = $validated['path'];

            $wordpressSite->path = $newPath;
            $wordpressSite->site_name = $validated['site_name'];
            $wordpressSite->save();

            $sshData = Auth::user()->ssh;

            if($sshData) {
                $ssh = new SSHService($sshData['host'], $sshData['username'], $sshData['password']);
                 $ssh->renamePath($oldPath, $newPath);
            }

            return Redirect::route('wordpress-sites.index')->withStatus('Successfully updated.');
        } catch (\Throwable $th) {
            return Redirect::route('wordpress-sites.index')->withStatus($th->getMessage());
        }
    }

    public function destroy($id): RedirectResponse
    {
        try {
            $userId = Auth::user()->id;
            $wordpressSite = WordpressSite::where('user_id', $userId)->findOrFail($id);

            $wordpressSite->delete();
            return Redirect::route('wordpress-sites.index')->withStatus('Successfully deleted');
        } catch (\Throwable $th) {
            return Redirect::route('wordpress-sites.index')->withStatus($th->getMessage());
        }
    }

    public function updateWpCore($id): RedirectResponse
    {
        try {
            $userId = Auth::user()->id;
            $wordpressSite = WordpressSite::where('user_id', $userId)->findOrFail($id);
            $wordpressSite->checkWpSiteUpdates();

            return Redirect::route('wordpress-sites.index')->withStatus('Successfully updated wordpress');
        } catch (\Throwable $th) {
            return Redirect::route('wordpress-sites.index')->withStatus($th->getMessage());
        }
    }
}
