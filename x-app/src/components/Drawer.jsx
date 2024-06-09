import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";

import { useApp } from "../ThemedApp";
import { Avatar } from "@mui/material";
import { grey, pink } from "@mui/material/colors";

export default function TemporaryDrawer() {
	const { drawer, setDrawer } = useApp();

	const DrawerList = (
		<Box
			sx={{ width: 250 }}
			onClick={() => setDrawer(false)}>
			<Box
				sx={{
					height: 160,
					background: grey[500],
					position: "relative",
                    mb: 8,
				}}>
				<Avatar
					sx={{
						position: "absolute",
						bottom: -50,
                        left: 20,
						width: 100,
						height: 100,
                        background: pink[500],
					}}>
					A
				</Avatar>
			</Box>

			<List>
				<ListItem disablePadding>
					<ListItemButton>
						<ListItemIcon>
							<InboxIcon />
						</ListItemIcon>
						<ListItemText primary="Inbox" />
					</ListItemButton>
				</ListItem>
			</List>
			<Divider />
		</Box>
	);

	return (
		<div>
			<Drawer
				open={drawer}
				onClose={() => setDrawer(false)}>
				{DrawerList}
			</Drawer>
		</div>
	);
}
