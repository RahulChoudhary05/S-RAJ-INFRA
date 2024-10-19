import logo from './logo.svg';
import './App.css';
import { NavBar } from './components/common/NavBar';

function App() {
  return (
    <div className="w-screen min-h-screen bg-white flex flex-col font-inter">
      <NavBar/>
    </div>
  );
}

export default App;
