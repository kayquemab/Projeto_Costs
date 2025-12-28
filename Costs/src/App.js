import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './components/pages/Home';
import Company from './components/pages/Company';
import Contact from './components/pages/Contact';
import NewProject from './components/pages/NewProject';

import Container from './components/layout/Container';
import Navbar from './components/Navbar';
import Footer from './components/Footer'
import Projects from './components/pages/Projects';
import Project from './components/pages/Project';

function App() {
  return (
    <Router>

    <Navbar/>

      <Container customClass="min-height">
        <Routes>

          {/* Home */}
          <Route path="/" element={<Home />} />

          {/* Company */}
          <Route path="/Company" element={<Company />} />

          {/* Contact */}
          <Route path="/Contact" element={<Contact />} />

          {/* Company */}
          <Route path="/Projects" element={<Projects />} />

          {/* New Project */}
          <Route path="/NewProject" element={<NewProject />} />

          {/* New Project */}
          <Route path="/Project/:id" element={<Project />} />

        </Routes>
      </Container>

      <Footer/> 
      
    </Router>
  );
}

export default App;
