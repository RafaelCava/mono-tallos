import React from 'react';
import FormLogin from '../../components/FormLogin';
import FormCadastrar from '../../components/FormCadastrar';
import useHooks from '../../hooks/useHooks';
import Carrosel from '../../components/Carrosel/Carrosel';

const Login = () => {
  const { formActive } = useHooks();

  return (
    <div className="container">
      <div className="carrosel">
        <Carrosel />
      </div>
      <div className="forms">
        { formActive
          ? (<FormLogin />)
          : (<FormCadastrar />)}
      </div>
    </div>
  );
};

export default Login;
