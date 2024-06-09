import { Outlet } from "react-router-dom";

import { Container } from "@mui/material";

import Header from "./components/Header";
import Drawer from "./components/Drawer";

export default function Template() {
	return (
		<>
			<Header count={0} />
			<Drawer />
			<Container maxWidth="md" sx={{ mt: 4 }}>
				<Outlet />
			</Container>
		</>
	);
}
