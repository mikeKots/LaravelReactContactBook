import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function ContactsPage() {
    const [contacts, setContacts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [form, setForm] = useState({ firstName: '', lastName: '', email: '', phone: '' });
    const [editingId, setEditingId] = useState(null);
    const navigate = useNavigate();

    const token = localStorage.getItem('token');

    const api = axios.create({
        baseURL: 'http://contact-book.local/api',
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    const fetchContacts = () => {
        api.get('/contacts')
            .then(res => {
                setContacts(res.data);
                setLoading(false);
            })
            .catch(() => {
                setError('Failed to load contacts.');
                setLoading(false);
            });
    };

    useEffect(() => {
        if (!token) {
            navigate('/login');
            return;
        }
        fetchContacts();
    }, []);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.firstName]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (editingId) {
            api.put(`/contacts/${editingId}`, form)
                .then(fetchContacts)
                .catch(() => alert('Update failed.'));
        } else {
            api.post('/contacts', form)
                .then(fetchContacts)
                .catch(() => alert('Create failed.'));
        }
        setForm({ firstName: '', lastName: '', email: '', phone: '' });
        setEditingId(null);
    };

    const handleEdit = (contact) => {
        setForm({
            firstName: contact.firstName,
            lastName: contact.lastName,
            email: contact.email,
            phone: contact.phone
        });
        setEditingId(contact.id);
    };

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this contact?')) {
            api.delete(`/contacts/${id}`)
                .then(fetchContacts)
                .catch(() => alert('Delete failed.'));
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="animate-spin rounded-full h-16 w-16 border-4 border-indigo-500 border-t-transparent"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex items-center bg-gray-50">
            <div className="max-w-xl w-full px-8">
                {/* Navbar */}
                <nav className="bg-indigo-600 text-white px-6 py-4 flex justify-between items-center shadow-md">
                    <h1 className="text-xl font-bold">📇 Contact Book</h1>
                    <button
                        onClick={handleLogout}
                        className="bg-white text-indigo-600 px-4 py-1 rounded hover:bg-indigo-100 transition"
                    >
                        Logout
                    </button>
                </nav>

                {/* Page content */}
                <div className="max-w-2xl mx-auto p-4">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-4">Manage Your Contacts</h2>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-3 mb-6">
                        <input
                            type="text"
                            name="firstName"
                            placeholder="First Name"
                            value={form.firstName}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 border rounded focus:ring-2 focus:ring-indigo-400"
                        />
                        <input
                            type="text"
                            name="lastName"
                            placeholder="Last Name"
                            value={form.lastName}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 border rounded focus:ring-2 focus:ring-indigo-400"
                        />
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={form.email}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border rounded focus:ring-2 focus:ring-indigo-400"
                        />
                        <input
                            type="text"
                            name="phone"
                            placeholder="Phone"
                            value={form.phone}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border rounded focus:ring-2 focus:ring-indigo-400"
                        />
                        <div className="flex gap-2">
                            <button
                                type="submit"
                                className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition"
                            >
                                {editingId ? 'Update' : 'Create'} Contact
                            </button>
                            {editingId && (
                                <button
                                    type="button"
                                    onClick={() => {
                                        setForm({ firstName: '', lastName: '', email: '', phone: '' });
                                        setEditingId(null);
                                    }}
                                    className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
                                >
                                    Cancel
                                </button>
                            )}
                        </div>
                    </form>

                    {/* Contacts List */}
                    {contacts.length === 0 ? (
                        <p className="text-gray-500 text-center">No contacts found.</p>
                    ) : (
                        <ul className="space-y-3">
                            {contacts.map(contact => (
                                <li
                                    key={contact.id}
                                    className="p-4 bg-white rounded shadow flex justify-between items-center"
                                >
                                    <div>
                                        <p className="font-semibold text-lg">{contact.firstName}</p>
                                        <p className="font-semibold text-lg">{contact.lastName}</p>
                                        <p className="text-gray-500 text-sm">{contact.email || 'No email'}</p>
                                        <p className="text-gray-500 text-sm">{contact.phone || 'No phone'}</p>
                                    </div>
                                    <div className="space-x-2">
                                        <button
                                            onClick={() => handleEdit(contact)}
                                            className="px-3 py-1 text-sm bg-yellow-400 text-white rounded hover:bg-yellow-500"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => handleDelete(contact.id)}
                                            className="px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>
        </div>
    );
}
