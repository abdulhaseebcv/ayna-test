import React, { useContext } from 'react'
import Header from '../Components/Header/Header'
import Chat from '../Components/Chat/Chat'
import styled from "styled-components"
import ThemeToggle from '../Components/ThemeToggle/ThemeToggle';
import { ThemeContext } from '../Context/ThemeProvider';

export const PageContainer = styled.div`
display: flex;
flex-direction: column;
align-items: center;
overflow-y: hidden;
gap: 50px;
height: 100vh;
background: ${props => (props.$isDark ? '#333f4c' : '#f8f9fa')};
@media (max-width: 600px) {
   gap: 30px;
  }
@media (max-width: 450px) {
   gap: 20px;
  }
`;

const HomePage = () => {
  const { isDark } = useContext(ThemeContext);
  return (
    <PageContainer $isDark={isDark}>
      <Header />
      <ThemeToggle />
      <Chat />
    </PageContainer>
  )
}

export default HomePage