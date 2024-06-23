import { createContext, useContext, useEffect, useMemo, useState } from "react";
import {
	createTheme,
	ThemeProvider,
	Snackbar,
	CssBaseline,
} from "@mui/material";

const AppContext = createContext();

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Template from "./Template";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Likes from "./pages/Likes";
import NotFound from "./pages/NotFound";
import NewPost from "./pages/NewPost";
import Comments from "./pages/Comments";

import { fetchVerify } from "./libs/fetcher";

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
			{
				path: "/likes/:id",
				element: <Likes />,
			},
			{
				path: "/comments/:id",
				element: <Comments />,
			},
			{
				path: "/new",
				element: <NewPost />,
			},
		],
	},
]);

export default function ThemedApp() {
	const [mode, setMode] = useState("dark");
	const [drawer, setDrawer] = useState(false);
	const [toast, setToast] = useState(null);
	const [auth, setAuth] = useState(false);

    useEffect(() => {
        fetchVerify().then(user => setAuth(user));
    }, []);

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
				value={{
					mode,
					setMode,
					drawer,
					setDrawer,
					auth,
					setAuth,
					toast,
					setToast,
				}}>
				<Snackbar
					anchorOrigin={{ vertical: "top", horizontal: "right" }}
					open={Boolean(toast)}
					autoHideDuration={6000}
					onClose={() => setToast(null)}
					message={toast}
				/>

				<RouterProvider router={router} />
				<CssBaseline />
			</AppContext.Provider>
		</ThemeProvider>
	);
}
