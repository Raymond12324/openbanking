import { fmt, find } from "./helpers";
import type { User } from "./types";

export function ConfirmModal({
  data,
  users,
  onConfirm,
  onCancel,
}: {
  data: { origenCuentaId: string; destinoCuentaId: string; monto: number; desc: string };
  users: User[];
  onConfirm: () => void;
  onCancel: () => void;
}) {
  const dst = find(users, data.destinoCuentaId);
  const src = find(users, data.origenCuentaId);
  return (
    <div
      className="modal-ov"
      onClick={(e) => e.target === e.currentTarget && onCancel()}
    >
      <div className="modal">
        <div className="modal-pill" />
        <p className="modal-title">Confirmar transferencia</p>
        <p className="modal-sub">Revisa los detalles antes de continuar</p>

        <div
          style={{
            background: "var(--bluebg)",
            border: "1px solid #BFDBFE",
            borderRadius: 14,
            padding: "16px 18px",
            marginBottom: 16,
            textAlign: "center",
          }}
        >
          <p
            style={{
              fontSize: 32,
              fontWeight: 900,
              color: "var(--blue)",
              letterSpacing: "-1.2px",
            }}
          >
            {fmt(data.monto)}
          </p>
          <p style={{ fontSize: 12, color: "#3B82F6", marginTop: 4, fontWeight: 500 }}>
            {src?.c.banco} → {dst?.c.banco || "Externo"}
          </p>
        </div>

        <div className="surface" style={{ padding: "0 16px", marginBottom: 20 }}>
          {(
            [
              ["Desde", src?.u.nombre || "—"],
              ["Cuenta", src?.c.numero || "—"],
              ["Hacia", dst?.u.nombre || "—"],
              ["Cuenta", dst?.c.numero || data.destinoCuentaId],
              ["Descripción", data.desc || "TRANSFERENCIA"],
            ] as Array<[string, string]>
          ).map(([l, v]) => (
            <div key={l + v} className="trow">
              <span style={{ color: "var(--text2)" }}>{l}</span>
              <span
                style={{
                  fontWeight: 600,
                  color: "var(--text)",
                  maxWidth: "58%",
                  textAlign: "right",
                }}
              >
                {v}
              </span>
            </div>
          ))}
        </div>

        <div style={{ display: "flex", gap: 10 }}>
          <button className="btn-secondary" onClick={onCancel} style={{ flex: 1 }}>
            Cancelar
          </button>
          <button className="btn-blue" onClick={onConfirm} style={{ flex: 2 }}>
            Confirmar transferencia
          </button>
        </div>
      </div>
    </div>
  );
}
