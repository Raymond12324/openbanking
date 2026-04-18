import { useEffect, useState } from "react";
import {
  LoginScreen,
  OtpScreen,
  PersonalScreen,
  RegSuccessScreen,
  RegisterScreen,
} from "@/openbank/AuthScreens";
import { INIT_TXS, INIT_USERS } from "@/openbank/data";
import { hoy } from "@/openbank/helpers";
import {
  DetailScreen,
  HomeScreen,
  ProfileScreen,
} from "@/openbank/HomeScreens";
import {
  HistoryScreen,
  Sidebar,
  TransferScreen,
  TransferSuccessScreen,
} from "@/openbank/TransferScreens";
import type { NavParams, Screen, Tx, User } from "@/openbank/types";

const Index = () => {
  const [users, setUsers] = useState<User[]>(INIT_USERS);
  const [uid, setUid] = useState<string | null>(null);
  const [screen, setScreen] = useState<Screen>("login");
  const [params, setParams] = useState<NavParams>({});
  const [sidebar, setSidebar] = useState(false);
  const [txs, setTxs] = useState<Tx[]>(INIT_TXS);
  const [seenTxCount, setSeenTxCount] = useState(0);

  const user = users.find((u) => u.id === uid) || null;

  const nav = (s: Screen, p: NavParams = {}) => {
    setScreen(s);
    setParams(p);
    setSidebar(false);
  };

  const login = (email: string, pass: string) => {
    const u = users.find((u) => u.email === email && u.password === pass);
    if (u) {
      setUid(u.id);
      setScreen("home");
      setParams({});
      return true;
    }
    return false;
  };

  const logout = () => {
    setUid(null);
    nav("login");
    setSeenTxCount(0);
  };

  const transfer = ({
    origenCuentaId,
    destinoCuentaId,
    monto,
    desc,
  }: {
    origenCuentaId: string;
    destinoCuentaId: string;
    monto: number;
    desc: string;
  }) => {
    let origenUser: User | null = null;
    let destinoUser: User | null = null;

    for (const u of users) {
      if (u.cuentas.find((c) => c.id === origenCuentaId)) origenUser = u;
      if (u.cuentas.find((c) => c.id === destinoCuentaId)) destinoUser = u;
    }

    setUsers((prev) => {
      const next: User[] = JSON.parse(JSON.stringify(prev));
      for (const u of next) {
        const c = u.cuentas.find((c) => c.id === origenCuentaId);
        if (c) {
          c.saldo -= monto;
          break;
        }
      }
      for (const u of next) {
        const c = u.cuentas.find((c) => c.id === destinoCuentaId);
        if (c) {
          c.saldo += monto;
          break;
        }
      }
      return next;
    });

    setTxs((prev) => [
      {
        id: Date.now(),
        tipo:
          desc ||
          `Transferencia enviada a ${destinoUser?.nombre || "destinatario"}`,
        monto: -monto,
        fecha: hoy(),
        cuentaId: origenCuentaId,
      },
      {
        id: Date.now() + 1,
        tipo: `Depósito recibido de ${origenUser?.nombre || "remitente"}`,
        monto: monto,
        fecha: hoy(),
        cuentaId: destinoCuentaId,
      },
      ...prev,
    ]);
  };

  const getCuenta = (id?: string) => {
    if (!id) return null;
    for (const u of users) {
      const c = u.cuentas.find((c) => c.id === id);
      if (c) return c;
    }
    return null;
  };

  useEffect(() => {
    if (screen === "history" && user) {
      const ids = [
        ...user.cuentas.map((c) => c.id),
        ...(user.tarjetas || []).map((t) => t.id),
      ];
      const count = txs.filter((m) => ids.includes(m.cuentaId)).length;
      setSeenTxCount(count);
    }
  }, [screen, uid, txs, user]);

  const userTxs = user
    ? txs.filter((m) =>
        [
          ...user.cuentas.map((c) => c.id),
          ...(user.tarjetas || []).map((t) => t.id),
        ].includes(m.cuentaId)
      )
    : [];
  const notifCount = Math.max(0, userTxs.length - seenTxCount);

  const guard = (el: React.ReactNode) => {
    if (!user) {
      // defer redirect to next tick to avoid setState during render
      queueMicrotask(() => nav("login"));
      return null;
    }
    return el;
  };

  const render = () => {
    switch (screen) {
      case "login":
        return <LoginScreen navigate={nav} onLogin={login} />;
      case "register":
        return <RegisterScreen navigate={nav} />;
      case "reg-otp":
        return <OtpScreen navigate={nav} />;
      case "reg-personal":
        return <PersonalScreen navigate={nav} />;
      case "reg-success":
        return <RegSuccessScreen navigate={nav} />;
      case "home":
        return guard(
          user && (
            <HomeScreen
              user={user}
              nav={nav}
              openSidebar={() => setSidebar(true)}
              notifCount={notifCount}
            />
          )
        );
      case "detail": {
        const c = getCuenta(params.cuentaId);
        return guard(c ? <DetailScreen cuenta={c} nav={nav} txs={txs} /> : null);
      }
      case "profile":
        return guard(user && <ProfileScreen user={user} nav={nav} />);
      case "transfer":
        return guard(
          user && (
            <TransferScreen
              user={user}
              users={users}
              cuentaOrigenId={params.cuentaOrigenId}
              nav={nav}
              onTransfer={transfer}
            />
          )
        );
      case "transfer-success":
        return guard(
          <TransferSuccessScreen
            nav={nav}
            monto={params.monto || 0}
            origenCuentaId={params.origenCuentaId || ""}
            destinoCuentaId={params.destinoCuentaId || ""}
            desc={params.desc || ""}
            users={users}
          />
        );
      case "history":
        return guard(user && <HistoryScreen nav={nav} txs={txs} user={user} />);
      default:
        return <LoginScreen navigate={nav} onLogin={login} />;
    }
  };

  return (
    <main className="phone-stage">
      <h1 className="sr-only">OpenBanking — banca móvil</h1>
      <div className="phone">
        <div className="screen">{render()}</div>
        {sidebar && user && (
          <Sidebar
            user={user}
            active={screen}
            onClose={() => setSidebar(false)}
            nav={nav}
            onLogout={logout}
          />
        )}
      </div>
    </main>
  );
};

export default Index;
