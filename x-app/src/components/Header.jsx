import { AppBar, Toolbar, Typography, Badge, IconButton } from "@mui/material";

import {
	Menu as MenuIcon,
	LightMode as LightModeIcon,
	DarkMode as DarkModeIcon,
	ArrowBack as BackIcon,
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

				{mode === "dark" ? (
					<IconButton onClick={() => setMode("light")}>
						<LightModeIcon />
					</IconButton>
				) : (
					<IconButton onClick={() => setMode("dark")}>
						<DarkModeIcon />
					</IconButton>
				)}
			</Toolbar>
		</AppBar>
	);
}
