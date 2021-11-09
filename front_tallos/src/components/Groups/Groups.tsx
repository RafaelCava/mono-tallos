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
        Authorization: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyRm9ybWF0ZWQiOnsiaWQiOjEsIm5hbWUiOiJ0ZXN0ZSIsImdyb3Vwc19jcmVhdGVfbW91bnQiOjAsImNyZWF0ZWRfYXQiOiIyMDIxLTExLTA5VDIxOjE1OjE1LjQ3M1oifSwiaWF0IjoxNjM2NDk3MDgzLCJleHAiOjE2MzY1MjU4ODN9.55_6Fmli_2AEPB2DbldgA_25nAT3feMVTKL1rhjfRKo',
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
