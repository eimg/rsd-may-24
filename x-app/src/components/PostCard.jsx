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

export default function PostCard() {
	return (
		<Card sx={{ mb: 2 }}>
			<CardContent>
				<Box sx={{ display: "flex", flexDirection: "row" }}>
					<Avatar sx={{ width: 80, height: 80 }}>U</Avatar>
					<Box sx={{ mt: 2, ml: 2 }}>
						<Typography sx={{ fontWeight: "bold" }}>
							Some User
						</Typography>
						<Typography sx={{ color: green[600] }}>
							10 minutes ago
						</Typography>
					</Box>
				</Box>
				<Box sx={{ p: 2 }}>
					<Typography>
						Lorem ipsum dolor sit amet consectetur, adipisicing
						elit. In totam maxime incidunt magni omnis provident non
						porro rerum modi veniam? Lorem ipsum dolor sit amet,
						consectetur adipisicing elit. Veritatis, laborum.
					</Typography>
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
						<Button variant="text">5</Button>
					</ButtonGroup>
					<ButtonGroup>
						<IconButton>
							<CommentIcon color="success" />
						</IconButton>
						<Button variant="text">10</Button>
					</ButtonGroup>
				</Box>
			</CardContent>
		</Card>
	);
}
