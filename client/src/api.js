// Тонкая обёртка над Fetch API: все запросы идут на /api (в dev — через прокси Vite).

async function request(url, { method = "GET", body } = {}) {
  const response = await fetch(`/api${url}`, {
    method,
    credentials: "include",
    headers: body ? { "Content-Type": "application/json" } : undefined,
    body: body ? JSON.stringify(body) : undefined,
  });

  const raw = await response.text();
  let data = null;
  if (raw) {
    try {
      data = JSON.parse(raw);
    } catch {
      data = null;
    }
  }

  if (!response.ok) {
    const error = new Error(data?.error || "Не удалось выполнить запрос");
    error.status = response.status;
    error.details = Array.isArray(data?.errors) ? data.errors : [];
    throw error;
  }

  return data;
}

export const api = {
  halls: () => request("/halls"),
  hall: (slug) => request(`/halls/${slug}`),
  createBooking: (payload) => request("/bookings", { method: "POST", body: payload }),
  createMessage: (payload) => request("/messages", { method: "POST", body: payload }),

  admin: {
    login: (login, password) =>
      request("/admin/login", { method: "POST", body: { login, password } }),
    logout: () => request("/admin/logout", { method: "POST" }),
    me: () => request("/admin/me"),
    stats: () => request("/admin/stats"),

    bookings: (status) =>
      request(`/admin/bookings${status ? `?status=${encodeURIComponent(status)}` : ""}`),
    setBookingStatus: (id, status) =>
      request(`/admin/bookings/${id}`, { method: "PATCH", body: { status } }),
    deleteBooking: (id) => request(`/admin/bookings/${id}`, { method: "DELETE" }),

    messages: () => request("/admin/messages"),
    setMessageRead: (id, isRead) =>
      request(`/admin/messages/${id}`, { method: "PATCH", body: { isRead } }),
    deleteMessage: (id) => request(`/admin/messages/${id}`, { method: "DELETE" }),

    halls: () => request("/admin/halls"),
    createHall: (payload) => request("/admin/halls", { method: "POST", body: payload }),
    updateHall: (id, payload) =>
      request(`/admin/halls/${id}`, { method: "PATCH", body: payload }),
    deleteHall: (id) => request(`/admin/halls/${id}`, { method: "DELETE" }),
  },
};
