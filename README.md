# BTG Fondos (FPV / FIC)

Aplicación web **interactiva y responsiva** desarrollada como prueba técnica de **Ingeniero de Desarrollo Front-End**: gestión de fondos **FPV/FIC** para clientes BTG, con un único usuario y saldo inicial en pesos colombianos.

**Autor:** <a href="https://sebastiancontreras.devsocietysoftware.com/" target="_blank" rel="noopener noreferrer">Sebastián Contreras</a>

No incluye backend real, autenticación ni despliegue: el catálogo y la latencia se **simulan** en el cliente.

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

## Entrega sugerida (repositorio público)

1. Subir el código a **GitHub** o **GitLab**.
2. Este **README** sirve como instrucciones de ejecución y contexto técnico.
3. **Video demo (opcional):** <a href="https://drive.google.com/file/d/1Lo-PKPYl-bik27tNB_0d0K9GDxoaxGE_/view?usp=sharing" target="_blank" rel="noopener noreferrer">ver recorrido de la aplicación en Google Drive</a> (se abre en una nueva pestaña).
4. (Opcional) Incluir también capturas del flujo: carga del catálogo, suscripción con notificación, error por saldo, cancelación e historial.

---

## Autor y contacto

**Sebastián Contreras** — proyecto elaborado para el proceso de selección **Front-End** (caso BTG Fondos FPV/FIC).

- **Correo:** [sebastiancontreras15897@gmail.com](mailto:sebastiancontreras15897@gmail.com)
- **LinkedIn:** <a href="https://www.linkedin.com/in/sebasti%C3%A1n-contreras15897/" target="_blank" rel="noopener noreferrer">Sebastián Contreras en LinkedIn</a>
- **Sitio web:** <a href="https://sebastiancontreras.devsocietysoftware.com/" target="_blank" rel="noopener noreferrer">sebastiancontreras.devsocietysoftware.com</a>
