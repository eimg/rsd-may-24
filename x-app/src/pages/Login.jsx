import { Box, Button, OutlinedInput, Typography, Alert } from "@mui/material";

import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useApp } from "../ThemedApp";
import { fetchVerify, postLogin } from "../libs/fetcher";

export default function Login() {
    const navigate = useNavigate();
    const { setAuth } = useApp();

    const usernameRef = useRef();
    const passwordRef = useRef();

    const [hasError, setHasError] = useState("");

    return (
		<Box sx={{ textAlign: "center" }}>
			<Typography variant="h3" sx={{ mb: 3 }}>Login</Typography>

            {hasError && <Alert severity="warning" sx={{ mb: 4 }}>{hasError}</Alert>}

			<form onSubmit={e => {
                e.preventDefault();

                const username = usernameRef.current.value;
                const password = passwordRef.current.value;
                if(!username || !password) {
                    setHasError("Username and Password required");
                    return false;
                }

                (async () => {
                    const token = await postLogin(username, password);
                    if(token) {
                        localStorage.setItem("token", token);
                        setAuth(await fetchVerify());
                        navigate("/");
                    } else {
                        setHasError("Incorrect username or password");
                    }
                })();
            }}>
				<OutlinedInput
                    inputRef={usernameRef}
					fullWidth
					placeholder="Username"
					sx={{ mb: 2 }}
				/>
				<OutlinedInput
                    inputRef={passwordRef}
					fullWidth
					type="password"
					placeholder="Password"
					sx={{ mb: 2 }}
				/>

				<Button type="submit" fullWidth variant="contained">Login</Button>
			</form>
		</Box>
	);
}