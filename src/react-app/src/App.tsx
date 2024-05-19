import UIAppContent from './components/ui/ui-app-content';
import { UIAppHeader } from './components/ui/ui-app-header';

function App() {
  return (
    <>
    <UIAppHeader />
    <div className="columns" style={{marginTop: '52px'}}>
        <UIAppContent />
    </div>
    </>
  );
}

export default App;
