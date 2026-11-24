import { Link } from "react-router-dom";
import HallCard from "../components/HallCard.jsx";
import { Icon } from "../components/Icons.jsx";
import {
  CLUB,
  FEATURES,
  GAMES,
  HARDWARE,
  HERO_STATS,
  PROMOS,
  REVIEWS,
} from "../data/site.js";
import { useHalls } from "../useHalls.js";

export default function Home() {
  const { status, halls, error, reload } = useHalls();

  return (
    <>
      <section className="hero">
        <div className="hero__glow" aria-hidden="true" />
        <div className="container hero__inner">
          <div>
            <p className="eyebrow">Киберспорт-клуб в Москве</p>
            <h1 className="hero__title">
              Играй на своём <span className="accent">уровне</span>
            </h1>
            <p className="hero__text">
              64 места в пяти залах, мониторы до 360 Гц и пинг 4 мс. Забронируйте место
              онлайн — администратор подтвердит бронь по телефону за пару минут.
            </p>
            <div className="hero__actions">
              <Link className="btn btn--primary" to="/contacts#booking">
                Забронировать место
              </Link>
              <Link className="btn btn--ghost" to="/catalog">
                Залы и цены
              </Link>
            </div>

            <dl className="hero__stats">
              {HERO_STATS.map((stat) => (
                <div key={stat.label}>
                  <dt className="hero__stat-value">{stat.value}</dt>
                  <dd className="hero__stat-label">{stat.label}</dd>
                </div>
              ))}
            </dl>
          </div>

          <figure className="hero__figure">
            <img src="/images/hero.svg" width="1200" height="800" alt="Игровой зал клуба NEXUS" />
            <figcaption className="hero__badge">
              <span className="hero__badge-dot" aria-hidden="true" />
              <span>
                <span className="hero__badge-title">Сейчас свободно 9 мест</span>
                <span className="hero__badge-text">
                  {CLUB.hours} · {CLUB.addressNote}
                </span>
              </span>
            </figcaption>
          </figure>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section__head">
            <div className="section__head-text">
              <p className="eyebrow">Почему NEXUS</p>
              <h2 className="section__title">Всё, чтобы играть, а не настраивать</h2>
              <p className="section__text">
                Мы держим одинаковое железо во всём зале, следим за сетью и обновляем игры
                до релиза. Вам остаётся выбрать место и сесть.
              </p>
            </div>
          </div>

          <div className="features">
            {FEATURES.map((feature) => (
              <article className="feature" key={feature.title}>
                <span className="feature__icon" aria-hidden="true">
                  <Icon name={feature.icon} />
                </span>
                <h3 className="feature__title">{feature.title}</h3>
                <p className="feature__text">{feature.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--soft">
        <div className="container">
          <div className="section__head">
            <div className="section__head-text">
              <p className="eyebrow">Залы</p>
              <h2 className="section__title">Пять залов под разные задачи</h2>
              <p className="section__text">
                От свободной игры на вечер до сборов команды на неделю. Цены — за час игры с
                человека.
              </p>
            </div>
            <Link className="link-more" to="/catalog">
              Все залы и цены
            </Link>
          </div>

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
            <div className="halls">
              {halls.slice(0, 3).map((hall) => (
                <HallCard key={hall.slug} hall={hall} />
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="section">
        <div className="container hardware">
          <div>
            <p className="eyebrow">{HARDWARE.eyebrow}</p>
            <h2 className="section__title">{HARDWARE.title}</h2>
            <p className="section__text">{HARDWARE.text}</p>
            <ul className="hardware__list">
              {HARDWARE.bullets.map(([strong, rest]) => (
                <li key={strong}>
                  <strong>{strong}</strong>
                  {rest}
                </li>
              ))}
            </ul>
            <div className="hero__actions">
              <Link className="btn btn--primary" to="/catalog">
                Смотреть залы
              </Link>
            </div>
          </div>

          <div className="spec-panel">
            <div className="spec-panel__head">
              <h3 className="spec-panel__title">{HARDWARE.panelTitle}</h3>
              <span className="spec-panel__note">{HARDWARE.panelNote}</span>
            </div>
            <dl>
              {HARDWARE.panel.map((row) => (
                <div className="spec-row" key={row.label}>
                  <dt>{row.label}</dt>
                  <dd>{row.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      <section className="section section--soft">
        <div className="container">
          <div className="section__head">
            <div className="section__head-text">
              <p className="eyebrow">Игры</p>
              <h2 className="section__title">Во что играют в клубе</h2>
              <p className="section__text">
                Библиотека обновляется автоматически. Любую игру можно поставить на ночь
                загрузки — к утру она уже будет на всех машинах.
              </p>
            </div>
            <Link className="link-more" to="/contacts">
              Предложить игру
            </Link>
          </div>

          <div className="games">
            {GAMES.map((game) => (
              <article className="game" key={game.title}>
                <img src={game.image} width="800" height="600" alt={game.title} loading="lazy" />
                <div className="game__body">
                  <h3 className="game__title">{game.title}</h3>
                  <p className="game__meta">{game.meta}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section__head">
            <div className="section__head-text">
              <p className="eyebrow">Акции</p>
              <h2 className="section__title">Скидки, которые действуют всегда</h2>
              <p className="section__text">
                Акции не нужно активировать: администратор посчитает их автоматически на
                стойке.
              </p>
            </div>
          </div>

          <div className="promos">
            {PROMOS.map((promo) => (
              <article className="promo" key={promo.title}>
                <p className="promo__label">{promo.label}</p>
                <h3 className="promo__title">{promo.title}</h3>
                <p className="promo__text">{promo.text}</p>
                <p className="promo__value">
                  {promo.value}
                  {promo.small && <small> {promo.small}</small>}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--soft">
        <div className="container">
          <div className="section__head">
            <div className="section__head-text">
              <p className="eyebrow">Отзывы</p>
              <h2 className="section__title">Что говорят гости</h2>
            </div>
          </div>

          <div className="reviews">
            {REVIEWS.map((review) => (
              <article className="review" key={review.name}>
                <p className="review__stars" aria-label="Оценка 5 из 5">
                  ★★★★★
                </p>
                <p className="review__text">{review.text}</p>
                <div className="review__author">
                  <span className="review__avatar" aria-hidden="true">
                    {review.initials}
                  </span>
                  <div>
                    <p className="review__name">{review.name}</p>
                    <p className="review__role">{review.role}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="cta">
            <div>
              <h2 className="cta__title">Свободные места ещё есть</h2>
              <p className="cta__text">
                Оставьте заявку на сегодня или выберите дату на выходные. Если нужен зал
                целиком под турнир — позвоните, соберём конфигурацию под вас.
              </p>
            </div>
            <div className="cta__actions">
              <Link className="btn btn--primary" to="/contacts#booking">
                Забронировать
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
