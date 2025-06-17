import { useAuth } from '../context/AuthContext';
import api from '../api';

function Navbar() {
    const { setUser } = useAuth();

    const handleLogout = async () => {
        try {
            await api.post('/logout');
            setUser(null);             // Clear user context
            window.location.href = '/login';  // Redirect to login page
        } catch (error) {
            alert('Logout failed');
        }
    };

    return (
        <nav>
            <button onClick={handleLogout}>Logout</button>
        </nav>
    );
}

export default Navbar;
