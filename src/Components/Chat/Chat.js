import React, { useState, useEffect, useContext } from 'react';
import io from 'socket.io-client';
import { ChatBody, ChatFooter, ChatHeader, ChatWindow, MessageContainer, MessageContent, MessageText, MessageInfo, Input, SendButton, UserName, ProfilePicture, LeftSection, RightSection, ScrollableChat } from './ChatStyle';
import { IoSend } from "react-icons/io5";
import { FaPhoneAlt, FaVideo } from "react-icons/fa";
import { PiDotsThreeOutlineVerticalFill } from "react-icons/pi";
import { ToastContainer, toast } from 'react-toastify';
import { ThemeContext } from '../../Context/ThemeProvider';
import { ThreeDots } from 'react-loader-spinner';

// Initialize socket connection
const socket = io(process.env.REACT_APP_API_URL);

const Chat = () => {
    // State to manage the list of messages
    const [messageList, setMessageList] = useState([]);

    // State to manage the current message input
    const [newMessage, setNewMessage] = useState('');

    // State to manage the user details
    const [user, setUser] = useState({});

    // Theme context for dark/light mode
    const { isDark } = useContext(ThemeContext);

    // State to manage loading status
    const [isLoading, setIsLoading] = useState(false);

    // Profile image url
    const profileImageUrl = 'https://res.cloudinary.com/du8lwsnk5/image/upload/f_auto,q_auto/profile_image_a73824d0ee';

    // Function to handle sending a new message
    const handleSendMessage = (event) => {
        event.preventDefault();

        if (newMessage.trim()) {
            // Create a message object
            const message = {
                content: newMessage,
                timestamp: new Date().toISOString(),
                userId: user.id
            };

            // socket.emit('sendMessage', message);
            // Add new message to the message list with a flag indicating it is sent by the current user
            setMessageList(prevMessages => [...prevMessages, { ...message, isCurrentUser: true }]);
            setNewMessage('');
            setIsLoading(true);
            socket.emit('sendMessage', message);
        }
    };

    // Function to format timestamp into a readable time string
    const formatTime = (timestamp) => {
        const date = new Date(timestamp);
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });
    };

    useEffect(() => {
        // Retrieve user details from local storage and store in state variable
        const storedUserDetails = JSON.parse(localStorage.getItem('userDetails')) || {};
        setUser(storedUserDetails);

        // Fetch previous messages
        socket.emit('getHistory', storedUserDetails.id);

        // Listen for message history
        socket.on('messageHistory', (previousMessages) => {
            setMessageList(previousMessages.results.map(message => ({ ...message, isCurrentUser: message.userId === storedUserDetails.id })));
        });

        // Listen for incoming message
        socket.on('receiveMessage', (message) => {
            setMessageList(prevMessages => [...prevMessages, { ...message, isCurrentUser: false }]);
            setIsLoading(false);
        });

        // Listen for error messages
        socket.on('error', (error) => {
            toast.error(error.message);
        });

        // Cleanup function to remove socket event listeners on component unmount
        return () => {
            socket.off('receiveMessage');
            socket.off('messageHistory');
            socket.off('error');
        };
    }, []);

    console.log("messageList===>>", messageList);

    return (
        <ChatWindow $isDark={isDark}>
            <ChatHeader $isDark={isDark}>
                <LeftSection>
                    <ProfilePicture src={profileImageUrl} alt="logo" />
                    <UserName>ChatBot</UserName>
                </LeftSection>
                <RightSection>
                    <span><FaVideo /></span>
                    <span><FaPhoneAlt /></span>
                    <span><PiDotsThreeOutlineVerticalFill /></span>
                </RightSection>
            </ChatHeader>

            <ChatBody>
                <ScrollableChat>
                    {messageList.map((message) => (
                        <MessageContainer key={message.id} $isCurrentUser={message.isCurrentUser}>
                            {!message.isCurrentUser && <ProfilePicture src={profileImageUrl} alt="profile-image" />}
                            <MessageContent $isCurrentUser={message.isCurrentUser}>
                                <MessageText>{message.content}</MessageText>
                                <MessageInfo>{formatTime(message.timestamp)}</MessageInfo>
                            </MessageContent>
                        </MessageContainer>
                    ))}
                    {isLoading && (
                        <MessageContainer>
                        <ProfilePicture src={profileImageUrl} alt="profile-image" />
                            <MessageContent $isLoading={isLoading}>
                                <ThreeDots
                                    visible={true}
                                    height="10"
                                    width="30"
                                    color="#081c34"
                                    ariaLabel="three-dots-loading"
                                />
                            </MessageContent>
                        </MessageContainer>
                    )}
                </ScrollableChat>
            </ChatBody>

            <ChatFooter>
                <form onSubmit={handleSendMessage}>
                    <Input
                        type="text"
                        value={newMessage}
                        onChange={(event) => setNewMessage(event.target.value)}
                        placeholder="Type a message..."
                    />
                    <SendButton type='submit' disabled={isLoading}>
                        <IoSend size={20} />
                    </SendButton>
                </form>
            </ChatFooter>
            <ToastContainer />
        </ChatWindow>
    );
};

export default Chat;