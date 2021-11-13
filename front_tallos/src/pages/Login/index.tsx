import React from 'react';
import FormLogin from '../../components/FormLogin';
import FormCadastrar from '../../components/FormCadastrar';
import useHooks from '../../hooks/useHooks';

const Login = () => {
  const { formActive } = useHooks();

  return (
    <div className="container">
      <div className="box">
        { formActive
          ? (<FormLogin />)
          : (<FormCadastrar />)}
      </div>
    </div>
  );
};

export default Login;
