import CommandHandler from "../../../../../abstractions/interfaces/command-handler";
import CommandResponse from "../../../../../abstractions/interfaces/command-response";
import AssociateDeleteRepository from "../../../../../persistence/repositories/delete/associate-delete-repository";

type AssociateDeleteCommand = {
  id: number;
}

export default class AssociateDeleteCommandHandler implements CommandHandler<AssociateDeleteCommand, CommandResponse> {
  async execute(data: AssociateDeleteCommand): Promise<CommandResponse> {
    const repository = new AssociateDeleteRepository();

    try { 
      const result = await repository.delete(data);

      return { successful: true, message: 'Registro fue creado con éxito.', data: result, type: 'success' } as CommandResponse;
    } catch (err: any) {
      return { successful: false, message: 'Registro no pudo ser creado.', data: err.message, type: 'danger' } as CommandResponse;
    }
  }
}

export type { AssociateDeleteCommand };