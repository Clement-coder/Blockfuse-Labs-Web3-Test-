const express = require("express");
const http = require("http");
const socketIo = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

let players = [
  { id: 1, x: 50, y: 50, name: "Player 1" },
  // Add more player data here
];

let ball = { x: 50, y: 50 };

io.on("connection", (socket) => {
  console.log("a user connected");

  // Send player data to new client
  socket.emit("playerUpdate", players);

  // Send ball data to new client
  socket.emit("ballUpdate", ball);

  // Handle player movement
  socket.on("movePlayer", (playerData) => {
    players = players.map((player) =>
      player.id === playerData.id ? { ...player, ...playerData } : player
    );
    io.emit("playerUpdate", players);
  });

  // Handle ball movement
  socket.on("moveBall", (ballData) => {
    ball = { ...ball, ...ballData };
    io.emit("ballUpdate", ball);
  });

  // Handle events (goals, fouls)
  socket.on("event", (event) => {
    io.emit("newEvent", event);
  });

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

server.listen(5000, () => {
  console.log("Server is running on port 5000");
});
