import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import PageHero from "../components/PageHero.jsx";
import { api } from "../api.js";
import { CLUB } from "../data/site.js";

export default function Room() {
  const { slug } = useParams();
  const [state, setState] = useState({ status: "loading", hall: null, error: "" });

  useEffect(() => {
    let active = true;
    setState({ status: "loading", hall: null, error: "" });

    api
      .hall(slug)
      .then((hall) => {
        if (active) setState({ status: "ready", hall, error: "" });
      })
      .catch((error) => {
        if (active) setState({ status: "error", hall: null, error: error.message });
      });

    return () => {
      active = false;
    };
  }, [slug]);

  if (state.status === "loading") {
    return (
      <section className="section">
        <div className="container">
          <p className="state-note">Загружаем зал…</p>
        </div>
      </section>
    );
  }

  if (state.status === "error" || !state.hall) {
    return (
      <section className="section">
        <div className="container">
          <div className="notice notice--error">
            <p>{state.error || "Зал не найден"}</p>
            <Link className="btn btn--ghost btn--sm" to="/catalog">
              Вернуться к залам
            </Link>
          </div>
        </div>
      </section>
    );
  }

  const hall = state.hall;

  return (
    <>
      <PageHero
        crumbs={[{ label: "Залы и цены", to: "/catalog" }, { label: hall.name }]}
        title={hall.name}
        text={hall.description}
      >
        <div className="room-head">
          <div className="room-head__meta">
            <span className="chip chip--accent">от {hall.price} ₽ / час</span>
            <span className="chip">{hall.seats} мест</span>
            <span className="chip">{hall.tagline}</span>
            <span className="chip">{hall.specs[0]}</span>
          </div>
          <div className="room-head__price">
            <p className="room-head__price-value">
              {hall.price} ₽<small> / час</small>
            </p>
            <p className="room-head__price-note">скидка ночью и по абонементу</p>
          </div>
        </div>

        <div className="gallery">
          <div className="gallery__main">
            <img src={hall.image} width="1200" height="800" alt={`Зал ${hall.name}`} />
          </div>
          <div className="gallery__thumbs">
            {hall.gallery.slice(0, 3).map((image, index) => (
              <div className="gallery__thumb" key={`${image}-${index}`}>
                <img
                  src={image}
                  width="900"
                  height="700"
                  alt={`${hall.name}, вид ${index + 1}`}
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>
      </PageHero>

      <section className="section">
        <div className="container">
          <div className="item-layout">
            <div>
              <div className="item-block">
                <h2 className="item-block__title">Про зал</h2>
                <p>{hall.description}</p>
                <p>
                  Бронирование подтверждает администратор: он проверит свободные места и
                  перезвонит по указанному номеру. Оплата — на стойке перед началом сеанса.
                </p>
                <ul className="feature-list">
                  {hall.specs.map((spec) => (
                    <li key={spec}>{spec}</li>
                  ))}
                </ul>
              </div>

              <div className="item-block">
                <h2 className="item-block__title">Оборудование</h2>
                <div className="spec-panel">
                  <div className="spec-panel__head">
                    <h3 className="spec-panel__title">Конфигурация места</h3>
                    <span className="spec-panel__note">{hall.seats} шт.</span>
                  </div>
                  <dl>
                    {hall.panel.map((row) => (
                      <div className="spec-row" key={row.label}>
                        <dt>{row.label}</dt>
                        <dd>{row.value}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </div>

              <div className="item-block">
                <h2 className="item-block__title">Стоимость</h2>
                <p>Цены действуют на все места зала. Абонементы не сгорают в течение месяца.</p>
                <table className="price-table">
                  <caption className="visually-hidden">Стоимость игры в зале {hall.name}</caption>
                  <tbody>
                    {hall.prices.map((row) => (
                      <tr key={row.label}>
                        <th scope="row">{row.label}</th>
                        <td>{row.value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="item-block">
                <h2 className="item-block__title">Правила зала</h2>
                <ol className="rules">
                  {hall.rules.map((rule) => (
                    <li key={rule}>{rule}</li>
                  ))}
                </ol>
              </div>
            </div>

            <aside className="booking-card" aria-label={`Бронирование зала ${hall.name}`}>
              <p className="booking-card__price">
                {hall.price} ₽<small> / час</small>
              </p>
              <ul className="booking-card__list">
                <li>
                  Мест в зале <span>{hall.seats}</span>
                </li>
                {hall.prices.slice(0, 3).map((row) => (
                  <li key={row.label}>
                    {row.label} <span>{row.value}</span>
                  </li>
                ))}
              </ul>
              <Link className="btn btn--primary btn--block" to={`/contacts?hall=${hall.slug}#booking`}>
                Забронировать
              </Link>
              <p className="booking-card__note">
                или позвоните: <a href={CLUB.phoneHref}>{CLUB.phone}</a>
              </p>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
}
