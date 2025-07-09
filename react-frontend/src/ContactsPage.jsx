import { useNavigate } from 'react-router-dom';
import TopContactsMenu from './components/TopContactsMenu';
import ContactsList from './components/ContactsList';
import {Box} from "@mui/material";
export default function ContactsPage() {
    const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    return (
        <Box>
            <TopContactsMenu handleLogout={handleLogout} />
            <Box>
                <ContactsList />
            </Box>
        </Box>
    );
}
