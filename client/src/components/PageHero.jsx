import { Fragment } from "react";
import { Link } from "react-router-dom";

export default function PageHero({ crumbs = [], title, text, children }) {
  return (
    <section className="page-hero">
      <div className="container">
        {crumbs.length > 0 && (
          <nav className="breadcrumbs" aria-label="Хлебные крошки">
            <Link to="/">Главная</Link>
            {crumbs.map((crumb) => (
              <Fragment key={crumb.label}>
                <span aria-hidden="true">/</span>
                {crumb.to ? (
                  <Link to={crumb.to}>{crumb.label}</Link>
                ) : (
                  <span className="breadcrumbs__current">{crumb.label}</span>
                )}
              </Fragment>
            ))}
          </nav>
        )}
        <h1 className="page-hero__title">{title}</h1>
        {text && <p className="page-hero__text">{text}</p>}
        {children}
      </div>
    </section>
  );
}
