import { FastifyInstance, FastifyPluginOptions } from "fastify";
import CreateAssociateCommand from "../../../application/use_cases/commands/associate/create/create-associate-command-handler";
import CommandHandlerMediator from "../../../application/mediators/command-handler-mediator";

async function AssociateRoute (fastify: FastifyInstance, options: FastifyPluginOptions) {
  fastify.get('/associate', async (request, reply) => {
    const x: CreateAssociateCommand = {
      rfc: '',
      name: { firstname: '', middlename: '', paternal_lastname: '', maternal_lastname: '' },
      gender: '',
      detail: { salary: 0, social_contribution: 0, agreement: '', dependency_key: '', fortnightly_contribution: 0, category: '', request_date: new Date() },
      address: { street: '', settlement: '', town: '', postal_code: '', city_id: 0, phone: '', mobile: '', email: '' },
      workplace: { key: '', name: '', phone: '' },
      beneficiaries: []
    };
    return JSON.stringify(x);
  });

  fastify.post<{ Body: string }>('/associate/create', async (request, reply) => {
    const data: CreateAssociateCommand = JSON.parse(request.body);
    const command = new CommandHandlerMediator();
    
    const result = await command.execute('CreateAssociateCommand', data);

    if (!result.successful) reply.statusCode = 400;

    return result;
  });

  fastify.put('/associate/create', async (request, reply) => {

  });

  fastify.delete('/associate/create', async (request, reply) => {

  });
}

export default AssociateRoute;