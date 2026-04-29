# Linqo

Base inicial de un SaaS para acortar enlaces con `Next.js`, `TypeScript`, `Tailwind CSS` y `Supabase`.

## Stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- Supabase Auth + Database
- Route Handlers para operaciones HTTP
- React Server Components para páginas privadas y lectura de datos

## Estructura

```text
app/
  (app)/
    dashboard/
  (auth)/
    login/
    register/
  (marketing)/
  [slug]/
  api/
    auth/
    links/
components/
  dashboard/
  forms/
  layout/
  ui/
lib/
  config/
  domain/
  supabase/
  utils/
  validation/
supabase/
  migrations/
types/
```

## Variables de entorno

Copia `.env.example` a `.env.local` y completa:

```bash
cp .env.example .env.local
```

Valores necesarios:

- `NEXT_PUBLIC_APP_URL`
- `NEXT_PUBLIC_SHORT_LINK_DOMAIN`
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `FREE_PLAN_LINK_LIMIT`
- `FREE_PLAN_CLICK_LIMIT`

## Desarrollo local

1. Instala dependencias:

```bash
npm install
```

2. Levanta el proyecto:

```bash
npm run dev
```

3. Abre `http://localhost:3000`.

## SQL de Supabase

Ejecuta el archivo:

- `supabase/migrations/0001_initial_schema.sql`

Incluye:

- tablas `profiles`, `links`, `clicks`, `usage_monthly`
- índices básicos
- trigger para crear perfil al registrarse
- función `increment_link_metrics` para clicks
- notas para aplicar RLS después

Si ya ejecutaste la base antes de añadir el nombre al perfil, ejecuta también:

- `supabase/migrations/0002_add_profile_full_name.sql`

## Estado actual

La base incluye:

- landing pública
- login y registro
- cierre de sesión
- dashboard privado
- creación de enlaces cortos
- listado de enlaces del usuario
- resolución pública de slugs y registro de clicks
- límites preparados para plan gratuito
- base lista para futura página intermedia con anuncios

## TODOs claros

- Añadir políticas RLS en Supabase
- Construir página intermedia para `ad_enabled = true`
- Añadir panel de analítica más detallada
- Incorporar planes premium y billing
