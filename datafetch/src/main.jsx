import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";

import { QueryClientProvider, QueryClient } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<QueryClientProvider client={queryClient}>
			<App />
            <ReactQueryDevtools />
		</QueryClientProvider>
	</React.StrictMode>
);
