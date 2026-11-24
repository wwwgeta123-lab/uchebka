import { useEffect, useState } from "react";
import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import { api } from "../../api.js";

const LINKS = [
  { to: "/admin", label: "Обзор", end: true },
  { to: "/admin/bookings", label: "Заявки" },
  { to: "/admin/messages", label: "Сообщения" },
  { to: "/admin/halls", label: "Залы" },
];

export default function AdminLayout() {
  const navigate = useNavigate();
  const [admin, setAdmin] = useState(null);

  useEffect(() => {
    let active = true;
    api.admin
      .me()
      .then((data) => {
        if (active) setAdmin(data);
      })
      .catch(() => {
        if (active) navigate("/admin/login", { replace: true });
      });
    return () => {
      active = false;
    };
  }, [navigate]);

  async function handleLogout() {
    try {
      await api.admin.logout();
    } catch {
      // сессия могла уже истечь — всё равно уходим на вход
    }
    navigate("/admin/login", { replace: true });
  }

  if (!admin) {
    return <div className="admin-loading">Проверяем сессию…</div>;
  }

  return (
    <div className="admin-shell">
      <aside className="admin-sidebar">
        <Link className="logo" to="/" aria-label="NEXUS — на сайт">
          <span className="logo__mark" aria-hidden="true">
            N
          </span>
          <span className="logo__text">
            NEXUS
            <span className="logo__sub">админка</span>
          </span>
        </Link>

        <nav className="admin-nav" aria-label="Разделы админки">
          {LINKS.map((link) => (
            <NavLink key={link.to} to={link.to} end={link.end} className="admin-nav__link">
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="admin-sidebar__foot">
          <span className="admin-user">
            Вы вошли как <strong>{admin.login}</strong>
          </span>
          <button className="btn btn--ghost btn--sm btn--block" type="button" onClick={handleLogout}>
            Выйти
          </button>
        </div>
      </aside>

      <div className="admin-main">
        <header className="admin-topbar">
          <span className="admin-topbar__label">Панель администратора</span>
          <Link className="admin-topbar__link" to="/">
            Открыть сайт →
          </Link>
        </header>
        <div className="admin-content">
          <Outlet context={{ admin }} />
        </div>
      </div>
    </div>
  );
}
