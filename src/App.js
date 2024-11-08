import './App.css';
import { Route, Routes } from "react-router-dom";
import FuzzyOverlayExample from './pages/Home';
import ContactUsForm from './components/ContactPage/ContactUsForm';
import ScrollTop from './components/scrollTop/ScrollTop';
import { About } from './pages/About';
// import { ImagesSliderDemo } from './pages/ImageSlider';

function App() {
  return (
    <ScrollTop>
      <Routes>
        <Route path="/" element={<FuzzyOverlayExample />} />
        <Route path="contact" element={<ContactUsForm />} />
        <Route path="about" element={<About/>} />
        {/* <Route path="career" element={<ImagesSliderDemo />} /> Enable this for demo */}
      </Routes>
    </ScrollTop>
  );
}

export default App;
