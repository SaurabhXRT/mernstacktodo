import React, { useContext } from 'react';
import { BrowserRouter as Router, Route, Routes, } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { AuthProvider, AuthContext } from './context/AuthContext';
import Navbar from './components/Layout/Navbar';
import Home from './pages/Home';
import TodoPage from './pages/TodoPage';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';

const App = () => {
  const { authToken } = useContext(AuthContext);

  return (

    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register/>} />
      </Routes>
    </Router>
  );
};

export default App;
