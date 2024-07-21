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

import { fetchNotis, putNotiRead } from "../libs/fetcher";
import { useApp } from "../ThemedApp";

export default function Notis() {
	const navigate = useNavigate();

	const { setNotiCount, notiCount } = useApp();

	const [notis, setNotis] = useState([]);

	useEffect(() => {
		fetchNotis().then(data => {
			setNotis(data);

			setNotiCount(data.filter(noti => !noti.read).length);
		});
	}, [setNotiCount]);

	const readNoti = id => {
		putNotiRead(id);

		setNotiCount(notiCount - 1);

		setNotis(
			notis.map(noti => {
				if (noti._id == id) noti.read = true;
				return noti;
			})
		);
	};

	return (
		<Box>
			<Box sx={{ display: "flex", mb: 2 }}>
				<Box sx={{ flex: 1 }}></Box>
				<Button
					size="small"
					variant="outlined"
					sx={{ borderRadius: 5 }}
					onClick={() => {
						setNotis(
							notis.map(noti => {
								noti.read = true;
								return noti;
							})
						);
					}}>
					Mark all as read
				</Button>
			</Box>

			{notis.map(noti => {
				return (
					<Card
						sx={{ mb: 2, opacity: noti.read ? 0.3 : 1 }}
						key={noti._id}>
						<CardActionArea
							onClick={() => {
								navigate(`/comments/${noti.target}`);
								readNoti(noti._id);
							}}>
							<CardContent
								sx={{
									display: "flex",
									opacity: 1,
								}}>
								{noti.type == "comment" ? (
									<CommentIcon color="success" />
								) : (
									<FavoriteIcon color="error" />
								)}

								<Box sx={{ ml: 3 }}>
									<Avatar />

									<Box sx={{ mt: 1 }}>
										<Typography
											component="span"
											sx={{ mr: 1 }}>
											<b>{noti.user.name}</b>
										</Typography>

										<Typography
											component="span"
											sx={{
												mr: 1,
												color: "text.secondary",
											}}>
											{noti.msg}
										</Typography>

										<Typography
											component="span"
											color="primary">
											<small>
												{format(
													noti.created,
													"MMM dd, yyyy"
												)}
											</small>
										</Typography>
									</Box>
								</Box>
							</CardContent>
						</CardActionArea>
					</Card>
				);
			})}
		</Box>
	);
}
