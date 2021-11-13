/* eslint-disable comma-dangle */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/button-has-type */
import React, { useState } from 'react';
import { useLocalStorage } from 'react-use';

const Login = () => {
  const [checked, setChecked] = useState(false);
  const [inputValueLogin, setInputValueLogin] = useState('');
  const [inputValueSenha, setInputValueSenha] = useState('');
  const [formActive, setFormActive] = useState(true);
  const [token, setToken, removeToken] = useLocalStorage('token', '');
  const handleVerifyLogin = async (): Promise<void> => {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: inputValueLogin,
        password: inputValueSenha
      })
    };
    const data = await fetch('http://localhost:3000/login', requestOptions);
    const response: JSON = await data.json();
    console.log(inputValueLogin, 'login');
    console.log(inputValueSenha, 'senha');
    console.log(response);
    setToken('true');
  };
  const handleFormlogin = (): void => {
    setFormActive(false);
  };
  return (
    <div className="container">
      <div className="box">
        { formActive
          ? (
            <form className="box login" onSubmit={(e) => e.preventDefault()}>
              <h1>Login</h1>
              <input onChange={(e) => setInputValueLogin(e.target.value)} type="text" placeholder="Login:" />
              <input onChange={(e) => setInputValueSenha(e.target.value)} type={checked ? 'text' : 'password'} placeholder="Senha:" />
              <input type="checkbox" onChange={(e) => setChecked(e.target.checked)} />
              <a onClick={handleFormlogin}>criar conta</a>
              <button onClick={handleVerifyLogin}>Login</button>
            </form>
          )
          : (
            <form className="box cadastrar" onSubmit={(e) => e.preventDefault()}>
              <h1>Cadastro</h1>
              <input type="text" placeholder="Insira seu Nome:" />
              <input type="email" placeholder="Insira seu E-mail:" />
              <input type="password" placeholder="Insira sua Senha:" />
              <input type="password" placeholder="Repita sua Senha:" />
              <button>Cadastrar</button>
            </form>
          )}
      </div>
    </div>
  );
};

export default Login;
