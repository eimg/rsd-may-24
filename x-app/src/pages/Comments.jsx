import { Box, Button, TextField } from "@mui/material";

import PostCard from "../components/PostCard";

import { fetchPost, postComment } from "../libs/fetcher";
import { useEffect, useRef, useState } from "react";
import { useApp } from "../ThemedApp";
import { useParams } from "react-router-dom";

export default function Comments() {
	const { id } = useParams();
	const [post, setPost] = useState({});
	const [isLoading, setIsLoading] = useState(true);

	const bodyRef = useRef();

	useEffect(() => {
		fetchPost(id).then(data => {
			setPost(data);
			setIsLoading(false);
		});
	}, []);

	return (
		<Box>
			{isLoading ? (
				<Box>Loading...</Box>
			) : (
				<>
					<PostCard
						primary
						post={post}
						like={() => {}}
						unlike={() => {}}
					/>

					{post.comments.map(comment => {
						return (
							<PostCard
								key={comment._id}
								post={comment}
								like={() => {}}
								unlike={() => {}}
							/>
						);
					})}

					<form onSubmit={e => {
                        e.preventDefault();
                        const body = bodyRef.current.value;
                        if(!body) return false;

                        postComment(body, post._id).then(data => {
                            post.comments.push(data);
                            setPost({ ...post });
                        });

                        e.currentTarget.reset();
                    }}>
						<TextField
							inputRef={bodyRef}
							fullWidth
							multiline
							sx={{ mb: 2 }}
						/>
						<Button
                            type="submit"
							fullWidth
							variant="contained">
							Reply
						</Button>
					</form>
				</>
			)}
		</Box>
	);
}
