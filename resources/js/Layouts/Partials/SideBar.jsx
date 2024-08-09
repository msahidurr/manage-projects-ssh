import { Link } from '@inertiajs/react';

export default function SideBar() {
    return <>
        <div className="sidebar">
            <nav className="mt-2">
                <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
                    <li className="nav-item">
                        <Link href={ route('ssh.connection') } className="nav-link">
                            <i className="nav-icon fas fa-th"></i>
                            <p> Connect Server </p>
                        </Link>
                    </li>

                    <li className="nav-item">
                        <Link href={ route('wordpress-sites.index') } className="nav-link">
                            <i className="nav-icon fas fa-th"></i>
                            <p>Wordpress Sites</p>
                        </Link>
                    </li>

                    <li className="nav-item">
                        <Link href={ route('nginx-logs.index') } className="nav-link">
                            <i className="nav-icon fas fa-th"></i>
                            <p>Nginx Logs</p>
                        </Link>
                    </li>
                </ul>
            </nav>
        </div>
    </>
}
