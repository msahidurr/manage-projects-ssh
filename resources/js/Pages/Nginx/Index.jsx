import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, useForm } from '@inertiajs/react';
import InputLabel from '@/Components/InputLabel';

export default function Index({ auth, }) {

    const { data, setData, get, processing, errors } = useForm({
        start_date: '',
        end_date: '',
    });

    const submit = (e) => {
        e.preventDefault();

        get(route('nginx-logs.show', data));
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Nginx Logs</h2>}
        >
            <Head title="Nginx Logs" />

            <div className="content-header">
                <div className="container-fluid">
                    <div className="row mb-2">
                        <div className="col-sm-6">
                            <h1 className="m-0">Nginx Logs</h1>
                        </div>
                        <div className="col-sm-6">
                            <ol className="breadcrumb float-sm-right">
                                <li className="breadcrumb-item"><a href="#">Home</a></li>
                                <li className="breadcrumb-item active">Nginx Logs</li>
                            </ol>
                        </div>
                    </div>
                </div>
            </div>

            <div className='row'>
                <div className='col-md-8 offset-md-2'>
                    <div className="card card-primary">
                        <div className="card-header">
                            <h3 className="card-title">Nginx Logs</h3>
                        </div>
                        <form onSubmit={submit}>
                            <div className="card-body">
                                <div className="form-group">
                                    <InputLabel htmlFor="start_date" value="Start Date" />
                                    <TextInput
                                        id="start_date"
                                        type="date"
                                        name="start_date"
                                        value={data.start_date}
                                        className="form-control"
                                        isFocused={true}
                                        onChange={(e) => setData('start_date', e.target.value)}
                                    />

                                    <InputError message={errors.start_date} className="mt-2" />
                                </div>

                                <div className="form-group">
                                    <InputLabel htmlFor="end_date" value="End Date" />
                                    <TextInput
                                        id="end_date"
                                        type="date"
                                        name="end_date"
                                        value={data.end_date}
                                        className="form-control"
                                        isFocused={true}
                                        onChange={(e) => setData('end_date', e.target.value)}
                                    />

                                    <InputError message={errors.end_date} className="mt-2" />
                                </div>
                            </div>
                                
                            <div className="card-footer">
                                <PrimaryButton className="btn btn-primary" disabled={processing}>
                                    Search
                                </PrimaryButton>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            
        </AuthenticatedLayout>
    );
}
