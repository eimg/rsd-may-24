import { useContext } from "react";
import { ThemeContext } from "./ThemeProvider";

export default function Header() {
	const { mode, setMode } = useContext(ThemeContext);

	return (
		<nav
			style={{
				display: "flex",
				justifyContent: "space-between",
				padding: 10,
				borderBottom: "1px solid #999",
				marginBottom: 20,
			}}>
			<b>App</b>
			{mode === "dark" ? (
				<button
					onClick={() => {
						setMode("light");
					}}>
					Light
				</button>
			) : (
				<button
					onClick={() => {
						setMode("dark");
					}}>
					Dark
				</button>
			)}
		</nav>
	);
}
