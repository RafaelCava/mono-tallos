/* eslint-disable comma-dangle */
import { useState } from 'react';
import { useLocalStorage } from 'react-use';
import { reponseLogin } from '../interfaces/interfaces';

const useHookProvider = () => {
  const [checked, setChecked] = useState(false);
  const [inputValueLogin, setInputValueLogin] = useState('');
  const [inputValueSenha, setInputValueSenha] = useState('');
  const [inputValueCadastrarEmail, setInputValueCadastrarEmail] = useState('');
  const [inputValueCadastrarSenha, setInputValueCadastrarSenha] = useState('');
  const [inputValueCadastrarName, setInputValueCadastrarName] = useState('');
  const [formActive, setFormActive] = useState(true);
  const [token, setToken, removeToken] = useLocalStorage('token', '');
  const handleVerifyLogin = async (): Promise<void> => {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: inputValueLogin,
        password: inputValueSenha,
      }),
    };
    const data = await fetch('http://localhost:3000/login', requestOptions);
    const response: reponseLogin = await data.json();
    setToken(response.token);
  };
  const handleFormSetCadastro = (): void => {
    setFormActive(false);
  };
  const handleFormSetLogin = ():void => {
    setFormActive(true);
  };
  const handleFormCadastrar = async (): Promise<void> => {
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

    const statusCode = response.status;

    console.log(statusCode);

    console.log(data);

    if (statusCode === 200 || statusCode === 201) {
      alert('Usuario cadastrado com sucesso');

      setFormActive(true);

      setInputValueCadastrarName('');

      setInputValueCadastrarEmail('');

      setInputValueCadastrarSenha('');
    } else {
      alert(data.error.error);
    }
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
    handleVerifyLogin,
    setToken,
    token,
    removeToken,
    handleFormSetCadastro,
    handleFormSetLogin,
    handleFormCadastrar
  };
};

export default useHookProvider;
