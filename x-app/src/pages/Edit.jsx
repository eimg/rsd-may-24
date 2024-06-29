import {
	Box,
	Alert,
	Button,
	Typography,
	OutlinedInput,
	InputAdornment,
} from "@mui/material";

import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import {  useApp } from "../ThemedApp";

export default function EditUser() {
	const navigate = useNavigate();

	const { auth, setAuth } = useApp();

	const nameInput = useRef();
	const bioInput = useRef();
	const passwordInput = useRef();

	const [errMsg, setErrMsg] = useState("");
	const [hasError, setHasError] = useState(false);

	return (
		<Box>
			<Typography
				variant="h4"
				sx={{ textAlign: "center", mb: 3 }}>
				Edit Profile
			</Typography>

			{hasError && (
				<Alert
					severity="warning"
					sx={{ mb: 3 }}>
					{errMsg}
				</Alert>
			)}

			<form
				onSubmit={e => {
					e.preventDefault();

					setHasError(false);

					let name = nameInput.current.value;
					let bio = bioInput.current.value;
					let password = passwordInput.current.value;

					(async () => {
						if (!result) {
							setErrMsg("required: name and password");
							setHasError(true);
							return;
						}

						setAuthUser(result);
						navigate(`/profile/${auth._id}`);
					})();
				}}>
				<OutlinedInput
					required
					inputRef={nameInput}
					placeholder="Name"
					fullWidth={true}
					sx={{ mb: 2 }}
					defaultValue={auth.name}
				/>

				<OutlinedInput
					disabled
					placeholder="Username"
					fullWidth={true}
					inputProps={{ pattern: "[a-zA-Z0-9_]+" }}
					sx={{ mb: 2 }}
					defaultValue={auth.username}
				/>

				<OutlinedInput
					multiline
					minRows={2}
					inputRef={bioInput}
					placeholder="Bio (optional)"
					fullWidth={true}
					sx={{ mb: 2 }}
					defaultValue={auth.bio}
				/>

				<OutlinedInput
					inputRef={passwordInput}
					placeholder="Password (leave blank to unchange)"
					fullWidth={true}
					inputProps={{ type: "password" }}
					sx={{ mb: 3 }}
				/>

				<Button
					color="info"
					type="submit"
					fullWidth={true}
					variant="contained">
					Update
				</Button>
			</form>
		</Box>
	);
}
