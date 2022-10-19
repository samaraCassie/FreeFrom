const { io } = require("./server");
const users = [];
const mensagens = [];
io.on("connection", function (currentConnection) {
  currentConnection.on("master", (metadata, callback) => {
    currentConnection.join(metadata.room);
    const isExists = users.find((data) => data.username === metadata.username && data.room === metadata.room);
    currentConnection.join(metadata.room);

    if (isExists) {
      metadata.id = currentConnection.id;
    } else {
      users.push({
        ...metadata,
        id: currentConnection.id,
      });
    }

    const messages = mensagens.filter((msg) => msg.room === metadata.room);
    callback(messages);
  });
  currentConnection.on("send", (metadata) => {
    const { message, user } = metadata;
    const data = {
      message,
      ...user,
    };
    mensagens.push(data);
    currentConnection.to(user.room).emit("send", data);
  });
});

/**
 * 
 *  message: 'ola',
    user: {
      username: 'yazaldefilimone',
      name: 'Yazalde Filimone',
      room: 'oie'
    }

 */
