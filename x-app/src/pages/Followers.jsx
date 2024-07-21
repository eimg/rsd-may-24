import { useState, useEffect } from "react";

import { Box, Typography } from "@mui/material";
import UserList from "../components/UserList";

import { fetchFollowers } from "../libs/fetcher";
import { useParams } from "react-router-dom";

export default function Followers () {
	const { id } = useParams();

	const [users, setUsers] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		fetchFollowers(id).then(followers => {
			setUsers(followers);
			setLoading(false);
		});
	}, [id]);

	return (
		<Box>
			<Typography
				variant="h4"
				sx={{ textAlign: "center", mb: 2 }}>
				Followers
			</Typography>
			{loading ? <Box>Loading...</Box> : <UserList users={users} />}
		</Box>
	);
}
