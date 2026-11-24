import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../../api.js";
import { STATUS_LABELS, formatDateTime, formatVisit } from "./helpers.js";

export default function Overview() {
  const [state, setState] = useState({ loading: true, error: "", stats: null, bookings: [] });

  useEffect(() => {
    let active = true;
    Promise.all([api.admin.stats(), api.admin.bookings()])
      .then(([stats, bookings]) => {
        if (active) setState({ loading: false, error: "", stats, bookings });
      })
      .catch((error) => {
        if (active) setState({ loading: false, error: error.message, stats: null, bookings: [] });
      });
    return () => {
      active = false;
    };
  }, []);

  if (state.loading) return <p className="state-note">Загружаем сводку…</p>;
  if (state.error) return <div className="admin-alert">{state.error}</div>;

  const { stats, bookings } = state;

  return (
    <>
      <div className="admin-head">
        <h1 className="admin-title">Обзор</h1>
        <p className="admin-subtitle">Свежие заявки и состояние клуба на сегодня.</p>
      </div>

      <div className="admin-grid">
        <article className="admin-stat admin-stat--accent">
          <p className="admin-stat__value">{stats.bookings.new}</p>
          <p className="admin-stat__label">Новые заявки</p>
        </article>
        <article className="admin-stat">
          <p className="admin-stat__value">{stats.bookings.total}</p>
          <p className="admin-stat__label">Всего заявок</p>
        </article>
        <article className="admin-stat">
          <p className="admin-stat__value">{stats.messages.unread}</p>
          <p className="admin-stat__label">Непрочитанных сообщений</p>
        </article>
        <article className="admin-stat">
          <p className="admin-stat__value">{stats.halls}</p>
          <p className="admin-stat__label">Активных залов</p>
        </article>
      </div>

      <section className="admin-card">
        <div className="admin-card__head">
          <h2 className="admin-card__title">Последние заявки</h2>
          <Link className="admin-link" to="/admin/bookings">
            Все заявки →
          </Link>
        </div>

        {bookings.length === 0 ? (
          <p className="state-note">Заявок пока нет. Форма бронирования на сайте создаст первую.</p>
        ) : (
          <div className="admin-table-wrap">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Гость</th>
                  <th>Зал</th>
                  <th>Визит</th>
                  <th>Статус</th>
                  <th>Создана</th>
                </tr>
              </thead>
              <tbody>
                {bookings.slice(0, 6).map((booking) => (
                  <tr key={booking.id}>
                    <td>
                      <strong>{booking.name}</strong>
                      <span className="admin-muted">{booking.phone}</span>
                    </td>
                    <td>{booking.hallName}</td>
                    <td>{formatVisit(booking.visitDate, booking.visitTime)}</td>
                    <td>
                      <span className={`status-pill status-pill--${booking.status}`}>
                        {STATUS_LABELS[booking.status]}
                      </span>
                    </td>
                    <td className="admin-muted">{formatDateTime(booking.createdAt)}</td>
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
