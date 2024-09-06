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
      authLogin(`${data.token}`);
      navigate('/');
    } catch (error) {
      console.error('Error logging in', error);
    }
  };

  return (
    <AuthForm
      formData={formData}
      setFormData={setFormData}
      handleSubmit={handleSubmit}
      buttonText="Login"
    />
  );
};

export default Login;
