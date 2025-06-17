import React, { createContext, useState, useContext } from 'react';
import api, { setAuthToken } from '../api';

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem('token'));

    if (token) setAuthToken(token);

    const login = async (email, password) => {
        const res = await api.post('/login', { email, password });
        setToken(res.data.access_token);
        localStorage.setItem('token', res.data.access_token);
        setAuthToken(res.data.access_token);
        setUser(res.data.user);
    };

    const logout = async () => {
        await api.post('/logout');
        setUser(null);
        setToken(null);
        localStorage.removeItem('token');
        setAuthToken(null);
    };

    return (
        <AuthContext.Provider value={{ user, token, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);
