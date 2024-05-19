import { useContext } from "react";

import { AppBar, Toolbar, Typography, Badge, IconButton } from "@mui/material";

import { 
    List as ListIcon,
    LightMode as LightModeIcon,
    DarkMode as DarkModeIcon,
} from "@mui/icons-material";

import { AppContext } from "./ThemedApp";

export default function Header({ count }) {
    const { mode, setMode } = useContext(AppContext);

	return (
		<AppBar position="static">
			<Toolbar>
				<Badge
					badgeContent={count}
					color="error">
					<ListIcon />
				</Badge>
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
