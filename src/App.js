import logo from './logo.svg';
import './App.css';
import { NavBar } from './components/common/NavBar';
import InfrastructureHero from './pages/Home';

function App() {
  return (
    <div className="w-screen min-h-screen bg-white flex flex-col font-inter">
      <NavBar/>
      {/* <InfrastructureHero/> */}
    </div>
  );
}

export default App;
