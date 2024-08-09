import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

export default function Index({ auth, sites, status }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Wordpress Sites</h2>}
        >
            <Head title="Wordpress Sites" />

            <div className="content-header">
                <div className="container-fluid">
                    <div className="row mb-2">
                        <div className="col-sm-6">
                            <h1 className="m-0">Wordpress Sites</h1>
                        </div>
                        <div className="col-sm-6">
                            <ol className="breadcrumb float-sm-right">
                                <li className="breadcrumb-item"><a href="#">Home</a></li>
                                <li className="breadcrumb-item active">Wordpress Sites</li>
                            </ol>
                        </div>
                    </div>
                </div>
            </div>

            

            <div className="row">
                <div className="col-12">
                    <Link href="/wordpress-sites/create" as='button' className='btn btn-primary mb-3'>Add New Site</Link>

                    {status && <div class="alert alert-success" role="alert">{status}</div>}

                    <div className="card">
                        <div className="card-body table-responsive p-0">
                            <table className="table table-hover text-nowrap">
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Site Name</th>
                                        <th>Path</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {sites.data.map(({ id, site_name, path }) => (
                                        <tr key={id}>
                                            <td>{id}</td>
                                            <td>{site_name}</td>
                                            <td>{path}</td>
                                            <td>
                                                <Link href={route('wordpress-sites.edit', id)} className='btn btn-success'>Edit</Link>

                                                <Link href={route('update-wp-core', id)} className='btn btn-primary ml-2'>Update wp</Link>
                                            </td>
                                        </tr>
                                    ))}
                                    {sites.data.length <= 0 && (
                                        <tr>
                                            <td colSpan='4' className='text-center'> no data found.</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>

                            <div className="py-10 text-right">
                                {
                                    sites.links.map(link => (
                                        link.url ?

                                            <Link
                                                className={`p-1 mx-1 ${link.active ? 'font-bold text-blue-400 underline' : ''}`}
                                                key={link.label} href={link.url} dangerouslySetInnerHTML={{ __html: link.label }} />
                                            :

                                            <span
                                                className="cursor-not-allowed text-gray-300"
                                                key={link.label} dangerouslySetInnerHTML={{ __html: link.label }}>
                                            </span>
                                    ))
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
