import React, {
  MutableRefObject, useEffect, useMemo, useRef,
} from 'react';
import io from 'socket.io-client';
import { PropsChat } from '../../interfaces/interfaces';

const Chat = (props: PropsChat) => {
  const socket = useMemo(() => io('http://localhost:3000', { transports: ['websocket'] }), []);

  useEffect(() => {
    socket.on('connect', () => {
      console.log('abriu a sessão');

      socket.on('receive-message', (data: { message: string }) => console.log(data));
    });
  }, [socket]);

  const sendMessage = () => {
    const message = inpuRef.current.value;
    socket.emit('send-message', { message });
  };

  const inpuRef = useRef() as MutableRefObject<any>;

  return (
    <div>
      <h1>
        Chat
      </h1>
      <ul>
        <li />
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
