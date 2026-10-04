# FinTech design inspiration and mobile refinement

Researched **“fintech ui ux design”** on Google Images, Dribbble, Pinterest, and related portfolio results. The references inform hierarchy and interaction patterns; Setlr's existing `art/` assets remain the source of truth for colors, identity, and the wordmark. Interface typography uses Manrope and IBM Plex Sans as defined in [DESIGN_SYSTEM.md](./DESIGN_SYSTEM.md). No third-party artwork was added to the product.

## Selected references

| Reference                                                                                                                              | Useful direction                                             | Applied to Setlr                                                                               |
| -------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------ | ---------------------------------------------------------------------------------------------- |
| [Musemind — Digital Wallet App](https://dribbble.com/shots/27525708-Digital-Wallet-App-UI-Design-Fintech-Mobile-Dashboard)             | Balance-led home, quick actions, traceable activity          | Balance and actions lead the phone home; activity retains amount, currency, date, and status   |
| [Welldux — FinUI Wallet Dashboard](https://dribbble.com/shots/27025671-FinUI-Wallet-Dashboard-Modern-Fintech-Web-App-UI-UX-Case-Study) | Clear financial hierarchy and restrained data density        | Distinct balance, cash-flow, cards, and savings areas with shared spacing and tokens           |
| [Pinterest — Simple banking app design by Taras Migulko](https://www.pinterest.com/pin/simple-banking-app-design--602989837618008568/) | Prominent balances, compact activity, simple navigation      | A branded compact header, readable activity rows, and clear active bottom-navigation treatment |
| [Behance — Fintech Mobile UI/UX design](https://www.behance.net/gallery/249198887/Fintech-Mobile-UIUX-design)                          | Prioritized money-management tasks and consistent navigation | Everyday actions stay near the balance, with secondary finance content later in the phone page |

[Google Images discovery query](https://www.google.com/search?q=fintech+ui+ux+design&udm=2)

## Mobile changes

| Area              | Before                                                         | After                                                                                  |
| ----------------- | -------------------------------------------------------------- | -------------------------------------------------------------------------------------- |
| Home hierarchy    | Desktop sections stacked into a long phone page                | Balance → quick actions → recent activity → insights/cards/goals                       |
| Activity          | Status and date hidden in a squeezed table                     | Tappable phone rows with date, amount, currency, and status; desktop retains the table |
| Navigation        | Desktop breadcrumb in the compact header                       | Setlr brand, 44px icon targets, and a clear active tab                                 |
| Financial actions | Duplicate summary below the form and persistent tab bar        | Total and fee beside the review action; focused payment flow with a back path          |
| Charts            | Desktop SVG scaled down with tiny labels and numbered controls | Phone-specific plotting width, fewer axis labels, and a named date selector            |
| Forms and sheets  | 15px form text and fixed page spacing                          | 16px phone form text, flexible OTP cells, and safe-area-aware content/sheet spacing    |

Implementation stays inside `apps/client`. Shared components are used across the app so the same mobile presentation applies to wallet, activity, payments, cards, and financial modules. The app remains a local UI prototype.

## Verification

Production build, TypeScript, scoped ESLint, formatting, and diff checks passed. Responsive review covered 37 screens at 320, 390, 768, and 1440px, followed by checks of the refined shared layouts through 1024px. No horizontal overflow or nested link/button controls were found.

Ten representative screens passed automated WCAG checks in both themes. Mobile drawer focus, Escape dismissal, focus restoration, transaction detail sheets, chart date selection, and a successful payment returning to local activity were exercised. Drawer and sheet bounds were explicitly checked at 320 and 390px; both remain fully within the viewport and sheets retain vertical scrolling.
