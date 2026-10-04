# Setlr UI design system

This is a frontend design prototype. The default workspace is a personal wallet; the secondary Business payments workspace follows the Bangladesh–China supplier-payment requirements in the root `docs/` directory. All balances, rates, products, documents, security checks, and payment outcomes are illustrative. No financial or identity services are called.

## Brand foundation

The overlapping circles and wordmark in `public/brand/` were extracted from the original vector artwork in `art/Setlr.ai`. The wordmark keeps its original Source Sans family. The application uses locally bundled Manrope and IBM Plex Sans variable fonts for its interface typography.

| Primitive            | Value             | Usage                                               |
| -------------------- | ----------------- | --------------------------------------------------- |
| Brand blue           | `#2e3092`         | Identity, primary actions, wallet and card surfaces |
| Brand yellow         | `#ffcf00`         | Highlights and savings accents                      |
| Soft blue            | `#6d68ae`         | Supporting brand color and focus ring               |
| Base radius          | `0.75rem`         | Cards, inputs, dialogs, and controls                |
| Fast / normal motion | `160ms` / `240ms` | Feedback and page transitions                       |

`src/styles.css` defines brand primitives, semantic CSS variables, and Tailwind aliases. Components use `bg-card`, `text-muted-foreground`, `text-primary`, `text-success`, `bg-warning-soft`, and related semantic classes. Light and dark themes keep the same roles with different surface and foreground values. Avoid introducing feature-specific color constants.

## Layout and typography

- **Manrope** for headings (`font-display`): a modern geometric shape for page titles and section headings, usually weight 600–700.
- **IBM Plex Sans** for body text, navigation, forms, and financial figures (`font-sans`): regular 400 for reading, medium 500 for controls, semibold 600 for emphasis. Body text 15px, supporting text 12–14px, page titles about 30px, key balances 32–38px.
- The Source Sans 3 family is limited to the Setlr wordmark (`font-brand`), preserving the supplied branding.
- Fonts are self-hosted through Fontsource with `font-display: swap`. The shared `.money` class uses Plex Sans with lining, tabular numerals. Currency codes accompany cross-border values and exports.
- A 4px spacing rhythm: controls and rows use 8–16px; cards use 20–32px; page sections use 20–28px.
- Desktop: 224px sidebar, 72px header, bounded content width, split primary/secondary columns.
- Below 1024px: compact header, drawer navigation, five-item bottom navigation. Grids collapse to one column before their contents become cramped.
- Phone home prioritizes balance, five quick actions, and activity. Transaction lists show date and status in tappable rows.
- Mobile form text is 16px. Header controls are at least 44px, and content spacing accounts for safe areas. Payment flows use a focused view with totals next to the primary action.
- Navigation uses a Base UI modal drawer with keyboard focus management. Dialogs become bottom sheets on small screens. Mobile action buttons have a minimum 44px height. Reduced motion is respected.

## Component ownership

| Location                              | Responsibility                                                                                                                                    |
| ------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| `src/components/ui/`                  | shadcn components backed by Base UI                                                                                                               |
| `src/components/fintech/shared.tsx`   | Reusable panels, fields, OTP/PIN, alerts, badges, transaction rows/details, account cards, QR, charts, confirmation dialogs, and local demo state |
| `src/components/fintech/data.ts`      | Navigation/page registries and sample data                                                                                                        |
| `src/components/fintech/app.tsx`      | Responsive workspace shell, search, account switch, and screen selection                                                                          |
| `src/components/fintech/payments.tsx` | Payment directory, receive details, and financial action lifecycle                                                                                |
| `src/components/fintech/auth.tsx`     | Authentication and onboarding presentations                                                                                                       |
| `src/components/fintech/features.tsx` | Wallet, finance, business, account, and support screens                                                                                           |
| `src/lib/demo-export.ts`              | Browser-generated PDF receipts and statements                                                                                                     |

Use `AppLink` for internal navigation. It composes a Base UI Button through its `render` prop when needed, preserving one interactive element. Use `Field` to associate a visible label with its input, and `DigitInput` for accessible OTP/PIN entry. Base UI handles dialog focus and keyboard interaction.

## Flow and state conventions

Money actions follow **Input → Review → Authentication → Processing → Result → Receipt**. Show the recipient, funding source, amount, fee, and total before authorization. Amount validation, insufficient funds, limits, incorrect PIN, expired OTP, retry, pending settlement, and failed payment are presented in context.

The smaller financial actions in savings, investments, and repayments reuse the same dialog lifecycle. Forms for contacts, settings, and other nonfinancial changes use a shorter save-and-confirm pattern.

The `/design-system` page displays components, tokens, and 19 experience states, including loading, empty, no results, success, pending, failed, balance/limit errors, expired OTP/QR, offline, restricted account, and KYC required. Its **Next payment result** selector changes the following demo payment to Completed, Pending, Failed, or OTP expired. Reset it after reviewing an alternate outcome.

## Screen directory

| Area                  | Routes                                                                                                                                                                                                                                  |
| --------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Authentication        | `/login`, `/register`, `/email-verification`, `/phone-verification`, `/otp-verification`, `/forgot-password`, `/reset-password`, `/pin-setup`, `/security-setup`, `/welcome`, `/onboarding`, `/session-expired`, `/device-verification` |
| Everyday money        | `/`, `/wallet`, `/payments`, `/send-money`, `/receive-money`, `/request-money`, `/add-money`, `/withdraw-money`, `/bank-transfer`, `/qr-payment`, `/bill-payment`, `/mobile-recharge`                                                   |
| Accounts and activity | `/cards`, `/virtual-cards`, `/transactions`, `/statements`, `/beneficiaries`, `/linked-accounts`                                                                                                                                        |
| Finance               | `/savings`, `/loans`, `/credit`, `/investments`, `/budgets`, `/rewards`                                                                                                                                                                 |
| Business              | `/business-payments`, `/supplier-payment`                                                                                                                                                                                               |
| Account and help      | `/notifications`, `/profile`, `/security`, `/settings`, `/verification`, `/support`, `/disputes`, `/legal`, `/design-system`                                                                                                            |

Transaction details open from activity rows rather than a separate route. Legal content is draft sample copy. Identity-document uploads and biometrics are visual demonstrations; files are not transmitted. Supplier settlement uses a sample bank quote with trade-document and maker/checker presentations.

## Demo operation and verification

- Sample transaction PIN: **4821**. Sample OTP: **123456**.
- Local balance, activity, contacts, and savings changes remain while navigating within the app and reset on refresh. Theme preference persists in local storage; the selected outcome persists in session storage.
- Receipts/statements are generated locally as PDFs; transaction/reconciliation lists export CSV; receive QR exports PNG. PDFs use currency codes so exports do not depend on a Bengali font being embedded.
- No authentication credentials, KYC documents, or payments are submitted to a backend.
- Build, TypeScript, scoped lint, keyboard semantics, mobile overflow, payment outcomes, and WCAG automated checks are part of the review. Automated accessibility checks complement manual visual and keyboard review.

### Completed review — 04 October 2026

Production build, TypeScript, scoped ESLint, formatting, and diff checks passed. Browser review covered 25 screens in both light and dark themes at 375px with no automated WCAG 2 A/AA or WCAG 2.1 AA violations. Seven key screens also passed overflow and interactive-nesting checks at 375, 768, 1024, and 1440px.

Payment success, pending, failure/retry, insufficient funds, limit exceeded, incorrect PIN, and expired OTP/resend were exercised. Registration through verification/PIN/security, KYC submission, savings confirmation, card freeze/reveal, supplier invoice validation, local activity updates, QR export, and filtered PDF/CSV statements were checked. Search dismissal with Escape, mobile navigation, and reduced motion were verified. These are prototype checks, not certification or verification of real financial/security services.

See [DESIGN_INSPIRATION.md](./DESIGN_INSPIRATION.md) for the Google, Dribbble, and Pinterest research and the mobile refinement decisions.
