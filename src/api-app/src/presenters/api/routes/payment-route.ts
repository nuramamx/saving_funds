import { FastifyInstance, FastifyPluginOptions } from 'fastify';
import CommandHandlerMediator from '../../../application/mediators/command-handler-mediator';
import { PaymentCreateCommand } from '../../../application/use-cases/commands/payment/create/payment-create-command-handler';
import { PaymentListByBorrowIdQuery } from '../../../application/use-cases/queries/payment/list-by-borrow-id/payment-list-by-borrow-id-query-handler';

async function PaymentRoute (fastify: FastifyInstance, options: FastifyPluginOptions) {
  fastify.get<{ Params: { id: number }}>('/payment/list/:id', async (request, reply) => {
    const { id } = request.params;

    const data: PaymentListByBorrowIdQuery = { borrowId: id };
    const command = new CommandHandlerMediator();
    const result = await command.execute('PaymentListByBorrowIdQuery', data);

    if (!result.successful) reply.statusCode = 400;

    return result;
  });

  fastify.post<{Body: string}>('/payment/create', async (request, reply) => {
    const data: PaymentCreateCommand = JSON.parse(request.body);
    const command = new CommandHandlerMediator();
    const result = await command.execute('PaymentCreateCommand', data);

    if (!result.successful) reply.statusCode = 400;

    return result;
  });
}

export default PaymentRoute;