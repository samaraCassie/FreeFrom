const { io } = require("./server");

io.on("connection", function (currentConnection) {
  currentConnection.on("room", (metadata) => {
    console.log({ metadata });
  });
});
