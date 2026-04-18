import { useState } from "react";
import { Av, BankCard, BankImg, Chevron, CreditCard, Logo, ScrHdr } from "./atoms";
import { fmt } from "./helpers";
import type { Cuenta, NavFn, Tx, User } from "./types";

export function HomeScreen({
  user,
  nav,
  openSidebar,
  notifCount,
}: {
  user: User;
  nav: NavFn;
  openSidebar: () => void;
  notifCount: number;
}) {
  const [tab, setTab] = useState<"inicio" | "credito">("inicio");
  const total = user.cuentas.reduce((a, c) => a + c.saldo, 0);
  return (
    <div className="screen" style={{ background: "var(--bg)" }}>
      <div className="topbar">
        <div className="hmbg" onClick={openSidebar}>
          <svg width="18" height="14" viewBox="0 0 18 14" fill="none">
            <path d="M1 1h16M1 7h16M1 13h16" stroke="var(--text)" strokeWidth="1.8" strokeLinecap="round" />
          </svg>
        </div>
        <Logo size={36} />
        <div style={{ position: "relative", cursor: "pointer" }} onClick={() => nav("history")}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
            <path
              d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"
              stroke="var(--text)"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M13.73 21a2 2 0 0 1-3.46 0"
              stroke="var(--text)"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          {notifCount > 0 && (
            <div className="notif-badge">{notifCount > 9 ? "9+" : notifCount}</div>
          )}
        </div>
      </div>

      <div
        style={{
          background: "var(--surface)",
          padding: "18px 20px 20px",
          borderBottom: "1px solid var(--border-c)",
          marginBottom: 16,
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <Av initials={user.initials} size={50} />
            <div>
              <p style={{ fontSize: 17, fontWeight: 700, color: "var(--text)", letterSpacing: "-.3px" }}>
                {user.nombre}
              </p>
              <p style={{ fontSize: 12, color: "var(--text2)", marginTop: 2 }}>{user.cedula}</p>
            </div>
          </div>
          <div style={{ textAlign: "right" }}>
            <p
              style={{
                fontSize: 10,
                color: "var(--text3)",
                fontWeight: 600,
                textTransform: "uppercase",
                letterSpacing: ".5px",
              }}
            >
              Total
            </p>
            <p
              style={{
                fontSize: 16,
                fontWeight: 800,
                color: "var(--green)",
                letterSpacing: "-.4px",
                marginTop: 2,
              }}
            >
              {fmt(total)}
            </p>
          </div>
        </div>
      </div>

      <div style={{ padding: "0 16px 14px" }}>
        <div className="tabs">
          <div className={`tab ${tab === "inicio" ? "on" : ""}`} onClick={() => setTab("inicio")}>
            Inicio
          </div>
          <div className={`tab ${tab === "credito" ? "on" : ""}`} onClick={() => setTab("credito")}>
            Tarjetas de crédito
          </div>
        </div>
      </div>

      <div style={{ padding: "0 16px 100px", display: "flex", flexDirection: "column", gap: 14 }}>
        {tab === "inicio" &&
          user.cuentas.map((c) => (
            <BankCard key={c.id} cuenta={c} onClick={() => nav("detail", { cuentaId: c.id })} />
          ))}

        {tab === "credito" &&
          (user.tarjetas && user.tarjetas.length > 0 ? (
            user.tarjetas.map((t) => <CreditCard key={t.id} tarjeta={t} />)
          ) : (
            <div style={{ textAlign: "center", padding: "70px 0" }}>
              <svg
                width="40"
                height="40"
                viewBox="0 0 24 24"
                fill="none"
                style={{ margin: "0 auto 12px" }}
              >
                <rect x="2" y="5" width="20" height="14" rx="2" stroke="var(--text3)" strokeWidth="1.5" />
                <line x1="2" y1="10" x2="22" y2="10" stroke="var(--text3)" strokeWidth="1.5" />
              </svg>
              <p style={{ color: "var(--text3)", fontSize: 14 }}>No hay tarjetas de crédito</p>
            </div>
          ))}
      </div>
    </div>
  );
}

export function DetailScreen({
  cuenta,
  nav,
  txs,
}: {
  cuenta: Cuenta;
  nav: NavFn;
  txs: Tx[];
}) {
  const movs = txs.filter((m) => m.cuentaId === cuenta.id);
  return (
    <div className="screen" style={{ background: "var(--bg)" }}>
      <ScrHdr
        title="Detalle de cuenta"
        onBack={() => nav("home")}
        right={<Av initials={cuenta.banco[0]} onClick={() => nav("profile")} />}
      />

      <div style={{ padding: "16px 16px 0" }}>
        <BankCard cuenta={cuenta} />
      </div>

      <div className="acts">
        {(
          [
            {
              lbl: "Transferir",
              fn: () => nav("transfer", { cuentaOrigenId: cuenta.id }),
              icon: (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--blue)" strokeWidth="2" strokeLinecap="round">
                  <path d="M7 16V4m0 0L3 8m4-4l4 4M17 8v12m0 0l4-4m-4 4l-4-4" />
                </svg>
              ),
            },
            {
              lbl: "Pago servicios",
              fn: () => {},
              icon: (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--blue)" strokeWidth="2" strokeLinecap="round">
                  <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z" />
                  <polyline points="13 2 13 9 20 9" />
                </svg>
              ),
            },
            {
              lbl: "Estado cta.",
              fn: () => {},
              icon: (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--blue)" strokeWidth="2" strokeLinecap="round">
                  <rect x="2" y="5" width="20" height="14" rx="2" />
                  <line x1="2" y1="10" x2="22" y2="10" />
                </svg>
              ),
            },
          ] as Array<{ lbl: string; fn: () => void; icon: React.ReactNode }>
        ).map(({ lbl, fn, icon }) => (
          <div key={lbl} className="act" onClick={fn}>
            {icon}
            <span>{lbl}</span>
          </div>
        ))}
      </div>

      <p className="sec">Movimientos</p>
      <div className="surface" style={{ margin: "0 16px" }}>
        {movs.length === 0 ? (
          <p style={{ padding: "22px 18px", color: "var(--text3)", fontSize: 13, textAlign: "center" }}>
            Sin movimientos
          </p>
        ) : (
          movs.map((m) => (
            <div key={m.id} className="mrow">
              <div style={{ display: "flex", alignItems: "center" }}>
                <div className="mdot" style={{ background: m.monto < 0 ? "var(--red)" : "var(--green)" }} />
                <div>
                  <p style={{ fontSize: 14, fontWeight: 500, color: "var(--text)" }}>{m.tipo}</p>
                  <p style={{ fontSize: 11, color: "var(--text2)", marginTop: 3 }}>{m.fecha}</p>
                </div>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span className={`badge ${m.monto < 0 ? "bg-bad" : "bg-good"}`}>
                  {m.monto < 0 ? "-" : "+"}
                  {fmt(m.monto)}
                </span>
              </div>
            </div>
          ))
        )}
      </div>

      <div
        style={{
          margin: "12px 16px 100px",
          padding: "14px 18px",
          background: "var(--surface)",
          borderRadius: "var(--r10)",
          border: "1px solid var(--border-c)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <p style={{ fontSize: 13, color: "var(--text2)", fontWeight: 500 }}>Disponible</p>
        <p style={{ fontSize: 15, fontWeight: 700, color: "var(--green)" }}>{fmt(cuenta.saldo)}</p>
      </div>
    </div>
  );
}

export function ProfileScreen({ user, nav }: { user: User; nav: NavFn }) {
  const total = user.cuentas.reduce((a, c) => a + c.saldo, 0);
  const opts = ["Cambiar contraseña", "Notificaciones", "Token", "Calculadora", "Ayuda"];
  return (
    <div className="screen" style={{ background: "var(--bg)" }}>
      <ScrHdr title="Perfil" onBack={() => nav("home")} />

      <div
        style={{
          background: "var(--surface)",
          padding: "22px 18px",
          borderBottom: "1px solid var(--border-c)",
          marginBottom: 16,
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 18,
          }}
        >
          <div>
            <p style={{ fontSize: 28, fontWeight: 900, color: "var(--green)", letterSpacing: "-1.2px" }}>
              {fmt(total)}
            </p>
            <p style={{ fontSize: 12, color: "var(--text2)", marginTop: 4 }}>Saldo total consolidado</p>
          </div>
          <BankImg banco={user.cuentas[0]?.banco} size={52} />
        </div>

        <div
          style={{
            background: "var(--surface2)",
            borderRadius: "var(--r12)",
            padding: "14px 16px",
            border: "1px solid var(--border-c)",
            display: "flex",
            alignItems: "center",
            gap: 14,
          }}
        >
          <Av initials={user.initials} size={52} />
          <div style={{ flex: 1, minWidth: 0 }}>
            <p style={{ fontSize: 15, fontWeight: 700, color: "var(--text)" }}>{user.nombre}</p>
            <p style={{ fontSize: 12, color: "var(--text2)", marginTop: 3 }}>{user.cedula}</p>
          </div>
          <div
            style={{
              width: 42,
              height: 42,
              borderRadius: "50%",
              border: "2px solid var(--green)",
              background: "var(--greenbg)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "var(--green)",
              fontWeight: 800,
              fontSize: 13,
              flexShrink: 0,
            }}
          >
            A+
          </div>
        </div>
      </div>

      <p className="sec">Mis cuentas</p>
      <div className="surface" style={{ margin: "0 16px 16px" }}>
        {user.cuentas.map((c, i) => (
          <div
            key={c.id}
            className="orow"
            style={{
              borderBottom:
                i < user.cuentas.length - 1 ? "1px solid var(--border-c)" : "none",
            }}
            onClick={() => nav("detail", { cuentaId: c.id })}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <BankImg banco={c.banco} size={36} />
              <div>
                <p style={{ fontSize: 13, fontWeight: 600, color: "var(--text)" }}>{c.banco}</p>
                <p style={{ fontSize: 11, color: "var(--text2)", marginTop: 2 }}>{c.numero}</p>
              </div>
            </div>
            <p style={{ fontSize: 13, fontWeight: 700, color: "var(--green)" }}>{fmt(c.saldo)}</p>
          </div>
        ))}
      </div>

      <p className="sec">Opciones</p>
      <div className="surface" style={{ margin: "0 16px 100px" }}>
        {opts.map((o) => (
          <div key={o} className="orow">
            <p style={{ fontSize: 14, fontWeight: 500, color: "var(--text)" }}>{o}</p>
            <Chevron />
          </div>
        ))}
      </div>
    </div>
  );
}
