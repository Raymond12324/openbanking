export type BancoNombre = "BHD" | "Popular" | "Banreservas";

export interface Cuenta {
  id: string;
  banco: BancoNombre;
  tipo: string;
  numero: string;
  saldo: number;
}

export interface Tarjeta {
  id: string;
  banco: BancoNombre;
  tipo: string;
  numero: string;
  limite: number;
  usado: number;
  vencimiento: string;
  titular: string;
  bg: string;
}

export interface User {
  id: string;
  nombre: string;
  email: string;
  password: string;
  cedula: string;
  initials: string;
  cuentas: Cuenta[];
  tarjetas?: Tarjeta[];
}

export interface Tx {
  id: number;
  tipo: string;
  monto: number;
  fecha: string;
  cuentaId: string;
}

export type Screen =
  | "login"
  | "register"
  | "reg-otp"
  | "reg-personal"
  | "reg-success"
  | "home"
  | "detail"
  | "profile"
  | "transfer"
  | "transfer-success"
  | "history";

export interface NavParams {
  cuentaId?: string;
  cuentaOrigenId?: string;
  origenCuentaId?: string;
  destinoCuentaId?: string;
  monto?: number;
  desc?: string;
}

export type NavFn = (s: Screen, p?: NavParams) => void;
