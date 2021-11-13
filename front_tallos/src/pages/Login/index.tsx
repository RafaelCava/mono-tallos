/* eslint-disable no-alert */
/* eslint-disable comma-dangle */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/button-has-type */
import React, { useState } from 'react';
import { useLocalStorage } from 'react-use';
import { reponseLogin } from '../../interfaces/interfaces';

const Login = () => {
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
        password: inputValueSenha
      })
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
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: inputValueCadastrarName,
        email: inputValueCadastrarEmail,
        senha: inputValueCadastrarSenha
      })
    };
    const data = await fetch('http://localhost:3000/users', requestOptions);
    const statusCode = data.status;
    console.log(data);
    console.log(statusCode);
    if (statusCode === 201) {
      setFormActive(true);
      setInputValueCadastrarName('');
      setInputValueCadastrarEmail('');
      setInputValueCadastrarSenha('');
    } else {
      alert('erro ao cadastrar usuário');
    }
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
              <a onClick={handleFormSetCadastro}>criar conta</a>
              <button onClick={handleVerifyLogin}>Login</button>
            </form>
          )
          : (
            <form className="box cadastrar" onSubmit={(e) => e.preventDefault()}>
              <h1>Cadastro</h1>
              <input type="text" placeholder="Insira seu Nome:" onChange={(e) => setInputValueCadastrarName(e.target.value)} />
              <input type="email" placeholder="Insira seu E-mail:" onChange={(e) => setInputValueCadastrarEmail(e.target.value)} />
              <input type="password" placeholder="Insira sua Senha:" onChange={(e) => setInputValueCadastrarSenha(e.target.value)} />
              <a onClick={handleFormSetLogin}>Voltar</a>
              <button onClick={handleFormCadastrar}>Cadastrar</button>
            </form>
          )}
      </div>
    </div>
  );
};

export default Login;
