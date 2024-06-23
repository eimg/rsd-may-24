import { Box } from "@mui/material";

import PostCard from "../components/PostCard";

import { getPosts, putLike, putUnlike } from "../libs/fetcher";
import { useEffect, useState } from "react";
import { useApp } from "../ThemedApp";

export default function App() {
	const [posts, setPosts] = useState([]);
	const { auth } = useApp();

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
			const data = await getPosts();
			if (!data) console.log("Fetch error");

			setPosts(data);
		})();
	}, []);

	return (
		<Box>
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
