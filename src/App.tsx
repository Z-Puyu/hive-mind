import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from "./pages/Home";
import Login from "./pages/Login";
import Navbar from "./components/Navbar";
import Editor from './pages/Editor';

export default function App() {
  return (
    <div className = 'App'> 
      <Router>
        <Navbar />
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/editor" element={<Editor />} />
            <Route path="*" element={<h1>PAGE NOT FOUND</h1>} />
        </Routes>
    </Router>
  </div>)
}