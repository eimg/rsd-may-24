import { Box } from "@mui/material";

import PostCard from "../components/PostCard";

import { getPosts } from "../libs/fetcher";
import { useEffect, useState } from "react";

export default function App() {
    const [posts, setPosts] = useState([]);
    useEffect(() => {
        (async () => {
            const data = await getPosts();
            if(!data) console.log("Fetch error");

            setPosts(data);
        })();
    }, []);

	return (
		<Box>
			{posts.map(post => <PostCard key={post._id} post={post} />)}
		</Box>
	);
}
