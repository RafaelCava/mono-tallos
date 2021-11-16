import axios from 'axios';
import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import useHooks from '../../hooks/useHooks';

const GroupsList = () => {
  const {
    token,
    inputRefGroups,
    setGroups,
    groups,
    userNameLocal,
    userIdLocal,
  } = useHooks();

  useEffect(() => {
    axios.get('http://localhost:3000/groups', {
      headers: {
        Authorization: token,
      },
    }).then((response) => { setGroups(response.data); });
  }, []);

  const history = useHistory();

  const toChat = (groupId: string, groupName: string) => {
    history.push(`/chat?group_id=${groupId}&name=${groupName}&id=${userIdLocal}`);
  };

  return (
    <div>
      <h1>
        Bem vindo(a) Sr(a).
        {userNameLocal}
      </h1>
      <p>
        <label htmlFor="name">Name:</label>
        <input type="text" id="name" ref={inputRefGroups} />
      </p>
      <ul>
        {groups.map((group: any, key: any) => (
          <li onClick={() => toChat(group.id, group.name)} key={key}>
            {group.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GroupsList;
