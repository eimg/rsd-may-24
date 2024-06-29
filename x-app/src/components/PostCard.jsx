import {
	Avatar,
	Box,
	Button,
	ButtonGroup,
	Card,
	CardContent,
	IconButton,
	Typography,
} from "@mui/material";

import {
	Comment as CommentIcon,
	FavoriteBorder as LikeIcon,
	Favorite as LikedIcon,
} from "@mui/icons-material";

import { green } from "@mui/material/colors";

import { format } from "date-fns";

import { useNavigate } from "react-router-dom";
import { useApp } from "../ThemedApp";

export default function PostCard({ post, primary, like, unlike }) {
	const { auth } = useApp();

	const navigate = useNavigate();

	const isLiked = () => {
		if (!post.likes) return false;

		return post.likes.find(like => {
			return like._id === auth._id;
		});
	};

	const images = import.meta.env.VITE_IMAGES_URL;
	let photo;

	if (post.owner.photo) {
		photo = `${images}/${post.owner.photo}`;
	}

	return (
		<Card sx={{ mb: 2 }}>
			{primary && <Box sx={{ height: 50, bgcolor: green[500] }} />}
			<CardContent>
				<Box
					onClick={() => navigate(`/profile/${post.owner._id}`)}
					sx={{
						display: "flex",
						flexDirection: "row",
						cursor: "pointer",
					}}>
					<Avatar
						src={photo}
						sx={{ width: 80, height: 80 }}>
						{post.owner.name[0]}
					</Avatar>
					<Box sx={{ mt: 2, ml: 2 }}>
						<Typography sx={{ fontWeight: "bold" }}>
							{post.owner.name}
						</Typography>
						<Typography sx={{ color: green[600] }}>
							{format(post.created, "MMM dd, yyyy")}
						</Typography>
					</Box>
				</Box>
				<Box
					sx={{ p: 2, cursor: "pointer" }}
					onClick={() => navigate(`/comments/${post._id}`)}>
					<Typography>{post.body}</Typography>
				</Box>
				<Box
					sx={{
						mt: 1,
						display: "flex",
						flexDirection: "row",
						justifyContent: "space-around",
					}}>
					<ButtonGroup>
						{isLiked() ? (
							<IconButton
								onClick={e => {
									unlike(post._id);
								}}>
								<LikedIcon color="error" />
							</IconButton>
						) : (
							<IconButton
								onClick={e => {
									e.stopPropagation();
									like(post._id);
								}}>
								<LikeIcon color="error" />
							</IconButton>
						)}
						<Button
							variant="text"
							onClick={() => navigate(`/likes/${post._id}`)}>
							{post.likes ? post.likes.length : 0}
						</Button>
					</ButtonGroup>

					<ButtonGroup>
						<IconButton>
							<CommentIcon color="success" />
						</IconButton>
						<Button variant="text">
							{post.comments ? post.comments.length : 0}
						</Button>
					</ButtonGroup>
				</Box>
			</CardContent>
		</Card>
	);
}
