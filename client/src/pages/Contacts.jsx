import { useSearchParams } from "react-router-dom";
import BookingForm from "../components/BookingForm.jsx";
import ContactForm from "../components/ContactForm.jsx";
import PageHero from "../components/PageHero.jsx";
import { Icon } from "../components/Icons.jsx";
import { CLUB, CONTACTS, SOCIALS } from "../data/site.js";
import { useHalls } from "../useHalls.js";

export default function Contacts() {
  const { status, halls, error, reload } = useHalls();
  const [params] = useSearchParams();
  const defaultHall = params.get("hall") || "";

  return (
    <>
      <PageHero
        crumbs={[{ label: "Контакты" }]}
        title="Контакты и бронирование"
        text="Мы на Профсоюзной, в четырёх минутах от метро. Бронь можно оставить формой ниже или по телефону — администратор подтвердит её в течение 15 минут."
      />

      <section className="section">
        <div className="container">
          <div className="contact-layout">
            <div>
              <div className="info-list">
                {CONTACTS.map((card) => (
                  <article className="info-card" key={card.label}>
                    <span className="info-card__icon" aria-hidden="true">
                      <Icon name={card.icon} />
                    </span>
                    <div>
                      <p className="info-card__label">{card.label}</p>
                      <p className="info-card__value">
                        {card.href ? <a href={card.href}>{card.value}</a> : card.value}
                      </p>
                      <p className="info-card__note">{card.note}</p>
                    </div>
                  </article>
                ))}

                <article className="info-card">
                  <span className="info-card__icon" aria-hidden="true">
                    <Icon name="users" />
                  </span>
                  <div>
                    <p className="info-card__label">Соцсети</p>
                    <div className="socials">
                      {SOCIALS.map((social) => (
                        <a key={social.label} href={social.href}>
                          {social.label}
                        </a>
                      ))}
                    </div>
                    <p className="info-card__note">
                      Афиша турниров и свободные места — в Telegram-канале клуба
                    </p>
                  </div>
                </article>
              </div>
            </div>

            <div className="form-card" id="booking">
              <h2 className="form-card__title">Забронировать место</h2>
              <p className="form-card__text">
                Оставьте заявку — перезвоним и закрепим место за вами. Для команд из 5+ человек
                лучше звонить напрямую.
              </p>

              {status === "error" ? (
                <div className="notice notice--error">
                  <p>Не удалось загрузить список залов: {error}</p>
                  <button className="btn btn--ghost btn--sm" type="button" onClick={reload}>
                    Повторить
                  </button>
                </div>
              ) : (
                <BookingForm halls={halls} defaultHall={defaultHall} />
              )}
            </div>
          </div>

          <div className="map" role="img" aria-label="Схема проезда — заглушка карты">
            <span className="map__label">Схема проезда</span>
            <span className="map__pin" aria-hidden="true">
              <Icon name="pin" size={22} />
            </span>
            <p className="map__caption">
              {CLUB.address}
              <br />
              {CLUB.addressNote}
            </p>
          </div>
        </div>
      </section>

      <section className="section section--soft" id="feedback">
        <div className="container">
          <div className="section__head">
            <div className="section__head-text">
              <p className="eyebrow">Обратная связь</p>
              <h2 className="section__title">Вопрос или предложение</h2>
              <p className="section__text">
                Напишите про турнир, аренду зала целиком, потерю вещей или идею акции.
                Отвечаем в рабочее время, обычно в течение пары часов.
              </p>
            </div>
          </div>

          <div className="form-card">
            <ContactForm />
          </div>
        </div>
      </section>
    </>
  );
}
