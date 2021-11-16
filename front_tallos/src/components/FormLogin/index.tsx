import * as React from 'react';
import { useHistory } from 'react-router-dom';
import useHooks from '../../hooks/useHooks';
import { reponseLogin } from '../../interfaces/interfaces';
import './styles.css';

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
      alert(response.error.error);
    }
  };

  const history = useHistory();

  return (
    <form onSubmit={(e) => handleVerifyLogin(e)}>
      <h1>Login</h1>
      <input onChange={(e) => setInputValueLogin(e.target.value)} type="email" placeholder="Login:" value={inputValueLogin} />
      <input onChange={(e) => setInputValueSenha(e.target.value)} type={checked ? 'text' : 'password'} placeholder="Senha:" value={inputValueSenha} />
      <label htmlFor="check">Visualizar senha</label>
      <input type="checkbox" id="check" onChange={(e) => setChecked(e.target.checked)} />
      <button>Login</button>
      <a onClick={handleFormSetLogin}>Criar Conta</a>
    </form>
  );
};

export default FormLogin;
