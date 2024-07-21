import { FastifyInstance, FastifyPluginOptions } from 'fastify';
import CommandHandlerMediator from '../../../application/mediators/command-handler-mediator';
import { ListPaymentByBorrowIdQuery } from '../../../application/use-cases/queries/payment/list-by-borrow-id/list-payment-by-borrow-id-query-handler';

async function PaymentRoute (fastify: FastifyInstance, options: FastifyPluginOptions) {
  fastify.get<{ Params: { id: number }}>('/payment/list/:id', async (request, reply) => {
    const { id } = request.params;

    const data: ListPaymentByBorrowIdQuery = { borrowId: id };
    const command = new CommandHandlerMediator();
    const result = await command.execute('ListPaymentByBorrowIdQuery', data);

    if (!result.successful) reply.statusCode = 400;

    return result;
  });
}

export default PaymentRoute;