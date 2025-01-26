import Fastify from "fastify";
import fastifyStatic from "@fastify/static";
import path from "path";

const fastify = Fastify({
  logger: {
    transport: process.env.NODE_ENV !== 'production' ? {
      target: 'pino-pretty',
      options: {
        translateTime: 'HH:MM:ss Z',
        ignore: 'pid,hostname',                         
      }
    } : undefined
  }
});

fastify.register(fastifyStatic, {
  root: path.join(__dirname, '../public'),
  prefix: '/setepidsf/', // Now files will be served from /setepidsf/
});

fastify.setNotFoundHandler((request, reply) => {
  if (request.raw.url?.startsWith('/setepidsf/')) {
    return reply.sendFile('index.html'); // Serve the SPA entry point
  }
  reply.status(404).send({ error: 'Not Found' });
});

const start = async () => {
  try {
    fastify.listen({ host: "localhost", port: 8082 });
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();