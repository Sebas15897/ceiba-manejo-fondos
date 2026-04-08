# BTG Fondos (FPV / FIC)

Aplicación web **interactiva y responsiva** desarrollada como prueba técnica de **Ingeniero de Desarrollo Front-End**: gestión de fondos **FPV/FIC** para clientes BTG, con un único usuario y saldo inicial en pesos colombianos.

**Autor:** <a href="https://sebastiancontreras.devsocietysoftware.com/" target="_blank" rel="noopener noreferrer">Sebastián Contreras</a>

No incluye backend real, autenticación ni despliegue: el catálogo y la latencia se **simulan** en el cliente.

**Repositorio público:** <a href="https://github.com/Sebas15897/ceiba-manejo-fondos" target="_blank" rel="noopener noreferrer">github.com/Sebas15897/ceiba-manejo-fondos</a>

---

## Cómo ejecutar el proyecto (cómo corre)

### Requisitos previos

- **Node.js** (recomendado LTS 20.x o 22.x)
- **npm** 10+ (el repo declara `packageManager: npm@10.9.2`)

### Instalación

```bash
npm install
```

### Servidor de desarrollo

```bash
npm start
```

Equivalente a `ng serve`. La app queda en **http://localhost:4200/** y recarga al guardar cambios.

### Compilación de producción

```bash
npm run build
```

Los artefactos se generan en `dist/btg-fondos/`.

### Pruebas unitarias (Jest)

```bash
npm test
```

Modo watch y cobertura:

```bash
npm run test:watch
npm run test:coverage
```

Configuración: **`jest.config.cjs`**, **`jest-preset-angular`**, entorno de zona en **`setup-jest.ts`**. Los tests viven en archivos `*.spec.ts` junto al código. **`ng test`** no está configurado en este proyecto; usa los scripts npm anteriores.

---

## Contexto de negocio (enunciado)

Objetivo: permitir al usuario final:

1. Ver la **lista de fondos** disponibles.
2. **Suscribirse** a un fondo si cumple el **monto mínimo** y tiene saldo.
3. **Cancelar** la participación en un fondo y ver el **saldo actualizado**.
4. Ver el **historial** de suscripciones y cancelaciones.
5. Elegir **notificación por correo o SMS** al suscribirse.
6. Ver **mensajes de error** claros (p. ej. saldo insuficiente).

**Supuestos del ejercicio:** usuario único, saldo inicial **COP $500.000**, catálogo fijo según tabla del PDF (cinco fondos).

---

## Checklist de cumplimiento (prueba técnica)

Referencia: enunciado *Prueba Técnica – Ingeniero de Desarrollo Front-End* (BTG · Fondos FPV/FIC).

### Requisitos funcionales

- [x] **1.** Visualizar la lista de fondos disponibles (`/funds`, catálogo NGXS + API simulada).
- [x] **2.** Suscribirse a un fondo si cumple el **monto mínimo** (formulario reactivo + validadores + reglas en `FundsState`).
- [x] **3.** Cancelar la participación y ver el **saldo actualizado** (`/portfolio`, acción `CancelParticipation`).
- [x] **4.** Historial de **suscripciones y cancelaciones** (`/transactions`).
- [x] **5.** Elegir **notificación por email o SMS** al suscribirse (modal de suscripción + `NotificationMethod`).
- [x] **6.** Mensajes de error apropiados si **no hay saldo suficiente** (validación `max` + estado `lastError` + banner).

### Requisitos técnicos

- [x] **Stack:** **Angular** (alternativa a Flutter permitida en el enunciado).
- [x] **UI/UX:** diseño con Tailwind, tipografía, estados vacíos/carga/éxito/error, navegación clara.
- [x] **Estado:** **NGXS** + RxJS (`Store`, acciones, selectores / `selectSignal`).
- [x] **Validaciones de formularios:** reactive forms en el modal de suscripción.
- [x] **Responsive:** vistas en tabla (desktop) y tarjetas (móvil); menú en header.
- [x] **API REST simulada:** `FundsApiService` (mocks + latencia); catálogo alineado al PDF.
- [x] **Errores, loading y feedback:** overlay global, toasts, banner de errores, botón reintentar carga.
- [x] **Código:** estructura por capas (`core`, `modules/funds`, `shared`), TypeScript estricto; comentarios puntuales donde aportan.

### Extras valorados (opcionales)

- [x] **Pruebas unitarias:** **Jest** + `jest-preset-angular` (`npm test`; servicios, estado NGXS, `App`).
- [x] **TypeScript** en todo el proyecto Angular.
- [x] **Navegación y ruteo:** **Angular Router** (rutas lazy del módulo fondos, `AppShell`).
- [x] **Componentes reutilizables:** header, shell, alertas, toasts, overlay, modal de suscripción, etc.

### Consideraciones del enunciado

- [x] Sin lógica de **backend**, **autenticación** ni **despliegue** en el alcance.
- [x] Usuario único con saldo inicial **COP $500.000** (`INITIAL_WALLET_BALANCE_COP`).
- [x] **Cinco fondos** del PDF (id, nombre, monto mínimo, categoría FPV/FIC) en `funds-catalog.constants.ts`.

### Entregables

- [x] **README.md** con instrucciones claras de instalación y ejecución (`npm install`, `npm start`, tests).
- [x] **Video** del funcionamiento (enlace en [Autor y contacto](#autor-y-contacto)).
- [x] **Capturas** (opcional): cumplido — material visual de los flujos en la entrega.
- [x] **Repositorio público:** <a href="https://github.com/Sebas15897/ceiba-manejo-fondos" target="_blank" rel="noopener noreferrer">Sebas15897/ceiba-manejo-fondos</a> en GitHub.

---

## Stack técnico

| Área | Tecnología |
|------|------------|
| Framework | **Angular 21** (standalone components, `application` builder) |
| Lenguaje | **TypeScript** |
| Estilos | **Tailwind CSS v4** (`@tailwindcss/postcss`, estilos globales en `src/styles.css`) |
| Estado global | **NGXS 21** (`@ngxs/store`, Redux DevTools en desarrollo) |
| Reactividad async | **RxJS** (API simulada, acciones con retardo) |
| Formularios | **Reactive forms** (suscripción: monto + método de notificación) |
| Locale | **`es-CO`** (`LOCALE_ID`, `registerLocaleData`) para montos y fechas |
| Tests unitarios | **Jest 30** + **jest-preset-angular** + **zone.js** |

---

## Arquitectura del código

```
src/app/
├── core/
│   ├── constants/       # Catálogo BTG y saldo inicial
│   ├── enums/           # Método de notificación (email / SMS)
│   ├── interfaces/      # IFund, ITransaction, IPortfolioPosition, etc. (prefijo I)
│   └── services/        # FundsApiService (REST simulada), ToastService
├── modules/funds/
│   ├── components/      # Modal de suscripción
│   ├── pages/           # Inicio, listado, cartera, historial
│   ├── services/        # FundsUiFeedbackService (toasts tras acciones NGXS)
│   └── state/           # Acciones, modelo y FundsState (NGXS)
└── shared/components/   # Shell, header, alertas, toasts, overlay de carga
```

- **Rutas:** bajo `AppShell` → `/home`, `/funds`, `/portfolio`, `/transactions` (lazy `funds.routes.ts`).
- **Estado (`FundsState`):** saldo, catálogo, posiciones, historial, `loading`, `operationLoading`, `lastError`.
- **API simulada:** `FundsApiService.getFunds()` devuelve el catálogo con **delay** configurable (por defecto ~900 ms).
- **Operaciones “de backend”:** suscripción y cancelación aplican un **timer** (~820 ms) antes de mutar el estado, para simular latencia.
- **UX:** overlay global durante `loading` u `operationLoading`; **toasts** (esquina superior derecha) tras catálogo actualizado, suscripción y cancelación exitosas; **banner** para errores de negocio o de carga.

---

## Scripts npm

| Comando | Descripción |
|---------|-------------|
| `npm start` | Servidor de desarrollo (`ng serve`) |
| `npm run build` | Build de producción |
| `npm run watch` | Build en modo desarrollo con watch |
| `npm test` | Tests unitarios (Jest) |
| `npm run test:watch` | Jest en modo watch |
| `npm run test:coverage` | Jest con informe de cobertura (`coverage/jest/`) |
| `npx ng …` | Cualquier comando del Angular CLI |

---

## Herramientas de desarrollo

- **Redux DevTools:** activas en desarrollo vía `@ngxs/devtools-plugin` (deshabilitadas en producción).
- **Prettier:** configuración en `.prettierrc`.

---

## Autor y contacto

**Sebastián Contreras** — proyecto elaborado para el proceso de selección **Front-End** (caso BTG Fondos FPV/FIC).

- **Correo:** [sebastiancontreras15897@gmail.com](mailto:sebastiancontreras15897@gmail.com)
- **LinkedIn:** <a href="https://www.linkedin.com/in/sebasti%C3%A1n-contreras15897/" target="_blank" rel="noopener noreferrer">Sebastián Contreras en LinkedIn</a>
- **Sitio web:** <a href="https://sebastiancontreras.devsocietysoftware.com/" target="_blank" rel="noopener noreferrer">sebastiancontreras.devsocietysoftware.com</a>
- **Video demo:** <a href="https://drive.google.com/file/d/1Lo-PKPYl-bik27tNB_0d0K9GDxoaxGE_/view?usp=sharing" target="_blank" rel="noopener noreferrer">Google Drive</a>
