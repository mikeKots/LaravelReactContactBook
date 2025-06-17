import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

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
                    'http://contact-book.local/api/login',
                    {
                        email: form.email,
                        password: form.password
                    },
                    { withCredentials: true }
                );
            } else {
                response = await axios.post('http://contact-book.local/api/register', form);
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
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-sky-100 to-indigo-200 px-4">
            <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
                <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
                    {isLogin ? 'Welcome Back' : 'Create Account'}
                </h2>

                {message && (
                    <div className="mb-4 text-center text-sm text-red-600">{message}</div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">
                    {!isLogin && (
                        <input
                            type="text"
                            name="name"
                            placeholder="Name"
                            value={form.name}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-400 focus:outline-none"
                        />
                    )}
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={form.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-400 focus:outline-none"
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={form.password}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-400 focus:outline-none"
                    />
                    {!isLogin && (
                        <input
                            type="password"
                            name="password_confirmation"
                            placeholder="Confirm Password"
                            value={form.password_confirmation}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-400 focus:outline-none"
                        />
                    )}
                    <button
                        type="submit"
                        className="w-full py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition duration-300"
                    >
                        {isLogin ? 'Login' : 'Register'}
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
                        className="text-sm text-indigo-600 hover:underline"
                    >
                        {isLogin
                            ? 'Need an account? Register'
                            : 'Already have an account? Login'}
                    </button>
                </div>
            </div>
        </div>
    );
}
