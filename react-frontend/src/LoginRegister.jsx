import {useEffect, useState} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import api from "./api.js";

export default function LoginRegister() {
    const [isLogin, setIsLogin] = useState(true);
    const [form, setForm] = useState({
        name: '',
        email: '',
        password: '',
        password_confirmation: ''
    });
    const [message, setMessage] = useState('');
    const navigate = useNavigate();
    const apiUrl = import.meta.env.VITE_API_URL;

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
                response = await axios.post( apiUrl + 'register', form);
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
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 via-sky-100 to-blue-200 px-4">
            <div className="w-full max-w-md bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl p-8">
                <h2 className="text-3xl font-bold text-center text-gray-900 mb-8 drop-shadow-sm">
                    {isLogin ? 'Welcome Back' : 'Create Account'}
                </h2>

                {message && (
                    <div
                        className={`mb-4 text-center text-sm ${
                            message.startsWith('✅') ? 'text-green-600' : 'text-red-600'
                        }`}
                    >
                        {message}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    {!isLogin && (
                        <input
                            type="text"
                            name="name"
                            placeholder="Full Name"
                            value={form.name}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white/70 placeholder-gray-500 focus:ring-2 focus:ring-indigo-400 focus:outline-none"
                        />
                    )}
                    <input
                        type="email"
                        name="email"
                        placeholder="Email address"
                        value={form.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white/70 placeholder-gray-500 focus:ring-2 focus:ring-indigo-400 focus:outline-none"
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={form.password}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white/70 placeholder-gray-500 focus:ring-2 focus:ring-indigo-400 focus:outline-none"
                    />
                    {!isLogin && (
                        <input
                            type="password"
                            name="password_confirmation"
                            placeholder="Confirm Password"
                            value={form.password_confirmation}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white/70 placeholder-gray-500 focus:ring-2 focus:ring-indigo-400 focus:outline-none"
                        />
                    )}
                    <button
                        type="submit"
                        className="w-full py-3 bg-indigo-600 text-white rounded-lg shadow hover:bg-indigo-700 transition duration-300 font-semibold"
                    >
                        {isLogin ? 'Sign In' : 'Sign Up'}
                    </button>
                </form>

                <div className="mt-6 text-center">
                    <button
                        onClick={() => {
                            setIsLogin(!isLogin);
                            setMessage('');
                            setForm({
                                name: '',
                                email: '',
                                password: '',
                                password_confirmation: ''
                            });
                        }}
                        className="text-sm text-indigo-600 hover:underline transition"
                    >
                        {isLogin ? 'Need an account? Register' : 'Already have an account? Login'}
                    </button>
                </div>
            </div>
        </div>
    );
}
