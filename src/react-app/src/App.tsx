import NotificationElement from "./components/elements/notification-element";
import LayoutAppContent from "./components/layout/layout-app-content";
import LayoutAppHeader from "./components/layout/layout-app-header";
import useNotificationStore from "./core/stores/notification-store";
import ValidationModal from "./components/modals/validation-modal";
import GenericErrorBoundary from "./core/errors/generic-error-boundary";
import "./styles/aside.css";
import "./styles/notification.css";
import "./styles/navbar.css";
import "./styles/table.css";
import "./styles/input.css";
import "./styles/menu.css";
import "./styles/login.css";
import "./styles/security.css";
import "./styles/content.css";
import "react-tooltip/dist/react-tooltip.css";
import "animate.css";
import "@sjmc11/tourguidejs/src/scss/tour.scss";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import useLayoutStore from "./core/stores/layout-store";

function App() {
  const { notifications } = useNotificationStore();
  const { setSelectedMenu, setSelectedSidebarMenu } = useLayoutStore();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname.includes('savingfund')) setSelectedMenu('savingfund-menu');
    if (location.pathname.includes('system')) setSelectedMenu('system-menu');
    
    setSelectedSidebarMenu(location.pathname);
  }, [location]);
  
  return (
    <>
      <LayoutAppHeader />
      <div className="notification-container">
        {notifications.map((notification) => (
          <NotificationElement
            key={notification.id}
            id={notification.id!}
            message={notification.message}
            type={notification.type} />
        ))}
      </div>
      <div className="columns" style={{marginTop: "30px"}}>
        <GenericErrorBoundary>
        <LayoutAppContent />
        </GenericErrorBoundary>
      </div>
      <ValidationModal />
    </>
  );
}

export default App;
