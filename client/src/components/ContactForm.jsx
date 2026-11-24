import { useState } from "react";
import { api } from "../api.js";

export default function ContactForm() {
  const [values, setValues] = useState({ name: "", contact: "", text: "" });
  const [status, setStatus] = useState({ state: "idle", errors: [], message: "" });

  const update = (field) => (event) =>
    setValues((current) => ({ ...current, [field]: event.target.value }));

  async function handleSubmit(event) {
    event.preventDefault();
    setStatus({ state: "loading", errors: [], message: "" });
    try {
      const data = await api.createMessage(values);
      setStatus({ state: "success", errors: [], message: data.message });
      setValues({ name: "", contact: "", text: "" });
    } catch (error) {
      setStatus({
        state: "error",
        errors: error.details.length ? error.details : [error.message],
        message: "",
      });
    }
  }

  return (
    <form className="form" onSubmit={handleSubmit} noValidate>
      <div className="form__row">
        <div className="field">
          <label htmlFor="message-name">Имя</label>
          <input
            className="input"
            id="message-name"
            name="name"
            type="text"
            placeholder="Ваше имя"
            value={values.name}
            onChange={update("name")}
            required
          />
        </div>
        <div className="field">
          <label htmlFor="message-contact">Телефон или почта</label>
          <input
            className="input"
            id="message-contact"
            name="contact"
            type="text"
            placeholder="Как с вами связаться"
            value={values.contact}
            onChange={update("contact")}
            required
          />
        </div>
      </div>

      <div className="field">
        <label htmlFor="message-text">Сообщение</label>
        <textarea
          className="textarea"
          id="message-text"
          name="text"
          placeholder="Вопрос про турнир, буткемп или аренду зала"
          value={values.text}
          onChange={update("text")}
          required
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

      <button className="btn btn--ghost btn--block" type="submit" disabled={status.state === "loading"}>
        {status.state === "loading" ? "Отправляем…" : "Отправить сообщение"}
      </button>
    </form>
  );
}
