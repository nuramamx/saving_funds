import { create } from "zustand";
import { produce } from "immer";
import { v4 as uuid } from "uuid";

type NotificationItem = {
  id?: string;
  message: string;
  type: 'success' | 'info' | 'warning' | 'danger' | 'critical'
};

type NotificationStore = {
  notifications: NotificationItem[]
  pushNotification: (notification: NotificationItem) => void
  removeNotification: (id: string) => void
}

const useNotificationStore = create<NotificationStore>((set) => ({
  notifications: [],
  pushNotification: (notification: NotificationItem) => set(
    produce((state: NotificationStore) => {
      if (notification.id === undefined || notification.id === null)
        notification.id = uuid();
      
      state.notifications.push(notification);
    })
  ),
  removeNotification: (id: string) => set(
    produce((state: NotificationStore) => {
      state.notifications
        .splice(state.notifications
        .findIndex((notification) => notification.id === id), 1);
    })
  )
}));

export type { NotificationStore }
export default useNotificationStore;