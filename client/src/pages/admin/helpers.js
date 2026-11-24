export const STATUS_LABELS = {
  new: "Новая",
  confirmed: "Подтверждена",
  cancelled: "Отменена",
};

export const STATUS_FILTERS = [
  { value: "", label: "Все" },
  { value: "new", label: "Новые" },
  { value: "confirmed", label: "Подтверждённые" },
  { value: "cancelled", label: "Отменённые" },
];

/** SQLite хранит datetime('now') в UTC — приводим к локальному времени. */
export function formatDateTime(value) {
  if (!value) return "—";
  const iso = value.includes("T") ? value : `${value.replace(" ", "T")}Z`;
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleString("ru-RU", { dateStyle: "short", timeStyle: "short" });
}

export function formatVisit(date, time) {
  if (!date) return "—";
  const [year, month, day] = date.split("-");
  return `${day}.${month}.${year}, ${time}`;
}

export function linesToArray(value) {
  return String(value ?? "")
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
}

export function arrayToLines(value) {
  return Array.isArray(value) ? value.join("\n") : "";
}

export function linesToPairs(value) {
  return linesToArray(value)
    .map((line) => {
      const [label, ...rest] = line.split("|");
      return { label: label.trim(), value: rest.join("|").trim() };
    })
    .filter((pair) => pair.label || pair.value);
}

export function pairsToLines(value) {
  if (!Array.isArray(value)) return "";
  return value.map((pair) => `${pair.label} | ${pair.value}`).join("\n");
}
