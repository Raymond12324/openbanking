import { useState } from "react";
import { ScrHdr } from "./atoms";
import { ConfirmModal } from "./ConfirmModal";
import { fmt, find, hoy } from "./helpers";
import type { NavFn, Tx, User } from "./types";

export function TransferScreen({
  user,
  users,
  cuentaOrigenId,
  nav,
  onTransfer,
}: {
  user: User;
  users: User[];
  cuentaOrigenId?: string;
  nav: NavFn;
  onTransfer: (data: {
    origenCuentaId: string;
    destinoCuentaId: string;
    monto: number;
    desc: string;
  }) => void;
}) {
  const [origenId, setOrigenId] = useState(cuentaOrigenId || user.cuentas[0]?.id || "");
  const [destinoId, setDestinoId] = useState("");
  const [desc, setDesc] = useState("PAGO LOCAL");
  const [monto, setMonto] = useState("");
  const [tipo, setTipo] = useState("ACH");
  const [err, setErr] = useState("");
  const [confirm, setConfirm] = useState(false);

  const destOpts = users
    .filter((u) => u.id !== user.id)
    .flatMap((u) =>
      u.cuentas.map((c) => ({
        ...c,
        label: `${u.nombre} — ${c.banco} (${c.numero})`,
      }))
    );
  const origen = user.cuentas.find((c) => c.id === origenId);

  const tryConfirm = () => {
    const amt = parseFloat(monto);
    if (!origen) return setErr("Selecciona una cuenta de origen.");
    if (!destinoId) return setErr("Selecciona una cuenta de destino.");
    if (!amt || amt <= 0) return setErr("Ingresa un monto válido.");
    if (amt > origen.saldo) return setErr(`Saldo insuficiente. Disponible: ${fmt(origen.saldo)}`);
    setErr("");
    setConfirm(true);
  };

  const doTransfer = () => {
    const amt = parseFloat(monto);
    onTransfer({ origenCuentaId: origenId, destinoCuentaId: destinoId, monto: amt, desc });
    nav("transfer-success", {
      monto: amt,
      origenCuentaId: origenId,
      destinoCuentaId: destinoId,
      desc,
    });
  };

  return (
    <div className="screen" style={{ background: "var(--bg)" }}>
      <ScrHdr
        title="Transferencia bancaria"
        onBack={() =>
          nav(
            cuentaOrigenId ? "detail" : "home",
            cuentaOrigenId ? { cuentaId: cuentaOrigenId } : {}
          )
        }
      />

      <div style={{ padding: "18px 16px 100px", display: "flex", flexDirection: "column", gap: 16 }}>
        <div className="surface" style={{ padding: "18px 16px" }}>
          <div className="ig">
            <label className="lbl">Cuenta origen</label>
            <select className="fld" value={origenId} onChange={(e) => setOrigenId(e.target.value)}>
              {user.cuentas.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.banco} — {c.tipo} · {fmt(c.saldo)}
                </option>
              ))}
            </select>
          </div>
          <div className="ig">
            <label className="lbl">Cuenta destino</label>
            <select
              className="fld"
              value={destinoId}
              onChange={(e) => {
                setDestinoId(e.target.value);
                setErr("");
              }}
            >
              <option value="">— Seleccionar destinatario —</option>
              {destOpts.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.label}
                </option>
              ))}
            </select>
          </div>
          <div className="ig">
            <label className="lbl">Descripción</label>
            <input
              className="fld"
              value={desc}
              placeholder="Descripción"
              onChange={(e) => setDesc(e.target.value)}
            />
          </div>
          <div className="ig" style={{ marginBottom: 0 }}>
            <label className="lbl">Monto (RD$)</label>
            <input
              className="fld"
              type="number"
              min="0"
              step="any"
              value={monto}
              placeholder="0.00"
              onChange={(e) => {
                setMonto(e.target.value);
                setErr("");
              }}
            />
          </div>
        </div>

        <div>
          <label className="lbl" style={{ display: "block", marginBottom: 10 }}>
            Tipo de transferencia
          </label>
          <div style={{ display: "flex", gap: 10 }}>
            {["ACH", "Pagos al instante BCRD"].map((t) => (
              <div key={t} className={`radio ${tipo === t ? "on" : ""}`} onClick={() => setTipo(t)}>
                {t}
              </div>
            ))}
          </div>
        </div>

        {tipo === "ACH" && (
          <div className="notice">
            <p style={{ fontSize: 12, color: "var(--amber)", fontWeight: 700, marginBottom: 4 }}>
              HORARIO TRANSFERENCIAS ACH
            </p>
            <p style={{ fontSize: 12, color: "#92400E", lineHeight: 1.55 }}>
              Se procesan en días hábiles de 8am – 5pm.
            </p>
          </div>
        )}

        {err && (
          <div
            style={{
              background: "var(--redbg)",
              border: "1px solid #FECACA",
              borderRadius: "var(--r10)",
              padding: "12px 15px",
              color: "#B91C1C",
              fontSize: 13,
              fontWeight: 500,
            }}
          >
            {err}
          </div>
        )}

        <button className="btn-primary" onClick={tryConfirm}>
          Revisar transferencia
        </button>
      </div>

      {confirm && (
        <ConfirmModal
          data={{
            origenCuentaId: origenId,
            destinoCuentaId: destinoId,
            monto: parseFloat(monto),
            desc,
          }}
          users={users}
          onCancel={() => setConfirm(false)}
          onConfirm={doTransfer}
        />
      )}
    </div>
  );
}

export function TransferSuccessScreen({
  nav,
  monto,
  destinoCuentaId,
  desc,
  users,
}: {
  nav: NavFn;
  monto: number;
  origenCuentaId: string;
  destinoCuentaId: string;
  desc: string;
  users: User[];
}) {
  const dst = find(users, destinoCuentaId);
  return (
    <div className="succwrap">
      <div className="checkring">
        <svg width="46" height="46" viewBox="0 0 24 24" fill="none">
          <path
            d="M5 13l4 4L19 7"
            stroke="#fff"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      <div style={{ textAlign: "center" }}>
        <p style={{ fontSize: 36, fontWeight: 900, color: "var(--text)", letterSpacing: "-1.5px" }}>
          {fmt(monto)}
        </p>
        <p style={{ fontSize: 13, color: "var(--text2)", marginTop: 6, fontWeight: 500 }}>
          Transferencia exitosa
        </p>
      </div>
      <div className="surface" style={{ width: "100%", padding: "0 18px" }}>
        {(
          [
            ["Banco destino", dst?.c.banco || "—"],
            ["No. de cuenta", dst?.c.numero || destinoCuentaId],
            ["Beneficiario", dst?.u.nombre || "—"],
            ["Descripción", desc || "TRANSFERENCIA"],
            ["Monto", fmt(monto)],
            ["Fecha", hoy()],
          ] as Array<[string, string]>
        ).map(([l, v]) => (
          <div key={l} className="trow">
            <span style={{ color: "var(--text2)" }}>{l}</span>
            <span
              style={{
                fontWeight: 600,
                color: "var(--text)",
                textAlign: "right",
                maxWidth: "58%",
              }}
            >
              {v}
            </span>
          </div>
        ))}
      </div>
      <button className="btn-primary" onClick={() => nav("home")}>
        Volver al inicio
      </button>
    </div>
  );
}

export function HistoryScreen({
  nav,
  txs,
  user,
}: {
  nav: NavFn;
  txs: Tx[];
  user: User;
}) {
  const userProductIds = [
    ...user.cuentas.map((c) => c.id),
    ...(user.tarjetas || []).map((t) => t.id),
  ];

  const movs = txs.filter((m) => userProductIds.includes(m.cuentaId));

  const getProductoNombre = (id: string) => {
    const cuenta = user.cuentas.find((c) => c.id === id);
    if (cuenta) return `${cuenta.banco} · Cuenta`;
    const tarjeta = (user.tarjetas || []).find((t) => t.id === id);
    if (tarjeta) return `${tarjeta.banco} · Tarjeta`;
    return "";
  };

  return (
    <div className="screen" style={{ background: "var(--bg)" }}>
      <ScrHdr title="Historial" onBack={() => nav("home")} />
      <p className="sec">Todos los movimientos</p>
      <div className="surface" style={{ margin: "0 16px 100px" }}>
        {movs.length === 0 ? (
          <p style={{ padding: "24px 18px", color: "var(--text3)", fontSize: 13, textAlign: "center" }}>
            Sin movimientos
          </p>
        ) : (
          movs.map((m) => (
            <div key={m.id} className="mrow">
              <div style={{ display: "flex", alignItems: "center" }}>
                <div
                  className="mdot"
                  style={{ background: m.monto < 0 ? "var(--red)" : "var(--green)" }}
                />
                <div>
                  <p style={{ fontSize: 14, fontWeight: 500, color: "var(--text)" }}>{m.tipo}</p>
                  <p style={{ fontSize: 11, color: "var(--text2)", marginTop: 3 }}>
                    {m.fecha}
                    {getProductoNombre(m.cuentaId)
                      ? " · " + getProductoNombre(m.cuentaId)
                      : ""}
                  </p>
                </div>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span className={`badge ${m.monto < 0 ? "bg-bad" : "bg-good"}`}>
                  {m.monto < 0 ? "-" : "+"}
                  {fmt(m.monto)}
                </span>
                <span style={{ fontSize: 11, color: "var(--text2)", fontWeight: 600 }}>
                  {m.monto < 0 ? "Salida" : "Depósito"}
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export function Sidebar({
  user,
  active,
  onClose,
  nav,
  onLogout,
}: {
  user: User;
  active: string;
  onClose: () => void;
  nav: NavFn;
  onLogout: () => void;
}) {
  const items: Array<{ id: "home" | "profile" | "history" | "transfer"; label: string }> = [
    { id: "home", label: "Inicio" },
    { id: "profile", label: "Perfil" },
    { id: "history", label: "Historial" },
    { id: "transfer", label: "Transferencias" },
  ];
  return (
    <>
      <div className="sbov" onClick={onClose} />
      <div className="sb">
        <div className="sbhead">
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div className="avatar" style={{ width: 46, height: 46, fontSize: 14 }}>
              {user.initials}
            </div>
            <div>
              <p style={{ fontSize: 14, fontWeight: 700, color: "var(--text)" }}>{user.nombre}</p>
              <p style={{ fontSize: 11, color: "var(--text2)", marginTop: 2 }}>{user.cedula}</p>
            </div>
          </div>
        </div>
        <div style={{ flex: 1, padding: "8px 0" }}>
          {items.map((i) => (
            <div
              key={i.id}
              className={`si ${active === i.id ? "on" : ""}`}
              onClick={() => {
                nav(i.id);
                onClose();
              }}
            >
              {i.label}
            </div>
          ))}
        </div>
        <div style={{ borderTop: "1px solid var(--border-c)", padding: "8px 0" }}>
          <div
            className="si"
            style={{ color: "var(--red)" }}
            onClick={() => {
              onLogout();
              onClose();
            }}
          >
            Cerrar sesión
          </div>
        </div>
      </div>
    </>
  );
}
