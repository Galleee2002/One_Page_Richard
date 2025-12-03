# One Page Richard

Proyecto Next.js 14+ con TypeScript, Tailwind CSS y Supabase, siguiendo una arquitectura Feature-First.

## 🏗️ Arquitectura

Este proyecto utiliza una arquitectura **Feature-First** para evitar deuda técnica y mantener un código escalable:

- `src/features/`: Lógica de negocio organizada por dominio
- `src/components/ui/`: Componentes atómicos reutilizables (ShadCN/HeroUI)
- `src/lib/`: Configuraciones y utilidades compartidas
- `src/app/`: Rutas y layouts de Next.js App Router

## 🚀 Inicio Rápido

1. Instalar dependencias:
```bash
npm install
```

2. Configurar variables de entorno:
```bash
cp .env.local.example .env.local
# Editar .env.local con tus credenciales de Supabase
```

3. Ejecutar en desarrollo:
```bash
npm run dev
```

## 📦 Tecnologías

- **Next.js 14+** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **Supabase** (Backend & Auth)
- **TanStack Query** (Estado y fetching)
- **React Hook Form + Zod** (Formularios)
- **ShadCN UI + HeroUI** (Sistema de diseño)

## 📁 Estructura de Carpetas

```
src/
├── app/              # Rutas Next.js
│   ├── (public)/    # Landing pública
│   ├── (admin)/     # Dashboard admin
│   └── providers.tsx
├── features/         # Lógica de negocio por dominio
│   ├── landing/
│   ├── products/
│   ├── admin/
│   └── auth/
├── components/ui/    # Componentes atómicos
├── lib/              # Configuraciones
└── types/            # Tipos TypeScript
```

## ⚙️ Configuración

- **ESLint**: Configurado con reglas estrictas (prohíbe `any` explícitos)
- **TypeScript**: Modo estricto habilitado
- **Tailwind**: Variables CSS semánticas configuradas
- **Alias**: `@/` apunta a `src/`

## 🎨 Instalación de Componentes UI (Próximos Pasos)

### ShadCN UI

Cuando estés listo para agregar componentes de ShadCN UI:

1. Inicializa ShadCN UI:
```bash
npx shadcn-ui@latest init
```

2. Asegúrate de configurar:
   - Style: `Default`
   - Base color: `Slate`
   - CSS variables: `Yes`
   - Tailwind config: `tailwind.config.ts`
   - Components: `src/components/ui`
   - Utils: `src/lib/utils`

3. Agrega componentes según necesites:
```bash
npx shadcn-ui@latest add button
npx shadcn-ui@latest add input
# etc...
```

### HeroUI

Para instalar HeroUI cuando lo necesites:

```bash
npm install @heroui/react @heroui/theme framer-motion
```

Luego configura el provider en `src/app/providers.tsx` según la documentación de HeroUI.

