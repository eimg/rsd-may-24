import { useState, useEffect } from "react";

import { Box, Typography } from "@mui/material";
import UserList from "../components/UserList";

import { fetchFollowing } from "../libs/fetcher";
import { useParams } from "react-router-dom";

export default function Following() {
	const { id } = useParams();

	const [users, setUsers] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		fetchFollowing(id).then(following => {
			setUsers(following);
			setLoading(false);
		});
	}, [id]);

	return (
		<Box>
			<Typography
				variant="h4"
				sx={{ textAlign: "center", mb: 2 }}>
				Following
			</Typography>
			{loading ? <Box>Loading...</Box> : <UserList users={users} />}
		</Box>
	);
}
