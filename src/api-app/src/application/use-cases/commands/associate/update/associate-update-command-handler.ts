import CommandHandler from '../../../../../abstractions/interfaces/command-handler';
import CommandResponse from '../../../../../abstractions/interfaces/command-response';
import AssociateSaveRepository from '../../../../../persistence/repositories/save/associate-save-repository';
import { AssociateComposerCommand } from '../create/associate-create-command-handler';

export default class AssociateUpdateCommandHandler implements CommandHandler<AssociateComposerCommand, CommandResponse> {
  async execute(data: AssociateComposerCommand): Promise<CommandResponse> {
    const repository = new AssociateSaveRepository();

    try {
      const result = await repository.save(data);

      return { successful: true, message: 'Registro fue creado con éxito.', data: result, type: 'success' } as CommandResponse;
    } catch (err: any) {
      return { successful: false, message: 'Registro no pudo ser creado.', data: err.message, type: 'danger' } as CommandResponse;
    }
  }
}
