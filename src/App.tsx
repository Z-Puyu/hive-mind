import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./components/navigation/NavBar";
import Editor from "./pages/Editor";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Home from "./pages/Home";
import { MathJaxContext } from "better-react-mathjax";
import { mathjaxConfig } from "./config/MathJax";
import Registration from "./pages/Registration";
import ResetPassword from "./pages/ResetPassword";
import UserProfile from "./pages/UserProfile";

export default function App(): JSX.Element {
  return (
    <div
      className="webpage"
      suppressContentEditableWarning={true}
    >
      <MathJaxContext
        version={3}
        config={mathjaxConfig}
      >
        <Router>
          <Navbar />
          <div
            className="remainingPage"
            suppressContentEditableWarning={true}
          >
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/authentication" element={<Login />} />
              <Route path="/register" element={<Registration />} />
              <Route path="/reset-password" element={<ResetPassword />} />
              <Route path="/user-profile" element={<UserProfile />} />
              <Route path="/editor/:userId/:ownerId/:projId" element={<Editor />} />
              <Route path="*" element={<h1>PAGE NOT FOUND</h1>} />
            </Routes>
          </div>
        </Router>
      </MathJaxContext>
    </div>
  );
};