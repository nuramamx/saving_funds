import { FastifyInstance, FastifyPluginOptions } from "fastify";
import CommandHandlerMediator from "../../../application/mediators/command-handler-mediator";
import { BorrowAuthorizationReportDataQuery } from "../../../application/use-cases/queries/report/borrow-authorization/data/borrow-authorization-report-data-query-handler";
import { StatementReportDataQuery } from "../../../application/use-cases/queries/report/statement/data/statement-report-data-query-handler";
import { StatementReportGenerateQuery } from "../../../application/use-cases/queries/report/statement/generate/statement-report-generate-query-handler";
import { BorrowAuthorizationReportGenerateQuery } from "../../../application/use-cases/queries/report/borrow-authorization/generate/borrow-authorization-report-generate-query-handler";

async function ReportRoute(fastify: FastifyInstance, options: FastifyPluginOptions) {
  fastify.get<{ Params: { id: number }}>('/report/statement/data/:id', async (request, reply) => {
    const { id } = request.params;
    const data: StatementReportDataQuery = { associateId: id };
    const command = new CommandHandlerMediator();
    const result = await command.execute('StatementReportDataQuery', data);

    if (!result) reply.statusCode = 400;

    return result;
  });

  fastify.get<{ Params: { id: number }}>('/report/statement/list/:id', async (request, reply) => {
    const { id } = request.params;
    const data: StatementReportDataQuery = { associateId: id };
    const command = new CommandHandlerMediator();
    const result = await command.execute('StatementReportListQuery', data);

    if (!result) reply.statusCode = 400;

    return result;
  });

  fastify.get<{ Params: { id: number }}>('/report/statement/:id', async (request, reply) => {
    const { id } = request.params;
    const data: StatementReportGenerateQuery = { associateId: id };
    const command = new CommandHandlerMediator();
    const result = await command.execute('StatementReport', data);

    if (!result) reply.statusCode = 400;

    return result;
  });

  fastify.get<{ Params: { id: number }}>('/report/borrow_authorization/:id', async (request, reply) => {
    const { id } = request.params;
    const data: BorrowAuthorizationReportGenerateQuery = { borrowId: id };
    const command = new CommandHandlerMediator();
    const result = await command.execute('BorrowAuthorizationReport', data);

    if (!result) reply.statusCode = 400;

    return result;
  });

  fastify.get<{ Params: { id: number }}>('/report/borrow_authorization/data/:id', async (request, reply) => {
    const { id } = request.params;
    const data: BorrowAuthorizationReportDataQuery = { borrowId: id };
    const command = new CommandHandlerMediator();
    const result = await command.execute('BorrowAuthorizationReportDataQuery', data);

    if (!result) reply.statusCode = 400;

    return result;
  });
}

export default ReportRoute;