/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable react/button-has-type */
import axios from 'axios';
import React, {
  MutableRefObject, useEffect, useRef, useState,
} from 'react';
import { useHistory } from 'react-router-dom';
import useHooks from '../../hooks/useHooks';
import { GroupsModel } from '../../interfaces/interfaces';

const Groups = () => {
  const {
    token,
  } = useHooks();

  const [groups, setGroups] = useState<GroupsModel[]>([]);

  const inpuRef = useRef() as MutableRefObject<any>;

  useEffect(() => {
    axios.get('http://localhost:3000/groups', {
      headers: {
        Authorization: token,
      },
    }).then((response) => { setGroups(response.data); });
  }, []);

  const history = useHistory();

  const toChat = (groupId: string) => {
    const name = inpuRef.current.value;
    history.push(`/chat?group_id=${groupId}&name=${name}`);
  };

  return (
    <div>
      <h1>Groups</h1>
      <p>
        <label htmlFor="name">Name:</label>
        <input type="text" id="name" ref={inpuRef} />
      </p>
      <ul>
        {groups.map((group, key) => (
          <li onClick={() => toChat(group.id)} key={key}>
            {group.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Groups;
