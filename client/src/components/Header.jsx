import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { CLUB, NAV } from "../data/site.js";

export default function Header() {
  const [open, setOpen] = useState(false);
  const headerRef = useRef(null);
  const location = useLocation();

  // Закрываем меню при переходе на другую страницу
  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (!open) return undefined;

    const onKeyDown = (event) => {
      if (event.key === "Escape") setOpen(false);
    };
    const onClickOutside = (event) => {
      if (headerRef.current && !headerRef.current.contains(event.target)) setOpen(false);
    };
    const onResize = () => {
      if (window.innerWidth > 960) setOpen(false);
    };

    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("click", onClickOutside);
    window.addEventListener("resize", onResize);

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("click", onClickOutside);
      window.removeEventListener("resize", onResize);
    };
  }, [open]);

  return (
    <header className={open ? "header is-open" : "header"} ref={headerRef}>
      <div className="container header__inner">
        <Link className="logo" to="/" aria-label="NEXUS — на главную">
          <span className="logo__mark" aria-hidden="true">
            N
          </span>
          <span className="logo__text">
            {CLUB.name}
            <span className="logo__sub">{CLUB.tagline}</span>
          </span>
        </Link>

        <nav className="nav" id="primary-nav" aria-label="Основная навигация">
          <ul className="nav__list">
            {NAV.map((item) => (
              <li key={item.to}>
                <NavLink className="nav__link" to={item.to} end={item.end} onClick={() => setOpen(false)}>
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="header__actions">
          <a className="header__phone" href={CLUB.phoneHref}>
            {CLUB.phone}
          </a>
          <Link className="btn btn--primary btn--sm" to="/contacts#booking">
            Забронировать
          </Link>
          <button
            className="burger"
            type="button"
            aria-label={open ? "Закрыть меню" : "Открыть меню"}
            aria-expanded={open}
            aria-controls="primary-nav"
            onClick={() => setOpen((value) => !value)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>
    </header>
  );
}
