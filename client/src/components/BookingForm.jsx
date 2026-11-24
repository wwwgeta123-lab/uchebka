import { useEffect, useState } from "react";
import { api } from "../api.js";

const emptyForm = (hall) => ({
  name: "",
  phone: "",
  hall: hall || "",
  guests: "1",
  visitDate: "",
  visitTime: "",
  comment: "",
});

export default function BookingForm({ halls, defaultHall = "" }) {
  const [values, setValues] = useState(() => emptyForm(defaultHall));
  const [status, setStatus] = useState({ state: "idle", errors: [], message: "" });

  // Если зал пришёл из ссылки /contacts?hall=vip — подставляем его в форму
  useEffect(() => {
    setValues((current) => ({
      ...current,
      hall: defaultHall || current.hall || halls[0]?.slug || "",
    }));
  }, [defaultHall, halls]);

  const update = (field) => (event) =>
    setValues((current) => ({ ...current, [field]: event.target.value }));

  async function handleSubmit(event) {
    event.preventDefault();
    setStatus({ state: "loading", errors: [], message: "" });
    try {
      const data = await api.createBooking({ ...values, guests: Number(values.guests) });
      setStatus({ state: "success", errors: [], message: data.message });
      setValues(emptyForm(values.hall));
    } catch (error) {
      setStatus({
        state: "error",
        errors: error.details.length ? error.details : [error.message],
        message: "",
      });
    }
  }

  const today = new Date().toISOString().slice(0, 10);

  return (
    <form className="form" onSubmit={handleSubmit} noValidate>
      <div className="form__row">
        <div className="field">
          <label htmlFor="booking-name">Имя</label>
          <input
            className="input"
            id="booking-name"
            name="name"
            type="text"
            placeholder="Как к вам обращаться"
            value={values.name}
            onChange={update("name")}
            required
          />
        </div>
        <div className="field">
          <label htmlFor="booking-phone">Телефон</label>
          <input
            className="input"
            id="booking-phone"
            name="phone"
            type="tel"
            placeholder="+7 (___) ___-__-__"
            value={values.phone}
            onChange={update("phone")}
            required
          />
        </div>
      </div>

      <div className="form__row">
        <div className="field">
          <label htmlFor="booking-hall">Зал</label>
          <select
            className="select"
            id="booking-hall"
            name="hall"
            value={values.hall}
            onChange={update("hall")}
            required
          >
            {halls.map((hall) => (
              <option key={hall.slug} value={hall.slug}>
                {hall.name} — {hall.price} ₽ / час
              </option>
            ))}
          </select>
        </div>
        <div className="field">
          <label htmlFor="booking-guests">Гостей</label>
          <select
            className="select"
            id="booking-guests"
            name="guests"
            value={values.guests}
            onChange={update("guests")}
          >
            {[1, 2, 3, 4, 5, 6, 8, 10, 12].map((count) => (
              <option key={count} value={count}>
                {count} {count === 1 ? "человек" : "человека"}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="form__row">
        <div className="field">
          <label htmlFor="booking-date">Дата</label>
          <input
            className="input"
            id="booking-date"
            name="visitDate"
            type="date"
            min={today}
            value={values.visitDate}
            onChange={update("visitDate")}
            required
          />
        </div>
        <div className="field">
          <label htmlFor="booking-time">Время</label>
          <input
            className="input"
            id="booking-time"
            name="visitTime"
            type="time"
            value={values.visitTime}
            onChange={update("visitTime")}
            required
          />
        </div>
      </div>

      <div className="field">
        <label htmlFor="booking-comment">Комментарий</label>
        <textarea
          className="textarea"
          id="booking-comment"
          name="comment"
          placeholder="Например: нужны два места рядом и мышка поменьше"
          value={values.comment}
          onChange={update("comment")}
        />
      </div>

      {status.state === "error" && (
        <ul className="form__errors">
          {status.errors.map((error) => (
            <li key={error}>{error}</li>
          ))}
        </ul>
      )}

      <p className={`form__note${status.state === "success" ? " is-visible" : ""}`} role="status">
        {status.message}
      </p>

      <button className="btn btn--primary btn--block" type="submit" disabled={status.state === "loading"}>
        {status.state === "loading" ? "Отправляем…" : "Забронировать место"}
      </button>
      <p className="form__hint">
        Отправляя форму, вы соглашаетесь на обработку контактных данных. Бронь подтверждает
        администратор по телефону.
      </p>
    </form>
  );
}
