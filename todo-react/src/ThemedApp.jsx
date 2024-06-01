import { createContext, useMemo, useState } from "react";
import { createTheme, ThemeProvider, CssBaseline } from "@mui/material";

import App from "./App";

export const AppContext = createContext();

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Edit from "./Edit";
import Template from "./Template";

const router = createBrowserRouter([
    {
        path: '/',
        element: <Template />,
        children: [
            {
                path: '/',
                element: <App />,
            },
            {
                path: '/edit/:id',
                element: <Edit />
            }
        ]
    },
]);

export default function ThemedApp() {
    const [mode, setMode] = useState("dark");
    const theme = useMemo(() => {
        return createTheme({
			palette: {
				mode,
			},
		});
    }, [mode]);

    return (
		<ThemeProvider theme={theme}>
			<AppContext.Provider value={{ mode, setMode }}>
				<RouterProvider router={router} />
				<CssBaseline />
			</AppContext.Provider>
		</ThemeProvider>
	);
}
