// import React, { useState, useEffect } from 'react';
// import SockJS from 'sockjs-client';
// import { Client } from '@stomp/stompjs';

// const ChatComponent = () => {
//     const [stompClient, setStompClient] = useState(null);
//     const [messages, setMessages] = useState([]);
//     const [inputMessage, setInputMessage] = useState('');

//     useEffect(() => {
//         //const socket = new SockJS('http://localhost:8086/ws');
//         const stomp = new Client({
//             webSocketFactory: () => new SockJS('http://localhost:8086/ws'),
//             reconnectDelay: 5000,
//             heartbeatIncoming: 4000,
//             heartbeatOutgoing: 4000,
//         });

//         stomp.onConnect = () => {
//             setStompClient(stomp);
//         };

//         stomp.activate();

//         return () => {
//             if (stomp.connected) {
//                 stomp.deactivate();
//             }
//         };
//     }, []);

//     const handleInputChange = (e) => {
//         setInputMessage(e.target.value);
//     };

//     const handleSendMessage = () => {
//         if (stompClient && inputMessage.trim() !== '') {
//             stompClient.publish({
//                 destination: '/app/chat',
//                 body: JSON.stringify({ content: inputMessage }),
//             });
//             setInputMessage('');
//         }
//     };

//     useEffect(() => {
//         if (stompClient) {
//             const subscription = stompClient.subscribe('/topic/messages', (message) => {
//                 setMessages((prevMessages) => [...prevMessages, JSON.parse(message.body)]);
//             });

//             return () => {
//                 subscription.unsubscribe();
//             };
//         }
//     }, [stompClient]);

//     return (
//         <div>
//             <div>
//                 {messages.map((msg, index) => (
//                     <div key={index}>{msg.content}</div>
//                 ))}
//             </div>
//             <input type="text" value={inputMessage} onChange={handleInputChange} />
//             <button onClick={handleSendMessage}>Send</button>
//         </div>
//     );
// };

// export default ChatComponent;
