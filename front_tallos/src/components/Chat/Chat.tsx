import React, {
  MutableRefObject, useEffect, useMemo, useRef, useState,
} from 'react';
import { useLocation } from 'react-router-dom';
import io from 'socket.io-client';
import { Message, PropsChat } from '../../interfaces/interfaces';

const Chat = (props: PropsChat) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const location = useLocation();

  const queryParams: any = useMemo(() => {
    const query = new URLSearchParams(location.search);
    return {
      group_id: query.get('group_id'),
      name: query.get('name'),
    };
  }, [location]);

  const socket = useMemo(() => io('http://localhost:3000', { transports: ['websocket'], query: { name: queryParams.name, group_id: queryParams.group_id } }), [queryParams]);

  useEffect(() => {
    socket.on('connect', () => {
      console.log('abriu a sessão');

      socket.on('receive-message', (data: { message: string, name: string }) => {
        console.log(data);
        setMessages((prevState) => [...prevState, data]);
      });
    });
  }, [socket]);

  const sendMessage = () => {
    const message = inpuRef.current.value;
    inpuRef.current.value = '';
    socket.emit('send-message', { message });
    const { name } = queryParams;
    const data = { message, name };
    setMessages((prevState) => [...prevState, data]);
  };

  const inpuRef = useRef() as MutableRefObject<any>;

  return (
    <div>
      <h1>
        Chat
        {' '}
        {queryParams.name}
      </h1>
      <ul>
        {messages.map((message, index) => (
          <li key={index}>
            {message.name}
            {' '}
            -
            {' '}
            {message.message}
          </li>
        ))}
      </ul>
      <p>
        <label htmlFor="message">Message:</label>
        <input type="text" id="message" ref={inpuRef} />
        <button type="button" onClick={() => sendMessage()}>Enviar</button>
      </p>
    </div>
  );
};

export default Chat;
