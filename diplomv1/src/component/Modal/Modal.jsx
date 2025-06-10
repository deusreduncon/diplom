import './Modal.css';
import  { useEffect, useState } from 'react';

function Modal({ active, setActive, children }) {
    const [isLogin, setIsLogin] = useState(true);
    useEffect(() => {
  if (active) {
    document.body.classList.add("no-scroll");
  } else {
    document.body.classList.remove("no-scroll");
  }

  return () => {
    document.body.classList.remove("no-scroll");
  };
}, [active]);
    
  return(
    <div className={active ? "modal active" : "modal"}onClick={()=>setActive(false)}>
        <div className={active ? "modalContent active" : "modalContent"} onClick={e => e.stopPropagation()}>
            <div className="auth-tabs">
          <button
            className={`tab ${isLogin ? "active" : ""}`}
            onClick={() => setIsLogin(true)}
          >
             Вход
          </button>
          <button
            className={`tab ${!isLogin ? "active" : ""}`}
            onClick={() => setIsLogin(false)}
          >
            Регистрация
          </button>
        </div>
            {children}
            {isLogin ? (
          <form className="auth-form">
            <h3>Вход в аккаунт</h3>
            <input type="email" placeholder="Email" required />
            <input type="password" placeholder="Пароль" required />
            <button type="submit" className="auth-submit">
              Войти
            </button>
            <a href="#forgot" className="auth-link">
              Забыли пароль?
            </a>
          </form>
        ) : (
          <form className="auth-form">
            <h3>Создать аккаунт</h3>
            <input type="text" placeholder="Имя" required />
            <input type="email" placeholder="Email" required />
            <input type="password" placeholder="Пароль" required />
            <input type="password" placeholder="Повторите пароль" required />
            <button type="submit" className="auth-submit">
              Зарегистрироваться
            </button>
          </form>
        )}
        </div>
    </div>
  )
}

export default Modal