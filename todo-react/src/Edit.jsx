import {
	Box,
	OutlinedInput,
	IconButton,
	InputAdornment,
	Typography,
} from "@mui/material";

import { lightBlue } from "@mui/material/colors";

import { Save as SaveIcon, ArrowBack as BackIcon } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";

const api = "http://localhost:8888/tasks";

export default function Edit() {
    const { id } = useParams();
    const [name, setName] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
        (async () => {
            const res = await fetch(`${api}/${id}`);
            const item = await res.json();
            setName(item.name);
        })();
    }, []);

	return (
		<Box
			maxWidth="md"
			sx={{
				margin: "auto",
				mt: 4,
				p: 4,
				borderRadius: 10,
				borderWidth: 1,
				borderStyle: "solid",
				borderColor: lightBlue[500],
			}}>

			<form onSubmit={e => {
                e.preventDefault();

                (async () => {
                    await fetch(`${api}/${id}`, {
                        method: 'PUT',
                        body: JSON.stringify({ name }),
                        headers: {
                            'Content-Type': 'application/json',
                        }
                    });

                    navigate("/");
                })();
            }}>
				<OutlinedInput
					fullWidth
                    onChange={e => setName(e.target.value)}
                    value={name}
					endAdornment={
						<InputAdornment position="end">
							<IconButton type="submit">
								<SaveIcon />
							</IconButton>
						</InputAdornment>
					}
				/>
			</form>
		</Box>
	);
}
