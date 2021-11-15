/* eslint-disable no-undef */
import axios from 'axios';
import * as React from 'react';
import useHooks from '../../hooks/useHooks';
import '../FormLogin/styles.css';

interface DataPost {
  name: string
  email: string
  senha: string
}

const FormCadastrar = () => {
  const {
    handleFormSetLogin,
    setInputValueCadastrarName,
    setInputValueCadastrarEmail,
    setInputValueCadastrarSenha,
    inputValueCadastrarName,
    inputValueCadastrarEmail,
    inputValueCadastrarSenha
  } = useHooks();

  const handleSubmitCadastrar = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
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

    if (response.status === 400) {
      alert(data.error.error);
      return;
    }

    alert(data);

    handleFormSetLogin();
  };

  return (
    <form onSubmit={(e) => handleSubmitCadastrar(e)}>
      <h1>Cadastro</h1>
      <input type="text" placeholder="Insira seu Nome:" onChange={(e) => setInputValueCadastrarName(e.target.value)} value={inputValueCadastrarName} />
      <input type="email" placeholder="Insira seu E-mail:" onChange={(e) => setInputValueCadastrarEmail(e.target.value)} value={inputValueCadastrarEmail} />
      <input type="password" placeholder="Insira sua Senha:" onChange={(e) => setInputValueCadastrarSenha(e.target.value)} value={inputValueCadastrarSenha} />
      <button>Cadastrar</button>
      <a onClick={handleFormSetLogin}>Voltar</a>
    </form>
  );
};

export default FormCadastrar;
