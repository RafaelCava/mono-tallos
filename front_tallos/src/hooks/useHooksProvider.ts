import { useState } from 'react';

const useHookProvider = () => {
  const [checked, setChecked] = useState(false);
  const [inputValueLogin, setInputValueLogin] = useState('');
  const [inputValueSenha, setInputValueSenha] = useState('');
  const [inputValueCadastrarEmail, setInputValueCadastrarEmail] = useState('');
  const [inputValueCadastrarSenha, setInputValueCadastrarSenha] = useState('');
  const [inputValueCadastrarName, setInputValueCadastrarName] = useState('');
  const [formActive, setFormActive] = useState(true);
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
  };
};

export default useHookProvider;
