import { Link } from "react-router-dom";

export default function HallCard({ hall }) {
  return (
    <article className="hall">
      <div className="hall__media">
        <img src={hall.image} width="1200" height="800" alt={`Зал ${hall.name}`} loading="lazy" />
        <span className="hall__tag">{hall.badge}</span>
      </div>
      <div className="hall__body">
        <h3 className="hall__title">
          {hall.name}
          <span className="hall__price">
            {hall.price} ₽<small> / час</small>
          </span>
        </h3>
        <p className="hall__desc">{hall.tagline}. {hall.seats} мест в зале.</p>
        <ul className="hall__specs">
          {hall.specs.slice(0, 3).map((spec) => (
            <li key={spec}>{spec}</li>
          ))}
        </ul>
        <div className="hall__foot">
          <Link className="btn btn--ghost btn--block" to={`/catalog/${hall.slug}`}>
            Подробнее о зале
          </Link>
        </div>
      </div>
    </article>
  );
}
