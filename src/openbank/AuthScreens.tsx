import { useState } from "react";
import { Logo } from "./atoms";
import type { NavFn } from "./types";

export function LoginScreen({
  navigate,
  onLogin,
}: {
  navigate: NavFn;
  onLogin: (email: string, pass: string) => boolean;
}) {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [err, setErr] = useState("");
  const go = () => {
    if (!onLogin(email, pass))
      setErr("Credenciales incorrectas. Demo: marta@demo.com / 1234");
  };
  return (
    <div className="auth">
      <div style={{ display: "flex", justifyContent: "center", marginBottom: 48 }}>
        <Logo size={92} />
      </div>
      <h1 className="auth-title">Iniciar sesión</h1>
      <p className="auth-sub">Bienvenido de vuelta</p>
      <div className="ig">
        <label className="lbl">Correo / Índice</label>
        <input
          className="fld"
          placeholder="E. marta@demo.com"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setErr("");
          }}
        />
      </div>
      <div className="ig">
        <label className="lbl">Contraseña</label>
        <input
          className="fld"
          type="password"
          placeholder="••••••••"
          value={pass}
          onChange={(e) => {
            setPass(e.target.value);
            setErr("");
          }}
        />
      </div>
      {err && <div className="aerr">{err}</div>}
      <button className="btn-primary" style={{ marginTop: 24 }} onClick={go}>
        Iniciar sesión
      </button>
      <p className="auth-foot">
        ¿No tienes cuenta?{" "}
        <span className="lnk" onClick={() => navigate("register")}>
          Regístrate aquí
        </span>
      </p>
    </div>
  );
}

export function RegisterScreen({ navigate }: { navigate: NavFn }) {
  const [f, setF] = useState({ email: "", pass: "", confirm: "" });
  const set = (k: keyof typeof f) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setF((p) => ({ ...p, [k]: e.target.value }));
  return (
    <div className="auth">
      <div style={{ display: "flex", justifyContent: "center", marginBottom: 36 }}>
        <Logo size={76} />
      </div>
      <h1 className="auth-title">Registro</h1>
      <p className="auth-sub">Crea tu cuenta en segundos</p>
      <div className="ig">
        <input className="fld" placeholder="Correo electrónico" value={f.email} onChange={set("email")} />
      </div>
      <div className="ig">
        <input className="fld" type="password" placeholder="Contraseña" value={f.pass} onChange={set("pass")} />
      </div>
      <div className="ig">
        <input
          className="fld"
          type="password"
          placeholder="Confirmar contraseña"
          value={f.confirm}
          onChange={set("confirm")}
        />
      </div>
      <button className="btn-primary" style={{ marginTop: 8 }} onClick={() => navigate("reg-otp")}>
        Continuar
      </button>
      <p className="auth-foot">
        ¿Ya tienes cuenta?{" "}
        <span className="lnk" onClick={() => navigate("login")}>
          Iniciar sesión
        </span>
      </p>
    </div>
  );
}

export function OtpScreen({ navigate }: { navigate: NavFn }) {
  const [code, setCode] = useState("");
  return (
    <div className="auth">
      <div style={{ display: "flex", justifyContent: "center", marginBottom: 36 }}>
        <Logo size={76} />
      </div>
      <h1 className="auth-title">Confirmación</h1>
      <p className="auth-sub">Hemos enviado un código a tu correo</p>
      <div className="ig">
        <label className="lbl">Código de verificación</label>
        <input
          className="fld"
          placeholder="· · · · · ·"
          maxLength={6}
          value={code}
          onChange={(e) => setCode(e.target.value)}
          style={{ letterSpacing: "12px", textAlign: "center", fontSize: 22, fontWeight: 700 }}
        />
      </div>
      <button className="btn-primary" style={{ marginTop: 8 }} onClick={() => navigate("reg-personal")}>
        Validar código
      </button>
    </div>
  );
}

export function PersonalScreen({ navigate }: { navigate: NavFn }) {
  type F = { cedula: string; nombre: string; fecha: string; genero: string; profesion: string };
  const [f, setF] = useState<F>({
    cedula: "ID-40009234340",
    nombre: "MARTA BRIAN MARTE",
    fecha: "01/01/1990",
    genero: "Femenino",
    profesion: "",
  });
  const set =
    (k: keyof F) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
      setF((p) => ({ ...p, [k]: e.target.value }));
  const fields: Array<[string, keyof F, string, string]> = [
    ["Cédula", "cedula", "text", "ID-40009234340"],
    ["Nombre completo", "nombre", "text", ""],
    ["Fecha de nacimiento", "fecha", "text", "01/01/1990"],
  ];
  return (
    <div className="auth" style={{ paddingTop: 44 }}>
      <div style={{ display: "flex", justifyContent: "center", marginBottom: 26 }}>
        <Logo size={64} />
      </div>
      <h1 className="auth-title" style={{ fontSize: 24 }}>
        Información personal
      </h1>
      <p className="auth-sub" style={{ marginBottom: 24 }}>
        Ingresa y valida tu información
      </p>
      {fields.map(([l, k, t, ph]) => (
        <div key={k} className="ig">
          <label className="lbl">{l}</label>
          <input className="fld" type={t} placeholder={ph} value={f[k]} onChange={set(k)} />
        </div>
      ))}
      <div className="ig">
        <label className="lbl">Género</label>
        <select className="fld" value={f.genero} onChange={set("genero")}>
          <option>Femenino</option>
          <option>Masculino</option>
          <option>Otro</option>
        </select>
      </div>
      <div className="ig">
        <label className="lbl">Profesión</label>
        <input
          className="fld"
          placeholder="Ej: Ingeniero, Médico..."
          value={f.profesion}
          onChange={set("profesion")}
        />
      </div>
      <button className="btn-primary" style={{ marginTop: 8 }} onClick={() => navigate("reg-success")}>
        Completar registro
      </button>
    </div>
  );
}

export function RegSuccessScreen({ navigate }: { navigate: NavFn }) {
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
      <h1
        style={{
          fontSize: 28,
          fontWeight: 800,
          color: "var(--text)",
          letterSpacing: "-.5px",
          textAlign: "center",
        }}
      >
        ¡Registro exitoso!
      </h1>
      <p
        style={{
          fontSize: 14,
          color: "var(--text2)",
          textAlign: "center",
          maxWidth: 260,
          lineHeight: 1.65,
        }}
      >
        Ahora puedes iniciar sesión y disfrutar de todas las funciones de la app.
      </p>
      <button className="btn-primary" style={{ marginTop: 8 }} onClick={() => navigate("login")}>
        Iniciar sesión
      </button>
    </div>
  );
}
