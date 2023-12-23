import React, { useState, useEffect } from 'react';
import { Form, Button, FormGroup, FormLabel, FormControl } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function PasswordChangePage() {
  const [formData, setFormData] = useState({
    newpassword: "",
    confirmpassword: "",
  });

  const [validToken, setValidToken] = useState(null); // Updated to include a loading state
  const [passwordError, setPasswordError] = useState("");
  const navigate = useNavigate();

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });

    // Reset password error message when either new password or confirm password changes
    if (name === "newpassword" || name === "confirmpassword") {
      setPasswordError("");
    }
  };

  const handlePassSubmit = async (event) => {
    event.preventDefault();
    try {
      if (validToken) {
        if (formData.newpassword !== formData.confirmpassword) {
          setPasswordError("Passwords do not match");
          return;
        }
        if (formData.newpassword.length < 8) {
          setPasswordError("Password must be at least 8 characters");
          return;
        }
        const token = window.location.pathname.split('/resetpassword/')[1];
        const response = await axios.post('https://password-reset-6ofd.onrender.com/forgot/change', {
          token: token,
          newpassword: formData.newpassword,
          confirmpassword: formData.confirmpassword,
        });

        if (response.data === true) {
          alert('Password Changed.');
          navigate('/');
        } else if (response.data === false) {
          alert('User does not exist');
        }
        setFormData({
          newpassword: "",
          confirmpassword: "",
        });
      } else {
        alert('Token Expired');
      }
    } catch (error) {
      alert("Internal Server Error : ", error);
    }
  };

  const verifyToken = async () => {
    try {
      const token = window.location.pathname.split('/resetpassword/')[1];
      const response = await axios.post('https://password-reset-6ofd.onrender.com/forgot/token', { token });
      setValidToken(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    verifyToken();
  }, []);

  return (
    <>
      {validToken === null ? ( // Display loading state initially
        <div>Loading...</div>
      ) : validToken ? (
        <div className='signup container'>
          <h2 className='signup-title'>Change Password</h2>
          <Form onSubmit={handlePassSubmit}>
            <FormGroup>
              <FormLabel>New Password</FormLabel>
              <FormControl
                type='password'
                name='newpassword'
                value={formData.newpassword}
                onChange={handleOnChange}
                required
              />
            </FormGroup>
            <FormGroup>
              <FormLabel>Confirm Password</FormLabel>
              <FormControl
                type='password'
                name='confirmpassword'
                value={formData.confirmpassword}
                onChange={handleOnChange}
                required
              />
              {passwordError && <p style={{ color: 'red' }}>{passwordError}</p>}
            </FormGroup>
            <Button variant='primary' type='submit'>
              Change Password
            </Button>
          </Form>
          <p>Already have an Account? <a href='/'>Login</a></p>
        </div>
      ) : (
        <div>
          <h4>Token Expired or Invalid Link</h4>
          <h6>Please Retry again <a href='/forgot'>  Click Here to Redirect</a></h6>
        </div>
      )}
    </>
  );
}

export default PasswordChangePage;
