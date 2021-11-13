import axios from 'axios';
import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import useHooks from '../../hooks/useHooks';

const GroupsList = () => {
  const {
    token,
    inputRef,
    setGroups,
    groups
  } = useHooks();

  useEffect(() => {
    axios.get('http://localhost:3000/groups', {
      headers: {
        Authorization: token,
      },
    }).then((response) => { setGroups(response.data); });
  }, []);

  const history = useHistory();

  const toChat = (groupId: string) => {
    const name = inputRef.current.value;
    history.push(`/chat?group_id=${groupId}&name=${name}`);
  };

  return (
    <div>
      <h1>Groups</h1>
      <p>
        <label htmlFor="name">Name:</label>
        <input type="text" id="name" ref={inputRef} />
      </p>
      <ul>
        {groups.map((group: any, key: any) => (
          <li onClick={() => toChat(group.id)} key={key}>
            {group.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GroupsList;
