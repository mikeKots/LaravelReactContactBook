import {useEffect, useState} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {
    AppBar,
    Box,
    Button,
    Card,
    CardContent,
    Container,
    Link,
    Tab,
    Tabs,
    TextField,
    Toolbar,
    Typography
} from '@mui/material';

export default function LoginRegister() {
    const [isLogin, setIsLogin] = useState(true);
    const [tabValue, setTabValue] = useState(0);
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

    // Redirect to contact page if user already log in
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            navigate('/contacts');
        }
    }, []);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        try {
            let response;

            if (isLogin) {
                response = await axios.post(
                    apiUrl + '/login',
                    {
                        email: form.email,
                        password: form.password
                    },
                    { withCredentials: true }
                );
            } else {
                response = await axios.post( apiUrl + '/register', form);
                setMessage('✅ Registered successfully! Now you can log in.');
                setIsLogin(true);
                localStorage.setItem('token', response.data.token);
                setMessage('✅ Logged in successfully! Redirecting...');
                navigate('/contacts');
            }

            localStorage.setItem('token', response.data.token);
            setMessage('✅ Logged in successfully! Redirecting...');
            navigate('/contacts');
        } catch (err) {
            setMessage(err.response?.data?.message || 'Something went wrong.');
        }
    };

    return (
        <Box sx={{
            flexGrow: 1,
        }}>
            <AppBar position="static" color="default" elevation={0}>
                <Toolbar>
                    <Tabs
                        value={tabValue}
                        onChange={handleTabChange}
                        indicatorColor="primary"
                        textColor="primary"
                        variant="fullWidth"
                        centered
                    >
                        <Tab label="Login" />
                        <Tab label="Register" />
                    </Tabs>
                </Toolbar>
            </AppBar>

            <Container maxWidth="sm" sx={{ mt: 4 }}>
                <Card>
                    <CardContent>
                        <Typography fullWidth variant="h5" gutterBottom align="center">
                            {tabValue === 0 ? 'Login' : 'Register'}
                        </Typography>

                        <Box component="form" onSubmit={handleSubmit}>
                            {tabValue !== 0 && (
                                <TextField
                                    fullWidth
                                    label="Full Name"
                                    name="name"
                                    variant="outlined"
                                    placeholder="Jonh Doe"
                                    margin="normal"
                                    value={form.name}
                                    onChange={handleChange}
                                    required={tabValue !== 0}
                                />
                            )}

                            <TextField
                                fullWidth
                                label="Email"
                                name="email"
                                variant="outlined"
                                placeholder="example@example.com"
                                margin="normal"
                                value={form.email}
                                onChange={handleChange}
                                required
                            />

                            <TextField
                                fullWidth
                                label="Password"
                                type="password"
                                name="password"
                                variant="outlined"
                                margin="normal"
                                value={form.password}
                                onChange={handleChange}
                                required
                            />

                            {tabValue !== 0 && (
                                <TextField
                                    fullWidth
                                    label="Password confirmation"
                                    name="password_confirmation"
                                    type="password"
                                    variant="outlined"
                                    margin="normal"
                                    value={form.password_confirmation}
                                    onChange={handleChange}
                                    required={tabValue !== 0}
                                />
                            )}

                            <Button
                                fullWidth
                                type="submit"
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                {tabValue === 0 ? 'Login' : 'Register'}
                            </Button>
                        </Box>
                    </CardContent>
                </Card>
            </Container>
        </Box>
    );
}