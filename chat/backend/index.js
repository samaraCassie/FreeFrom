const { serverHttp, app } = require("./server");
const path = require("path");
require("./chat");

const port = 3003;

app.get("/", (request, response) => {
  response.sendFile(path.join(__dirname, "..", "frontend", "index.html"));
});

serverHttp.listen(port, () =>
  console.log(`server running at: http://localhost:${port}/`)
);
