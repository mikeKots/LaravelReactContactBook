import {useEffect, useState} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {
    Box, Stack,
    Tab
} from '@mui/material';
import TabList from '@mui/lab/TabList';
import TabContext from '@mui/lab/TabContext';
import LoginForm from "./components/LoginForm.jsx";
import RegisterForm from "./components/RegisterForm.jsx";
import {alignItems} from "@mui/system";

export default function LoginRegister() {
    const [tabValue, setTabValue] = useState('0');
    const [form, setForm] = useState({
        name: '',
        email: '',
        password: '',
        password_confirmation: ''
    });
    const [message, setMessage] = useState('');
    const navigate = useNavigate();
    const apiUrl = import.meta.env.VITE_API_URL;
    const handleTabChange = (event, newValue) => {
        setTabValue(newValue);
    };

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            navigate('/contacts');
        }
    }, []);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleLoginSubmit = async (data) => {
        setMessage('');
        try {
            let response = await axios.post(
                    apiUrl + '/login',
                    {
                        email: data.email,
                        password: data.password
                    },
                    { withCredentials: true }
                );
            localStorage.setItem('token', response.data.token);
            setMessage('✅ Logged in successfully! Redirecting...');
            navigate('/contacts');
        } catch (err) {
            setMessage(err.response?.data?.message || 'Something went wrong.');
        }
    }

    const handleRegisterSubmit = async (data) => {
        setMessage('');
        try {
            let response = await axios.post( apiUrl + '/register', data);
                setMessage('✅ Registered successfully!');
                localStorage.setItem('token', response.data.token);
                navigate('/contacts');
        } catch (err) {
            setMessage(err.response?.data?.message || 'Something went wrong.');
        }
    }

    return (
        // Full viewport
        <Box sx={{ width: '100vw', height: '100vh' }}>
            <TabContext value={tabValue}>
                <Stack
                    direction="column"
                    justifyContent="center" // to center properly with full height
                    alignItems="center"
                    spacing={2}
                    sx={{ height: '100%' }} // fill 100% of 100vh
                >
                    <Stack direction="row">
                        <TabList
                            onChange={handleTabChange}
                            aria-label="Login/register tabs"
                        >
                            <Tab label="Login" value="0" />
                            <Tab label="Register" value="1" />
                        </TabList>
                    </Stack>

                    <Stack>
                        {tabValue === '0' ? (
                            <LoginForm onSubmit={handleLoginSubmit} />
                        ) : (
                            <RegisterForm onSubmit={handleRegisterSubmit} />
                        )}
                    </Stack>
                </Stack>
            </TabContext>
        </Box>
    );
}