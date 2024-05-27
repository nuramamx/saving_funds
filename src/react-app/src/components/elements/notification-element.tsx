import { memo } from "react";
import useNotificationStore from "../../core/stores/notification-store";

type NotificationProps = {
  id: string;
  message: string;
  type: string;
}

const NotificationElement = memo(({id, message, type}: NotificationProps) => {
  const { removeNotification } = useNotificationStore();

  return (
    <div style={{maxWidth: "150vh"}} className={`notification is-${type} is-light`}>
      <button className="delete" onClick={() => removeNotification(id)}></button>
      <strong>Atenci&oacute;n</strong>
      <p>{message}</p>
    </div>
  )
});

export default NotificationElement;