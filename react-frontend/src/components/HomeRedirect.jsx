import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function HomeRedirect() {
    const navigate = useNavigate();
    const [checking, setChecking] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            // User is logged in — redirect to contacts
            navigate('/contacts', { replace: true });
        } else {
            // Not logged in — redirect to login or show landing page
            navigate('/login', { replace: true });
        }
    }, [navigate]);

    if (checking) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-sky-100">
                <div className="animate-spin rounded-full h-16 w-16 border-4 border-sky-500 border-t-transparent"></div>
            </div>
        );
    }

    return null;
}