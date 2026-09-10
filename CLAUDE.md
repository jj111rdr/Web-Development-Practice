# Portfolio Builder — Project Context

> This file is the single source of truth for what this project is and how it's built.
> Claude Code reads it automatically each session. Keep it updated as the project grows.

## The Big Idea

**Portfolio Builder** is a web app by **Junaid Javed** that does two things:

1. **Showcases Junaid's own portfolio** at the site root (`junaidjavedjj.com`) — who he is,
   where he's from, job experience, university & personal projects, and links to LinkedIn,
   Facebook, Instagram, and email.
2. **Lets any visitor "Build your own portfolio."** A visitor registers, logs in, uploads
   their CV, and an **LLM/AI API** parses the CV and generates a portfolio for them, published at
   `https://junaidjavedjj.com/PortfolioBuilder/<username>`. They can then **edit** it, upload a
   **profile picture** (optional), and **save**. They can log back in later to edit, re-upload a
   new CV, or change the photo.

### Roles
- Every registered user has role **`user`** (lowercase).
- **Only Junaid** has role **`admin`** (assigned directly in the DB — there is deliberately no
  "register as admin" endpoint).
- When the **admin logs in**, he sees a table of all users: **Username, Full Name, Portfolio Link**,
  and can edit his own portfolio (which updates `junaidjavedjj.com`).

## About the developer (context for how to help)

- Junaid is a **WinForms desktop dev transitioning to web development**. This is his first
  web project — the stepping stone.
- **Comfortable with:** C#, ASP.NET Core Web APIs, EF Core, SQL Server.
- **Revising:** HTML & CSS (learned years ago at university).
- **Learning next:** JavaScript, then a framework like **React**.
- **How to help:** explain concepts clearly and patiently, teach the *why* not just the *what*,
  push him to keep momentum, and flag bugs/security issues proactively. He wants to genuinely
  understand, not just receive finished code.

---

## Current State — Backend (ASP.NET Core Web API)

The backend is **.NET 10**, built **database-first** (SQL scripts define the schema, then the EF
model is scaffolded from the DB — NOT code-first migrations).

### What's DONE ✅
- **Authentication module**, fully working:
  - `POST /api/Authentication/create-user` — register (with validation, see below)
  - `POST /api/Authentication/login` — returns `{ accessToken, refreshToken }`
  - `POST /api/Authentication/refresh-token` — rotates tokens
  - `GET  /api/Authentication/Authenticated` — `[Authorize]` test endpoint
  - `GET  /api/Authentication/Admin` — `[Authorize(Roles = "admin")]` test endpoint
- **JWT** access tokens (15 min) + **refresh tokens** (1 day, stored in DB, rotated on use).
  Signing: HMAC-SHA256, key/issuer/audience in `appsettings.json` under `AppSettings`.
- **Password hashing:** `PasswordHasher<User>` (ASP.NET Identity, PBKDF2).
- **Registration validation:** unique username & email (case-insensitive), GitHub-style username
  format, password strength (8+ chars, upper/lower/digit/special), future-DOB rejection, and a
  **Have-I-Been-Pwned** k-anonymity check for compromised passwords (fails open if HIBP is down).

### What's NEXT (backend) 🔜
1. **`PortfolioController` + `PortfolioService`** — `POST /api/Portfolio` to create the logged-in
   user's portfolio row (derives `FullName` from Users, generates `PortfolioLink` from username).
   Populates the empty `Portfolios` table. `[Authorize]`, one-per-user.
2. **`UsersController` + `UserService`** — admin-only `GET /api/Users` returning
   `{ Username, FullName, PortfolioLink }` for the admin table. Needs a **`UserResponseDto`**
   (never return the raw `User` entity — it exposes `PasswordHash`/`RefreshToken`).
3. Later: **CV upload → AI/LLM parsing → portfolio content**, profile picture upload, edit/save.

---

## Database

- **Server:** `localhost\SQLEXPRESS01`, DB name **`Portfolio_Builder`**.
- **Schema scripts** live in `/Database` (run in order): `01_Create_Users.sql`,
  `02_Create_Portfolios.sql`, `03_Promote_Admin.sql`.
- **Workflow:** edit SQL → run in SSMS → re-scaffold EF model with `Scaffold-DbContext`.

### `Users` table (the ACCOUNT)
`Id` (uniqueidentifier/GUID PK), `FirstName`, `LastName`, `DateOfBirth` (date),
`Gender` (Male/Female/Prefer not to say), `Email` (unique), `Username` (unique, GitHub rules),
`PasswordHash`, `Role` (`user`/`admin`), `RefreshToken`, `RefreshTokenExpireTime`, `CreatedAt`.

### `Portfolios` table (the PUBLIC CONTENT) — 1 user → 0..1 portfolio
`Id` (GUID PK), `Username` (FK → Users.Username, unique), `FullName`, `PortfolioLink` (unique),
`CreatedAt`. Deleting a user cascades to their portfolio.

---

## Code Conventions (match these)

- **Layered:** `Controller` (thin — HTTP only) → `Service` (interface + impl, business logic + DB)
  → `AppDbContext` (EF) → SQL Server.
- **Folder layout:** `Controllers/`, `Services/` (with `I<Name>Service` interfaces),
  `Entities/{Data,Models,DTOs}/`.
- **File-scoped namespaces** (`namespace X;`), primary constructors for DI
  (`public class Foo(AppDbContext context) : IFoo`).
- **DTOs cross the API boundary; entities stay internal.** Never return `User` directly.
- **Roles are lowercase** everywhere (`user`, `admin`) — must match the DB CHECK constraint.
- Secrets currently in `appsettings.json` (fine for learning; move to user-secrets/env later).

---

## Frontend Plan (STARTING NOW)

Goal: build the frontend, learning as we go. Suggested order:

1. **Junaid's own portfolio page** (`junaidjavedjj.com` root) — static-ish showcase:
   about, experience, projects, social links, contact. Revise **HTML/CSS** here.
2. **"Build your own portfolio" flow** — register → login → (later) CV upload → generated
   portfolio → edit/save. This is where **JavaScript** (then **React**) comes in to talk to the
   backend APIs.
3. Wire the frontend to the existing backend APIs (auth first).

### Open decisions (not yet made)
- Frontend stack: plain **HTML/CSS/JS first** (to learn fundamentals) before introducing **React**.
- Whether the frontend lives in this same repo or a separate one.
- How auth tokens are stored client-side (in-memory vs httpOnly cookie).

### Teaching preferences for the frontend
- Junaid is revising HTML/CSS and learning JS from near-zero — explain new JS/DOM/React concepts,
  don't assume prior JS knowledge. Build incrementally. Prefer understanding over speed.

---

## Housekeeping
- Leftover template files (`WeatherForecast.cs`, `WeatherForecastController.cs`) can be deleted.
- This started as a backend project; the frontend may be added here or alongside it.
