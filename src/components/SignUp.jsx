import React ,{useState}from 'react'
import { Form, Button, FormGroup, FormLabel, FormControl } from 'react-bootstrap';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';

function SignUp() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: ""
    });
    const navigate = useNavigate();
    const handleOnChange = (e) => {
        e.persist();
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    }


    const handleSubmit = (event) => {
        event.preventDefault();
        axios.post('https://password-reset-6ofd.onrender.com/signin/verify', formData)
        .then(response => {
            if (response.data === true) {
                alert('Registration Successful! Please check your registered email.');
                navigate('/'); 
            } else if (response.data === false) {
                alert('User already exists');
            }
        })
        .catch(error => {
            console.error('Registration failed:', error);
        });

      
        
        setFormData({
            name: "",
            email: "",
            password: ""
        });
    }
  return (
    <div className='signup container'>
            <h2 className='signup-title'>Registration Form</h2>
            <Form onSubmit={handleSubmit}>
                <FormGroup>
                    <FormLabel>Name </FormLabel>
                    <FormControl
                        type='text'
                        name='name'
                        value={formData.name}
                        onChange={handleOnChange}
                        required
                    />
                </FormGroup>
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
                    <FormLabel>Password </FormLabel>
                    <FormControl
                        type='password'
                        name='password'
                        value={formData.password}
                        onChange={handleOnChange}
                        required
                    />
                </FormGroup>
                <Button variant='primary' type='submit'>Register</Button>
            </Form>
            <p>Already have an Account? <a href='/'>Login</a></p>
        </div>
  )
}

export default SignUp