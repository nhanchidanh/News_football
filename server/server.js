require("dotenv").config();
const app = require("./src/app");
const cluster = require("cluster");
const os = require("os");

const PORT = process.env.PORT || 8080;

const server = app.listen(PORT, () => {
  console.log("Server on running on http://localhost:" + PORT);
});

process.on("SIGINT", () => {
  server.close(() => console.log("Exits server express"));
});
