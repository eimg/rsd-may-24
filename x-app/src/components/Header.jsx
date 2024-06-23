import { Box, AppBar, Toolbar, Typography, Badge, IconButton } from "@mui/material";

import {
	Menu as MenuIcon,
	LightMode as LightModeIcon,
	DarkMode as DarkModeIcon,
	ArrowBack as BackIcon,
    Add as AddIcon,
    Notifications as NotiIcon,
} from "@mui/icons-material";

import { useApp } from "../ThemedApp";
import { useLocation, Link } from "react-router-dom";

export default function Header() {
	const { mode, setMode, setDrawer } = useApp();

	const { pathname } = useLocation();

	return (
		<AppBar position="static">
			<Toolbar>
				{pathname === "/" ? (
					<IconButton onClick={() => setDrawer(true)}>
						<MenuIcon />
					</IconButton>
				) : (
					<Link to="/">
						<IconButton>
							<BackIcon />
						</IconButton>
					</Link>
				)}

				<Typography sx={{ ml: 2, flexGrow: 1 }}>Todo</Typography>

				<Box sx={{ display: "flex", gap: 1 }}>
					<Link to="/new">
						<IconButton>
							<AddIcon />
						</IconButton>
					</Link>

					<Link to="/notis">
						<IconButton>
							<Badge badgeContent={10} color="error">
								<NotiIcon />
							</Badge>
						</IconButton>
					</Link>

					{mode === "dark" ? (
						<IconButton onClick={() => setMode("light")}>
							<LightModeIcon />
						</IconButton>
					) : (
						<IconButton onClick={() => setMode("dark")}>
							<DarkModeIcon />
						</IconButton>
					)}
				</Box>
			</Toolbar>
		</AppBar>
	);
}
