import React, { useState, useContext } from 'react';
import {  useNavigate } from 'react-router-dom';
import { login } from '../../api/api';
import { AuthContext } from '../../context/AuthContext';
import AuthForm from './AuthForm';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const { login: authLogin } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await login(formData);
      // authlogin me token ko save kr rhe hai ferther use ke liye dusre component me
      authLogin(`${data.token}`);
      navigate('/');
    } catch (error) {
      console.error('Error logging in', error);
    }
  };

  return (
    // yaha login parent authform jo ki child hai uska usko formdata jo ki use state me uper define hai initially empty aur button text bhej rha hai aur baki ke do propes children se email aur password change hone pe yaha use state of parent me change ho ja rha hai
    <AuthForm
      formData={formData}
      setFormData={setFormData}
      handleSubmit={handleSubmit}
      buttonText="login"
    />
  );
};

export default Login;
