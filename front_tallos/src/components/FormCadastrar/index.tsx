import * as React from 'react';
import useHooks from '../../hooks/useHooks';

const FormCadastrar = () => {
  const {
    handleFormSetLogin,
    cleanInput,
    setInputValueCadastrarName,
    setInputValueCadastrarEmail,
    setInputValueCadastrarSenha,
    inputValueCadastrarName,
    inputValueCadastrarEmail,
    inputValueCadastrarSenha,
  } = useHooks();
  return (
    <form className="box cadastrar">
      <h1>Cadastro</h1>
      <input type="text" placeholder="Insira seu Nome:" onChange={(e) => setInputValueCadastrarName(e.target.value)} value={inputValueCadastrarName} />
      <input type="email" placeholder="Insira seu E-mail:" onChange={(e) => setInputValueCadastrarEmail(e.target.value)} value={inputValueCadastrarEmail} />
      <input type="password" placeholder="Insira sua Senha:" onChange={(e) => setInputValueCadastrarSenha(e.target.value)} value={inputValueCadastrarSenha} />
      <a onClick={handleFormSetLogin}>Voltar</a>
      <button onClick={(e) => cleanInput(e)}>Cadastrar</button>
    </form>
  );
};

export default FormCadastrar;
