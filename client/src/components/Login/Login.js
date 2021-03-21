import React, { useState } from 'react';

const Login = ({history, setToken}) => {
  const isNicknameCorrect = false;
  const [nickname, setNickname] = useState('');
  const [password, setPassword] = useState('');

  const logIn = () => {
    fetch('http://localhost:4000/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({nickname, password})
    }).then(data => data.json())
      .then(res => {
        if (res.token) {
          setToken(res.token);
          history.push('/');
        } else {
          alert(res.message);
        }
      })

  }
  const changeNickname = (e) => {
    const { value } = e.currentTarget;
    setNickname(value);
  }
  const changePassword = (e) => {
    const { value } = e.currentTarget;
    setPassword(value);
  }

  return (
    <section className="section columns is-centered">
      <div className="container is-centered is-max-desktop">
        <div className="column is-centered">
          <div className="card column is-centered">
            <div className="card-content has-text-centered">
              <p className="title">
                Войти в аккаунт
              </p>
            </div>
            <div className="field is-flex is-align-items-center is-flex-direction-column">
              <label className="label">Логин</label>
              <div className="control has-icons-left has-icons-right">
                <input className="input" type="text" onChange={changeNickname} value={nickname}/>
                <span className="icon is-small is-left">
                  <i className="fas fa-user"></i>
                </span>
              </div>
            </div>

            <div className="field is-flex is-align-items-center is-flex-direction-column">
              <label className="label">Пароль</label>
              <div className="control has-icons-left has-icons-right">
                <input className="input" type="password" onChange={changePassword} value={password}/>
                <span className="icon is-small is-left">
                  <i className="fas fa-key"></i>
                </span>
              </div>
            </div>
            <footer className="card-footer is-justify-content-center">
              <div className="control column is-3 is-flex is-justify-content-center">
                <button onClick={logIn}
                  className="button is-primary">Войти</button>
              </div>
            </footer>
          </div>
        </div>
      </div>
    </section>
  )
};

export default Login;
