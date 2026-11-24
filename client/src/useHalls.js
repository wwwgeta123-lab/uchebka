import { useCallback, useEffect, useState } from "react";
import { api } from "./api.js";

export function useHalls() {
  const [state, setState] = useState({ status: "loading", halls: [], error: "" });

  const load = useCallback(async () => {
    setState((current) => ({ ...current, status: "loading", error: "" }));
    try {
      const halls = await api.halls();
      setState({ status: "ready", halls, error: "" });
    } catch (error) {
      setState({ status: "error", halls: [], error: error.message });
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  return { ...state, reload: load };
}
