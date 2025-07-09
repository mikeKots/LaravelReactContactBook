import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import {
    Box,
    Button,
    CircularProgress,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField
} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import {Add, Delete, Edit} from "@mui/icons-material";

export default function AlignItemsList() {
    const [contacts, setContacts] = useState([]);
    const [form, setForm] = useState({ firstName: '', lastName: '', email: '', phone: '' });
    const [editingId, setEditingId] = useState(null);
    const navigate = useNavigate();
    const [avatarFile, setAvatarFile] = useState(null);
    const [previewAvatar, setPreviewAvatar] = useState('');
    const [loading, setLoading] = useState(true);
    const [openDialog, setOpenDialog] = useState(false);
    const [currentContact, setCurrentContact] = useState(null);

    const token = localStorage.getItem('token');
    const apiUrl = import.meta.env.VITE_API_URL;
    const api = axios.create({
        baseURL: apiUrl,
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
                console.error('Failed to load contacts.');
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

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
    };

    // handle create/update contact
    const handleOpenDialog = (contact = null) => {
        setCurrentContact(contact);
        if (contact) {
            setForm({
                firstName: contact.firstName,
                lastName: contact.lastName,
                email: contact.email,
                phone: contact.phone || '',
            });
            // will be implemented
            setPreviewAvatar(contact.avatar || '');
        } else {
            setForm({ firstName: '', lastName: '', email: '', phone: '' });
            setPreviewAvatar('');
        }
        setOpenDialog(true);
    };

    const handleAvatarChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setAvatarFile(file);
            setPreviewAvatar(URL.createObjectURL(file));
        }
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
        // reload contacts list
        fetchContacts();
        setOpenDialog(false);
    };

    const getInitials = (contact) => {
        if (!contact.firstName && !contact.lastName) return '';
        return contact.firstName[0] + contact.lastName[0];
    };

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this contact?')) {
            api.delete(`/contacts/${id}`)
                .then(fetchContacts)
                .catch(() => alert('Delete failed.'));
        }
    };

    if (loading) return <CircularProgress />;

    return (
        <Box sx={{ width: '100%' }}>
            <Button
                variant="contained"
                startIcon={<Add />}
                onClick={() => handleOpenDialog()}
                sx={{ mb: 2 }}
            >
                Add Contact
            </Button>

            <List sx={{ bgcolor: 'background.paper' }}>
                {contacts.map((contact) => (
                    <React.Fragment key={contact.id}>
                        <ListItem alignItems="flex-start" secondaryAction={
                            <Box>
                                <IconButton onClick={() => handleOpenDialog(contact)}>
                                    <Edit />
                                </IconButton>
                                <IconButton onClick={() => handleDelete(contact.id)}>
                                    <Delete />
                                </IconButton>
                            </Box>
                        }>
                            <ListItemAvatar>
                                <Avatar
                                    alt={contact.name}
                                    src={contact.avatar}
                                    sx={{ bgcolor: '#3f51b5' }}
                                >
                                    {!contact.avatar && getInitials(contact)}
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText sx={{ color: 'black' }}
                                primary={contact.firstName + ' ' + contact.lastName}
                                secondary={
                                    <React.Fragment>
                                        <Typography
                                            component="span"
                                            variant="body2"
                                            sx={{ color: 'text.primary', display: 'block' }}
                                        >
                                            {contact.email}
                                        </Typography>
                                        {contact.phone}
                                    </React.Fragment>
                                }
                            />
                        </ListItem>
                        <Divider variant="inset" component="li" />
                    </React.Fragment>
                ))}
            </List>

            <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
                <DialogTitle>
                    {currentContact ? 'Edit Contact' : 'Create New Contact'}
                </DialogTitle>
                <DialogContent>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 2 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                            <Avatar
                                src={previewAvatar}
                                sx={{ width: 64, height: 64, bgcolor: '#3f51b5' }}
                            >
                                {!previewAvatar && getInitials(form)}
                            </Avatar>
                            <Button variant="contained" component="label">
                                Upload Photo
                                <input
                                    type="file"
                                    hidden
                                    accept="image/*"
                                    onChange={handleAvatarChange}
                                />
                            </Button>
                        </Box>

                        <TextField
                            name="firstName"
                            label="Name"
                            value={form.firstName}
                            onChange={handleInputChange}
                            fullWidth
                        />
                        <TextField
                            name="lastName"
                            label="Name"
                            value={form.lastName}
                            onChange={handleInputChange}
                            fullWidth
                        />
                        <TextField
                            name="email"
                            label="Email"
                            value={form.email}
                            onChange={handleInputChange}
                            fullWidth
                        />
                        <TextField
                            name="phone"
                            label="Phone"
                            value={form.phone}
                            onChange={handleInputChange}
                            fullWidth
                        />
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
                    <Button onClick={handleSubmit} variant="contained">
                        {currentContact ? 'Update' : 'Create'}
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}