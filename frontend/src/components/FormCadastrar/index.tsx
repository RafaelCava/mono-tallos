import * as React from 'react';
import useHooks from '../../hooks/useHooks';
import '../FormLogin/styles.css';

const FormCadastrar = () => {
  const {
    handleFormSetLogin,
    handleFormCadastrar,
    setInputValueCadastrarName,
    setInputValueCadastrarEmail,
    setInputValueCadastrarSenha,
    inputValueCadastrarName,
    inputValueCadastrarEmail,
    inputValueCadastrarSenha,
  } = useHooks();
  return (
    <form onSubmit={(e) => handleFormCadastrar(e)}>
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
