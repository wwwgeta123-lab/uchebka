import { useCallback, useEffect, useState } from "react";
import { api } from "../../api.js";
import { formatDateTime } from "./helpers.js";

export default function Messages() {
  const [state, setState] = useState({ loading: true, error: "", messages: [] });
  const [busyId, setBusyId] = useState(null);

  const load = useCallback(async () => {
    setState((current) => ({ ...current, loading: true, error: "" }));
    try {
      const messages = await api.admin.messages();
      setState({ loading: false, error: "", messages });
    } catch (error) {
      setState({ loading: false, error: error.message, messages: [] });
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  async function toggleRead(message) {
    setBusyId(message.id);
    try {
      const updated = await api.admin.setMessageRead(message.id, !message.isRead);
      setState((current) => ({
        ...current,
        messages: current.messages.map((item) => (item.id === message.id ? updated : item)),
      }));
    } catch (error) {
      setState((current) => ({ ...current, error: error.message }));
    } finally {
      setBusyId(null);
    }
  }

  async function remove(id) {
    if (!window.confirm("Удалить сообщение?")) return;
    setBusyId(id);
    try {
      await api.admin.deleteMessage(id);
      setState((current) => ({
        ...current,
        messages: current.messages.filter((item) => item.id !== id),
      }));
    } catch (error) {
      setState((current) => ({ ...current, error: error.message }));
    } finally {
      setBusyId(null);
    }
  }

  const unread = state.messages.filter((message) => !message.isRead).length;

  return (
    <>
      <div className="admin-head">
        <h1 className="admin-title">Сообщения</h1>
        <p className="admin-subtitle">
          Обращения из формы обратной связи. Непрочитанных: {unread}.
        </p>
      </div>

      <div className="admin-toolbar">
        <span className="admin-muted">
          Всего сообщений: {state.messages.length}
        </span>
        <button className="btn btn--ghost btn--sm" type="button" onClick={load}>
          Обновить
        </button>
      </div>

      {state.error && <div className="admin-alert">{state.error}</div>}

      {state.loading ? (
        <p className="state-note">Загружаем сообщения…</p>
      ) : state.messages.length === 0 ? (
        <p className="state-note">Сообщений пока нет.</p>
      ) : (
        <div className="admin-messages">
          {state.messages.map((message) => (
            <article
              className={`admin-message${message.isRead ? "" : " is-unread"}`}
              key={message.id}
            >
              <div className="admin-message__head">
                <div>
                  <p className="admin-message__name">
                    {message.name}
                    {!message.isRead && <span className="admin-dot" aria-label="не прочитано" />}
                  </p>
                  <p className="admin-muted">
                    {message.contact} · {formatDateTime(message.createdAt)}
                  </p>
                </div>
                <div className="admin-message__actions">
                  <button
                    className="btn btn--ghost btn--sm"
                    type="button"
                    onClick={() => toggleRead(message)}
                    disabled={busyId === message.id}
                  >
                    {message.isRead ? "Вернуть в непрочитанные" : "Отметить прочитанным"}
                  </button>
                  <button
                    className="admin-icon-btn"
                    type="button"
                    onClick={() => remove(message.id)}
                    disabled={busyId === message.id}
                    aria-label={`Удалить сообщение ${message.id}`}
                    title="Удалить"
                  >
                    ✕
                  </button>
                </div>
              </div>
              <p className="admin-message__text">{message.text}</p>
            </article>
          ))}
        </div>
      )}
    </>
  );
}
