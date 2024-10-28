import logo from './logo.svg';
import './App.css';
import { NavBar } from './components/common/NavBar';
import AnimatedFooter from './components/common/Footer';
import FuzzyOverlayExample from './pages/Home'; // Assuming this is your fuzzy overlay component

function App() {
  return (
    <div className="w-screen min-h-screen flex flex-col font-inter">
      <NavBar />
      <div className="flex-grow">
        <FuzzyOverlayExample />
      </div>
      <AnimatedFooter />
    </div>
  );
}

export default App;
