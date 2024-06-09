import { createContext, useContext, useMemo, useState } from "react";
import { createTheme, ThemeProvider, CssBaseline } from "@mui/material";

const AppContext = createContext();

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Template from "./Template";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";

export function useApp() {
	return useContext(AppContext);
}

const router = createBrowserRouter([
	{
		path: "/",
		element: <Template />,
		children: [
			{
				path: "/",
				element: <Home />,
			},
			{
				path: "/login",
				element: <Login />,
			},
			{
				path: "/register",
				element: <Register />,
			},
		],
	},
]);

export default function ThemedApp() {
	const [mode, setMode] = useState("dark");
	const [drawer, setDrawer] = useState(false);
	const [auth, setAuth] = useState(false);

	const theme = useMemo(() => {
		return createTheme({
			palette: {
				mode,
			},
		});
	}, [mode]);

	return (
		<ThemeProvider theme={theme}>
			<AppContext.Provider
				value={{ mode, setMode, drawer, setDrawer, auth, setAuth }}>
				<RouterProvider router={router} />
				<CssBaseline />
			</AppContext.Provider>
		</ThemeProvider>
	);
}
