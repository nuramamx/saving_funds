import NotificationElement from './components/elements/notification-element';
import LayoutAppContent from './components/layout/layout-app-content';
import LayoutAppHeader from './components/layout/layout-app-header';
import useNotificationStore from './core/infrastructure/stores/notification-store';
import './styles/notification.css'

function App() {
  const { notifications } = useNotificationStore();
  
  return (
    <>
    <LayoutAppHeader />
    <div className='notification-container'>
      {notifications.map((notification) => (
        <NotificationElement
          key={notification.id}
          id={notification.id!}
          message={notification.message}
          type={notification.type} />
      ))}
    </div>
    <div className="columns" style={{marginTop: '30px'}}>
        <LayoutAppContent />
    </div>
    </>
  );
}

export default App;
