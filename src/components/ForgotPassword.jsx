import React, { useState} from 'react';
import { Form, Button, FormGroup, FormLabel, FormControl } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


function ForgotPassword() {
  const [formData, setFormData] = useState({
    email: "",
    newpassword: "",
    confirmpassword: "",
  });
  const navigate = useNavigate();
  
 

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('https://password-reset-6ofd.onrender.com/forgot/verify', formData);
      if (response.data === true) {
        alert('Password Reset Link sent successfully. Please check your registered email.');
        navigate('/'); 
      } else if (response.data === false) {
        alert('User does not exist');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className='signup container'>
      <h2 className='signup-title'>Password Reset</h2>
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
          <Button variant='primary' type='submit'>
            Password Reset
          </Button>
        </Form>
 
      <p>Already have an Account? <a href='/'>Login</a></p>
    </div>
  );
}

export default ForgotPassword;
