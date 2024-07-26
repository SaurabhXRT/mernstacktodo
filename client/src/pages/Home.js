import React, { useContext } from 'react';
import Todopage from "./TodoPage";
import { AuthContext } from '../context/AuthContext';

const Home = () => {
  const { authToken } = useContext(AuthContext);
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold">Welcome to TodoApp</h1>
      <p className="mt-2">Manage your tasks efficiently and effectively.</p>
      {authToken &&
        <Todopage />
      }
    </div>
  );
};

export default Home;
