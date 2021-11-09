import React from 'react';

type Props = {
  id: string;
  name: string;
}

const Chat = (props: Props) => (
  <div>
    <h1>
      Chat
      {' '}
      {props.name}
      {props.id}
    </h1>
  </div>
);

export default Chat;
