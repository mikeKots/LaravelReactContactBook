import { useState, useEffect } from 'react';
import axios from 'axios';

const apiUrl = import.meta.env.VITE_API_URL;
const token = localStorage.getItem('token');
const api = axios.create({
    baseURL: apiUrl,
    headers: {
        Authorization: `Bearer ${token}`,
    },
    withCredentials: true
});

export const useUserData = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const initials = user?.name
        ? user.name
            .split(' ')
            .map(part => part[0])
            .join('')
            .toUpperCase()
        : null;

    const fetchUser = async () => {
        try {
            if (!token) throw new Error('No token found');

            const response = await api.get('/user', {});
            setUser(response.data);
            return response.data;
        } catch (err) {
            setError(err);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUser();
    }, []);



    return { user, loading, error, fetchUser, initials };
};