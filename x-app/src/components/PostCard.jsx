import {
	Box,
	Typography,
	Card,
	CardContent,
	CardActionArea,
	Avatar,
	ButtonGroup,
	Button,
	IconButton,
} from "@mui/material";

import {
	Comment as CommentIcon,
	FavoriteBorder as LikeIcon,
    Favorite as LikedIcon,
} from "@mui/icons-material";

import { green } from "@mui/material/colors";

import { format } from "date-fns";

import { useApp } from "../ThemedApp";
import { useNavigate } from "react-router-dom";

export default function PostCard({ post, like, unlike }) {
    const { auth } = useApp();

    const navigate = useNavigate();

    const isLiked = () => {
        if(!post.likes) return false;

        return post.likes.find(like => {
            return like._id === auth._id;
        });
    };

	return (
		<Card sx={{ mb: 2 }}>
			<CardContent>
				<Box sx={{ display: "flex", flexDirection: "row" }}>
					<Avatar sx={{ width: 80, height: 80 }}>U</Avatar>
					<Box sx={{ mt: 2, ml: 2 }}>
						<Typography sx={{ fontWeight: "bold" }}>
							{post.owner.name}
						</Typography>
						<Typography sx={{ color: green[600] }}>
							{format(post.created, "MMM dd, yyyy")}
						</Typography>
					</Box>
				</Box>
				<Box sx={{ p: 2 }}>
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
							<IconButton onClick={() => unlike(post._id)}>
								<LikedIcon color="error" />
							</IconButton>
						) : (
							<IconButton onClick={() => like(post._id)}>
								<LikeIcon color="error" />
							</IconButton>
						)}
						<Button variant="text" onClick={() => navigate(`/likes/${post._id}`)}>
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
