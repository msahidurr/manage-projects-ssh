import { Link } from '@inertiajs/react';

export default function Guest({ children }) {
    const appName = import.meta.env.VITE_APP_NAME || 'Laravel';
    return (
        <div className="hold-transition login-page">
            <div className="login-box">
                <div class="login-logo">
                    <Link>{ appName }</Link>
                </div>

                {children}
            </div>
        </div>
    );
}
