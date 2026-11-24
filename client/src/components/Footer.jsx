import { Link } from "react-router-dom";
import { CLUB, NAV, SOCIALS } from "../data/site.js";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__top">
          <div>
            <Link className="logo" to="/" aria-label="NEXUS — на главную">
              <span className="logo__mark" aria-hidden="true">
                N
              </span>
              <span className="logo__text">
                {CLUB.name}
                <span className="logo__sub">{CLUB.tagline}</span>
              </span>
            </Link>
            <p className="footer__about">
              Киберспорт-клуб на Профсоюзной: 64 места, пять залов, турниры и буткемп для
              команд. Работаем каждый день с 10:00 до 02:00.
            </p>
          </div>

          <div>
            <h2 className="footer__title">Разделы</h2>
            <ul className="footer__list">
              {NAV.map((item) => (
                <li key={item.to}>
                  <Link to={item.to}>{item.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="footer__title">Услуги</h2>
            <ul className="footer__list">
              <li>
                <Link to="/catalog/standard">Аренда компьютера</Link>
              </li>
              <li>
                <Link to="/catalog/bootcamp">Буткемп для команд</Link>
              </li>
              <li>
                <Link to="/catalog/vip">VIP-зал под турнир</Link>
              </li>
              <li>
                <Link to="/contacts#booking">Бронирование места</Link>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="footer__title">Контакты</h2>
            <ul className="footer__list">
              <li>
                <a href={CLUB.phoneHref}>{CLUB.phone}</a>
              </li>
              <li>
                <a href={`mailto:${CLUB.email}`}>{CLUB.email}</a>
              </li>
              <li>
                <span>{CLUB.address}</span>
              </li>
              <li>
                <span>{CLUB.hours}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer__bottom">
          <span>
            © {year} NEXUS. Цены указаны за час игры, если не сказано иное.
          </span>
          <div className="footer__socials">
            {SOCIALS.map((social) => (
              <a
                key={social.label}
                className="footer__social"
                href={social.href}
                aria-label={`NEXUS в ${social.label}`}
              >
                {social.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
