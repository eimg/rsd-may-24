const express = require("express");
const app = express();

require("express-ws")(app);

const clients = [];

app.ws("/chat", (ws, req) => {
    clients.push(ws);

    ws.on("message", msg => {
		clients.map(client => {
			client.send(msg);
		});
	});
});

app.listen(4000, () => {
    console.log("Express WS running at 4000...");
});
