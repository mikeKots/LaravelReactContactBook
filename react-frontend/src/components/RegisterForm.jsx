import {Box, Button, TextField} from "@mui/material";


function RegisterForm(props) {
    return (
        <Box component="form">
            <TextField
                fullWidth
                label="Full Name"
                name="name"
                variant="outlined"
                placeholder="Jonh Doe"
                margin="normal"
                value={props.form.name}
                onChange={props.handleChange}
                required
            />

            <TextField
                fullWidth
                label="Email"
                name="email"
                variant="outlined"
                placeholder="example@example.com"
                margin="normal"
                value={props.form.email}
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
                value={props.form.password}
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
                value={props.form.password_confirmation}
                onChange={props.handleChange}
                required
            />

            <Button
                fullWidth
                type="submit"
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
            >
                'Register'
            </Button>
        </Box>
    )
}
export default RegisterForm;