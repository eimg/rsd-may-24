import { useState, useEffect } from "react";

import {
	Box,
	Card,
	Avatar,
	Button,
	Typography,
	CardContent,
	CardActionArea,
} from "@mui/material";

import {
	Comment as CommentIcon,
	Favorite as FavoriteIcon,
} from "@mui/icons-material";

import { useNavigate } from "react-router-dom";
import { format } from "date-fns";

export default function Notis() {
	const navigate = useNavigate();

	const [notis, setNotis] = useState([]);

	useEffect(() => {
		
	}, []);

	return (
		<Box>
			<Box sx={{ display: "flex", mb: 2 }}>
				<Box sx={{ flex: 1 }}></Box>
				<Button
					size="small"
					variant="outlined"
					sx={{ borderRadius: 5 }}
					onClick={() => {}}>
					Mark all as read
				</Button>
			</Box>

			<Card sx={{ mb: 2 }}>
				<CardActionArea onClick={() => {}}>
					<CardContent
						sx={{
							display: "flex",
							opacity: 1,
						}}>
						<CommentIcon color="success" />

						<Box sx={{ ml: 3 }}>
							<Avatar />

							<Box sx={{ mt: 1 }}>
								<Typography
									component="span"
									sx={{ mr: 1 }}>
									<b>Alice</b>
								</Typography>

								<Typography
									component="span"
									sx={{
										mr: 1,
										color: "text.secondary",
									}}>
									comments your post
								</Typography>

								<Typography
									component="span"
									color="primary">
									<small>A few seconds ago</small>
								</Typography>
							</Box>
						</Box>
					</CardContent>
				</CardActionArea>
			</Card>

			<Card>
				<CardActionArea onClick={() => {}}>
					<CardContent
						sx={{
							display: "flex",
							opacity: 1,
						}}>
						<FavoriteIcon color="error" />

						<Box sx={{ ml: 3 }}>
							<Avatar alt="Profile"></Avatar>

							<Box sx={{ mt: 1 }}>
								<Typography
									component="span"
									sx={{ mr: 1 }}>
									<b>Bob</b>
								</Typography>

								<Typography
									component="span"
									sx={{
										mr: 1,
										color: "text.secondary",
									}}>
									Liked your comment
								</Typography>

								<Typography
									component="span"
									color="primary">
									<small>
										2 minutes ago
									</small>
								</Typography>
							</Box>
						</Box>
					</CardContent>
				</CardActionArea>
			</Card>
		</Box>
	);
}
