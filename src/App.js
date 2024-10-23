import logo from './logo.svg';
import './App.css';
import { NavBar } from './components/common/NavBar';
import ImageSlider from './components/HomeGallery/gallery';
import Footer from './components/common/Footer';

function App() {
  return (
    <div className="w-screen min-h-screen bg-white flex flex-col font-inter">
      <NavBar/>
      <ImageSlider/>
      <Footer/>
    </div>
  );
}

export default App;
