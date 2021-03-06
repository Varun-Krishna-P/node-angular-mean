const http = require('http');
const debug = require("debug")("node-angular");
const app = require('./server/app');
var models = require('./server/models');

const normalizePort = val => {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
};

const onError = error => {
  if (error.syscall !== "listen") {
    throw error;
  }
  const bind = typeof port === "string" ? "pipe " + port : "port " + port;
  switch (error.code) {
    case "EACCES":
      console.error(bind + " requires elevated privileges");
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(bind + " is already in use");
      process.exit(1);
      break;
    default:
      throw error;
  }
};

const onListening = () => {
  const addr = server.address();
  const bind = typeof port === "string" ? "pipe " + port : "port " + port;
  debug("Listening on " + bind);
};

const hostname = '127.0.0.1';
const port = normalizePort(process.env.PORT || '3000');

app.set('port', port)


// const server = http.createServer((req, res) => {
//   res.end("this is the first response");
// });

const server = http.createServer(app);

// this models.sequelize.sync() will create tables automatically
models.sequelize.sync().then(function() {
  server.on("error", onError);
  server.on("listening", onListening);

  server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
  });
});
