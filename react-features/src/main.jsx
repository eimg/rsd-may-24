import React from "react";
import ReactDOM from "react-dom/client";
import ThemeProvider from "./ThemeProvider.jsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<ThemeProvider />
	</React.StrictMode>
);
