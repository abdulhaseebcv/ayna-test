import React, { useEffect, useState } from 'react'
import { LeftSection, Logo, RightSection, Row } from './HeaderStyle'
import { MdLogout } from "react-icons/md";
import { useNavigate } from 'react-router-dom';

const Header = () => {
  // State to store user details
  const [user, setUser] = useState({});

  // For navigation
  const navigate = useNavigate();

  // Logo Url
  const chatAppLogoUrl = 'https://res.cloudinary.com/du8lwsnk5/image/upload/f_auto,q_auto/chat_app_logo_2d680deb57';

  // Handling user logout
  const handleLogOut = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userDetails');
    localStorage.removeItem('theme');
    navigate('/login');
  }

  // Fetch and set user details when the component mounts
  useEffect(() => {
    const getUserDetails = () => {
      const userDetails = localStorage.getItem('userDetails');
      setUser(JSON.parse(userDetails) || {});
    };

    getUserDetails();
  }, []);

  return (
    <Row>
      <LeftSection>
        <Logo src={chatAppLogoUrl} alt="logo" />
        {user?.username && <h2>{`Welcome ${user?.username}`}</h2>}
      </LeftSection>
      <RightSection>
        <button onClick={handleLogOut}>Log Out <span><MdLogout size={20} /></span></button>
      </RightSection>
    </Row>
  )
}

export default Header
