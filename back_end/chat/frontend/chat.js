const socket = io();
const chatContent = document.querySelector("#chat_content");
const imageTag = document.querySelector("#porfile");
const messageTag = document.querySelector("#message");
const btnSendTag = document.querySelector("#send");
const nomeTag = document.querySelector("#name");
const btnFormTag = document.querySelector("#btn-form");
const roomTag = document.querySelector("#room");
const modalTag = document.querySelector(".modal");

const verifyUserCache = (username) => {
  if (username) {
    window.localStorage.setItem("username", JSON.stringify(username));
    return username;
  }

  const userStore = window.localStorage.getItem("username");
  return userStore;
};

const buildMessage = (img, name, message) => `
  <div class="message">
    <header>
      <img src=${img} />
        <h2>${name}</h2>
        </header>
        <div>
        <p>${message}</p>
        </div>
  </div>`;

const Chat = () => {
  const currentUser = verifyUserCache();
  if (currentUser) {
    const user = JSON.parse(currentUser);
    user.img = `https://robohash.org/${user.username}.jpg`;

    socket.emit("master", user, (mensagens) => {
      mensagens.map((msg) => {
        const name = msg.username === user.username ? "Eu" : msg.name;
        chatContent.innerHTML += buildMessage(msg.img, name, msg.message);
      });
    });
    imageTag.src = user.img;

    btnSendTag.addEventListener("click", () => {
      const message = messageTag.value;
      if (!message) return;
      const data = {
        message,
        user,
      };

      socket.emit("send", data);
      chatContent.innerHTML += buildMessage(user.img, "Eu", data.message);

      messageTag.value = "";
    });

    socket.on("send", (data) => {
      chatContent.innerHTML += buildMessage(data.img, data.name, data.message);
    });
  } else {
    modalTag.classList.add("on");

    btnFormTag.addEventListener("click", (current) => {
      const name = nomeTag?.value.trim();
      const room = roomTag?.value.trim();
      if (name.length >= 3 && room.length >= 3) {
        const username = name.toLowerCase().split(" ").join("");
        verifyUserCache({ username, name, room });
        window.location.reload();
      } else {
        alert("Os dados devem ter mais de 3 caracteres!!");
      }
    });
  }
};

Chat();
//
