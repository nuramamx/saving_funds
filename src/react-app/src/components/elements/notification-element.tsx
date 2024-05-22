import { memo, useCallback } from "react";
import useNotificationStore from "../../core/infrastructure/stores/notification-store";

type NotificationProps = {
  id: string;
  message: string;
  type: string;
}

const NotificationElement = memo(({id, message, type}: NotificationProps) => {
  const { removeNotification } = useNotificationStore();

  const handleCloseClick = useCallback((id: string) => {
    removeNotification(id);
  }, [id]);

  return (
    <div style={{maxWidth: "150vh"}} className={`notification is-${type} is-light`}>
      <button className="delete" onClick={() => handleCloseClick(id)}></button>
      <strong>Atenci&oacute;n</strong>
      <p>{message}</p>
    </div>
  )
});

export default NotificationElement;