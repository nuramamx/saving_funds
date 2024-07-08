import CommandHandler from '../../../../../abstractions/interfaces/command-handler';
import CommandResponse from '../../../../../abstractions/interfaces/command-response';

interface CreateBorrowCommand {

}

class CreateBorrowCommandHandler implements CommandHandler<CreateBorrowCommand, CommandResponse> {
  execute = async (data: CreateBorrowCommand): Promise<CommandResponse> => {
    throw new Error('Method not implemented.');
  }
}

export type { CreateBorrowCommand };
export default CreateBorrowCommandHandler;