const Server = require('./config/initializations')

Server()

process.on('unhandledRejection', err => {
  console.log(err);
  process.exit(1);
});

