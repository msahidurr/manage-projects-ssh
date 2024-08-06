import { Link } from '@inertiajs/react';

export default function Navbar({user}) {
    return <>
        <nav className="main-header navbar navbar-expand navbar-white navbar-light">
            <ul className="navbar-nav ml-auto">                
                <li className="nav-item dropdown">
                    <a className="nav-link" data-toggle="dropdown" href="#">
                        {user.name}
                    </a>
                    <div className="dropdown-menu dropdown-menu-lg dropdown-menu-right">
                        <div className='dropdown-item'>

                        <Link method="post" href={route('logout')}> Log Out </Link>
                        </div>
                    </div>
                </li>
            </ul>
        </nav>
    </>
}
