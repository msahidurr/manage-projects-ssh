import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, useForm } from '@inertiajs/react';
import InputLabel from '@/Components/InputLabel';

export default function Index({ auth, ssh, status = '' }) {

    const { data, setData, post, processing, errors } = useForm({
        host: ssh?.host ?? '',
        port: ssh?.port ?? '',
        username: ssh?.username ?? '',
        password: ssh?.password ?? '',
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('ssh.connection'));
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">SSH Connection</h2>}
        >
            <Head title="Dashboard" />

            <div className="content-header">
                <div className="container-fluid">
                    <div className="row mb-2">
                        <div className="col-sm-6">
                            <h1 className="m-0">SSH Connection</h1>
                        </div>
                        <div className="col-sm-6">
                            <ol className="breadcrumb float-sm-right">
                                <li className="breadcrumb-item"><a href="#">Home</a></li>
                                <li className="breadcrumb-item active">SSH Connection</li>
                            </ol>
                        </div>
                    </div>
                </div>
            </div>

            <div className='row'>
                <div className='col-md-8 offset-md-2'>
                    <div className="card card-primary">
                        <div className="card-header">
                            <h3 className="card-title">SSH Connection</h3>
                        </div>
                        <form onSubmit={submit}>
                            <div className="card-body">
                            {status && <div className="mb-4 font-medium text-sm text-green-600">{status}</div>}
                                <div className="form-group">
                                    <InputLabel htmlFor="host" value="Host" />
                                    <TextInput
                                        id="host"
                                        type="text"
                                        name="host"
                                        value={data.host}
                                        className="form-control"
                                        isFocused={true}
                                        onChange={(e) => setData('host', e.target.value)}
                                    />

                                    <InputError message={errors.host} className="mt-2" />
                                </div>

                                <div className="form-group">
                                    <InputLabel htmlFor="port" value="Port" />
                                    <TextInput
                                        id="port"
                                        type="text"
                                        name="port"
                                        value={data.port}
                                        className="form-control"
                                        isFocused={true}
                                        onChange={(e) => setData('port', e.target.value)}
                                    />

                                    <InputError message={errors.port} className="mt-2" />
                                </div>

                                <div className="form-group">
                                    <InputLabel htmlFor="username" value="Username" />
                                    <TextInput
                                        id="username"
                                        type="text"
                                        name="username"
                                        value={data.username}
                                        className="form-control"
                                        isFocused={true}
                                        onChange={(e) => setData('username', e.target.value)}
                                    />

                                    <InputError message={errors.username} className="mt-2" />
                                </div>

                                <div className="form-group">
                                    <InputLabel htmlFor="password" value="Password" />
                                    <TextInput
                                        id="password"
                                        type="password"
                                        name="password"
                                        value={data.password}
                                        className="form-control"
                                        isFocused={true}
                                        onChange={(e) => setData('password', e.target.value)}
                                    />

                                    <InputError message={errors.password} className="mt-2" />
                                </div>
                            </div>

                            <div className="card-footer">
                                <PrimaryButton className="btn btn-primary" disabled={processing}>
                                    Connect
                                </PrimaryButton>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            
        </AuthenticatedLayout>
    );
}
