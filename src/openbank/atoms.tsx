import { BANCOS } from "./data";
import { fmt } from "./helpers";
import type { BancoNombre, Cuenta, Tarjeta } from "./types";

export function Logo({ size = 56 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none">
      <circle cx="32" cy="32" r="30" stroke="#1D4ED8" strokeWidth="2.5" fill="#EFF6FF" />
      <circle cx="32" cy="32" r="21" stroke="#93C5FD" strokeWidth="1.5" fill="#fff" />
      <polygon points="32,17 16,28 48,28" fill="#1D4ED8" />
      <rect x="18" y="37.5" width="28" height="3.5" rx="1.75" fill="#1D4ED8" />
      <rect x="21" y="28" width="4" height="11" rx="2" fill="#1D4ED8" />
      <rect x="30" y="26" width="4" height="13" rx="2" fill="#1D4ED8" />
      <rect x="39" y="30" width="4" height="9" rx="2" fill="#1D4ED8" />
    </svg>
  );
}

export function Av({
  initials,
  onClick,
  size = 38,
}: {
  initials: string;
  onClick?: () => void;
  size?: number;
}) {
  const fs = size <= 38 ? 12 : size <= 48 ? 14 : 17;
  return (
    <div
      className="avatar"
      style={{ width: size, height: size, fontSize: fs }}
      onClick={onClick}
    >
      {initials}
    </div>
  );
}

/* Inline SVG bank "logos" — no external assets needed. */
function BankSvg({ banco, size }: { banco: BancoNombre; size: number }) {
  const inner = size - 12;
  if (banco === "BHD") {
    return (
      <svg width={inner} height={inner} viewBox="0 0 60 60">
        <circle cx="30" cy="30" r="28" fill="#fff" />
        <text x="30" y="38" textAnchor="middle" fontSize="20" fontWeight="900" fill="#d97706" fontFamily="Inter, sans-serif">
          BHD
        </text>
      </svg>
    );
  }
  if (banco === "Popular") {
    return (
      <svg width={inner} height={inner} viewBox="0 0 60 60">
        <circle cx="30" cy="30" r="28" fill="#fff" />
        <text x="30" y="37" textAnchor="middle" fontSize="14" fontWeight="900" fill="#be123c" fontFamily="Inter, sans-serif">
          POP
        </text>
      </svg>
    );
  }
  return (
    <svg width={inner} height={inner} viewBox="0 0 60 60">
      <circle cx="30" cy="30" r="28" fill="#fff" />
      <text x="30" y="37" textAnchor="middle" fontSize="14" fontWeight="900" fill="#1d4ed8" fontFamily="Inter, sans-serif">
        BRE
      </text>
    </svg>
  );
}

export function BankImg({ banco, size = 46 }: { banco?: BancoNombre; size?: number }) {
  if (!banco) return null;
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: "50%",
        background: "#fff",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        boxShadow: "0 3px 12px rgba(0,0,0,.22)",
        flexShrink: 0,
      }}
    >
      <BankSvg banco={banco} size={size} />
    </div>
  );
}

export function BankCard({ cuenta, onClick }: { cuenta: Cuenta; onClick?: () => void }) {
  const cfg = BANCOS[cuenta.banco] || ({} as { bg?: string; accent?: string });
  return (
    <div className="bcard" style={{ background: cfg.bg || "#1a1a1a" }} onClick={onClick}>
      <div
        style={{
          position: "absolute",
          right: -44,
          top: -44,
          width: 190,
          height: 190,
          borderRadius: "50%",
          background: "rgba(255,255,255,.04)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          marginBottom: 22,
          position: "relative",
        }}
      >
        <div>
          <p style={{ fontSize: 11, color: "rgba(255,255,255,.45)", fontWeight: 500, marginBottom: 4 }}>
            {cuenta.tipo}
          </p>
          <p style={{ fontSize: 12, color: "rgba(255,255,255,.3)", letterSpacing: ".4px" }}>
            {cuenta.numero}
          </p>
        </div>
        <BankImg banco={cuenta.banco} size={48} />
      </div>
      <p
        style={{
          fontSize: 26,
          fontWeight: 800,
          color: "#fff",
          letterSpacing: "-1px",
          position: "relative",
        }}
      >
        {fmt(cuenta.saldo)}
      </p>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginTop: 14,
        }}
      >
        <div
          style={{
            height: 3,
            width: 38,
            borderRadius: 2,
            background: cfg.accent || "#fff",
          }}
        />
        <p style={{ fontSize: 11, color: "rgba(255,255,255,.35)", fontWeight: 600, letterSpacing: ".5px" }}>
          {cuenta.banco}
        </p>
      </div>
    </div>
  );
}

export function CreditCard({ tarjeta, onClick }: { tarjeta: Tarjeta; onClick?: () => void }) {
  const disponible = tarjeta.limite - tarjeta.usado;
  return (
    <div className="bcard" style={{ background: tarjeta.bg }} onClick={onClick}>
      <div
        style={{
          position: "absolute",
          right: -44,
          top: -44,
          width: 190,
          height: 190,
          borderRadius: "50%",
          background: "rgba(255,255,255,.04)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          marginBottom: 22,
          position: "relative",
        }}
      >
        <div>
          <p style={{ fontSize: 11, color: "rgba(255,255,255,.45)", fontWeight: 500, marginBottom: 4 }}>
            {tarjeta.tipo}
          </p>
          <p style={{ fontSize: 12, color: "rgba(255,255,255,.3)", letterSpacing: ".4px" }}>
            •••• {tarjeta.numero}
          </p>
        </div>
        <BankImg banco={tarjeta.banco} size={48} />
      </div>

      <p style={{ fontSize: 14, color: "rgba(255,255,255,.55)", fontWeight: 600 }}>Límite</p>
      <p style={{ fontSize: 24, fontWeight: 800, color: "#fff", letterSpacing: "-1px" }}>
        {fmt(tarjeta.limite)}
      </p>

      <div style={{ marginTop: 16 }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
          <p style={{ fontSize: 11, color: "rgba(255,255,255,.5)" }}>Usado</p>
          <p style={{ fontSize: 11, color: "rgba(255,255,255,.85)", fontWeight: 600 }}>
            {fmt(tarjeta.usado)}
          </p>
        </div>
        <div
          style={{
            height: 8,
            borderRadius: 999,
            background: "rgba(255,255,255,.14)",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              width: `${Math.min((tarjeta.usado / tarjeta.limite) * 100, 100)}%`,
              height: "100%",
              background: "rgba(255,255,255,.92)",
              borderRadius: 999,
            }}
          />
        </div>
        <p style={{ fontSize: 11, color: "rgba(255,255,255,.6)", marginTop: 8 }}>
          Disponible:{" "}
          <span style={{ color: "#fff", fontWeight: 700 }}>{fmt(disponible)}</span>
        </p>
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginTop: 14,
        }}
      >
        <p style={{ fontSize: 11, color: "rgba(255,255,255,.35)", fontWeight: 600, letterSpacing: ".5px" }}>
          {tarjeta.titular}
        </p>
        <p style={{ fontSize: 11, color: "rgba(255,255,255,.35)", fontWeight: 600 }}>
          Vence {tarjeta.vencimiento}
        </p>
      </div>
    </div>
  );
}

export function ScrHdr({
  title,
  onBack,
  right,
}: {
  title?: string;
  onBack: () => void;
  right?: React.ReactNode;
}) {
  return (
    <div className="shead">
      <div className="back" onClick={onBack}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
          <path
            d="M15 18l-6-6 6-6"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        Volver atrás
      </div>
      {title && <p className="sttl">{title}</p>}
      {right || <div style={{ width: 38 }} />}
    </div>
  );
}

export function Chevron() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <path
        d="M9 18l6-6-6-6"
        stroke="var(--text3)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
