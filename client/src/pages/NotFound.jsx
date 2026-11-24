import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <section className="section">
      <div className="container">
        <p className="eyebrow">Ошибка 404</p>
        <h1 className="page-hero__title">Такой страницы нет</h1>
        <p className="page-hero__text">
          Возможно, ссылка устарела. Посмотрите залы клуба или вернитесь на главную.
        </p>
        <div className="hero__actions">
          <Link className="btn btn--primary" to="/">
            На главную
          </Link>
          <Link className="btn btn--ghost" to="/catalog">
            Залы и цены
          </Link>
        </div>
      </div>
    </section>
  );
}
