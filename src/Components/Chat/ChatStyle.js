import styled from "styled-components";
import ScrollToBottom from "react-scroll-to-bottom";

export const ChatWindow = styled.div`
display: flex;
flex-direction: column;
width: 100%;
max-width: 600px;
height: 55vh;
background: ${props => (props.$isDark ? '#111111' : '#e5e5e5')};
border: none;
border-radius: 10px;

@media (max-width: 650px) {
    width: 80%;
    height: 70vh;
}
@media (max-width: 450px) {
    max-width: 100%;
}
`;

export const ChatHeader = styled.div`
display: flex;
align-items: center;
justify-content: space-between;
padding: 10px;
box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
background: ${props => (props.$isDark ? '#232323' : '#081c34')};
border-radius: 10px 10px 0 0;
color: #ffffff;
`;

export const LeftSection = styled.div`
display: flex;
gap: 10px;
align-items: center;
`;

export const RightSection = styled.div`
display: flex;
gap: 15px;
align-items: center;
span {
    cursor: pointer;
    font-size: 20px;
    display: flex;
    align-items: center;
    &:hover {
        color: #6c757d;
    }
    }
`;

export const ProfilePicture = styled.img`
height: 30px;
border-radius: 50%;
`;

export const UserName = styled.span`
font-weight: bold;
font-size: clamp(15px, 1.2vw, 18px);
`;

export const ChatBody = styled.div`
overflow-y: auto;
display: flex;
flex-direction: column;
flex: 1;
`;

export const MessageContainer = styled.div`
padding: 10px;
display: flex;
gap: 5px;
align-items: center;
justify-content: ${props => (props.$isCurrentUser ? 'flex-end' : 'flex-start')};
`;

export const MessageContent = styled.div`
max-width: 60%;
padding: 7px 10px;
border-radius: 10px;
background: ${props => (props.$isCurrentUser ? '#cce3de' : '#f8f9fa')};
display: flex;
flex-direction: ${props => (props.$isLoading ? 'row' : 'column')};
align-items: ${props => (props.$isCurrentUser ? 'flex-end' : 'flex-start')};;
justify-content: center;
word-break: break-word;
overflow-wrap: break-word;
gap: ${props => (props.$isLoading ? '10px' : '0')}; 
@media(max-width:550px){
    padding: 5px 8px;
}
`;

export const MessageText = styled.span`
font-size: clamp(15px, 1.14vw, 17px);
`;

export const MessageInfo = styled.small`
font-size: 12px;
color: #6c757d;
padding-top: 5px;
`;

export const ChatFooter = styled.div`
width: 100%;

form {
    display: flex;
    align-items: center;
    padding: 13px;
    border-top: 1px solid #ccc;
    background: #e9ecef;
    height: 100%;
    border-radius: 0 0 10px 10px;
    }
`;

export const Input = styled.input`
flex: 1;
height: 100%;
border: 1px solid #ccc;
border-radius: 5px;
margin-right: 10px;
padding-left: 10px;
outline: none;
`;

export const SendButton = styled.button`
padding: 10px 20px;
background: #081c34;
color: #fff;
border: none;
border-radius: 5px;
cursor: pointer;
transition: 0.1s ease-in-out;

&:hover {
    background: #0056b3;
    }
`;

export const ScrollableChat = styled(ScrollToBottom)`
overflow-y: auto; 
`;

export const LoadingContainer = styled.div`
display: flex;
justify-content: center;
align-items: center;
height: 100%;
flex-direction: column;
gap: 5px;
font-size: 13px;
`;
