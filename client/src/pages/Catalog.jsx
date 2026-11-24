import { Link } from "react-router-dom";
import PageHero from "../components/PageHero.jsx";
import { CLUB } from "../data/site.js";
import { useHalls } from "../useHalls.js";

export default function Catalog() {
  const { status, halls, error, reload } = useHalls();

  return (
    <>
      <PageHero
        crumbs={[{ label: "Залы и цены" }]}
        title="Залы и цены"
        text="Пять пространств клуба: от общего зала на 24 места до приватного буткемпа для команды. Цены указаны за час игры с человека, ночной тариф — за всю ночь."
      />

      <section className="section">
        <div className="container">
          {status === "loading" && <p className="state-note">Загружаем залы…</p>}

          {status === "error" && (
            <div className="notice notice--error">
              <p>Не удалось загрузить залы: {error}</p>
              <button className="btn btn--ghost btn--sm" type="button" onClick={reload}>
                Повторить
              </button>
            </div>
          )}

          {status === "ready" && (
            <div className="plans">
              {halls.map((hall) => (
                <article className="plan" key={hall.slug}>
                  <div className="plan__media">
                    <img src={hall.image} width="1200" height="800" alt={`Зал ${hall.name}`} />
                  </div>
                  <div className="plan__body">
                    <div className="plan__head">
                      <h3>{hall.name}</h3>
                      <span className="plan__badge">{hall.tagline}</span>
                    </div>
                    <p className="plan__desc">{hall.description}</p>
                    <ul className="plan__specs">
                      <li>{hall.seats} игровых мест</li>
                      {hall.specs.map((spec) => (
                        <li key={spec}>{spec}</li>
                      ))}
                    </ul>
                    <div className="plan__foot">
                      <p className="plan__price">
                        {hall.price} ₽<small> / час</small>
                      </p>
                      <Link className="btn btn--ghost" to={`/catalog/${hall.slug}`}>
                        Подробнее о зале
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="section section--soft">
        <div className="container">
          <div className="cta">
            <div>
              <h2 className="cta__title">Не знаете, какой зал выбрать?</h2>
              <p className="cta__text">
                Позвоните администратору: подскажем по свободным местам на сегодня и поможем
                собрать компанию в одном зале.
              </p>
            </div>
            <div className="cta__actions">
              <Link className="btn btn--primary" to="/contacts#booking">
                Оставить заявку
              </Link>
              <a className="btn btn--ghost" href={CLUB.phoneHref}>
                {CLUB.phone}
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
