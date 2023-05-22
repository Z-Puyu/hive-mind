import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from "./pages/home";
import Login from "./pages/login";
import Navbar from "./components/navbar";
import Notes from "./pages/notes";
import TexInput from './components/TexInput';

function App() {
  return (
    <div className = 'App'> 
      <Router>
        <Navbar />
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/notes" element={<Notes />} />
            <Route path="*" element={<h1>PAGE NOT FOUND</h1>} />
        </Routes>
    </Router>
    </div>
  );
}

export default App;
