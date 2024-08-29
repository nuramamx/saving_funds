import { FastifyInstance, FastifyPluginOptions } from "fastify";
import CommandHandlerMediator from "../../../application/mediators/command-handler-mediator";
import { SavingFundTransactionListQuery } from "../../../application/use-cases/queries/saving-fund/transaction/list/saving-fund-transaction-list-query-handler";

async function SavingFundRoute(fastify: FastifyInstance, options: FastifyPluginOptions) {
  fastify.get('/savingfund/list', async (request, reply) => {
    const command = new CommandHandlerMediator();
    const result = await command.execute('SavingFundListQuery');

    if (!result.successful) reply.statusCode = 400;

    return result;
  });

  fastify.get<{ Params: { id: number, year: number }}>('/savingfund/transactions/:id/:year?', async (request, reply) => {
    const { id, year } = request.params;
    const data: SavingFundTransactionListQuery = {
      savingFundId: id,
      year: year
    }
    const command = new CommandHandlerMediator();
    const result = await command.execute('SavingFundTransactionListQuery', data);

    if (!result.successful) reply.statusCode = 400;

    return result;
  });
}

export default SavingFundRoute;