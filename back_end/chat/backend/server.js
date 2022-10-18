const http = require("http");
const express = require("express");
const path = require("path");
const { Server } = require("socket.io");

const app = express();

app.use(express.static(path.join(__dirname, "..")));

const serverHttp = http.createServer(app);

const io = new Server(serverHttp);

module.exports = { io, serverHttp };
