import { useContext, useEffect, useMemo } from "react";
import Home from "./Home";

import { ThemeContext } from "./ThemeProvider";

function expensiveFunction() {
    console.log("Function call");
    return "Result";
}

export default function App() {
    const { mode } = useContext(ThemeContext);

    const result = useMemo(() => {
        return expensiveFunction();
    }, []);

    console.log(result);

	return (
		<div
			style={{
				background: mode === "dark" ? "black" : "white",
				color: mode === "dark" ? "white" : "black",
                minHeight: 1500,
			}}>
			<Home />
		</div>
	);
}
