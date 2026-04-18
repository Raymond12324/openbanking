import type { BancoNombre, Tx, User } from "./types";

export interface BancoConfig {
  bg: string;
  accent: string;
}

export const BANCOS: Record<BancoNombre, BancoConfig> = {
  BHD: { bg: "var(--bhd-g)", accent: "var(--bhd-a)" },
  Popular: { bg: "var(--pop-g)", accent: "var(--pop-a)" },
  Banreservas: { bg: "var(--bre-g)", accent: "var(--bre-a)" },
};

export const INIT_USERS: User[] = [
  {
    id: "U1",
    nombre: "Marta Arias",
    email: "marta@demo.com",
    password: "1234",
    cedula: "001-1234567-8",
    initials: "MA",
    cuentas: [
      { id: "BHD-001", banco: "BHD", tipo: "Cuenta de ahorro", numero: "12341056-1234", saldo: 200000 },
      { id: "POP-001", banco: "Popular", tipo: "Cuenta de ahorro", numero: "POP-12345612", saldo: 200000 },
      { id: "BRE-001", banco: "Banreservas", tipo: "Cuenta de ahorro", numero: "BRE-54612350", saldo: 200000 },
    ],
    tarjetas: [
      { id: "CC-U1-1", banco: "BHD", tipo: "Visa Signature", numero: "4532", limite: 100000, usado: 35500, vencimiento: "08/28", titular: "MARTA ARIAS", bg: "linear-gradient(145deg,#0d1b3a,#1a3870)" },
      { id: "CC-U1-2", banco: "Popular", tipo: "Mastercard Gold", numero: "5421", limite: 50000, usado: 12000, vencimiento: "03/27", titular: "MARTA ARIAS", bg: "linear-gradient(145deg,#0f1f0f,#1a3a1a)" },
    ],
  },
  {
    id: "U2",
    nombre: "Carlos Martínez",
    email: "carlos@demo.com",
    password: "1234",
    cedula: "001-9876543-2",
    initials: "CM",
    cuentas: [
      { id: "BHD-002", banco: "BHD", tipo: "Cuenta de ahorro", numero: "12341056-5678", saldo: 350000 },
      { id: "POP-002", banco: "Popular", tipo: "Cuenta de ahorro", numero: "POP-98765432", saldo: 125000 },
    ],
    tarjetas: [
      { id: "CC-U2-1", banco: "BHD", tipo: "Visa Clásica", numero: "4891", limite: 75000, usado: 28000, vencimiento: "11/27", titular: "CARLOS MARTÍNEZ", bg: "linear-gradient(145deg,#0d1b3a,#1a3870)" },
    ],
  },
  {
    id: "U3",
    nombre: "Ana García",
    email: "ana@demo.com",
    password: "1234",
    cedula: "001-5555555-5",
    initials: "AG",
    cuentas: [
      { id: "BRE-003", banco: "Banreservas", tipo: "Cuenta de ahorro", numero: "BRE-55567812", saldo: 420000 },
      { id: "POP-003", banco: "Popular", tipo: "Cuenta de ahorro", numero: "POP-55599990", saldo: 95000 },
    ],
    tarjetas: [
      { id: "CC-U3-1", banco: "Popular", tipo: "Mastercard Clásica", numero: "5732", limite: 60000, usado: 5000, vencimiento: "06/28", titular: "ANA GARCÍA", bg: "linear-gradient(145deg,#0f1f0f,#1a3a1a)" },
    ],
  },
  {
    id: "U4",
    nombre: "Luis Rodríguez",
    email: "luis@demo.com",
    password: "1234",
    cedula: "001-7777777-7",
    initials: "LR",
    cuentas: [
      { id: "BHD-004", banco: "BHD", tipo: "Cuenta de ahorro", numero: "12341056-3456", saldo: 600000 },
      { id: "BRE-004", banco: "Banreservas", tipo: "Cuenta de ahorro", numero: "BRE-77712345", saldo: 280000 },
      { id: "POP-004", banco: "Popular", tipo: "Cuenta de ahorro", numero: "POP-77788880", saldo: 150000 },
    ],
    tarjetas: [
      { id: "CC-U4-1", banco: "BHD", tipo: "Visa Infinite", numero: "4028", limite: 200000, usado: 82000, vencimiento: "09/27", titular: "LUIS RODRÍGUEZ", bg: "linear-gradient(145deg,#1a0a0a,#3a1a1a)" },
      { id: "CC-U4-2", banco: "Banreservas", tipo: "Mastercard Black", numero: "5196", limite: 40000, usado: 18500, vencimiento: "12/26", titular: "LUIS RODRÍGUEZ", bg: "linear-gradient(145deg,#0d0d18,#1a1a38)" },
    ],
  },
];

export const INIT_TXS: Tx[] = [
  { id: 1, tipo: "Pago servicios", monto: -20000, fecha: "12/12/2025", cuentaId: "BHD-001" },
  { id: 2, tipo: "Débito CLARO", monto: -5001, fecha: "12/12/2025", cuentaId: "BHD-001" },
  { id: 3, tipo: "Débito EDESUR", monto: -3000, fecha: "11/12/2025", cuentaId: "BHD-001" },
  { id: 4, tipo: "Depósito nómina", monto: 80000, fecha: "01/12/2025", cuentaId: "BHD-001" },
  { id: 5, tipo: "Pago JUMBO", monto: -8500, fecha: "05/12/2025", cuentaId: "POP-001" },
  { id: 6, tipo: "Depósito", monto: 15000, fecha: "03/12/2025", cuentaId: "POP-001" },
  { id: 7, tipo: "Amazon.com", monto: -8500, fecha: "10/12/2025", cuentaId: "CC-U1-1" },
  { id: 8, tipo: "Restaurante El Rey", monto: -2300, fecha: "09/12/2025", cuentaId: "CC-U1-1" },
  { id: 9, tipo: "Farmacias Carol", monto: -1800, fecha: "08/12/2025", cuentaId: "CC-U1-1" },
  { id: 10, tipo: "Pago tarjeta BHD", monto: 10000, fecha: "01/12/2025", cuentaId: "CC-U1-1" },
  { id: 11, tipo: "Supermercado Nacional", monto: -5800, fecha: "07/12/2025", cuentaId: "CC-U1-2" },
  { id: 12, tipo: "Netflix", monto: -900, fecha: "06/12/2025", cuentaId: "CC-U1-2" },
  { id: 13, tipo: "Pago tarjeta Popular", monto: 8000, fecha: "01/12/2025", cuentaId: "CC-U1-2" },
];
