import { useState, useEffect } from "react";

import { Box, Typography } from "@mui/material";
import UserList from "../components/UserList";

import { fetchPost } from "../libs/fetcher";
import { useParams } from "react-router-dom";

export default function () {
	const { id } = useParams();

	const [users, setUsers] = useState([]);

	useEffect(() => {
		fetchPost(id).then(data => {
			setUsers(data.liked_users);
		});
	}, []);

	return (
		<Box>
			<Typography
				variant="h4"
				sx={{ textAlign: "center", mb: 2 }}>
				Likes
			</Typography>
			<UserList users={users} />
		</Box>
	);
}
