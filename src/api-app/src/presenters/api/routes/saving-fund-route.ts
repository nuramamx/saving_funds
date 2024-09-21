import { FastifyInstance, FastifyPluginOptions } from "fastify";
import CommandHandlerMediator from "../../../application/mediators/command-handler-mediator";
import { SavingFundTransactionListQuery } from "../../../application/use-cases/queries/saving-fund/transaction/list/saving-fund-transaction-list-query-handler";
import { SavingFundListQuery } from "../../../application/use-cases/queries/saving-fund/list/saving-fund-list-query-handler";
import { SavingFundAnnualRateUpdateCommand } from "../../../application/use-cases/commands/saving_fund/rate/update/saving-fund-annual-rate-update-command-handler";

async function SavingFundRoute(fastify: FastifyInstance, options: FastifyPluginOptions) {
  fastify.get('/savingfund/rates', async (request, reply) => {
    const command = new CommandHandlerMediator();
    const result = await command.execute('SavingFundAnnualRateListQuery');

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

  fastify.post<{ Body: string }>('/savingfund/list', async (request, reply) => {
    const data = JSON.parse(request.body) as SavingFundListQuery;
    const command = new CommandHandlerMediator();
    const result = await command.execute('SavingFundListQuery', data);

    if (!result.successful) reply.statusCode = 400;

    return result;
  });

  fastify.put<{ Body: string }>('/savingfund/rates', async (request, reply) => {
    const data = JSON.parse(request.body) as SavingFundAnnualRateUpdateCommand;
    const command = new CommandHandlerMediator();
    const result = await command.execute('SavingFundAnnualRateUpdateCommand', data);

    if (!result.successful) reply.statusCode = 400;

    return result;
  });
}

export default SavingFundRoute;