import { Camera } from 'lucide-react';
import ScannerApp from './components/ScannerApp';

function App() {
  return (
    <div className="app-container">
      <header className="header">
        <Camera size={32} color="#a855f7" />
        <h1>ScanStack</h1>
      </header>
      <main className="view-wrapper">
        <ScannerApp />
      </main>
    </div>
  );
}

export default App;
