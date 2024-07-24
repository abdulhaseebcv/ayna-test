import React, { useEffect, useState } from 'react'
import axios from '../../Config';
import { Button, Container, Form, InputField, AuthContainer, Logo, NavigateLink, ErrorMessage } from './SignupStyle'
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Oval } from 'react-loader-spinner';


const Signup = () => {
  // State to manage user input
  const [username, setUsername] = useState('');
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

    if (!username.trim()) {
      validationErrors.username = "Username is required";
    } else if (username.trim().length < 3) {
      validationErrors.username = "Username must be at least 3 characters long";
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim()) {
      validationErrors.email = 'Email is required';
    } else if (!emailPattern.test(email)) {
      validationErrors.email = 'Enter a valid email address';
    }

    if (!password.trim()) {
      validationErrors.password = 'Password is required';
    } else if (password.trim().length < 6) {
      validationErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(validationErrors);

    // Returning true if there are no validation errors
    return Object.keys(validationErrors).length === 0;
  };

  const handleSignup = async (event) => {
    event.preventDefault();
    if (validateForm()) {
      setIsLoading(true);
      try {
        const response = await axios.post('/api/auth/local/register', { username, email, password });
        if (response.status === 200) {
          toast.success('Registration successful');
          setTimeout(() => navigate('/login'), 1000);
        }
      } catch (error) {
        setErrors({ apiError: error.response?.data?.error?.message });
        toast.error('Registration failed. Please try again.');
      } finally {
        setIsLoading(false);
      }
    }
  };
  

  useEffect(() => {
    // Checking if a token is present in local storage
    const token = localStorage.getItem('token');
    if (token) {
      navigate('/');
    }
  }, [navigate]);

  return (
    <Container>
      <AuthContainer>
        <Logo src={chatAppLogoUrl} alt="logo" />
        <Form onSubmit={handleSignup}>
          <InputField
            type='text'
            placeholder='Username'
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
          {errors.username && <ErrorMessage>{errors.username}</ErrorMessage>}
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
          <Button type='submit' disabled={isLoading}> {isLoading ? <Oval
            visible={true}
            height="20"
            color="#f8f9fa"
            ariaLabel="oval-loading"
          /> : 'Register'}</Button>
          {errors.apiError && <ErrorMessage>{errors.apiError}</ErrorMessage>}
        </Form>
        <p>
          Already have an account?<NavigateLink to='/login'>Login</NavigateLink>
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

export default Signup