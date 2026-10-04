# Setlr frontend design prototype

A branded personal wallet with a secondary business supplier-payment workspace, implemented in the existing TanStack Start client using Tailwind CSS and shadcn/Base UI.

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
PORT=3011 bun .output/server/index.mjs
```

Open `http://localhost:3011/`.

## Review the flows

Start at `/` for the personal wallet, `/business-payments` for supplier workflows, `/login` for onboarding, and `/design-system` for reusable components and alternate outcomes.

Use PIN **4821** and OTP **123456** in demo authorization. The design-system page can select Pending, Failed, or OTP expired for the next payment. Receipts, statements, CSV exports, and QR images are generated in the browser.

This implementation adds no real API integration. All account, finance, identity, and payment data is sample data. Most state resets on refresh; theme preference persists locally. Existing starter API examples remain in the repository and are not used by the new UI.

## Static checks

```bash
bunx --bun tsc --noEmit
bunx --bun eslint src/components/fintech src/components/ui src/lib/demo-export.ts src/routes/index.tsx 'src/routes/$page.tsx' src/routes/__root.tsx src/components/LocaleSwitcher.tsx
bun --bun run build
```

Generated routing and Paraglide files are managed by the existing toolchain. Use the bundled Bun runtime for the Vite/TanStack commands.
