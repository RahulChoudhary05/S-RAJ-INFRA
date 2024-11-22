import './App.css';
import { Route, Routes } from "react-router-dom";
import FuzzyOverlayExample from './pages/Home';
import ScrollTop from './components/scrollTop/ScrollTop';
import { About } from './pages/About';
import { ContactUsInputField } from './components/ContactPage/ContactUsInputField';
import ApplyForm from './components/ApplyNow/ApplyForm';
import ProjectShowcase from './components/Projects/ProjectShowcase';
import { AnimatedPinDemo } from './components/Bibliography/ui/Cardinfo';
import { StickyScrollRevealDemo } from './components/HomeAbout/ui/animatedAbout';
// import { ImagesSliderDemo } from './pages/ImageSlider';

function App() {
  return (
    <ScrollTop>
      <Routes>
        <Route path="/" element={<FuzzyOverlayExample />} />
        <Route path="about" element={<About />} />
        <Route path="contactus" element={<ContactUsInputField />} />
        <Route path="career" element={<ApplyForm/>} />
        <Route path="projects" element={<ProjectShowcase/>} />
        <Route path="biblio" element={<AnimatedPinDemo/>} />
        <Route path="aniabout" element={<StickyScrollRevealDemo/>} />

        
        {/* <Route path="career" element={<ImagesSliderDemo />} /> Enable this for demo */}
      </Routes>
    </ScrollTop>
  );
}

export default App;
