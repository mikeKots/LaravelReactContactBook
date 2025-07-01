import {Box, Button, TextField} from "@mui/material";
import {useState} from "react";


function RegisterForm({onSubmit}) {
    const [form, setForm] = useState({
        name: '',
        email: '',
        password: '',
        password_confirmation: ''
    });
    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(form);
    };
    return (
        <Box component="form" onSubmit={handleSubmit}>
            <TextField
                fullWidth
                label="Full Name"
                name="name"
                variant="outlined"
                placeholder="Jonh Doe"
                margin="normal"
                value={form.name}
                onChange={handleChange}
                required
            />

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

            <TextField
                fullWidth
                label="Password confirmation"
                name="password_confirmation"
                type="password"
                variant="outlined"
                margin="normal"
                value={form.password_confirmation}
                onChange={handleChange}
                required
            />

            <Button
                fullWidth
                type="submit"
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
            >
                Register
            </Button>
        </Box>
    )
}
export default RegisterForm;