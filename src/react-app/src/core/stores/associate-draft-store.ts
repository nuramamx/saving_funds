import { create } from "zustand";
import { produce } from "immer";
import { v4 as uuid } from "uuid";
import useNotificationStore from "./notification-store";
import CreateAssociateCommand from "../interfaces/commands/create-associate-command";

interface AssociateDraftStore {
    associates: CreateAssociateCommand[];
    pushAssociateDraft: (associate: CreateAssociateCommand) => void;
    removeAssociateDraft: (commandId: string) => void
};

const useAssociateDraftStore = create<AssociateDraftStore>((set) => ({
  associates: [],
  pushAssociateDraft: (associate: CreateAssociateCommand) => set(
    produce((state: AssociateDraftStore) => {
      if (state.associates.length === 5)
        return useNotificationStore.getState().pushNotification({ message: "Ha alcanzado el máximo de borradores", type: 'warning' });

      if (associate.commandId === undefined || associate.commandId === null || associate.commandId === '')
        associate.commandId = uuid();

      state.associates.push(associate);

      console.log(JSON.stringify(state.associates));
    })
  ),
  removeAssociateDraft: (commandId: string) => set(
    produce((state: AssociateDraftStore) => {
      state.associates
        .splice(state.associates
        .findIndex((associate) => associate.commandId === commandId), 1);
    })
  )
}));

export default useAssociateDraftStore;