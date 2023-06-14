import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./components/NavBar";
import Editor from "./pages/Editor";
import Home from "./pages/Home";
import Login from "./pages/Login";

export default function App(): JSX.Element {
  return (
    <div>
      {/* <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Editor" element={<Editor />} />
          <Route path="*" element={<h1>PAGE NOT FOUND</h1>} />
        </Routes>
      </Router> */}
      <Editor />
    </div>
  );
};