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
} from "@mui/icons-material";

import { green } from "@mui/material/colors";

import { format } from "date-fns";

export default function PostCard({ post }) {
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
						<IconButton>
							<LikeIcon color="error" />
						</IconButton>
						<Button variant="text">
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
