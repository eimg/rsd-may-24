import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Alert, Box, Button, OutlinedInput, Typography } from "@mui/material";

import { postRegister } from "../libs/fetcher";

import { useApp } from "../ThemedApp";

export default function Register() {
    const navigate = useNavigate();

    const { setToast } = useApp();

	const [hasErrors, setHasErrors] = useState(false);
	const nameRef = useRef();
	const usernameRef = useRef();
	const bioRef = useRef();
	const passwordRef = useRef();

	return (
		<Box sx={{ textAlign: "center" }}>
			<Typography
				variant="h3"
				sx={{ mb: 3 }}>
				Register
			</Typography>

			{hasErrors && (
				<Alert severity="warning">
					{hasErrors}
				</Alert>
			)}

			<form
				onSubmit={e => {
					e.preventDefault();

					const name = nameRef.current.value;
					const username = usernameRef.current.value;
					const bio = bioRef.current.value;
					const password = passwordRef.current.value;

					if (!name || !username || !password) {
						return setHasErrors("name, username and password required");
					}

					(async () => {
						const result = await postRegister({
							name,
							username,
							bio,
							password,
						});

                        if(result) {
                            setToast("Register success");
                            navigate("/login");
                        } else {
                            setHasErrors("Something went wrong");
                        }
					})();
				}}>
				<OutlinedInput
					inputRef={nameRef}
					fullWidth
					placeholder="Full Name"
					sx={{ mb: 2 }}
				/>
				<OutlinedInput
					inputRef={usernameRef}
					fullWidth
					placeholder="Username"
					sx={{ mb: 2 }}
				/>
				<OutlinedInput
					inputRef={bioRef}
					fullWidth
					placeholder="Bio"
					sx={{ mb: 2 }}
				/>
				<OutlinedInput
					inputRef={passwordRef}
					fullWidth
					type="password"
					placeholder="Password"
					sx={{ mb: 2 }}
				/>

				<Button
                    type="submit"
					fullWidth
					variant="contained">
					Register
				</Button>
			</form>
		</Box>
	);
}
