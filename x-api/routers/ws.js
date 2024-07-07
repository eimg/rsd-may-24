require("dotenv").config();
const express = require("express");
const router = express.Router();

const clients = [];
const jwt = require("jsonwebtoken");
const secret = process.env.SECRET;

router.ws("/subscribe", (ws, req) => {
	ws.on("message", token => {
		jwt.verify(token, secret, (err, user) => {
			if (err) return false;

			ws._id = user._id;
			clients.push(ws);
			console.log(`Added a new client ${user._id}`);
		});
	});
});

module.exports = { clients, wsRouter: router };
