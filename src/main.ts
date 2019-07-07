import Hapi from '@hapi/hapi';
import DotEnv from 'dotenv';

DotEnv.config();

const init = async () => {
  const server = Hapi.server({
    port: process.env.PORT,
    host: '0.0.0.0',
  });

  server.route({
    method: 'GET',
    path: '/',
    handler: (request, h) => {
      return 'Hello World!';
    },
  });

  await server.start();
  console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', err => {
  console.log(err);
  process.exit(1);
});

init();
