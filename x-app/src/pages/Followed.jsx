import { Box, Typography, Button } from "@mui/material";

import PostCard from "../components/PostCard";

import { getFollowed, putLike, putUnlike } from "../libs/fetcher";
import { useEffect, useState } from "react";
import { useApp } from "../ThemedApp";
import { grey } from "@mui/material/colors";
import { useNavigate } from "react-router-dom";

export default function Followed() {
	const [posts, setPosts] = useState([]);
	const { auth } = useApp();

	const navigate = useNavigate();

	const like = _id => {
		const result = posts.map(post => {
			if (post._id === _id) {
				post.likes = [...post.likes, auth];
			}

			return post;
		});

		setPosts(result);
		putLike(_id);
	};

	const unlike = _id => {
		const result = posts.map(post => {
			if (post._id === _id) {
				post.likes = post.likes.filter(like => like._id !== auth._id);
			}

			return post;
		});

		setPosts(result);
		putUnlike(_id);
	};

	useEffect(() => {
		(async () => {
			const data = await getFollowed();
			if (!data) console.log("Fetch error");

			setPosts(data);
		})();
	}, []);

	return (
		<Box>
			<Box
				sx={{
					display: "flex",
					gap: 1,
					mb: 1,
					justifyContent: "center",
					alignItems: "center",
				}}>
				<Button
					size="small"
					onClick={() => navigate("/")}>
					Latest
				</Button>
				<Typography sx={{ color: grey[500] }}>|</Typography>
				<Button
					size="small"
					disabled>
					Followed
				</Button>
			</Box>
			{posts.map(post => (
				<PostCard
					key={post._id}
					post={post}
					like={like}
					unlike={unlike}
				/>
			))}
		</Box>
	);
}
