# Contexto del proyecto — Xperience Properties (Torre Hélice)

## Stack
- React 19 + TypeScript + Vite (rolldown/vite 8)
- React Router v7
- Zustand para estado global
- Supabase (auth + Postgres + Storage)
- CSS plano (NO Tailwind, NO CSS Modules) — cada componente/vista tiene su propio archivo `.css` dedicado, importado directamente en el `.tsx` correspondiente: `import './NombreComponente.css'`
- Gestor de paquetes: pnpm
- Deploy: Vercel, proyecto propio de Torre Hélice (app SPA, sin rewrites externos de media — ver sección Media)
- Repo: `github.com/xperiencegroup/torre-helice`
- **Origen**: clon de Santa María Torre 6 (`xp-prop`) con historial limpio (commit inicial "base desde xp-prop"). Mismo código y arquitectura; cambian identidad, tablas, bucket y dominio.

## Dominios
- **Principal**: `https://torre-helice.xperience.properties/` (DNS en el proveedor externo de `xperience.properties`, CNAME hacia Vercel).
- `PROJECT.dominio` (`config/project.ts`) y `og:url` (`index.html`) ya usan este dominio. QR: `public/qr/qr__xpropthelice.png` apunta a él.
- Google Maps API key (compartida con Santa María): restricción por HTTP referrer con `https://*.xperience.properties/*`, `https://xperience.properties/*`, el dominio `.realestate` de Santa María y `http://localhost:5173/*`.

## Proyectos relacionados (misma instancia Supabase)
- **Santa María Torre 6** (`xp-prop`, `sta-maria-t6.xperience.properties`): proyecto origen, tablas `t6_sta_maria_*` y bucket `t6_media`. Nada de Torre Hélice lee ni escribe en ellos.
- **Dashboard central de medios** (`xp-props-admin`, `admin.xperience.properties`): único lugar desde donde se reemplazan videos/fotos de todos los proyectos. Ver sección Administración de medios.

## Convenciones de estilos
- **Un CSS dedicado por componente/vista**, junto al `.tsx`, mismo nombre exacto (case-sensitive — Vercel/Linux distingue mayúsculas/minúsculas aunque Windows no).
- **Identidad visual (nueva, tomada de `xperience-properties-propuesta-visual-v2.html`)**: fondo negro, texto blanco, acento amarillo, esquinas rectas, paneles translúcidos con blur y borde amarillo de 3px (izquierdo en menús verticales, superior en paneles/modales).
- **Variables globales** en `src/index.css` dentro de `:root`:
  ```css
  :root {
    --color-negro: #000;
    --color-blanco: #fff;
    --color-amarillo: #FBCB22;
    --color-panel: rgba(0, 0, 0, .82);
    --color-borde: rgba(255, 255, 255, .14);
    --font-sans: 'Plus Jakarta Sans', sans-serif;   /* texto general */
    --font-mono: 'Space Mono', monospace;           /* eyebrows, labels, precios */
    /* LEGACY (--color-cream, --color-sand, --color-dark y sus -alpha): alias a las nuevas, eliminar al terminar la migración */
  }
  ```
  Fuentes cargadas desde Google Fonts en `index.html`. Todo color nuevo usa estas variables, nunca hex sueltos ni variables legacy.
- `box-sizing: border-box` global. Clase utilitaria `.mono`.
- Flechas de colapso: texto `▾` (expandido) / `▸` (colapsado) en todos los menús (`MenuPrincipal`, `MenuInferior`, `MenuLateral`).
- Scrollbars de paneles: finas, pulgar amarillo (`scrollbar-color` + `::-webkit-scrollbar`).
- Nomenclatura de clases: BEM-like simple, ej. `.menu-lateral-rotacion__btn`, `.menu-lateral-rotacion__btn--cenital`, con modificador de estado `.is-active`.
- Mobile: la app se usa en **landscape**. Media query estándar de mobile landscape: `@media (orientation: landscape) and (max-width: 957px)` (en JS: `window.matchMedia` con la misma expresión). Algunos archivos antiguos aún usan `max-height: 500px`.
- `RotateNotice` (aviso de rotar dispositivo) se muestra vía CSS puro: `display: none` por defecto, `display: flex` dentro de `@media (orientation: portrait)`. El componente React siempre está montado; la visibilidad la controla el media query, no lógica condicional en JS.
- Tamaños responsivos con `clamp()` en botones circulares (ej. `width: clamp(1rem, 5vw, 5.5rem)`). Cuidado con íconos superpuestos que usan `clamp()` con el mismo tope máximo que su contenedor — pueden terminar cubriendo el fondo/thumbnail completo en pantallas grandes (bug ya resuelto en `MenuLateralRotacion__cenital-icon`, ver Troubleshooting).
- **Consistencia**: rutas siempre vía `VIEW_PATHS[VIEWS.X]` / `ADMIN_PATH` (`config/views.ts`), nunca strings literales. Textos del proyecto en `config/project.ts` (`PROJECT`). Contenido de cada overlay en su propio archivo de `config/`.
- `verbatimModuleSyntax` está activo en `tsconfig` — todo tipo importado desde otro archivo (interfaces, types, `ReactNode`, etc.) debe usar `import type { X } from '...'`, nunca `import { X }` a secas.

## Convención de nombres de tabla (Supabase)
Toda tabla de este proyecto usa el prefijo **`torre_helice_`**, ej. `torre_helice_media_assets`.

## Estructura relevante del proyecto (real, confirmada por `find`)
```
src/
  assets/                          → los videos de referencia (1 PORTADA, 2 NAVEGACION ORBITAL, 3 VTI PROYECTO) se ELIMINARON del repo;
                                     la app siempre los toma de Supabase. Se conserva la lista como referencia de numeración:
    1 PORTADA/
      1 SANTAMARIA PORTADA TRANSICION.mp4
      2 SANTAMARIA PORTADA IDLE.mp4
    2 NAVEGACION ORBITAL/
      3 SANTAMARIA NO POS 1.mp4
      4 SANTAMARIA NO POS 1 A POS 2.mp4
      4R SANTAMARIA NO POS 2 A POS 1.mp4
      5 SANTAMARIA NO POS 2.mp4
      6 SANTAMARIA NO POS 2 A POS 3.mp4
      6R SANTAMARIA NO POS 3 A POS 2.mp4
      7 SANTAMARIA NO POS 3.mp4
      8 SANTAMARIA NO POS 3 A POS 4.mp4
      8R SANTAMARIA NO POS 4 A POS 3.mp4
      9 SANTAMARIA NO POS 4.mp4
      10 SANTAMARIA NO POS 4 A POS 1.mp4
      10R SANTAMARIA NO POS 4 A POS 1.mp4   (reversa del cierre de ciclo: pos1→pos4)
      11 SANTAMARIA NO CENITAL TRANSICION.mp4
      12 SANTAMARIA NO CENITAL IDLE.mp4
    3 VTI PROYECTO/                 → 4 videos + 4 transiciones (ciclo cerrado, sin labels semánticos)
      13,15,17,19 = "VTI VID 1..4"
      14,16,18,20 = transiciones entre vid N y vid N+1 (20 cierra el ciclo: vid4→vid1)
    4 FOTOGALERIA/                  → FOTO 01..08.jpg (galería general del proyecto)
  components/
    MenuPrincipal/MenuPrincipal.tsx + .css
    ui/
      BackButton/BackButton.tsx + .css
      Button/Button.tsx
      MenuLateralRotacion/MenuLateralRotacion.tsx + .css   → 5 botones circulares (pos1-4 + cenital), conectado a media + store
    VideoHandlerComponent.tsx + .css           → doble <video> con crossfade, maneja idle/transición/reversa
    VTI.tsx + .css                             → recorrido virtual de espacios (videos + labels + menú lateral)
  views/
    Bienvenida/Bienvenida.tsx + .css           → pantalla inicial, logo SVG (inicio.svg), dispara video.bienvenida.trans → idle
    Inicio/Inicio.tsx + .css                   → reusa video.bienvenida.idle
    Informacion/Informacion.tsx                → placeholder, sin media aún
    Ubicacion/Ubicacion.tsx                    → sin video, usa Google Maps
    MasterPlan/MasterPlan.tsx + .css           → monta BackButton + MenuLateralRotacion
    Disponibilidad/Disponibilidad.tsx          → placeholder, sin media aún
    Contacto/Contacto.tsx                      → placeholder, sin media aún
  config/
    views.ts        → VIEWS, ViewId, VideoState (con campo `to`), EMPTY_VIDEO, VIEW_PATHS
    media.ts         → shape MEDIA (mutable), MEDIA_GROUPS, loadMedia(), getMedia(), getMediaGroup()
    mediaResolver.ts → fetch a Supabase (assets + groups), arma URLs públicas con cache-busting
    trackIds.tsx     → ids de tracking/analytics
  store/
    useAppStore.ts   → ui slice, navigation slice, video slice (currentVideo/changeVideo), blocked, videoReady
  lib/
    supabaseClient.ts
    analytics.ts
  App.tsx / App.css   → AppShell + rutas públicas (sin ruta admin ni auth)
  main.tsx           → bootstrap: loadMedia() antes de montar <App/>, loading screen simple mientras carga
  index.css
public/
  rotacion/          → pos1.jpg, pos2.jpg, pos3.jpg, pos4.jpg, cenital.jpg (fondos de MenuLateralRotacion) — reemplazables manualmente, mismo nombre, no pasan por Supabase/panel admin
  icons/             → icon_rotar.svg
  inicio.svg
  thumbnail.jpg      → ya NO se usa; og:image/twitter:image apuntan a Supabase Storage (ver sección OG)
  fs.js              → fullscreen-on-click global (actualmente comentado en index.html, no se carga)
```

**Agregado en la migración de identidad:**
```
src/
  assets/premium/        → informacion, ubicacion, masterplan, disponibilidad, contacto .jpg
  assets/compartir/      → compartir.jpg
  assets/360/            → 360_image.jpg
  components/Overlays/   → Overlays.tsx (orquestador de modales globales)
  components/ui/         → Topbar, BadgeXperience, Widgets, ChatButton, ChatPanel, CloseButton,
                           PremiumModal, PaquetesModal, CotizarModal, CalendarioCita, QrModal,
                           CompartirModal, XperienceModal, DashboardModal, Viewer360, Viewer360Panel
  config/                → project, premiumSections, paquetes, cotizar, chatXP, qr, compartir,
                           xperience, dashboard, ubicacion
  lib/loadMaps3d.ts
  types/maps3d.d.ts
public/qr/qr__xpropthelice.png
public/icons/icon_360.svg
```

## Vistas del proyecto (7 públicas)
```ts
export const VIEWS = {
  BIENVENIDA:      'bienvenida',
  INICIO:          'inicio',
  INFORMACION:     'informacion',
  UBICACION:       'ubicacion',
  MASTER_PLAN:     'master-plan',
  DISPONIBILIDAD:  'disponibilidad',
  CONTACTO:        'contacto',
} as const
```
Rutas: `/bienvenida`, `/inicio`, `/informacion`, `/ubicacion`, `/masterplan`, `/disponibilidad`, `/contacto`.

Ya no existe ruta admin (`/th-panel` eliminada; heredada como `/t6-panel`); la administración vive en el dashboard central.

## Arquitectura de media: indirection layer (Supabase)

**Motivo**: los archivos de video/foto deben poder subirse, resubirse o reemplazarse (mismo nombre o distinto) desde un panel admin, sin que la app dependa de nombres de archivo hardcodeados ni requiera cambios de código.

### Tablas Supabase
```sql
create table public.torre_helice_media_assets (
  key text not null,
  storage_path text null,
  bucket text null default 'torre_helice_media'::text,
  content_type text null,
  updated_at timestamp with time zone null default now(),
  constraint torre_helice_media_assets_pkey primary key (key)
);

create table public.torre_helice_media_groups (
  id uuid not null default gen_random_uuid(),
  group_key text not null,
  sort_order integer not null,
  storage_path text not null,
  label text null,
  bucket text null default 'torre_helice_media'::text,
  content_type text null,
  updated_at timestamp with time zone null default now(),
  constraint torre_helice_media_groups_pkey primary key (id),
  constraint torre_helice_media_groups_group_key_sort_order_key unique (group_key, sort_order)
);

create table public.torre_helice_admins (
  user_id uuid primary key references auth.users(id) on delete cascade,
  created_at timestamptz default now()
);
```

### Keys ya sembradas (media_assets)
```
video.bienvenida.trans
video.bienvenida.idle
video.masterplan.positions.pos1.idle
video.masterplan.positions.pos1.trans        -- pos1 → pos2
video.masterplan.positions.pos1.rev          -- pos1 → pos4 (cierre de ciclo, archivo "10R")
video.masterplan.positions.pos2.idle
video.masterplan.positions.pos2.trans        -- pos2 → pos3
video.masterplan.positions.pos2.rev          -- pos2 → pos1
video.masterplan.positions.pos3.idle
video.masterplan.positions.pos3.trans        -- pos3 → pos4
video.masterplan.positions.pos3.rev          -- pos3 → pos2
video.masterplan.positions.pos4.idle
video.masterplan.positions.pos4.trans        -- pos4 → pos1 (cierre de ciclo, archivo "10")
video.masterplan.positions.pos4.rev          -- pos4 → pos3
video.masterplan.cenital.idle
video.masterplan.cenital.trans               -- NO existe video de reversa para cenital (ver lógica abajo)
```

### Grupos ya sembrados (media_groups)
```
vti.proyecto      -- 8 items: Vid1(label) + trans + Vid2(label) + trans + Vid3(label) + trans + Vid4(label) + trans
fotos.proyecto    -- 8 fotos (FOTO 01..08, en ese orden por sort_order 0..7), sin label
```

### Resolución en runtime
- `mediaResolver.ts`: hace fetch a ambas tablas, arma `getPublicUrl(path) + '?v=' + updated_at timestamp` (cache-busting — funciona tanto si se resube con el mismo nombre de archivo como si cambia el nombre).
- `media.ts`: expone `MEDIA` (objeto **mutable**, mismo shape anidado que un `media.ts` hardcodeado tradicional) y `MEDIA_GROUPS`. Arranca con strings vacíos; `loadMedia()` lo puebla in-place (no reasigna referencias) tras el fetch.
- `main.tsx`: hace `await loadMedia()` (con pantalla de loading simple) **antes** de montar `<App />`, garantizando que cualquier componente que lea `MEDIA.video.x.y` de forma síncrona ya tenga el valor resuelto.
- Componentes de vista (`Bienvenida.tsx`, `MasterPlan.tsx`, etc.) importan `{ MEDIA }` y llaman `changeVideo(MEDIA.video.x.y, ...)` — no acceden a Supabase directamente.

## Administración de medios (dashboard central — `xp-props-admin`)

- **El sitio público ya NO tiene login ni panel admin.** Se eliminaron `/th-panel`, `ADMIN_PATH`, `AdminPanel` (y sus componentes), `RequireAdmin`, `LoginForm`, `AdminAccessButton`, `SessionPanel` y `useAuthStore`. El sitio es 100% público; Supabase solo se usa para leer media y guardar cotizaciones.
- **Dashboard**: `https://admin.xperience.properties` (repo `xperiencegroup/xp-properties-admin`, carpeta local `xp-props-admin`). Login con usuario corto, el dominio `@xperience.group` se agrega solo.
- **Registro de proyectos**: tabla `xp_properties_master` (una fila por proyecto con `assets_table`, `groups_table`, `admins_table`, `bucket`, `sort_order`, `activo`). Este proyecto es la fila `id = 'thelice'`. RLS: solo `select` para `authenticated`; se edita únicamente desde el dashboard de Supabase.
- **Quién administra**: el dashboard solo muestra los proyectos donde el usuario está en su tabla de admins. Admins actuales de `torre_helice_admins`: `alejandro@`, `cobos@`, `rubio33@xperience.group`. Los usuarios que reemplazarán el contenido solo necesitan una cuenta en Authentication y una fila en esa tabla.
- **Panel por carpetas**: agrupa por la primera carpeta del `storage_path` (portada, navorbital, vtiproyecto, fotorenders). Arrastrar un archivo sobre una carpeta busca su destino por nombre igual (avisa sobrescritura) o por número de archivo (`3`, `4R`, `FOTO 1`…); soltarlo sobre una tarjeta reemplaza ese archivo exacto. Siempre pide confirmación y bloquea imagen↔video.
- **Flujo de reemplazo** (sin cambios de fondo): upload a `${carpeta}/${Date.now()}-${nombre}` → `update` de la tabla → borrado del archivo anterior solo si el `update` tuvo éxito ("último gana"). Si el `update` falla, se borra el recién subido.
- **RLS (Supabase)** — sin cambios, el dashboard las usa tal cual:
  - `torre_helice_admins`: RLS on, `select` donde `user_id = auth.uid()`.
  - `torre_helice_media_assets` / `_groups`: lectura pública; `insert`/`update` solo admins.
  - `storage.objects`, bucket `torre_helice_media` (público): `insert`/`update`/`delete` solo admins.
- **Separación de Santa María (2026-10-09)**: tablas `torre_helice_*` creadas con `create table ... (like t6_sta_maria_* including all)`; media copiada con el mismo `storage_path` y `bucket = 'torre_helice_media'` (16 assets + 16 items de grupos). Al bucket se copiaron solo los 33 archivos en uso (sin huérfanos). `torre_helice_cotizaciones` arrancó vacía a propósito (los datos de Santa María son de sus clientes). Políticas RLS equivalentes a las de Santa María, ligadas a `torre_helice_admins`.
- **Contenido actual**: los videos/fotos en Supabase siguen siendo los de Santa María como relleno, hasta que los usuarios los reemplacen desde el dashboard.

## OG / Open Graph
- `index.html`: `og:image` y `twitter:image` apuntan a `https://bzcajnppqwgrybghwool.supabase.co/storage/v1/object/public/torre_helice_media/thumbnail.jpg` (ya no al `thumbnail.jpg` de `public/`, que quedó sin uso).
- Pendiente de verificar de cara al usuario: forzar refresco de caché de crawlers (Facebook Sharing Debugger, etc.) si el link ya se compartió antes con la imagen vieja.

## Store (`useAppStore.ts`)
Slices: ui (`menuCollapsed`, `sessionPanelCollapsed`), navigation (`currentView`), video (`currentVideo`/`changeVideo`), `blocked`, `videoReady`, más:
```ts
// Overlay: un solo modal global activo a la vez
type Overlay =
  | { type: 'premium'; view: ViewId }
  | { type: 'paquetes'; fromPremium?: ViewId }
  | { type: 'qr' }
  | { type: 'cotizar'; paquete?: string; returnTo?: PaquetesOverlay | QrOverlay }
  | { type: 'compartir'; returnTo?: QrOverlay }
  | { type: 'xperience' }
  | { type: 'dashboard' }
  | null
overlay / openOverlay(o) / closeOverlay()

// Chat XP (demo guionado)
chatOpen / chatMessages: ChatEntry[] / toggleChat(force?) / askChat(view)
```
`VideoState` (`config/views.ts`) incluye `to?: string` — el destino lógico (ej. `'masterplan-pos2'`) que `VideoHandlerComponent` usa para resolver el idle correcto cuando termina una transición o reversa.

## VideoHandlerComponent
- Doble `<video>` (crossfade sin corte), muted, playsInline.
- Lee `currentVideo.currentSrc` del store; si cambia, reproduce en el `<video>` no visible y hace swap de `z-index` al iniciar reproducción.
- `isLoop = !isTransition && !isReverse` — solo los idles hacen loop.
- Al terminar una transición/reversa (`onended`), resuelve el idle correspondiente vía `resolveIdleByTo(video.to)` y llama `changeVideo(idleSrc, false, false)`, además de `setBlocked(false)`.
- Switch de `resolveIdleByTo` cubre únicamente los `to` reales del proyecto: `bienvenida`, `masterplan`, `masterplan-pos1..4`, `masterplan-cenital`.

## MenuLateralRotacion (navegación orbital del MasterPlan)
- 5 botones circulares: pos1-4 (imágenes de fondo `pos1.jpg`...`pos4.jpg`, reemplazables manualmente en `public/rotacion/` con el mismo nombre) + botón fijo cenital (fondo `cenital.jpg` + ícono `icon_rotar.svg` superpuesto, ver Troubleshooting sobre tamaño del ícono).
- Sincronizado con la URL vía `useSearchParams` (`?posicion=pos2`, etc.) y con `blocked` del store (bloquea clicks — `pointer-events: none` en el `<nav>` — mientras corre una transición).
- **Lógica de transición entre posiciones**:
  - Adyacentes secuenciales (diff === 1): forward usa `positions[fromKey].trans`; backward usa `positions[fromKey].rev` (el `.rev` de la posición de ORIGEN, no de destino — bug ya corregido).
  - Cierre de ciclo pos4↔pos1: `pos4.trans` (forward, archivo "10") / `pos1.rev` (reversa, archivo "10R").
  - No adyacentes (ej. pos1→pos3 directo): salto sin transición, solo `changeVideo(idle correspondiente, false, false)`.
- **Cenital**: no existe video de reversa. Al entrar usa `cenital.trans` (isTransition true). Al salir (click de nuevo estando en cenital), se guarda la posición previa (`prevPos`) y se salta directo a su idle sin transición (no hay animación de salida).

## VTI (recorrido virtual de espacios)
- Componente recibe `videos: string[]`, `labels: string[]`, `initialIndex?: number`.
- Patrón: 1 label cada 2 videos (`Math.floor(index/2)`), alternando video-con-nombre / transición-sin-nombre.
- Sincronizado con `?espacio=slug-del-label` en la URL.
- Grupo de datos: `vti.proyecto` (8 items: Vid1/trans/Vid2/trans/Vid3/trans/Vid4/trans, labels genéricos sin nombre semántico de espacio — solo "Vid 1".."Vid 4", editables desde el admin sin romper `sort_order`). Archivos en Storage bajo `vtiproyecto/`.
- `MenuLateral` (`src/components/ui/MenuLateral/`): lista vertical tipo pill, ítem activo con fondo `var(--color-dark)`. Reemplaza el `MenuLateral` de referencia externo (`packages/ui-kit`), que no existe en este proyecto.
- **Montaje**: `VTIPanel` (`src/components/ui/VTIPanel/`) envuelve `<VTI />` full screen + `<BackButton onClick={onClose} />`, arma `videos`/`labels` desde `getMediaGroup('vti.proyecto')` (filtrando labels nulos). Se monta desde `MenuLateralRotacion` cuando `?panel=video-tour`.

## Foto Renders (galería del proyecto)
- `FotoRendersCarousel` (`src/components/ui/FotoRendersCarousel/`): carrusel full screen con **Embla** (`embla-carousel-react`, `loop: false`), navegación por swipe/drag, sin controles de flecha adicionales.
- Imágenes desde `getMediaGroup('fotos.proyecto')`, filtrando entradas sin `url` (placeholders vacíos aún no subidos).
- Archivos en Storage bajo `fotorenders/` (`FOTO 01.jpg` .. `FOTO 08.jpg`).
- Se cierra con `<BackButton onClick={onClose} />` (no navega a `/inicio` como el uso por default de `BackButton`, cierra el panel vía `?panel=` en la URL).
- Se monta desde `MenuLateralRotacion` cuando `?panel=foto-renders`.

## Menú del cenital (`MenuInferior`)
- Panel recto con borde superior amarillo; ítems icon+label (íconos invertidos a blanco con `filter: invert(1)`), visible solo mientras `!blocked`.
- Ítems: **Foto Renders**, **Video Tour**, **Recorrido 360** (`icon_360.svg`). "Información" sigue comentada.
- Selección escribe `?panel=<id>` (`foto-renders` | `video-tour` | `recorrido-360`); `MenuLateralRotacion` monta el panel full screen y `handleClosePanel` limpia `panel` y `espacio`.
- `MasterPlan.tsx` no renderiza su propio `BackButton` mientras exista `?panel=` (cada panel trae el suyo; antes se encimaban y el de MasterPlan mandaba a `/inicio`).

## Chrome global (`AppShell`, todo excepto `bienvenida`)
- **`Topbar`**: marca/nombre/tipo desde `PROJECT` + botones **PRECIOS** (→ Paquetes), **COTIZA YA** (→ Cotizar), ícono **Dashboard** (→ Dashboard demo). Engrane admin comentado (la administración vive en `admin.xperience.properties`). PRECIOS oculto en mobile landscape.
- **`MenuPrincipal`**: toda vista con entrada en `PREMIUM_SECTIONS` abre primero el `PremiumModal` (hoy las 5). Si ya estás en esa vista, el click no hace nada.
- **`BadgeXperience`** y **`Widgets`** (QR "Tu unidad"): solo en `/inicio`. Badge oculto en mobile landscape.
- **`ChatButton`** (XP) + **`ChatPanel`**: en todas las vistas, `z-index` 9000/8999 (encima de todo excepto `RotateNotice`). Se ocultan con el overlay Xperience abierto.
- **`Overlays`** (`components/Overlays/`): orquesta todos los modales según `store.overlay`, incluidas las rutas de regreso al cerrar.
- `HomeButton`: desmontado (sin uso en `App.tsx`).

## Overlays (todos full screen, `z-index: 100`, cierran con `CloseButton` ✕ arriba a la derecha)
- **PremiumModal** (`config/premiumSections.ts`): galería estática (1 imagen de `src/assets/premium/`), eyebrow/título/párrafos, CTA **Ver precios y paquetes** (→ Paquetes; al cerrarlo regresa a este modal), **Pregúntale a Chat XP** (abre el chat con la pregunta de la sección, el modal NO se cierra) y **Desbloquear** (cierra, colapsa el menú y navega). `desbloqueable: true` solo en Ubicación y Master Plan; en el resto el botón no se muestra.
- **Paquetes** (`config/paquetes.ts`, diseño de `xperience-properties-propuesta-visual-v2_1.html`): tabla comparativa de 3 paquetes (A Activación $38,000 · B Comercial + Disponibilidades $72,500, destacado · C Full Xperience $117,000) con "DESDE" y modalidad de pago; 4 grupos de filas (✓ / ✕ / texto / mensualidad). Abajo: caja de levantamiento del Paquete C, caja "La pauta va por separado" y nota legal. **Cotizar este** → Cotizar con `paquete` (`'PAQUETE A' | 'B' | 'C'`); al cerrar regresa a Paquetes.
- **Cotizar** (`config/cotizar.ts`): 5 preguntas (la 05 de contacto se agregó al diseño) + `CalendarioCita` real (mes actual navegable, sin fines de semana ni días pasados) + horas. Guarda en `torre_helice_cotizaciones`.
- **QR** (`config/qr.ts`): hoja 16:9 con `public/qr/qr__xpropthelice.png`. **Imprimir hoja** imprime solo la imagen del QR centrada (8 cm). Subir unidad → Cotizar; Compartir → Compartir (ambos regresan al QR).
- **Compartir** (`config/compartir.ts`): dummy, solo muestra confirmación.
- **Xperience** (`config/xperience.ts`): 4 slides; solo se monta el iframe de YouTube del slide activo (se detiene al cambiar).
- **Dashboard** (`config/dashboard.ts`): dummy; login simulado, KPIs, tablas y barras estáticas; botones CAMBIAR / VER INTELLIGENCE sin acción (igual que el HTML).

## Chat XP (`config/chatXP.ts`)
- Demo guionado igual al HTML: saludo + chips + intercambio de ejemplo; `askChat(view)` agrega pregunta/respuesta cada vez. Texto enriquecido estructurado (`RichPart`, bullets), sin HTML crudo. Input decorativo.
- Chips: **Ver paquetes** → Paquetes, **Cotizar / Agendar reunión virtual** → Cotizar, resto sin acción.
- Mobile: panel casi a pantalla completa; con el teclado abierto (`visualViewport`) pasa a ancho completo y al alto visible; input a 16px para evitar zoom de iOS.

## Ubicación (Google Maps 3D fotorrealista)
- `gmp-map-3d` (`mode="SATELLITE"`, UI de Google oculta) cargado con `lib/loadMaps3d.ts` (script `v=beta&libraries=maps3d`). Tipos JSX en `src/types/maps3d.d.ts`.
- Config en `config/ubicacion.ts`: `PROJECT_LOCATION` (25.6696055, -100.3747302), bounds, límites y vistas desktop/mobile. `?capa=puntos-interes` (cámara alta) | `vialidades` (cámara baja), `flyCameraTo` de 1.5 s.
- `MenuLateral` con Puntos de interés / Vialidades / **Master Plan** (abre su `PremiumModal`, nunca queda activo). Sin marcadores ni capas.
- Requiere `VITE_GOOGLE_MAPS_API_KEY` (local y Vercel) con Maps JavaScript API + Map Tiles API; restringir la key por HTTP referrer.

## Visor 360 (`Viewer360` + `Viewer360Panel`)
- WebGL puro sin dependencias: shader equirectangular, arrastre (pointer events) y zoom (rueda + pinch), render solo cuando cambia. Reduce la textura si supera `MAX_TEXTURE_SIZE`.
- Imagen: `src/assets/360/360_image.jpg`. Se monta con `?panel=recorrido-360`.

## MenuLateral (VTI y Ubicación)
- Panel recto, borde izquierdo amarillo, activo en amarillo. Colapsable con botón amarillo `▾`/`▸` (estado local).

## BackButton
- Acepta `onClick?` (cerrar panel) o navega a `/inicio`. Estilo recto, fondo `--color-panel`, Space Mono, fijo abajo a la izquierda, `z-index: 51`.

## Supabase: tabla nueva
```sql
torre_helice_cotizaciones (id, created_at, rol, m2, busca text[], estrategia, paquete,
  nombre, correo, telefono, fecha date, hora)
-- RLS: insert para anon/authenticated; select solo admins (torre_helice_admins)
```

## Analítica (`config/trackIds.tsx`)
- `track(id, extra?)`: en DEV solo hace `console.log` (se invirtió el orden para que el log funcione sin `gtag`).
- IDs `xperience_properties:sección:elemento:acción` para topbar, badge, widgets, chat, premium, paquetes, cotizar, qr, compartir, xperience, dashboard y ubicación; detalles variables en `extra` (`view`, `paquete`, `slide`, etc.). Los closes y acciones entre overlays se trackean en `Overlays.tsx`.
- `inicio.menu.masterPlan` conserva el string histórico `...:menu:rotacion:click`.

## Dummys vs. reales
- **Reales**: identidad visual, overlays y su navegación, Cotizar (Supabase), Ubicación 3D, visor 360, imprimir QR, colapso de menús, precios y tabla de Paquetes, analítica.
- **Dummys**: Chat XP, Compartir, Dashboard, galería del PremiumModal, portafolio Xperience, chips "Sobre este proyecto"/"Agendar reunión".

## Pendiente
- Vistas sin contenido: `Informacion`, `Disponibilidad`, `Contacto` (sin botón Desbloquear hasta que existan).
- Protección real de rutas por URL directa.
- Limpieza: eliminar `HomeButton` y las variables legacy de `index.css`.
- Reemplazar el contenido de relleno de Santa María (desde el dashboard): videos, fotos y `thumbnail.jpg` del bucket.
- Contenido que NO pasa por el dashboard (cambio en código): ubicación del mapa (`config/ubicacion.ts`, hoy con coordenadas de Santa María), `public/rotacion/*.jpg`, `src/assets/premium/`, `src/assets/360/360_image.jpg`, `src/assets/compartir/compartir.jpg`.
- Textos propios del proyecto en `config/` (premiumSections, paquetes, chatXP, etc.) aún heredados de Santa María.
- Verificar refresco de caché de OG en crawlers.

## Troubleshooting ya resuelto
- **Case-sensitivity de imports CSS**: Windows es case-insensitive, Vercel (Linux) no. Todo nombre de archivo/import debe coincidir EXACTAMENTE en mayúsculas/minúsculas.
- **RLS bloqueando fetch público**: si `select` desde el cliente anónimo devuelve `[]` aunque la fila exista (verificable por SQL Editor), falta la policy pública de lectura en la tabla.
- **Bug en `resolveIdleByTo`**: si `positions.posN.idle` nunca se asigna en `loadMedia()` (solo se puebla el alias plano, ej. `masterplan.idle`), el idle de esa posición queda vacío para siempre — hay que asignar ambos.
- **Bug de dirección en reversa**: al retroceder entre posiciones adyacentes, el `.rev` a usar es el de la posición de ORIGEN (`fromKey`), no el de destino — usar `toKey.rev` reproduce el video de reversa equivocado (ej. el de cierre de ciclo en vez del adyacente correcto).
- **`RotateNotice` visible todo el tiempo**: causado por no importar el `.css` que contiene la regla `display: none` + `@media (orientation: portrait)`. Verificar que `App.tsx` (u otro entry) importe ese archivo.
- **Cursor pointer visible durante bloqueo**: `blocked` sí cortaba los clicks (`if (blocked) return`), pero visualmente no bastaba — hay que reflejarlo con `style={{ pointerEvents: blocked ? 'none' : 'auto' }}` en el contenedor del menú.
- **`verbatimModuleSyntax` + imports de tipos**: `import { ReactNode } from 'react'` o `import { MediaAssetRecord } from './X'` fallan en runtime/build si son tipos — deben ser `import type { ... }`.
- **`useAuthStore` roto por tabla inexistente**: `solea_profiles`/`solea_auth_events` eran de otro proyecto; `fetchProfile`, `login` y `initAuthListener` los referenciaban. Se simplificó el store a solo `session`/`isAuthenticated`, sin perfiles.
- **Ícono cenital tapando el thumbnail**: `.menu-lateral-rotacion__cenital-icon` tenía `clamp()` con tope máximo igual al del botón contenedor (`5.5rem`) — en pantallas grandes el ícono + su fondo (`--color-cream-alpha`) cubría el círculo completo. Se bajó el tope a `2.25rem` para que quede como badge pequeño centrado.
- **`min-height: 100vh` no centraba `RequireAdmin`**: dependía de que toda la cadena de padres (`html`/`body`/`#root`) tuviera altura completa. Se cambió a `position: fixed; inset: 0` para centrar respecto al viewport sin depender de ancestros.
- **RLS de Storage no bloqueaba correctamente el insert**: el error `new row violates row-level security policy` en el upload venía de que solo existía policy de `select` en `storage.objects` para el bucket — faltaban `insert`/`update`/`delete`. Antes de escribir cualquier policy nueva, se verificó con `select * from pg_policies where tablename in (...)` para no pisar policies de otros proyectos en la misma instancia Supabase (ej. `acuerdo_documents_*`).
- **Modal confinado al menú**: un hijo `position: fixed` dentro de un contenedor con `backdrop-filter` (o `transform`) queda relativo a ese contenedor. Los modales se montan fuera del `<nav>` (hoy vía `Overlays`).
- **BackButton de MasterPlan encima del de los paneles**: ambos en la misma posición; se oculta el de MasterPlan con `?panel=`.
- **Viewer360 "Uncaught Error: shader" en DEV**: StrictMode remonta el efecto y `loseContext()` en la limpieza dejaba el canvas con contexto perdido. No llamar `loseContext()`; guardar con `gl.isContextLost()`.
- **`useAppStore` + `get`**: usar `set((s) => ...)` en vez de `get()` si no se declaró en la firma de `create`.
- **Padding final ignorado en modales con scroll**: con `display: flex` + `overflow-y: auto` en el contenedor, el hijo se encoge al alto de la pantalla y su `padding-bottom` no queda al final del contenido. Usar `display: block` en el contenedor de scroll (o un `::after` espaciador). Además, los modales largos reservan `58px + 1.75rem` abajo para no quedar bajo el ChatButton.
