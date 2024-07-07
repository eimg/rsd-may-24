const token = localStorage.getItem("token");
const wsc = new WebSocket(import.meta.env.VITE_WS_URL);

wsc.addEventListener("open", () => {
	console.log("connection initiated");
	wsc.send(token);
});

export default function useWebSocket() {
	return wsc;
}
