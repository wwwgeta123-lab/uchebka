import { useCallback, useEffect, useState } from "react";
import { api } from "../../api.js";
import { STATUS_FILTERS, STATUS_LABELS, formatDateTime, formatVisit } from "./helpers.js";

export default function Bookings() {
  const [filter, setFilter] = useState("");
  const [state, setState] = useState({ loading: true, error: "", bookings: [] });
  const [busyId, setBusyId] = useState(null);

  const load = useCallback(async (status) => {
    setState((current) => ({ ...current, loading: true, error: "" }));
    try {
      const bookings = await api.admin.bookings(status);
      setState({ loading: false, error: "", bookings });
    } catch (error) {
      setState({ loading: false, error: error.message, bookings: [] });
    }
  }, []);

  useEffect(() => {
    load(filter);
  }, [filter, load]);

  async function changeStatus(id, status) {
    setBusyId(id);
    try {
      const updated = await api.admin.setBookingStatus(id, status);
      setState((current) => ({
        ...current,
        bookings: current.bookings.map((item) => (item.id === id ? updated : item)),
      }));
    } catch (error) {
      setState((current) => ({ ...current, error: error.message }));
    } finally {
      setBusyId(null);
    }
  }

  async function remove(id) {
    if (!window.confirm("Удалить заявку безвозвратно?")) return;
    setBusyId(id);
    try {
      await api.admin.deleteBooking(id);
      setState((current) => ({
        ...current,
        bookings: current.bookings.filter((item) => item.id !== id),
      }));
    } catch (error) {
      setState((current) => ({ ...current, error: error.message }));
    } finally {
      setBusyId(null);
    }
  }

  return (
    <>
      <div className="admin-head">
        <h1 className="admin-title">Заявки на бронирование</h1>
        <p className="admin-subtitle">
          Подтвердите бронь после звонка гостю или отмените, если место уже занято.
        </p>
      </div>

      <div className="admin-toolbar">
        <div className="admin-filters">
          {STATUS_FILTERS.map((item) => (
            <button
              key={item.value}
              type="button"
              className={`admin-filter${filter === item.value ? " is-active" : ""}`}
              onClick={() => setFilter(item.value)}
            >
              {item.label}
            </button>
          ))}
        </div>
        <button className="btn btn--ghost btn--sm" type="button" onClick={() => load(filter)}>
          Обновить
        </button>
      </div>

      {state.error && <div className="admin-alert">{state.error}</div>}

      <section className="admin-card">
        {state.loading ? (
          <p className="state-note">Загружаем заявки…</p>
        ) : state.bookings.length === 0 ? (
          <p className="state-note">В этом списке пока пусто.</p>
        ) : (
          <div className="admin-table-wrap">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>№</th>
                  <th>Гость</th>
                  <th>Зал</th>
                  <th>Визит</th>
                  <th>Гостей</th>
                  <th>Комментарий</th>
                  <th>Создана</th>
                  <th>Статус</th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {state.bookings.map((booking) => (
                  <tr key={booking.id}>
                    <td className="admin-muted">#{booking.id}</td>
                    <td>
                      <strong>{booking.name}</strong>
                      <a className="admin-muted" href={`tel:${booking.phone.replace(/[^\d+]/g, "")}`}>
                        {booking.phone}
                      </a>
                    </td>
                    <td>{booking.hallName}</td>
                    <td>{formatVisit(booking.visitDate, booking.visitTime)}</td>
                    <td>{booking.guests}</td>
                    <td className="admin-cell-text">{booking.comment || "—"}</td>
                    <td className="admin-muted">{formatDateTime(booking.createdAt)}</td>
                    <td>
                      <select
                        className={`select admin-status-select status-select--${booking.status}`}
                        value={booking.status}
                        onChange={(event) => changeStatus(booking.id, event.target.value)}
                        disabled={busyId === booking.id}
                        aria-label={`Статус заявки ${booking.id}`}
                      >
                        {Object.entries(STATUS_LABELS).map(([value, label]) => (
                          <option key={value} value={value}>
                            {label}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td>
                      <button
                        className="admin-icon-btn"
                        type="button"
                        onClick={() => remove(booking.id)}
                        disabled={busyId === booking.id}
                        aria-label={`Удалить заявку ${booking.id}`}
                        title="Удалить заявку"
                      >
                        ✕
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </>
  );
}
