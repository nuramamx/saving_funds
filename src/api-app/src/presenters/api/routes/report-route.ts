import { FastifyInstance, FastifyPluginOptions } from "fastify";
import { StatementReportDataQuery } from "../../../application/use-cases/queries/report/statement/list/statement-report-list-query-handler";
import { BorrowAuthorizationReportGenerateQuery } from "../../../application/use-cases/queries/report/borrow-authorization/generate/borrow-authorization-report-generate-query-handler";
import CommandHandlerMediator from "../../../application/mediators/command-handler-mediator";

async function ReportRoute(fastify: FastifyInstance, options: FastifyPluginOptions) {
  fastify.get<{ Params: { id: number }}>('/report/statement/:id', async (request, reply) => {
    const { id } = request.params;
    const data: StatementReportDataQuery = { associateId: id };
    const command = new CommandHandlerMediator();
    const result = await command.execute('StatementReport', data);

    if (!result) reply.statusCode = 400;

    return result;
  });

  fastify.get<{ Params: { id: number }}>('/report/borrow_authorization/:id', async (request, reply) => {
    const { id } = request.params;
    const data: BorrowAuthorizationReportGenerateQuery = { borrowId: id };
    const command = new CommandHandlerMediator();
    console.log(id);
    const result = await command.execute('BorrowAuthorizationReport', data);

    if (!result) reply.statusCode = 400;

    return result;
  });
}

export default ReportRoute;