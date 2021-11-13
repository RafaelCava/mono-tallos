/* eslint-disable no-alert */
/* eslint-disable comma-dangle */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/button-has-type */
import React from 'react';
import useHooks from '../../hooks/useHooks';

const Login = () => {
  const {
    inputValueLogin,
    inputValueSenha,
    inputValueCadastrarName,
    inputValueCadastrarEmail,
    inputValueCadastrarSenha,
    setInputValueCadastrarName,
    setInputValueCadastrarEmail,
    setInputValueCadastrarSenha,
    formActive,
    setInputValueLogin,
    setInputValueSenha,
    setChecked,
    checked,
    handleVerifyLogin,
    handleFormSetCadastro,
    handleFormSetLogin,
    handleFormCadastrar
  } = useHooks();

  return (
    <div className="container">
      <div className="box">
        { formActive
          ? (
            <form className="box login" onSubmit={(e) => e.preventDefault()}>
              <h1>Login</h1>
              <input onChange={(e) => setInputValueLogin(e.target.value)} type="text" placeholder="Login:" value={inputValueLogin} />
              <input onChange={(e) => setInputValueSenha(e.target.value)} type={checked ? 'text' : 'password'} placeholder="Senha:" value={inputValueSenha} />
              <input type="checkbox" onChange={(e) => setChecked(e.target.checked)} />
              <a onClick={handleFormSetCadastro}>criar conta</a>
              <button onClick={handleVerifyLogin}>Login</button>
            </form>
          )
          : (
            <form className="box cadastrar" onSubmit={(e) => e.preventDefault()}>
              <h1>Cadastro</h1>
              {inputValueCadastrarName}
              {inputValueCadastrarEmail}
              {inputValueCadastrarSenha}
              <input type="text" placeholder="Insira seu Nome:" onChange={(e) => setInputValueCadastrarName(e.target.value)} value={inputValueCadastrarName} />
              <input type="email" placeholder="Insira seu E-mail:" onChange={(e) => setInputValueCadastrarEmail(e.target.value)} value={inputValueCadastrarEmail} />
              <input type="password" placeholder="Insira sua Senha:" onChange={(e) => setInputValueCadastrarSenha(e.target.value)} value={inputValueCadastrarSenha} />
              <a onClick={handleFormSetLogin}>Voltar</a>
              <button onClick={handleFormCadastrar}>Cadastrar</button>
            </form>
          )}
      </div>
    </div>
  );
};

export default Login;
