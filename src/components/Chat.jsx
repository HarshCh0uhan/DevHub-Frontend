import React, { useEffect, useState, useRef } from 'react';
import { Send } from 'lucide-react';
import { useParams } from 'react-router-dom';
import createSocketConnection from '../utils/socket';
import { useSelector } from 'react-redux';
import { BASE_URL } from '../utils/constants';
import axios from 'axios';

export default function Chat() {

  const {targetUserId} = useParams();
  
  const [messages, setMessages] = useState([]);
  const [newMessages, setNewMessages] = useState('');

  const [error, setError] = useState("")

  const user = useSelector(store => store.user);

  const userId = user?._id

  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const fetchChat = async () => {
    try {

      const res = await axios.get(BASE_URL + "/chat/" + targetUserId, {withCredentials: true})

      
      console.log(res.data.messages);
      const chat = res.data.messages.map((text) => {
        return {
          firstName: text?.senderId?.firstName,
          lastName: text?.senderId?.lastName,
          text: text?.text,
          photoUrl: text?.senderId?.photoUrl,
        }
      })
      
      setMessages(chat)
      
    } catch (err) {
      setError(err?.response?.data)
    }
  }

  useEffect(() => {
    fetchChat()
  }, [])

  useEffect(() => {
    if(!userId || !targetUserId) return;

    // Creating a new WebSocket connection
    const socket = createSocketConnection();

    // as soon as the page loads the socket connection is established and joinChat event is emitted
    socket.emit("joinChat", {firstName: user?.firstName, lastName: user?.lastName, userId, targetUserId});

    socket.on("receivedMessage", ({firstName, lastName, text, photoUrl}) => {
        console.log(firstName + " " + lastName + " : " + text);
        setMessages((messages) => [...messages, { firstName, lastName, text, photoUrl }]);
    })

    // This will hel in disconnectiong the socket connection when the component is unloaded
    return () => {
        socket.disconnect();
    }
  }, [userId, targetUserId]);

  const sendMessage = () => {

        if(!newMessages) return;
    
        const socket = createSocketConnection();
    
        socket.emit("sendMessage", {firstName: user.firstName, lastName: user.lastName, userId, targetUserId, text: newMessages, photoUrl: user.photoUrl || "default-avatar.jpg"});

        setNewMessages("");
      }

  return (
    <div className="w-3/4 mx-auto border border-gray-600 m-5 h-[70vh] flex flex-col">
      <h1 className="p-5 border-b border-gray-600">Chat</h1>
      <div className="flex-1 overflow-scroll p-5">
        {messages.map((msg, index) => {
          return (
            <div key={index} className={`chat ${user?.firstName === msg?.firstName ? "chat-end" : "chat-start"}`}>
              <div className="chat-image avatar">
                <div className="w-10 rounded-full">
                <img alt={`${msg.firstName}'s avatar`} src={msg.photoUrl || "default-avatar.jpg"} />
                </div>
              </div>
              <div className="chat-header">
                {`${msg.firstName} ${msg.lastName}`}
                <time className="text-xs opacity-50"> 2 hours ago</time>
              </div>
              <div className="chat-bubble">{msg.text}</div>
              <div className="chat-footer opacity-50">Seen</div>
            </div>
          );
        })}
        <div ref={bottomRef} />
      </div>
        <div className="flex gap-2 p-4 bg-navy">
          <input
            type="text"
            placeholder="Type your message..."
            className="flex-1 bg-gray-700 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={newMessages}
            onChange={(e) => setNewMessages(e.target.value)}
          />
          <button
            type="submit"
            className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            onClick={sendMessage}
          >
            <Send size={20} />
          </button>
        </div>
    </div>
  );
}