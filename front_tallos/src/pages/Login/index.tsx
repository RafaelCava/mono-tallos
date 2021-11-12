/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/button-has-type */
import React, { useState } from 'react';

const Login = () => {
  const [inputValue, setInputValue] = useState('');
  const [formActive, setFormActive] = useState(true);
  const handleTokenLocalStorage = (): void => {

  };
  const handleFormlogin = (): void => {
    setFormActive(false);
  };
  return (
    <div className="container">
      <div className="box">
        { formActive
          ? (
            <form action="" className="login">
              <label htmlFor="emailLogin" />
              <input onChange={(e) => setInputValue(e.target.value)} type="text" name="emailLogin" />
              <input type="password" />
              <a onClick={handleFormlogin}>criar conta</a>
              <button onClick={handleTokenLocalStorage}>Login</button>
            </form>
          )
          : (
            <form action="" className="cadastrar" />
          )}
      </div>
    </div>
  );
};

export default Login;
