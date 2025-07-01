import {Box, Button, TextField} from "@mui/material";
import {useState} from "react";


function LoginForm({ onSubmit }) {
    const [form, setForm] = useState({
        email: '',
        password: ''
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

            <Button
                fullWidth
                type="submit"
                variant="contained"
                sx={{ mt: 3, mb: 2 }}

            >
                Login
            </Button>
        </Box>
    )
}

export default LoginForm;