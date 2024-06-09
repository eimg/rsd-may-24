import { Box, Button, OutlinedInput, Typography } from "@mui/material";

export default function Register() {
	return (
		<Box sx={{ textAlign: "center" }}>
			<Typography
				variant="h3"
				sx={{ mb: 3 }}>
				Register
			</Typography>
			<form>
				<OutlinedInput
					fullWidth
					placeholder="Full Name"
					sx={{ mb: 2 }}
				/>
				<OutlinedInput
					fullWidth
					placeholder="Username"
					sx={{ mb: 2 }}
				/>
				<OutlinedInput
					fullWidth
					placeholder="Bio"
					sx={{ mb: 2 }}
				/>
				<OutlinedInput
					fullWidth
					type="password"
					placeholder="Password"
					sx={{ mb: 2 }}
				/>

				<Button
					fullWidth
					variant="contained">
					Register
				</Button>
			</form>
		</Box>
	);
}
