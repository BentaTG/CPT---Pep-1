"use client";

import {
  useEffect,
  useState,
  type Dispatch,
  type SetStateAction,
} from "react";

export const STUDY_STORAGE_KEYS = Object.freeze({
  navigation: "cpt-pep1:progress:navigation:v1",
  laboratory: "cpt-pep1:progress:laboratory:v1",
  checklist: "cpt-pep1:progress:checklist:v1",
  exam: "cpt-pep1:progress:exam:v1",
});

export function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

export function usePersistentState<T>(
  key: string,
  initialValue: T,
  validate: (value: unknown) => value is T,
): readonly [T, Dispatch<SetStateAction<T>>] {
  const [state, setState] = useState<T>(initialValue);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    let restored: T | undefined;
    let cancelled = false;

    try {
      const stored = window.localStorage.getItem(key);
      if (stored !== null) {
        const parsed: unknown = JSON.parse(stored);
        if (validate(parsed)) restored = parsed;
      }
    } catch {
      // A corrupt or unavailable storage entry must not prevent studying.
    }

    queueMicrotask(() => {
      if (cancelled) return;
      if (restored !== undefined) setState(restored);
      setHydrated(true);
    });

    return () => {
      cancelled = true;
    };
  }, [key, validate]);

  useEffect(() => {
    if (!hydrated) return;

    try {
      window.localStorage.setItem(key, JSON.stringify(state));
    } catch {
      // Browsers can disable or exhaust localStorage; the page still works in memory.
    }
  }, [hydrated, key, state]);

  return [state, setState] as const;
}
