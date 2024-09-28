import NotificationElement from './components/elements/notification-element';
import LayoutAppContent from './components/layout/layout-app-content';
import LayoutAppHeader from './components/layout/layout-app-header';
import useNotificationStore from './core/stores/notification-store';
import ValidationModal from './components/modals/validation-modal';
import GenericErrorBoundary from './core/errors/generic-error-boundary';
import './styles/aside.css';
import './styles/notification.css';
import './styles/navbar.css';
import './styles/table.css';
import './styles/input.css';
import './styles/menu.css';
import './styles/login.css';
import './styles/security.css';
import 'react-tooltip/dist/react-tooltip.css';
import 'animate.css';
import { useAuth } from './components/security/auth-context';

function App() {
  const { notifications } = useNotificationStore();
  const { isAuthenticated } = useAuth();
  
  return (
    <>
      <div className="blocking-div" style={{ display: `${isAuthenticated ? 'none' : 'block' } `}}></div>
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
