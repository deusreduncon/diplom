import './Modal.css';
import  { useEffect, useState } from 'react';


function Modal({ active, setActive, children,onLoginSuccess}) {
    const [isLogin, setIsLogin] = useState(true);
    const [regName, setRegName] = useState("");
    const [regEmail, setRegEmail] = useState("");
    const [regPassword, setRegPassword] = useState("");
    const [regConfirmPassword, setRegConfirmPassword] = useState("");
    const [regError, setRegError] = useState("");
    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("");
    const [loginError, setLoginError] = useState("");
    
    
    const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:3001/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: loginEmail, password: loginPassword }),
      });

      const data = await res.json();
      console.log("Ответ от сервера:", data);

      if (!res.ok) {
        setLoginError(data.error || "Ошибка входа");
      } else {
        localStorage.setItem("user", JSON.stringify(data.user));
        alert("Вход успешен!");
        setActive(false);
        onLoginSuccess(data.user);  // <-- Важно! Передаём пользователя наверх
        console.log(data.user);
      }
    } catch (err) {
      console.log(err);
      setLoginError("Сервер не отвечает");
    }
  };  

    const handleRegister = async (e) => {
     e.preventDefault();

        if (regPassword !== regConfirmPassword) {
            setRegError("Пароли не совпадают");
            return;
        }

        try {
            const res = await fetch("http://localhost:3001/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
            name: regName,
            email: regEmail,
             password: regPassword,
            }),
         });

    const data = await res.json();

    if (!res.ok) {
      setRegError(data.message || "Ошибка регистрации");
    } else {
      onLoginSuccess(data.user);
      setActive(false);
    }
  } catch (err) {
     console.error(err);
    setRegError("Сервер не отвечает");
  }
};

   
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
                    <form className="auth-form" onSubmit={handleLogin}>
                    <h3>Вход в аккаунт</h3>
                    {loginError && <div className="auth-error">{loginError}</div>}
                    <input
                    type="email"
                    placeholder="Email"
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    required
                    />
                    <input
                    type="password"
                    placeholder="Пароль"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    required
                    />
                    <button type="submit" className="auth-submit">
                    Войти
                    </button>
                </form>
            ) : (
                <form className="auth-form" onSubmit={handleRegister}>
            <h3>Создать аккаунт</h3>
            {regError && <div className="auth-error">{regError}</div>}
             <input
             type="text"
            placeholder="Имя"
            value={regName}
            onChange={(e) => setRegName(e.target.value)}
            required
            />
            <input
                type="email"
                placeholder="Email"
                value={regEmail}
                onChange={(e) => setRegEmail(e.target.value)}
                required
            />
            <input
                type="password"
                placeholder="Пароль"
                value={regPassword}
                onChange={(e) => setRegPassword(e.target.value)}
                required
            />
            <input
                type="password"
                placeholder="Повторите пароль"
                value={regConfirmPassword}
                onChange={(e) => setRegConfirmPassword(e.target.value)}
                required
            />
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