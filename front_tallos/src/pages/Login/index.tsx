/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/button-has-type */
import React, { useState } from 'react';
import { useLocalStorage } from 'react-use';

const Login = () => {
  const [inputValueLogin, setInputValueLogin] = useState('');
  const [inputValueSenha, setInputValueSenha] = useState('');
  const [formActive, setFormActive] = useState(true);
  // const [visiblePassword, setVisiblePassword] = useState();
  // const [token, setToken, removeToken] = useLocalStorage('token', '');
  const handleVerifyLogin = async (): Promise<void> => {
    const data = await fetch('http://localhost:3000', {
      method: 'POST',
      headers: {
        'Content-Type': 'aplication/json',
      },
      body: JSON.stringify({
        email: inputValueLogin,
        password: inputValueSenha,
      }),
    });
    const response: JSON = await data.json();
    console.log(response);
  };
  const handleFormlogin = (): void => {
    setFormActive(false);
  };
  return (
    <div className="container">
      <div className="box">
        { formActive
          ? (
            <form className="box login">
              <h1>Login</h1>
              <input onChange={(e) => setInputValueLogin(e.target.value)} type="text" placeholder="Login:" />
              <input onChange={(e) => setInputValueSenha(e.target.value)} type="password" placeholder="Senha:" />
              <input type="checkbox" checked onClick={(e) => console.log(e)} />
              <a onClick={handleFormlogin}>criar conta</a>
              <button onClick={handleVerifyLogin}>Login</button>
            </form>
          )
          : (
            <form className="box cadastrar">
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
