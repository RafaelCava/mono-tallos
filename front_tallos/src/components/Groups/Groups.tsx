/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable react/button-has-type */
import axios from 'axios';
import React, {
  MutableRefObject, useEffect, useRef, useState,
} from 'react';

interface GroupsModel{
  id: string
  name: string
}

const Groups = () => {
  const [groups, setGroups] = useState<GroupsModel[]>([]);
  const inpuRef = useRef() as MutableRefObject<any>;
  useEffect(() => {
    axios.get('http://localhost:3000/groups', {
      headers: {
        Authorization: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyRm9ybWF0ZWQiOnsiaWQiOjUsIm5hbWUiOiJ0ZXN0ZSIsImdyb3Vwc19jcmVhdGVfbW91bnQiOjAsImNyZWF0ZWRfYXQiOiIyMDIxLTExLTA3VDEzOjI3OjAyLjEwNloifSwiaWF0IjoxNjM2MzE5MDMxLCJleHAiOjE2MzYzNDc4MzF9.xNnh6r7l0PurQXx2xRDhYSnD0vfk5_mQZ7LlkcPRF20',
      },
    }).then((response) => { setGroups(response.data); });
  }, []);

  const toChat = (groupId: string) => {
    console.log(groupId, inpuRef.current.value);
  };

  return (
    <div>
      <h1>Groups</h1>
      <p>
        <label htmlFor="name">Name:</label>
        <input type="text" id="name" ref={inpuRef} />
      </p>
      <ul>
        {groups.map((group, itens) => (
          <li onClick={() => toChat(group.id)} key={itens}>
            {group.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Groups;
