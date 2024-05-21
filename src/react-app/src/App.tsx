import LayoutAppContent from './components/layout/layout-app-content';
import LayoutAppHeader from './components/layout/layout-app-header';

function App() {
  return (
    <>
    <LayoutAppHeader />
    <div className="columns" style={{marginTop: '52px'}}>
        <LayoutAppContent />
    </div>
    </>
  );
}

export default App;
