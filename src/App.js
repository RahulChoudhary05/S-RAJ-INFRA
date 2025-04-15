import './App.css';
import { Route, Routes } from "react-router-dom";
import FuzzyOverlayExample from './pages/Home';
import ScrollTop from './components/scrollTop/ScrollTop';
import { About } from './pages/About';
import ApplyForm from './components/ApplyNow/ApplyForm';
import ProjectShowcase from './components/Projects/ProjectShowcase';
import { ContactForm } from './components/ContactUs/ContactForm';
import NoPage from './pages/noPage/NoPage';
import Media from './pages/Media';

function App() {
  return (
    <ScrollTop>
      <Routes>
        <Route path="/" element={<FuzzyOverlayExample />} />
        <Route path="/about" element={<About />} />
        <Route path="/career" element={<ApplyForm/>} />
        <Route path="/projects" element={<ProjectShowcase/>} />
        <Route path="/media" element={<Media/>}/>
        <Route path="/contactus" element={<ContactForm/>} />
        <Route path="/*" element={<NoPage/>}/>
      </Routes>
    </ScrollTop>
  );
}

export default App;
