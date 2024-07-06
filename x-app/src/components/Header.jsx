import {
	Box,
	AppBar,
	Toolbar,
	Typography,
	Badge,
	IconButton,
} from "@mui/material";

import {
	Menu as MenuIcon,
	LightMode as LightModeIcon,
	DarkMode as DarkModeIcon,
	ArrowBack as BackIcon,
	Add as AddIcon,
	Notifications as NotiIcon,
    Search as SearchIcon,
} from "@mui/icons-material";

import { useApp } from "../ThemedApp";
import { useLocation, useNavigate } from "react-router-dom";

export default function Header() {
	const { mode, setMode, setDrawer, notiCount } = useApp();

	const { pathname } = useLocation();
	const navigate = useNavigate();

	return (
		<AppBar position="static">
			<Toolbar>
				{pathname === "/" ? (
					<IconButton
						color="inherit"
						onClick={() => setDrawer(true)}>
						<MenuIcon />
					</IconButton>
				) : (
					<IconButton
						color="inherit"
						onClick={() => navigate(-1)}>
						<BackIcon />
					</IconButton>
				)}

				<Typography sx={{ ml: 2, flexGrow: 1 }}>Social</Typography>

				<Box sx={{ display: "flex", gap: 1 }}>
					<IconButton
						color="inherit"
						onClick={() => navigate("/new")}>
						<AddIcon />
					</IconButton>

					<IconButton
						color="inherit"
						onClick={() => navigate("/search")}>
						<SearchIcon />
					</IconButton>

					<IconButton
						color="inherit"
						onClick={() => navigate("/notis")}>
						<Badge
							badgeContent={notiCount}
							color="error">
							<NotiIcon />
						</Badge>
					</IconButton>

					{mode === "dark" ? (
						<IconButton
							color="inherit"
							onClick={() => setMode("light")}>
							<LightModeIcon />
						</IconButton>
					) : (
						<IconButton
							color="inherit"
							onClick={() => setMode("dark")}>
							<DarkModeIcon />
						</IconButton>
					)}
				</Box>
			</Toolbar>
		</AppBar>
	);
}
