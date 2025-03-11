import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import "./styles.css";
import FlatInfo from "./components/Flatinfo";
import UserChat from "./components/UserChat";
import Spareroom from "./components/Spareroom";


const isAuthenticated = () => {
  return !!localStorage.getItem("userId");
};

const ProtectedRoute = ({ element }) => {
  return isAuthenticated() ? element : <Navigate to="/" />;
};

const App = () => {
  return (
    <Router>
      <Routes>
         {/* <Route path="/" element={<LoginSignup />} /> 
        <Route path="/home" element={<ProtectedRoute element={<Home />} />} />
        <Route path="/chat" element={<ProtectedRoute element={<Chatbot />} />} />
        <Route path="/room-wanted-ad" element={<ProtectedRoute element={<AddProfile userId={localStorage.getItem("userId")} />} />} />
        <Route path="*" element={<Navigate to={isAuthenticated() ? "/home" : "/"} />} />  */}
        {/* <Route path="/flat-info"  element={<FlatInfo />} /> */}
       <Route path="/Flat-Info" element={<FlatInfo />} />
       <Route path="/user-chat" element={<UserChat />} />
       <Route path="/Spareroom" element={<Spareroom />} />
      
      </Routes>
    </Router>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);