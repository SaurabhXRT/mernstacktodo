import React, { useState,  useContext } from 'react';
import {  useNavigate } from 'react-router-dom';
import { register } from '../../api/api';
import { AuthContext } from '../../context/AuthContext';
import AuthForm from './AuthForm';

const Register = () => {
  const [formData, setFormData] = useState({ username: '', email: '', password: '' });
  const { login: authLogin } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await register(formData);
      authLogin(`Bearer ${data.token}`);
      navigate('/');
    } catch (error) {
      console.error('Error registering', error);
    }
  };

  return (
    <AuthForm
      formData={formData}
      setFormData={setFormData}
      handleSubmit={handleSubmit}
      buttonText="Register"
    />
  );
};

export default Register;
