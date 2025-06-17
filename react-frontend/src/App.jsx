import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginRegister from './LoginRegister';
import ContactsPage from './ContactsPage';
import HomeRedirect from './components/HomeRedirect.jsx';

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<LoginRegister />} />
                <Route path="/contacts" element={<ContactsPage />} />
                <Route path="*" element={<HomeRedirect />} /> {/* default route */}
            </Routes>
        </BrowserRouter>
    );
}