import './App.css';
import { Route, Routes } from "react-router-dom";
import FuzzyOverlayExample from './pages/Home';
import ScrollTop from './components/scrollTop/ScrollTop';
import { About } from './pages/About';
import ApplyForm from './components/ApplyNow/ApplyForm';
import ProjectShowcase from './components/Projects/ProjectShowcase';
import { AnimatedPinDemo } from './components/Bibliography/ui/Cardinfo';
import AnimatedHeader from './components/Header/AnimatedHeader';
<<<<<<< HEAD
import ModernFAQ from './components/F&Q/FAQ';
// import { ImagesSliderDemo } from './pages/ImageSlider';
=======
import {ContactUs} from './pages/ContactUs';
>>>>>>> a34bd9e52696a7139a5ee49500e5be9bc96d7bd8

function App() {
  return (
    <ScrollTop>
      <Routes>
        <Route path="/" element={<FuzzyOverlayExample />} />
        <Route path="about" element={<About />} />
        <Route path="career" element={<ApplyForm/>} />
        <Route path="projects" element={<ProjectShowcase/>} />
        <Route path="biblio" element={<AnimatedPinDemo/>} />
        <Route path="header" element={<AnimatedHeader/>} />
<<<<<<< HEAD
        <Route path="faq" element={<ModernFAQ/>} />

        
        {/* <Route path="career" element={<ImagesSliderDemo />} /> Enable this for demo */}
=======
        <Route path="contactus" element={<ContactUs/>} />
>>>>>>> a34bd9e52696a7139a5ee49500e5be9bc96d7bd8
      </Routes>
    </ScrollTop>
  );
}

export default App;
