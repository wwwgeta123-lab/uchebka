import { Link } from "react-router-dom";
import PageHero from "../components/PageHero.jsx";
import { ABOUT_NUMBERS, GALLERY, STORY, TEAM } from "../data/site.js";

export default function About() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "О клубе" }]}
        title="Клуб, собранный игроками"
        text="NEXUS — это 64 машины, пять залов и команда, которая сама играет в CS2 и Dota 2. Мы знаем, что важно: ровный пинг, нормальные кресла и администратор, который понимает просьбы."
      />

      <section className="section">
        <div className="container">
          <div className="numbers">
            {ABOUT_NUMBERS.map((item) => (
              <div className="number-card" key={item.label}>
                <p className="number-card__value">
                  {item.value}
                  {item.span && <span>{item.span}</span>}
                </p>
                <p className="number-card__label">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--soft">
        <div className="container story">
          <div>
            <p className="eyebrow">{STORY.eyebrow}</p>
            <h2 className="section__title">{STORY.title}</h2>
            {STORY.paragraphs.map((paragraph) => (
              <p className="section__text" key={paragraph.slice(0, 24)}>
                {paragraph}
              </p>
            ))}
          </div>
          <figure className="story__media">
            <img src={STORY.image} width="900" height="700" alt="Зал клуба NEXUS" />
            <figcaption className="story__caption">{STORY.caption}</figcaption>
          </figure>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section__head">
            <div className="section__head-text">
              <p className="eyebrow">Команда</p>
              <h2 className="section__title">Кто работает в клубе</h2>
              <p className="section__text">
                Небольшая команда, которая знает каждую машину по имени. Если что-то не
                работает — пишите, отвечаем быстро.
              </p>
            </div>
          </div>

          <div className="team">
            {TEAM.map((person) => (
              <article className="person" key={person.name}>
                <img src={person.image} width="600" height="600" alt={person.name} loading="lazy" />
                <div className="person__body">
                  <h3 className="person__name">{person.name}</h3>
                  <p className="person__role">{person.role}</p>
                  <p className="person__text">{person.text}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--soft">
        <div className="container">
          <div className="section__head">
            <div className="section__head-text">
              <p className="eyebrow">Фотографии</p>
              <h2 className="section__title">Как выглядит клуб</h2>
              <p className="section__text">
                Тёмные залы, мягкий свет и никаких лишних проводов на столах.
              </p>
            </div>
            <Link className="link-more" to="/catalog">
              Залы и цены
            </Link>
          </div>

          <div className="photo-grid">
            {GALLERY.map((image, index) => (
              <img
                key={image}
                src={image}
                width="900"
                height="700"
                alt={`Зал клуба NEXUS, фото ${index + 1}`}
                loading="lazy"
              />
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="cta">
            <div>
              <h2 className="cta__title">Приходите знакомиться</h2>
              <p className="cta__text">
                Первый час в зале «Стандарт» — по цене дня, даже вечером. Скажите на стойке,
                что вы впервые.
              </p>
            </div>
            <div className="cta__actions">
              <Link className="btn btn--primary" to="/contacts">
                Контакты и схема проезда
              </Link>
              <Link className="btn btn--ghost" to="/catalog">
                Выбрать зал
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
