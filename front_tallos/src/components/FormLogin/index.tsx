import * as React from 'react';
import { useHistory } from 'react-router-dom';
import useHooks from '../../hooks/useHooks';
import { reponseLogin } from '../../interfaces/interfaces';

const FormLogin = () => {
  const {
    setInputValueLogin,
    setInputValueSenha,
    setChecked,
    handleFormSetLogin,
    checked,
    inputValueLogin,
    inputValueSenha,
    setToken,
    setUserNameLocal,
    setUserIdLocal
  } = useHooks();

  const handleVerifyLogin = async (e: any): Promise<void> => {
    e.preventDefault();
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: inputValueLogin,
        password: inputValueSenha,
      }),
    };

    const data = await fetch('http://localhost:3000/login', requestOptions);

    const toGroups = (): void => {
      history.push('/groups');
    };

    const response: reponseLogin = await data.json();

    if (response.token) {
      setToken(response.token);
      setUserIdLocal(response.userId);
      setUserNameLocal(response.userName);
      toGroups();
    } else {
      alert('Usuario ou senha inválidos');
    }
  };

  const history = useHistory();

  return (
    <form className="box login" onSubmit={(e) => handleVerifyLogin(e)}>
      <h1>Login</h1>
      <input onChange={(e) => setInputValueLogin(e.target.value)} type="text" placeholder="Login:" value={inputValueLogin} />
      <input onChange={(e) => setInputValueSenha(e.target.value)} type={checked ? 'text' : 'password'} placeholder="Senha:" value={inputValueSenha} />
      <input type="checkbox" onChange={(e) => setChecked(e.target.checked)} />
      <a onClick={handleFormSetLogin}>criar conta</a>
      <button>Login</button>
    </form>
  );
};

export default FormLogin;
