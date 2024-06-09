import { Box, Button, OutlinedInput, Typography } from "@mui/material";

export default function Login() {
    return (
		<Box sx={{ textAlign: "center" }}>
			<Typography variant="h3" sx={{ mb: 3 }}>Login</Typography>
			<form>
				<OutlinedInput
					fullWidth
					placeholder="Username"
					sx={{ mb: 2 }}
				/>
				<OutlinedInput
					fullWidth
					type="password"
					placeholder="Password"
					sx={{ mb: 2 }}
				/>

				<Button fullWidth variant="contained">Login</Button>
			</form>
		</Box>
	);
}