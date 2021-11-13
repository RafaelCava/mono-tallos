/* eslint-disable consistent-return */
import { MutableRefObject, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useLocalStorage } from 'react-use';
import { GroupsModel, reponseLogin } from '../interfaces/interfaces';

const useHookProvider = () => {
  const [checked, setChecked] = useState(false);

  const [inputValueLogin, setInputValueLogin] = useState('');

  const [inputValueSenha, setInputValueSenha] = useState('');

  const [inputValueCadastrarEmail, setInputValueCadastrarEmail] = useState('');

  const [inputValueCadastrarSenha, setInputValueCadastrarSenha] = useState('');

  const [inputValueCadastrarName, setInputValueCadastrarName] = useState('');

  const [formActive, setFormActive] = useState(true);

  const [token, setToken, removeToken] = useLocalStorage('token', '');

  const [groups, setGroups] = useState<GroupsModel[]>([]);

  const inputRef = useRef() as MutableRefObject<any>;

  const handleFormSetLogin = ():void => {
    setFormActive(!formActive);
  };

  const handleFormCadastrar = async (e: any): Promise<void> => {
    e.preventDefault();
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: inputValueCadastrarName,
        email: inputValueCadastrarEmail,
        senha: inputValueCadastrarSenha
      })
    };
    const response = await fetch('http://localhost:3000/users', requestOptions);

    const data = await response.json();

    if (data.error) {
      alert(data.error.error);
    }
  };

  const cleanInput = (): void => {
    alert('usuario cadastrado com sucesso');

    setInputValueCadastrarEmail('');

    setInputValueCadastrarName('');

    setInputValueCadastrarSenha('');

    setFormActive(!formActive);
  };

  return {
    checked,
    setChecked,
    inputValueLogin,
    setInputValueLogin,
    inputValueSenha,
    setInputValueSenha,
    inputValueCadastrarEmail,
    setInputValueCadastrarEmail,
    inputValueCadastrarSenha,
    setInputValueCadastrarSenha,
    inputValueCadastrarName,
    setInputValueCadastrarName,
    formActive,
    setFormActive,
    setToken,
    token,
    removeToken,
    handleFormCadastrar,
    handleFormSetLogin,
    cleanInput,
    inputRef,
    groups,
    setGroups
  };
};

export default useHookProvider;
