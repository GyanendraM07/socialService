import React, { useState, useEffect } from 'react';
import SockJS from 'sockjs-client';
import { Client } from '@stomp/stompjs';

const ChatApp = () => {
  const [stompClient, setStompClient] = useState(null);
  const [currentUser, setCurrentUser] = useState('');
  const [users, setUsers] = useState(['yash','kajal','Demo']);
  const [selectedUser, setSelectedUser] = useState('');
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');

  useEffect(() => {
    const stomp = new Client({
      webSocketFactory: () => new SockJS('http://localhost:8086/ws'),
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
    });

    stomp.onConnect = () => {
      setStompClient(stomp);
    };

    stomp.activate();

    return () => {
      if (stomp.connected) {
        stomp.deactivate();
      }
    };
  }, []);

  const handleLogin = () => {
    if (stompClient && currentUser.trim() !== '') {
        debugger;
      stompClient.publish({
        destination: `/app/user/${currentUser}`,
        body: '',
      });
    }
  };

  const handleUserSelect = (user) => {
    setSelectedUser(user);
    setMessages([]); // Clear previous messages when selecting a new user
  };

  const handleInputChange = (e) => {
    setInputMessage(e.target.value);
  };

  const handleSendMessage = () => {
    debugger;
    if (stompClient && inputMessage.trim() !== '' && selectedUser.trim() !== '' && currentUser.trim() !== '') {
      stompClient.publish({
        destination: `/app/chat/${currentUser}/${selectedUser}`,
        body: JSON.stringify({ content: inputMessage, sender: currentUser }),
      });
      setInputMessage('');
    }
  };

  useEffect(() => {
    if (stompClient) {
      const subscription = stompClient.subscribe(`/topic/users`, (username) => {
        console.log("userList.body");
        debugger;

        //setUsers(JSON.parse(userList.body));
      });

      return () => {
        subscription.unsubscribe();
      };
    }
  }, [stompClient]);

//   useEffect(() => {
//     if (stompClient && currentUser) {
//       const subscription = stompClient.subscribe(`/topic/messages/${currentUser}`, (message) => {
//         setMessages((prevMessages) => [...prevMessages, JSON.parse(message.body)]);
//       });

//       return () => {
//         subscription.unsubscribe();
//       };
//     }
//   }, [stompClient, currentUser]);
useEffect(() => {
    if (stompClient && currentUser && selectedUser) {
      // Subscribe to messages sent to the current user
      const currentUserSubscription = stompClient.subscribe(`/topic/messages/${currentUser}/${selectedUser}`, (message) => {
        setMessages((prevMessages) => [...prevMessages, { ...JSON.parse(message.body), isSender: false }]);
      });
  
      // Subscribe to messages sent by the current user
      const senderUserSubscription = stompClient.subscribe(`/topic/messages/${selectedUser}/${currentUser}`, (message) => {
        setMessages((prevMessages) => [...prevMessages, { ...JSON.parse(message.body), isSender: true }]);
      });
  
      return () => {
        currentUserSubscription.unsubscribe();
        senderUserSubscription.unsubscribe();
      };
    }
  }, [stompClient, currentUser, selectedUser]);

  return (
    <div>
      <div>
        <label>
          User Name:
          <input type="text" value={currentUser} onChange={(e) => setCurrentUser(e.target.value)} />
          <button onClick={handleLogin}>Login</button>
        </label>
      </div>
      <div>
        <div>
          <strong>Users:</strong>
          <ul>
            {users.map((user) => (
              <li key={user} onClick={() => handleUserSelect(user)}>
                {user}
              </li>
            ))}
          </ul>
        </div>
        {selectedUser && (
          <div>
            <strong>Chat with {selectedUser}:</strong>
            <div style={{ height: '200px', overflowY: 'scroll', border: '1px solid #ccc', marginBottom: '10px' }}>
              {messages.map((msg, index) => (
                <div key={index}>
                  {msg.sender === currentUser ? 'You' : msg.sender}: {msg.content}
                </div>
              ))}
            </div>
            <div>
              <label>
                Message:
                <input type="text" value={inputMessage} onChange={handleInputChange} />
              </label>
              <button onClick={handleSendMessage}>Send</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatApp;
