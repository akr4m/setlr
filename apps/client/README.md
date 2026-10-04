# Setlr frontend design prototype

A branded personal wallet with a secondary business supplier-payment workspace, implemented as a React SPA using Vite, TanStack Router, Tailwind CSS, and shadcn/Base UI.

Read [DESIGN_INSPIRATION.md](./DESIGN_INSPIRATION.md) for researched references and mobile refinements.

Read [DESIGN_SYSTEM.md](./DESIGN_SYSTEM.md) for tokens, component conventions, screen routes, and demo-state controls.

## Run

```bash
bun install
bun --bun run dev
```

Open `http://localhost:3000/`. If port 3000 is occupied, use `bun --bun vite dev --port 3010`.

## Production preview

```bash
bun --bun run build
bun --bun run preview -- --port 3011
```

Open `http://localhost:3011/`.

## Vercel deployment

Import the repository into Vercel and set **Root Directory** to **`apps/client`**. Select **Vite** as the framework and **`dist`** as the Output Directory.

The checked-in `vercel.json` uses `bun install --frozen-lockfile` and `bun --bun run build`. Node.js 22 is pinned for build-tool compatibility. No environment variables are required for the UI prototype.

Verify the deployment build locally from `apps/client`:

```bash
bun install --frozen-lockfile
bun --bun run build
```

Vite generates a static site under `dist`, including `index.html` and the branding, font, and client assets. The SPA rewrite serves `index.html` for direct links and refreshes on routes such as `/login`, `/send-money`, and `/business-payments`; TanStack Router renders the requested screen in the browser.

See the official [Vite on Vercel guide](https://vercel.com/docs/frameworks/frontend/vite#using-vite-to-make-spas) for SPA deployment and deep-link rewrites.

## Review the flows

Start at `/` for the personal wallet, `/business-payments` for supplier workflows, `/login` for onboarding, and `/design-system` for reusable components and alternate outcomes.

Use PIN **4821** and OTP **123456** in demo authorization. The design-system page can select Pending, Failed, or OTP expired for the next payment. Receipts, statements, CSV exports, and QR images are generated in the browser.

This implementation adds no real API integration. All account, finance, identity, and payment data is sample data. Most state resets on refresh; theme preference persists locally. Existing starter API examples remain in the repository, excluded from SPA route generation and type checking. They are not imported by the UI or deployed as functions.

## Static checks

```bash
bunx --bun tsc --noEmit
bunx --bun eslint src/components/fintech src/components/ui src/lib/demo-export.ts src/routes/index.tsx 'src/routes/$page.tsx' src/routes/__root.tsx src/components/LocaleSwitcher.tsx
bun --bun run build
```

`index.html` and `src/main.tsx` are the Vite browser entry points. Generated routing and Paraglide files are managed by the existing toolchain. Use the bundled Bun runtime for the Vite/TanStack commands.
