const dotenv = require('dotenv');
dotenv.config();

const debug = require('debug')('node-basic-authentication:server');
const app = require('./app');
const mongoose = require('mongoose');

const PORT = parseInt(process.env.PORT, 10);
const MONGODB_URI = process.env.MONGODB_URI;

const terminate = (error) => {
  if (error) debug(error);
  const exitCode = error && error instanceof Error ? 1 : 0;
  debug('Terminating node app.');
  mongoose.disconnect().finally(() => {
    debug('Disconnected from database.');
    process.exit(exitCode);
  });
};

process.on('SIGINT', () => terminate());
process.on('SIGTERM', () => terminate());
process.on('uncaughtException', (error) => {
  debug('There was an uncaught exception.');
  terminate(error);
});
process.on('unhandledRejection', (error) => {
  debug('There was an unhandled promise rejection.');
  terminate(error);
});

const onError = (error) => {
  const { syscall, port, code } = error;
  if (syscall === 'listen' && code === 'EADDRINUSE') {
    console.error(`Port ${port} is already in use`);
    process.exit(1);
  } else {
    console.error('There was an unknown error.');
    debug(error);
    throw error;
  }
};

const onListening = (server) => {
  const { port } = server.address();
  debug(`Node server listening on ${port}`);
  if (process.env.NODE_ENV === 'development')
    debug(`Visit http://localhost:${port} to develop your app`);
};

const initiate = () => {
  app.set('port', PORT);

  const server = app.listen(PORT);
  server.on('error', (error) => onError(error));
  server.on('listening', () => onListening(server));
};

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    debug(`Database connected to URI "${MONGODB_URI}"`);
    initiate();
  })
  .catch((error) => {
    console.error(
      `There was an error connecting the database to URI "${MONGODB_URI}"`
    );
    debug(error);
    process.exit(1);
  });
