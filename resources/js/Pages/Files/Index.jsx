import React, { useRef } from 'react';
import {useForm, router, Head} from '@inertiajs/react';
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx";

export default function Index({ auth, files }) {
    const { data, setData, post, processing, reset } = useForm({ file: null });
    const fileInput = useRef();

    const handleUpload = (e) => {
        e.preventDefault();
        post(route('files.store'), {
            onSuccess: () => {
                reset();
                fileInput.current.value = null;
            }
        });
    };

    const handleDelete = (id) => {
        if (confirm('Delete this file?')) {
            router.delete(route('files.destroy', id));
        }
    };

    return (

        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                File Manager
            </h2>}
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-700 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            <h1 className="text-xl font-bold mb-4 dark:text-white">File Manager</h1>

                            <form onSubmit={handleUpload} className="mb-4">
                                <input type="file" ref={fileInput} className="dark:text-white" onChange={e => setData('file', e.target.files[0])} required />
                                <button type="submit" disabled={processing} className="ml-2 bg-green-700 hover:bg-green-600 text-white px-4 py-1 rounded">
                                    Upload
                                </button>
                            </form>

                            <div className="space-y-2">
                                {files.data.map(file => (
                                    <div key={file.id} className="flex items-center justify-between border p-2 border-gray-400 rounded">
                                        <div>
                                            <img className="h-48 w-96 object-cover"
                                                 src={`/storage/${file.path}`} />
                                        </div>
                                        <div>
                                            <a href={`/storage/${file.path}`} target="_blank" rel="noopener noreferrer" className="text-blue-200 underline">
                                                {file.original_name}
                                            </a>
                                            <div className="text-sm text-gray-100">{(file.size / 1024).toFixed(1)} KB</div>
                                        </div>
                                        <button onClick={() => handleDelete(file.id)} className="hover:bg-red-500 bg-red-600 text-white py-1 px-4 rounded">Delete</button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>


    );
}
