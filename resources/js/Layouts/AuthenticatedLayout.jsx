import { Link } from '@inertiajs/react';
import Navbar from './Partials/Navbar';
import SideBar from './Partials/SideBar';

export default function Authenticated({ user, children }) {
    const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

    return (
        <div className="hold-transition sidebar-mini layout-fixed">
            <div className="wrapper">
                <Navbar user={user}></Navbar>

                <aside className="main-sidebar sidebar-dark-primary elevation-4">
                    <Link href="index3.html" className="brand-link">
                        <span className="brand-text font-weight-light">{ appName }</span>
                    </Link>

                    <SideBar></SideBar>
                </aside>

                <div className="content-wrapper">
                    <section className='content'>
                        <div className="container-fluid">
                            { children }
                        </div>
                    </section>
                </div>
            </div>            
        </div>
    );
}
