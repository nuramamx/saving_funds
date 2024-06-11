import { FastifyInstance, FastifyPluginOptions } from "fastify";
import { CreateAssociateCommand } from "../../../application/use_cases/commands/associate/create/create-associate-command-handler";
import { ByNameAssociateQuery } from "../../../application/use_cases/queries/associate/by-name/by-name-associate-query-handler";
import CommandHandlerMediator from "../../../application/mediators/command-handler-mediator";

async function AssociateRoute (fastify: FastifyInstance, options: FastifyPluginOptions) {
  fastify.get("/associate", async (request, reply) => {
    
  });

  fastify.post<{ Body: string }>("/associate/create", async (request, reply) => {
    const data: CreateAssociateCommand = JSON.parse(request.body);
    const command = new CommandHandlerMediator();
    
    const result = await command.execute("CreateAssociateCommand", data);

    if (!result.successful) reply.statusCode = 400;

    return result;
  });

  fastify.post<{ Body: string }>("/associate/search_by_name", async (request, reply) => {
    const data: ByNameAssociateQuery = JSON.parse(request.body);
    const command = new CommandHandlerMediator();
    
    const result = await command.execute("ByNameAssociateQuery", data);

    if (!result.successful) reply.statusCode = 400;

    return result;
  });

  fastify.put("/associate/create", async (request, reply) => {

  });

  fastify.delete("/associate/create", async (request, reply) => {

  });
}

export default AssociateRoute;