import { Box, Button, TextField } from "@mui/material";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { postPost } from "../libs/fetcher";
import { useApp } from "../ThemedApp";

export default function NewPost() {
	const bodyRef = useRef();
    const navigate = useNavigate();
    const { setToast } = useApp();

	return (
		<Box sx={{ textAlign: "right" }}>
			<form onSubmit={e => {
                e.preventDefault();
                const body = bodyRef.current.value;
                if(!body) return false;

                postPost(body).then(post => {
                    navigate("/");
                    setToast("New post added");
                });
            }}>
				<TextField
					inputRef={bodyRef}
					fullWidth
					multiline
					placeholder="New Post"
					sx={{ mb: 2 }}
				/>
				<Button type="submit" variant="contained">Add Post</Button>
			</form>
		</Box>
	);
}
