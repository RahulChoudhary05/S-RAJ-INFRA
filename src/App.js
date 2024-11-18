import './App.css';
import { Route, Routes } from "react-router-dom";
import FuzzyOverlayExample from './pages/Home';
import ScrollTop from './components/scrollTop/ScrollTop';
import { About } from './pages/About';
import { ContactUsInputField } from './components/ContactPage/ContactUsInputField';
import ApplyForm from './components/ApplyNow/ApplyForm';
import { ProjectHero } from './pages/ProjectHero';
import ProjectShowcase from './components/Projects/ProjectShowcase';
// import { ImagesSliderDemo } from './pages/ImageSlider';

function App() {
  return (
    <ScrollTop>
      <Routes>
        <Route path="/" element={<FuzzyOverlayExample />} />
        <Route path="about" element={<About />} />
        <Route path="contactus" element={<ContactUsInputField />} />
        <Route path="career" element={<ApplyForm/>} />
        {/* <Route path="projects" element={<ProjectHero/>} /> */}
        <Route path="projects" element={<ProjectShowcase/>} />

        
        {/* <Route path="career" element={<ImagesSliderDemo />} /> Enable this for demo */}
      </Routes>
    </ScrollTop>
  );
}

export default App;
