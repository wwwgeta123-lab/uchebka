import { useCallback, useEffect, useState } from "react";
import { api } from "../../api.js";
import { arrayToLines, linesToArray, linesToPairs, pairsToLines } from "./helpers.js";

const EMPTY_FORM = {
  slug: "",
  name: "",
  tagline: "",
  badge: "",
  price: "0",
  unit: "₽ / час",
  seats: "1",
  sort: "0",
  image: "/images/hall-standard.svg",
  description: "",
  specs: "",
  panel: "",
  prices: "",
  rules: "",
  gallery: "",
  isActive: true,
};

function toForm(hall) {
  return {
    slug: hall.slug,
    name: hall.name,
    tagline: hall.tagline ?? "",
    badge: hall.badge ?? "",
    price: String(hall.price),
    unit: hall.unit ?? "₽ / час",
    seats: String(hall.seats),
    sort: String(hall.sort ?? 0),
    image: hall.image ?? "",
    description: hall.description ?? "",
    specs: arrayToLines(hall.specs),
    panel: pairsToLines(hall.panel),
    prices: pairsToLines(hall.prices),
    rules: arrayToLines(hall.rules),
    gallery: arrayToLines(hall.gallery),
    isActive: Boolean(hall.isActive),
  };
}

function fromForm(form) {
  return {
    slug: form.slug.trim().toLowerCase(),
    name: form.name.trim(),
    tagline: form.tagline.trim(),
    badge: form.badge.trim(),
    price: Number(form.price),
    unit: form.unit.trim(),
    seats: Number(form.seats),
    sort: Number(form.sort) || 0,
    image: form.image.trim(),
    description: form.description.trim(),
    specs: linesToArray(form.specs),
    panel: linesToPairs(form.panel),
    prices: linesToPairs(form.prices),
    rules: linesToArray(form.rules),
    gallery: linesToArray(form.gallery),
    isActive: form.isActive,
  };
}

export default function Halls() {
  const [state, setState] = useState({ loading: true, error: "", halls: [] });
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [feedback, setFeedback] = useState({ saving: false, errors: [], message: "" });

  const load = useCallback(async () => {
    setState((current) => ({ ...current, loading: true, error: "" }));
    try {
      const halls = await api.admin.halls();
      setState({ loading: false, error: "", halls });
    } catch (error) {
      setState({ loading: false, error: error.message, halls: [] });
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  function startNew() {
    setEditingId(null);
    setForm(EMPTY_FORM);
    setFeedback({ saving: false, errors: [], message: "" });
  }

  function startEdit(hall) {
    setEditingId(hall.id);
    setForm(toForm(hall));
    setFeedback({ saving: false, errors: [], message: "" });
  }

  const update = (field) => (event) => {
    const value = event.target.type === "checkbox" ? event.target.checked : event.target.value;
    setForm((current) => ({ ...current, [field]: value }));
  };

  async function handleSubmit(event) {
    event.preventDefault();
    setFeedback({ saving: true, errors: [], message: "" });

    const payload = fromForm(form);
    try {
      const saved = editingId
        ? await api.admin.updateHall(editingId, payload)
        : await api.admin.createHall(payload);

      await load();
      setEditingId(saved.id);
      setForm(toForm(saved));
      setFeedback({ saving: false, errors: [], message: "Изменения сохранены" });
    } catch (error) {
      setFeedback({
        saving: false,
        errors: error.details.length ? error.details : [error.message],
        message: "",
      });
    }
  }

  async function handleDelete() {
    if (!editingId) return;
    if (!window.confirm("Удалить зал? Он исчезнет с сайта.")) return;
    try {
      await api.admin.deleteHall(editingId);
      await load();
      startNew();
    } catch (error) {
      setFeedback({ saving: false, errors: [error.message], message: "" });
    }
  }

  return (
    <>
      <div className="admin-head">
        <h1 className="admin-title">Залы</h1>
        <p className="admin-subtitle">
          Карточки залов на сайте строятся из этих данных: название, цена, описание и списки
          характеристик.
        </p>
      </div>

      {state.error && <div className="admin-alert">{state.error}</div>}

      <div className="admin-split">
        <div className="admin-card">
          <div className="admin-card__head">
            <h2 className="admin-card__title">Список</h2>
            <button className="btn btn--ghost btn--sm" type="button" onClick={startNew}>
              + Новый
            </button>
          </div>
          <div className="admin-list">
            {state.loading && <p className="state-note">Загружаем…</p>}
            {!state.loading &&
              state.halls.map((hall) => (
                <button
                  key={hall.id}
                  type="button"
                  className={[
                    "admin-list__item",
                    editingId === hall.id ? "is-active" : "",
                    hall.isActive ? "" : "is-inactive",
                  ]
                    .join(" ")
                    .trim()}
                  onClick={() => startEdit(hall)}
                >
                  <span className="admin-list__name">
                    {hall.name}
                    {!hall.isActive && " · скрыт"}
                  </span>
                  <span className="admin-list__meta">
                    /{hall.slug} · {hall.price} ₽ · {hall.seats} мест
                  </span>
                </button>
              ))}
          </div>
        </div>

        <div className="admin-card">
          <div className="admin-card__head">
            <h2 className="admin-card__title">
              {editingId ? `Редактирование: ${form.name || "зал"}` : "Новый зал"}
            </h2>
            {editingId && (
              <span className="admin-muted">ID {editingId}</span>
            )}
          </div>

          <form className="admin-form" onSubmit={handleSubmit} noValidate>
            <div className="form__row">
              <div className="field">
                <label htmlFor="hall-name">Название</label>
                <input className="input" id="hall-name" value={form.name} onChange={update("name")} required />
              </div>
              <div className="field">
                <label htmlFor="hall-slug">Слаг в адресе</label>
                <input
                  className="input"
                  id="hall-slug"
                  value={form.slug}
                  onChange={update("slug")}
                  placeholder="standard"
                  required
                />
              </div>
            </div>

            <div className="form__row">
              <div className="field">
                <label htmlFor="hall-tagline">Подпись</label>
                <input className="input" id="hall-tagline" value={form.tagline} onChange={update("tagline")} />
              </div>
              <div className="field">
                <label htmlFor="hall-badge">Бейдж на карточке</label>
                <input className="input" id="hall-badge" value={form.badge} onChange={update("badge")} />
              </div>
            </div>

            <div className="form__row">
              <div className="field">
                <label htmlFor="hall-price">Цена, ₽ / час</label>
                <input className="input" id="hall-price" type="number" min="0" value={form.price} onChange={update("price")} />
              </div>
              <div className="field">
                <label htmlFor="hall-seats">Мест</label>
                <input className="input" id="hall-seats" type="number" min="1" value={form.seats} onChange={update("seats")} />
              </div>
            </div>

            <div className="form__row">
              <div className="field">
                <label htmlFor="hall-unit">Единица цены</label>
                <input className="input" id="hall-unit" value={form.unit} onChange={update("unit")} />
              </div>
              <div className="field">
                <label htmlFor="hall-sort">Порядок вывода</label>
                <input className="input" id="hall-sort" type="number" value={form.sort} onChange={update("sort")} />
              </div>
            </div>

            <div className="field">
              <label htmlFor="hall-image">Картинка</label>
              <input className="input" id="hall-image" value={form.image} onChange={update("image")} />
              <p className="admin-form__hint">Путь к файлу в /images, например /images/hall-vip.svg</p>
            </div>

            <div className="field">
              <label htmlFor="hall-description">Описание</label>
              <textarea className="textarea" id="hall-description" value={form.description} onChange={update("description")} />
            </div>

            <div className="admin-form__section">
              <div className="field">
                <label htmlFor="hall-specs">Характеристики (по одной в строке)</label>
                <textarea className="textarea" id="hall-specs" value={form.specs} onChange={update("specs")} />
              </div>
            </div>

            <div className="field">
              <label htmlFor="hall-panel">Таблица оборудования: «Параметр | Значение»</label>
              <textarea className="textarea" id="hall-panel" value={form.panel} onChange={update("panel")} />
            </div>

            <div className="field">
              <label htmlFor="hall-prices">Цены: «Услуга | Стоимость»</label>
              <textarea className="textarea" id="hall-prices" value={form.prices} onChange={update("prices")} />
            </div>

            <div className="field">
              <label htmlFor="hall-rules">Правила зала (по одному в строке)</label>
              <textarea className="textarea" id="hall-rules" value={form.rules} onChange={update("rules")} />
            </div>

            <div className="field">
              <label htmlFor="hall-gallery">Галерея: пути к картинкам</label>
              <textarea className="textarea" id="hall-gallery" value={form.gallery} onChange={update("gallery")} />
            </div>

            <label className="admin-checkbox" htmlFor="hall-active">
              <input
                id="hall-active"
                type="checkbox"
                checked={form.isActive}
                onChange={update("isActive")}
              />
              Показывать зал на сайте
            </label>

            {feedback.errors.length > 0 && (
              <ul className="form__errors">
                {feedback.errors.map((error) => (
                  <li key={error}>{error}</li>
                ))}
              </ul>
            )}

            {feedback.message && <p className="form__note is-visible">{feedback.message}</p>}

            <div className="admin-actions">
              <button className="btn btn--primary" type="submit" disabled={feedback.saving}>
                {feedback.saving ? "Сохраняем…" : editingId ? "Сохранить зал" : "Создать зал"}
              </button>
              {editingId && (
                <div className="admin-actions">
                  <button className="btn btn--ghost" type="button" onClick={startNew}>
                    Отменить
                  </button>
                  <button className="btn btn--ghost btn--danger" type="button" onClick={handleDelete}>
                    Удалить
                  </button>
                </div>
              )}
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
