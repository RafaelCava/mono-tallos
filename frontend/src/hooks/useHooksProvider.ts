/* eslint-disable consistent-return */
import { MutableRefObject, useRef, useState } from 'react';
import { useLocalStorage } from 'react-use';
import { toast, ToastContainer } from 'react-toastify';
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

  const [userNameLocal, setUserNameLocal, removeUserNameLocal] = useLocalStorage('userName', '');

  const [userIdLocal, setUserIdLocal, removeUserIdLocal] = useLocalStorage('userId', '');

  const [groups, setGroups] = useState<GroupsModel[]>([]);

  const inputRefGroups = useRef() as MutableRefObject<any>;

  const handleFormSetLogin = ():void => {
    setFormActive(!formActive);
  };

  const handleNotifyPromise = async (promise: Promise<any>): Promise<void> => {
    toast.promise(
      promise,
      {
        pending: 'Criando...',
        success: 'Criado 👌',
        error: 'Error 🤯'
      }
    );
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
    const response = fetch('http://localhost:3000/users', requestOptions);

    handleNotifyPromise(response);

    let statusCode = 0;

    response.then((val) => {
      statusCode = val.status;
      return val.json();
    }).then((data) => {
      if (statusCode !== 201) {
        return;
      }
      setInputValueCadastrarEmail('');
      setInputValueCadastrarName('');
      setInputValueCadastrarSenha('');
      handleFormSetLogin();
    });
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
    inputRefGroups,
    groups,
    setGroups,
    userNameLocal,
    setUserNameLocal,
    removeUserNameLocal,
    userIdLocal,
    setUserIdLocal,
    removeUserIdLocal,
    handleNotifyPromise,
    ToastContainer
  };
};

export default useHookProvider;
