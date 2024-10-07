import Fastify from "fastify";
import cors from "@fastify/cors";
import jwt from "@fastify/jwt";
import AssociateRoute from "./routes/associate-route";
import CityRoute from "./routes/city-route";
import StateRoute from "./routes/state-route";
import AgreementRoute from "./routes/agreement-route";
import BorrowRoute from "./routes/borrow-route";
import PaymentRoute from "./routes/payment-route";
import SavingFundRoute from "./routes/saving-fund-route";
import ContributionRoute from "./routes/contribution-route";
import WithdrawalRoute from "./routes/withdrawal-route";
import BatchRoute from "./routes/batch-route";
import ReportRoute from "./routes/report-route";
import SecurityRoute from "./routes/security-route";

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

fastify.register(cors, {
  origin: (origin, cb) => {
    const url = origin || "";

    if (url === "") {
      cb(new Error(`URL Empty ${origin} => Not allowed`), false);
      return;
    }

    const hostname = new URL(url).hostname;

    // if (hostname !== "localhost" || hostname !== 'setepidsf.ngrok.io') {
    //   cb(new Error(`${hostname} => Not allowed`), false);
    //   return;
    // }

    cb(null, true);
    return;
  }
});

fastify.register(jwt, {
  secret: 'setepid-sf'
});

fastify.register(AgreementRoute);
fastify.register(StateRoute);
fastify.register(CityRoute);
fastify.register(AssociateRoute);
fastify.register(BorrowRoute);
fastify.register(PaymentRoute);
fastify.register(SavingFundRoute);
fastify.register(ContributionRoute);
fastify.register(WithdrawalRoute);
fastify.register(BatchRoute);
fastify.register(ReportRoute);
fastify.register(SecurityRoute);

fastify.addHook('onRequest', async (request, reply) => {
  const publicRoutes = ['/security/token'];

  console.log(request.raw.url);

  if (!publicRoutes.includes(request.raw.url!)) {
    try {
      await request.jwtVerify();
    } catch (err: any) {
      reply.send(err);
    }
  }
});

const start = async () => {
  try {
    fastify.listen({ host: "localhost", port: 8081 });
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();