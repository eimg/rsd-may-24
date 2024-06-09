import { createContext, useContext, useMemo, useState } from "react";
import { createTheme, ThemeProvider, CssBaseline } from "@mui/material";

import Home from "./pages/Home";

const AppContext = createContext();

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Template from "./Template";

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
		],
	},
]);

export default function ThemedApp() {
	const [mode, setMode] = useState("dark");
    const [drawer, setDrawer] = useState(false);

	const theme = useMemo(() => {
		return createTheme({
			palette: {
				mode,
			},
		});
	}, [mode]);

	return (
		<ThemeProvider theme={theme}>
			<AppContext.Provider value={{ mode, setMode, drawer, setDrawer }}>
				<RouterProvider router={router} />
				<CssBaseline />
			</AppContext.Provider>
		</ThemeProvider>
	);
}
