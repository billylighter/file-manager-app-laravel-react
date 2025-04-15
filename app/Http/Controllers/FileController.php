<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use App\Models\File;

class FileController extends Controller
{
    public function index()
    {
        return inertia('Files/Index', [
            'files' => File::latest()->paginate(10),
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'file' => 'required|file|max:10240',
        ]);

        $uploadedFile = $request->file('file');
        $path = $uploadedFile->store('uploads', 'public');

        $file = File::create([
            'original_name' => $uploadedFile->getClientOriginalName(),
            'path' => $path,
            'mime_type' => $uploadedFile->getClientMimeType(),
            'size' => $uploadedFile->getSize(),
            'user_id' => auth()->id(),
        ]);

        return redirect()->back()->with('success', 'File uploaded.');
    }

    public function destroy(File $file)
    {
        Storage::delete($file->path);
        $file->delete();

        return redirect()->back()->with('success', 'File deleted.');
    }
}
