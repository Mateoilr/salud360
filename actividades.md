# 📋 Tareas del Proyecto Salud360

> App de salud emocional y hormonal personalizada para hombres y mujeres.
---

## 🔧 BACKEND – Persona 1: API Core y Autenticación

**Responsabilidades:**
- Inicializar proyecto NestJS + Prisma
- Configurar conexión con Supabase (PostgreSQL)
- Integrar Firebase Admin SDK
- Implementar autenticación por token Firebase (AuthGuard)
- Crear modelos en `schema.prisma` y migraciones

**Endpoints a implementar:**
- `POST /users` → crear usuario desde Firebase UID
- `GET /users/me` → perfil actual
- `PATCH /users/:id` → actualizar perfil
- `DELETE /users/:id` → eliminar cuenta
- `POST /daily-entries` → crear check-in diario
- `GET /daily-entries` → listar entradas
- `GET /cycles` / `POST /cycles` → seguimiento cíclico

**Notas técnicas:**
- Asegurar verificación del `Authorization: Bearer <token>`
- Incluir middleware para asociar UID → User

---

## 🧠 BACKEND – Persona 2: Lógica Avanzada y Relaciones

**Responsabilidades:**
- Crear relación de parejas (`/couples`)
- Controlar visibilidad entre usuarios
- Registro de momentos compartidos
- Generar insights simples desde los datos
- Crear endpoints para recordatorios y checkups

**Endpoints a implementar:**
- `POST /couples/request` → solicitud de pareja
- `POST /couples/accept` → aceptar pareja
- `GET /couples` → estado actual
- `PATCH /couples/permissions` → visibilidad
- `POST /shared-moments` / `GET /shared-moments`
- `GET /insights` / `POST /insights`
- `GET /reminders`, `POST /reminders`, etc.
- `GET /checkups` / `POST /checkups`

**Notas técnicas:**
- Usar enums para tipos de insight, ciclo, pareja, etc.
- Relacionar correctamente parejas entre sí
- Aplicar Prisma middleware si es necesario

---

## 🧑‍🎨 FRONTEND – Persona 3: Autenticación, Inicio y Check-ins

**Responsabilidades:**
- Configurar Firebase Auth (email/password + Google)
- Login, registro y logout
- Crear `AuthService`, `AuthInterceptor`, `AuthGuard`
- Diseñar e implementar:
  - Pantalla de inicio (dashboard)
  - Formulario diario (check-in)

**Componentes clave:**
- `auth.service.ts`, `auth.interceptor.ts`
- `dashboard.page.ts`
- `checkin.page.ts`
- Botón de logout

**Conexión con backend:**
- Obtener token Firebase y enviarlo en headers
- Llamadas a:
  - `/users`
  - `/daily-entries`

---

## 🎨 FRONTEND – Persona 4: Pareja, Perfil y Contenido

**Responsabilidades:**
- Crear pantallas:
  - Conexión de pareja
  - Configuración del usuario
  - Contenido educativo
  - Recordatorios y checkups
- Visualización de estadísticas (ngx-charts / Chart.js)
- Tema de usuario por color/estado

**Componentes clave:**
- `couple.page.ts`, `profile.page.ts`, `content.page.ts`
- `reminders.page.ts`, `stats.page.ts`
- `theme.service.ts`

**Conexión con backend:**
- `/couples`, `/shared-moments`
- `/reminders`, `/checkups`
- `/content`, `/insights`

---|