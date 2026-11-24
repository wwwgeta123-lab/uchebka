import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { api } from "../../api.js";

export default function AdminLogin() {
  const navigate = useNavigate();
  const [values, setValues] = useState({ login: "", password: "" });
  const [state, setState] = useState({ loading: false, error: "" });

  // Если админ уже вошёл — сразу в панель
  useEffect(() => {
    api.admin
      .me()
      .then(() => navigate("/admin", { replace: true }))
      .catch(() => {});
  }, [navigate]);

  async function handleSubmit(event) {
    event.preventDefault();
    setState({ loading: true, error: "" });
    try {
      await api.admin.login(values.login.trim(), values.password);
      navigate("/admin", { replace: true });
    } catch (error) {
      setState({ loading: false, error: error.message });
    }
  }

  return (
    <div className="admin-login">
      <div className="admin-login__card">
        <Link className="logo" to="/" aria-label="NEXUS — на главную">
          <span className="logo__mark" aria-hidden="true">
            N
          </span>
          <span className="logo__text">
            NEXUS
            <span className="logo__sub">панель администратора</span>
          </span>
        </Link>

        <h1 className="admin-login__title">Вход в админку</h1>
        <p className="admin-login__text">
          Здесь администратор видит заявки на бронирование, сообщения гостей и управляет
          залами клуба.
        </p>

        <form className="form" onSubmit={handleSubmit}>
          <div className="field">
            <label htmlFor="admin-login">Логин</label>
            <input
              className="input"
              id="admin-login"
              name="login"
              type="text"
              autoComplete="username"
              value={values.login}
              onChange={(event) => setValues((current) => ({ ...current, login: event.target.value }))}
              required
            />
          </div>
          <div className="field">
            <label htmlFor="admin-password">Пароль</label>
            <input
              className="input"
              id="admin-password"
              name="password"
              type="password"
              autoComplete="current-password"
              value={values.password}
              onChange={(event) =>
                setValues((current) => ({ ...current, password: event.target.value }))
              }
              required
            />
          </div>

          {state.error && (
            <ul className="form__errors">
              <li>{state.error}</li>
            </ul>
          )}

          <button className="btn btn--primary btn--block" type="submit" disabled={state.loading}>
            {state.loading ? "Проверяем…" : "Войти"}
          </button>
        </form>

        <p className="admin-login__hint">
          Тестовый доступ для проверки: <code>admin</code> / <code>admin123</code>
        </p>
        <Link className="admin-login__back" to="/">
          ← Вернуться на сайт
        </Link>
      </div>
    </div>
  );
}
