import React, {
  MutableRefObject, useEffect, useMemo, useRef, useState,
} from 'react';
import { useLocation } from 'react-router-dom';
import io, { Socket } from 'socket.io-client';
import { Message, PropsChat } from '../../interfaces/interfaces';
import useHooks from '../../hooks/useHooks';

const Chat = (props: PropsChat) => {
  const { userNameLocal } = useHooks();
  const location = useLocation();
  const [messages, setMessages] = useState<Message[]>([]);

  const queryParams: any = useMemo(() => {
    const query = new URLSearchParams(location.search);
    return {
      group_id: query.get('group_id'),
      name: query.get('name'),
    };
  }, [location]);

  const socket = useMemo<Socket>(() => io('http://18.191.227.58:3000', { transports: ['websocket'], query: { name: queryParams.name, group_id: queryParams.group_id } }), [queryParams]);

  useEffect(() => {
    socket.on('connect', () => {
      console.log('abriu a sessão');

      socket.on('receive-message', (data: { message: string, name: string }) => {
        setMessages((prevState) => [...prevState, data]);
      });
    });
  }, [socket]);

  const inpuRef = useRef() as MutableRefObject<any>;

  const sendMessage = () => {
    const message = inpuRef.current.value;
    socket.emit('send-message', { message });
    const name = userNameLocal as string;
    const data = { message, name };
    setMessages((prevState) => [...prevState, data]);
    inpuRef.current.value = '';
  };

  return (
    <div>
      <h1>
        Chat
        {' '}
        {queryParams.name}
      </h1>
      <ul>
        {messages.map((message, key) => (
          <li key={key}>
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
