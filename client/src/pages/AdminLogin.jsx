import React, { useState } from 'react';
import { Button, TextInput, Spinner } from "flowbite-react";
import { useNavigate } from 'react-router-dom';

const AdminLogin = ({setIsAuthenticated}) => {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const Navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate server-side authentication
    setTimeout(() => {
      if (formData.username === 'admin' && formData.password === 'admin1234') {
        setIsLoading(false);
        setIsAuthenticated(true)
        Navigate('/admin');
      } else {
        setError('Invalid username or password');
        setIsLoading(false);
      }
    }, 1000);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen w-full">
      <h2 className="text-3xl font-semibold mb-6">Admin Login</h2>
      <form className="flex flex-col gap-4 max-w-[400px] w-full" onSubmit={handleSubmit}>
        <TextInput
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
          placeholder="Username"
          required
        />
        <TextInput
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Password"
          required
        />
        {error && <p className="text-red-500">{error}</p>}
        <Button type="submit" className="w-full">
          {isLoading ? <Spinner /> : 'Login'}
        </Button>
      </form>
    </div>
  );
};

export default AdminLogin;
