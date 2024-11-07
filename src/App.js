import './App.css';
import { Route, Routes } from "react-router-dom";
import FuzzyOverlayExample from './pages/Home';
import ContactUsForm from './components/ContactPage/ContactUsForm';
import ScrollTop from './components/scrollTop/ScrollTop';

function App() {
  return (
    <ScrollTop>
      <Routes>
        <Route path="/" element={<FuzzyOverlayExample />} /> {/* Main Route for Home */}
        <Route path="contact" element={<ContactUsForm />} /> {/* Route for Contact Us */}
      </Routes>
    </ScrollTop>
  );
}

export default App;
