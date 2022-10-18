const socket = io();
console.log(socket);

socket.emit("room", {
  username: "yazalde",
});
