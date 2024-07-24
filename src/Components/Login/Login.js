import React, { useEffect, useState } from 'react'
import axios from '../../Config';
import { Button, Container, Form, InputField, AuthContainer, Logo, NavigateLink, ErrorMessage } from '../Signup/SignupStyle'
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Oval } from 'react-loader-spinner';


const Login = () => {

  // State to manage user input
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // State to manage form validation errors and API errors
  const [errors, setErrors] = useState({});

  // State to manage loading status
  const [isLoading, setIsLoading] = useState(false);

  // Navigation function
  const navigate = useNavigate();

   // Logo url
   const chatAppLogoUrl = 'https://res.cloudinary.com/du8lwsnk5/image/upload/f_auto,q_auto/chat_app_logo_2d680deb57';

  // Function to validate the login form
  const validateForm = () => {
    const validationErrors = {};

    if (!email.trim()) {
      validationErrors.email = 'Email is required';
    }

    if (!password.trim()) {
      validationErrors.password = 'Password is required';
    }

    setErrors(validationErrors);

    // Returning true if there are no validation errors
    return Object.keys(validationErrors).length === 0;
  };

  // Function to handle form submission
  const handleLogin = async (event) => {
    event.preventDefault();
    if (validateForm()) {
      setIsLoading(true);
      try {
        const response = await axios.post('/api/auth/local', { identifier: email, password });
        if (response.status === 200) {
          localStorage.setItem('token', response.data.jwt);
          localStorage.setItem('userDetails', JSON.stringify(response.data.user));
          toast.success('Login Success');
          setTimeout(() => navigate('/'), 1000);
        }
      } catch (error) {
        console.error('Login failed:', error.response?.data?.error?.message);
        setErrors({ apiError: error.response?.data?.error?.message });
        toast.error('Login failed. Please try again.');
      } finally {
        setIsLoading(false);
      }
    }
  };

  // Check for existing token and redirect to home if present
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      navigate('/');
    }
  }, [navigate]);

  return (
    <Container>
      <AuthContainer>
        <Logo src={chatAppLogoUrl} alt="logo" />
        <Form onSubmit={handleLogin}>
          <InputField
            type='email'
            placeholder='Email'
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
          {errors.email && <ErrorMessage>{errors.email}</ErrorMessage>}
          <InputField
            type='password'
            placeholder='Password'
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
          {errors.password && <ErrorMessage>{errors.password}</ErrorMessage>}
          <Button type='submit' disabled={isLoading}>{isLoading ? <Oval
            visible={true}
            height="20"
            color="#f8f9fa"
            ariaLabel="oval-loading"
          /> : 'Login'}</Button>
          {errors.apiError && <ErrorMessage>{errors.apiError}</ErrorMessage>}
        </Form>
        <p>
          Create an account?<NavigateLink to='/signup'>Register</NavigateLink>
        </p>
      </AuthContainer>
      <ToastContainer
        closeOnClick
        draggable
        closeButton={false}
        autoClose={2000}
        loading={true}
      />
    </Container>
  )
}

export default Login