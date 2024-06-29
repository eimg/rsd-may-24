import { Box, Button, TextField } from "@mui/material";

import PostCard from "../components/PostCard";

import { fetchPost, postComment, putLike, putUnlike } from "../libs/fetcher";
import { useEffect, useRef, useState } from "react";
import { useApp } from "../ThemedApp";
import { useParams } from "react-router-dom";

export default function Comments() {
	const { id } = useParams();

	const [post, setPost] = useState({});
	const [isLoading, setIsLoading] = useState(true);

	const { auth } = useApp();

	const bodyRef = useRef();

	useEffect(() => {
		fetchPost(id).then(data => {
			setPost(data);
			setIsLoading(false);
		});
	}, [id]);

	const like = _id => {
		post.likes = [...post.likes, auth];
		setPost({ ...post });
		putLike(_id);
	};

	const commentLike = _id => {
		post.comments = post.comments.map(comment => {
			if (comment._id === _id) {
				comment.likes = [...comment.likes, auth];
			}

			return comment;
		});

		setPost({ ...post });
		putLike(_id);
	};

	const unlike = _id => {
		post.likes = post.likes.filter(like => like._id !== auth._id);
		setPost({ ...post });
		putUnlike(_id);
	};

	const commentUnlike = _id => {
		post.comments = post.comments.map(comment => {
			if (comment._id === _id) {
				comment.likes = comment.likes.filter(
					like => like._id !== auth._id
				);
			}

			return comment;
		});

		setPost({ ...post });
		putUnlike(_id);
	};

	return (
		<Box>
			{isLoading ? (
				<Box>Loading...</Box>
			) : (
				<>
					<PostCard
						primary
						post={post}
						like={like}
						unlike={unlike}
					/>

					{post.comments.map(comment => {
						return (
							<PostCard
								key={comment._id}
								post={comment}
								like={commentLike}
								unlike={commentUnlike}
							/>
						);
					})}

					<form
						onSubmit={e => {
							e.preventDefault();
							const body = bodyRef.current.value;
							if (!body) return false;

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
							sx={{ mb: 1 }}
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
