import React, { useState } from 'react';
import { Form, Button, FormGroup, FormLabel, FormControl } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login({ setToken }) {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const navigate = useNavigate();

  const [errors, setErrors] = useState({
    email: '',
    server: '', // Added for server-side errors
  });

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validateEmail = (email) => {
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailPattern.test(email);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const emailValid = validateEmail(formData.email);
    setErrors({
      email: emailValid ? '' : 'Invalid email',
      server: '', // Clear server-side error on each login attempt
    });
    if (emailValid) {
      try {
        const response = await axios.post('https://password-reset-6ofd.onrender.com/login/', formData);
        if (response.data.status) {
          const token = response.data.token;
          localStorage.setItem('token', token);
          setToken(token);
          alert('Login Successful');
          navigate('/home');
        } else {
          alert('Invalid Username or Password');
        }
      } catch (error) {
        console.error('Login failed:', error);
      }
      setFormData({
        email: '',
        password: '',
      });
    }
  };

  return (
    <div className='login container'>
      <h2>Login</h2>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <FormLabel>Email</FormLabel>
          <FormControl
            type='email'
            name='email'
            value={formData.email}
            onChange={handleOnChange}
            required
          />
        </FormGroup>
        <FormGroup>
          <FormLabel>Password</FormLabel>
          <FormControl
            type='password'
            name='password'
            value={formData.password}
            onChange={handleOnChange}
            required
          />
        </FormGroup>
        <div style={{ display: 'flex' }}>
          <a href='/forgot'>Forgot Password?</a>
        </div>

        <Button variant='primary' type='submit'>
          Login
        </Button>
      </Form>
      <p>
        Don't have an account? <a href='/signup'>Signup</a>
      </p>
    </div>
  );
}

export default Login;
