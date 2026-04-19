# OpenBanking — Banca móvil (demo)

Prototipo de aplicación de banca móvil multi-banco (BHD, Popular, Banreservas) construido con React + TypeScript + Tailwind CSS. Funciona como mock front-end: los usuarios, cuentas y transacciones viven en memoria.

## Cómo usar la app

1. Abre la app en el navegador (móvil o desktop, es totalmente responsive).
2. Inicia sesión con cualquiera de los **usuarios demo** listados abajo.
3. Desde el **Home** puedes:
   - Ver tus cuentas y tarjetas.
   - Tocar una cuenta para ver su **detalle** y movimientos.
   - Abrir el menú lateral (icono de menú arriba a la izquierda).
   - Ver tu **perfil** (avatar arriba a la derecha).
   - Ver el **historial completo** de transacciones (campanita de notificaciones).
4. Para hacer una **transferencia**:
   - Toca "Transferir" en el Home, o entra al detalle de una cuenta y pulsa "Transferir".
   - Elige cuenta de origen, cuenta de destino (puede ser de otro usuario demo), monto y descripción.
   - Confirma. El saldo se actualiza en tiempo real para ambos usuarios y se generan dos movimientos (uno de salida y uno de entrada).
5. Para **cerrar sesión**, abre el menú lateral y pulsa "Cerrar sesión".

> Todos los datos son **simulados y en memoria**: si recargas la página vuelven al estado inicial.

## Usuarios demo

La contraseña de **todos** los usuarios es `1234`.

| Nombre             | Email              | Contraseña | Cédula           | Cuentas                              | Tarjetas |
| ------------------ | ------------------ | ---------- | ---------------- | ------------------------------------ | -------- |
| Marta Arias        | `marta@demo.com`   | `1234`     | 001-1234567-8    | BHD, Popular, Banreservas            | 2        |
| Carlos Martínez    | `carlos@demo.com`  | `1234`     | 001-9876543-2    | BHD, Popular                         | 1        |
| Ana García         | `ana@demo.com`     | `1234`     | 001-5555555-5    | Banreservas, Popular                 | 1        |
| Luis Rodríguez     | `luis@demo.com`    | `1234`     | 001-7777777-7    | BHD, Banreservas, Popular            | 2        |

### Saldos iniciales

- **Marta Arias** — BHD: RD$200,000 · Popular: RD$200,000 · Banreservas: RD$200,000
- **Carlos Martínez** — BHD: RD$350,000 · Popular: RD$125,000
- **Ana García** — Banreservas: RD$420,000 · Popular: RD$95,000
- **Luis Rodríguez** — BHD: RD$600,000 · Banreservas: RD$280,000 · Popular: RD$150,000

> Puedes transferir entre cuentas de un mismo usuario o entre usuarios distintos para probar el flujo completo.

## Registro (flujo demo)

El flujo de registro (`Crear cuenta` → OTP → Datos personales → Éxito) es **solo visual**: no crea un usuario nuevo persistente. Para entrar a la app usa siempre uno de los usuarios demo de arriba.

## Stack técnico

- **React 18** + **TypeScript** + **Vite**
- **Tailwind CSS** con tokens semánticos HSL (`src/index.css`)
- **shadcn/ui** para primitivas accesibles
- Estado en memoria (sin backend) — toda la lógica vive en `src/pages/Index.tsx` y `src/openbank/`

## Estructura

```
src/
├── pages/Index.tsx          # Estado raíz + router de pantallas
├── openbank/
│   ├── types.ts             # Tipos (User, Cuenta, Tarjeta, Tx, Screen…)
│   ├── data.ts              # Usuarios y transacciones iniciales
│   ├── helpers.ts           # Utilidades (formato moneda, fechas…)
│   ├── atoms.tsx            # Componentes UI reutilizables
│   ├── AuthScreens.tsx      # Login, registro, OTP, datos personales
│   ├── HomeScreens.tsx      # Home, detalle de cuenta, perfil
│   ├── TransferScreens.tsx  # Transferencia, éxito, historial, sidebar
│   └── ConfirmModal.tsx     # Modal de confirmación de transferencia
└── index.css                # Design tokens + estilos globales
```
