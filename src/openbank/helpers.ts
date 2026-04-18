import type { User } from "./types";

export const fmt = (n: number) =>
  "RD$" +
  Math.abs(n).toLocaleString("es-DO", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

export const hoy = () => {
  const d = new Date();
  return `${String(d.getDate()).padStart(2, "0")}/${String(
    d.getMonth() + 1
  ).padStart(2, "0")}/${d.getFullYear()}`;
};

export const find = (users: User[], id: string) => {
  for (const u of users) {
    const c = u.cuentas.find((c) => c.id === id);
    if (c) return { c, u, type: "cuenta" as const };
    const t = u.tarjetas?.find((t) => t.id === id);
    if (t) return { c: t, u, type: "tarjeta" as const };
  }
  return null;
};
