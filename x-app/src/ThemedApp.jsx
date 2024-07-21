import {
	createTheme,
	CssBaseline,
	Snackbar,
	ThemeProvider,
} from "@mui/material";

import {
	createContext,
	useContext,
	useEffect,
	useMemo,
	useState,
} from "react";

const AppContext = createContext();

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Edit from "./pages/Edit";
import Comments from "./pages/Comments";
import Home from "./pages/Home";
import Likes from "./pages/Likes";
import Login from "./pages/Login";
import NewPost from "./pages/NewPost";
import Profile from "./pages/Profile";
import Register from "./pages/Register";
import Search from "./pages/Search";
import Notis from "./pages/Notis";
import Followers from "./pages/Followers";
import Following from "./pages/Following";
import Followed from "./pages/Followed";
import Template from "./Template";

import { fetchNotis, fetchVerify } from "./libs/fetcher";
import useWebSocket from "./libs/webSocketClient";

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
				path: "/followed",
				element: <Followed />,
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
			{
				path: "/profile/:id",
				element: <Profile />,
			},
			{
				path: "/edit/user",
				element: <Edit />,
			},
			{
				path: "/search",
				element: <Search />,
			},
			{
				path: "/notis",
				element: <Notis />,
			},
			{
				path: "/followers/:id",
				element: <Followers />,
			},
			{
				path: "/following/:id",
				element: <Following />,
			},
		],
	},
]);

export default function ThemedApp() {
	const [mode, setMode] = useState("dark");
	const [drawer, setDrawer] = useState(false);
	const [toast, setToast] = useState(null);
	const [auth, setAuth] = useState(false);
	const [notiCount, setNotiCount] = useState(0);

    const ws = useWebSocket();
    
	useEffect(() => {
		ws.addEventListener("message", e => {
			const msg = JSON.parse(e.data);
			if (msg.type === "notis") {
				setNotiCount(msg.count);
			}
		});

		fetchVerify().then(user => setAuth(user));

		fetchNotis().then(data =>
			setNotiCount(data.filter(noti => !noti.read).length)
		);
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
					notiCount,
					setNotiCount,
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
