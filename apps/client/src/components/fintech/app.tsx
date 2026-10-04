import { useEffect, useState } from 'react'
import {
  ArrowRight,
  Bell,
  ChevronDown,
  ChevronRight,
  HelpCircle,
  LogOut,
  Menu,
  MoreHorizontal,
  Search,
  Settings,
  ShieldCheck,
  Sparkles,
} from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from '#/components/ui/dialog'
import { Avatar, AppLink, Brand, Button, Input, useDemo } from './shared'
import { extraNav, growNav, mainNav, pageInfo, paymentModes } from './data'
import { Dashboard } from './dashboard'
import { PaymentFlow, Payments, ReceiveMoney } from './payments'
import { FeaturePage } from './features'
import { AuthPage, authPages } from './auth'
import { cn } from '#/lib/utils'

export function FintechApp({ page = 'dashboard' }: { page?: string }) {
  const [menu, setMenu] = useState(false)
  const [more, setMore] = useState(false)
  const [search, setSearch] = useState(false)
  const [query, setQuery] = useState('')
  const [account, setAccount] = useState(false)
  const { notices } = useDemo()
  const [mobile, setMobile] = useState(false)
  useEffect(() => {
    const media = window.matchMedia('(max-width: 1023px)')
    const update = () => {
      setMobile(media.matches)
      if (!media.matches) setMenu(false)
    }
    update()
    media.addEventListener('change', update)
    const shortcuts = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault()
        setSearch(true)
      }
    }
    document.addEventListener('keydown', shortcuts)
    return () => {
      media.removeEventListener('change', update)
      document.removeEventListener('keydown', shortcuts)
    }
  }, [])
  const active =
    paymentModes[page] || page === 'receive-money'
      ? 'payments'
      : page === 'virtual-cards'
        ? 'cards'
        : page
  if (authPages.includes(page)) return <AuthPage page={page} />
  const info = pageInfo[active] || pageInfo.dashboard!
  const navLink = (key: string) => {
    const item = pageInfo[key]!
    return (
      <AppLink
        key={key}
        page={key}
        onClick={() => setMenu(false)}
        className={cn('nav-item', active === key && 'active')}
      >
        <item.icon className="size-[18px]" strokeWidth={1.7} />
        <span>{item.title}</span>
        {key === 'payments' && (
          <span className="ml-auto rounded bg-card/80 px-1.5 py-0.5 text-[10px] text-muted-foreground">
            NEW
          </span>
        )}
      </AppLink>
    )
  }
  const navigation = (
    <>
      <AppLink
        page="dashboard"
        onClick={() => setMenu(false)}
        className="flex h-[82px] items-center px-6"
      >
        <Brand />
      </AppLink>
      <button
        onClick={() => {
          setMenu(false)
          setAccount(true)
        }}
        className="mx-4 mb-7 flex items-center gap-2.5 rounded-lg border bg-background px-3 py-3 text-left"
      >
        <Avatar
          initials="AH"
          className="size-8 rounded-md bg-secondary text-xs"
        />
        <span className="flex-1">
          <span className="block text-xs font-semibold">Personal wallet</span>
          <span className="block text-[11px] text-muted-foreground">
            Everyday account
          </span>
        </span>
        <ChevronDown className="size-3.5 text-muted-foreground" />
      </button>
      <nav
        className="flex-1 overflow-y-auto px-3 pb-4"
        aria-label="Main navigation"
      >
        <p className="eyebrow mb-2 px-3">Workspace</p>
        <div className="space-y-1">{mainNav.map(navLink)}</div>
        <p className="eyebrow mt-7 mb-2 px-3">Plan & grow</p>
        <div className="space-y-1">
          {growNav.map(navLink)}
          <button
            className="nav-item w-full"
            onClick={() => {
              setMenu(false)
              setMore(true)
            }}
          >
            <MoreHorizontal className="size-[18px]" />
            <span>More products</span>
            <ChevronRight className="ml-auto size-3.5" />
          </button>
        </div>
      </nav>
      <div className="mx-4 mb-4 rounded-xl border bg-background p-4">
        <div className="mb-2 flex items-center gap-2">
          <Sparkles className="size-4 text-primary" />
          <span className="text-xs font-semibold">
            Built for your next chapter
          </span>
        </div>
        <p className="text-xs leading-relaxed text-muted-foreground">
          Plan your next big purchase.
        </p>
        <AppLink
          page="loans"
          onClick={() => setMenu(false)}
          className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-primary"
        >
          Explore financing <ChevronRight className="size-3" />
        </AppLink>
      </div>
      <div className="space-y-1 border-t px-3 py-3">
        <AppLink
          page="support"
          onClick={() => setMenu(false)}
          className="nav-item"
        >
          <HelpCircle className="size-[18px]" />
          Help & support
        </AppLink>
        <AppLink
          page="settings"
          onClick={() => setMenu(false)}
          className={cn('nav-item', page === 'settings' && 'active')}
        >
          <Settings className="size-[18px]" />
          Settings
        </AppLink>
      </div>
      <AppLink
        page="profile"
        onClick={() => setMenu(false)}
        className="flex items-center gap-3 border-t px-5 py-4"
      >
        <Avatar
          initials="AH"
          className="size-9 rounded-full bg-accent text-accent-foreground"
        />
        <span className="flex-1">
          <span className="block text-sm font-semibold">Akram Hossain</span>
          <span className="block text-[11px] text-muted-foreground">
            Personal account
          </span>
        </span>
        <ChevronDown className="size-3.5 text-muted-foreground" />
      </AppLink>
    </>
  )
  return (
    <div className="min-h-[100dvh]">
      <a
        href="#main-content"
        className="sr-only fixed z-50 rounded bg-card p-4 focus:not-sr-only"
      >
        Skip to content
      </a>
      <aside
        inert={mobile}
        aria-hidden={mobile ? true : undefined}
        className="fixed inset-y-0 left-0 z-40 hidden w-[224px] flex-col border-r bg-card lg:flex"
      >
        {navigation}
      </aside>
      <Dialog open={menu} onOpenChange={setMenu}>
        <DialogContent className="navigation-drawer">
          <DialogTitle className="sr-only">Setlr navigation</DialogTitle>
          <DialogDescription className="sr-only">
            Choose a wallet, payment, or account page.
          </DialogDescription>
          <div className="flex h-full min-h-0 flex-col">{navigation}</div>
        </DialogContent>
      </Dialog>
      <div className="lg:ml-[224px]">
        <header className="app-header sticky top-0 z-20 flex h-16 lg:h-[72px] items-center justify-between gap-3 border-b bg-card/95 px-4 backdrop-blur-sm md:px-8">
          <div className="flex items-center gap-3">
            <button
              aria-label="Open navigation"
              aria-expanded={menu}
              onClick={() => setMenu(true)}
              className="mobile-icon-button inline-flex lg:hidden"
            >
              <Menu className="size-5" />
            </button>
            <AppLink page="dashboard" className="lg:hidden" label="Setlr home">
              <Brand />
            </AppLink>
            <div className="hidden items-center gap-3 lg:flex">
              <span className="text-sm text-muted-foreground">Workspace</span>
              <ChevronRight className="size-3 text-muted-foreground" />
              <span className="text-sm font-semibold">{info.title}</span>
            </div>
          </div>
          <div className="flex items-center gap-2 md:gap-4">
            <button
              onClick={() => setSearch(true)}
              aria-label="Search workspace"
              className="mobile-icon-button flex min-h-10 items-center gap-2 rounded-lg px-2 text-sm text-muted-foreground hover:bg-muted"
            >
              <Search className="size-4" />
              <span className="hidden md:inline">Search anything...</span>
              <span className="ml-5 hidden rounded border px-1.5 py-0.5 text-[10px] md:inline">
                ⌘ K
              </span>
            </button>
            <span className="hidden h-5 border-l md:block" />
            <AppLink
              page="support"
              className="hidden p-2 text-muted-foreground sm:block"
            >
              <HelpCircle className="size-5" />
              <span className="sr-only">Help center</span>
            </AppLink>
            <AppLink
              page="notifications"
              className="mobile-icon-button relative inline-flex text-muted-foreground"
            >
              <Bell className="size-5" />
              <span className="sr-only">
                Notifications, {notices.filter((n) => !n.read).length} unread
              </span>
              {notices.some((n) => !n.read) && (
                <span className="absolute top-1.5 right-2 size-1.5 rounded-full bg-destructive ring-2 ring-card" />
              )}
            </AppLink>
            <AppLink
              page="profile"
              label="Your profile"
              className="mobile-icon-button inline-flex"
            >
              <Avatar
                initials="AH"
                className="size-8 rounded-full bg-accent text-accent-foreground"
              />
            </AppLink>
          </div>
        </header>
        <main
          id="main-content"
          className={cn(
            'workspace-content mx-auto max-w-[1550px] px-4 pt-5 pb-28 md:px-8 lg:pt-7 lg:pb-8',
            paymentModes[page] && 'payment-workspace',
          )}
        >
          {page === 'dashboard' ? (
            <Dashboard />
          ) : paymentModes[page] ? (
            <PaymentFlow key={page} mode={page} />
          ) : page === 'payments' ? (
            <Payments />
          ) : page === 'receive-money' ? (
            <ReceiveMoney />
          ) : (
            <FeaturePage key={page} page={page} />
          )}
        </main>
      </div>
      {!paymentModes[page] && (
        <nav
          aria-label="Mobile navigation"
          className="mobile-bottom-nav fixed inset-x-0 bottom-0 z-20 flex justify-around border-t bg-card px-2 pt-2 pb-[max(8px,env(safe-area-inset-bottom))] lg:hidden"
        >
          {['dashboard', 'wallet', 'payments', 'cards'].map((key) => {
            const item = pageInfo[key]!
            return (
              <AppLink
                page={key}
                key={key}
                className={cn(
                  'mobile-nav-item flex min-h-12 min-w-14 flex-col items-center justify-center gap-1 text-[11px]',
                  active === key
                    ? 'is-active text-primary'
                    : 'text-muted-foreground',
                )}
              >
                <item.icon className="size-5" />
                <span>{key === 'dashboard' ? 'Home' : item.title}</span>
              </AppLink>
            )
          })}
          <button
            onClick={() => setMore(true)}
            className="mobile-nav-item flex min-h-12 min-w-14 flex-col items-center justify-center gap-1 text-[11px] text-muted-foreground"
          >
            <MoreHorizontal className="size-5" />
            More
          </button>
        </nav>
      )}
      <Dialog open={more} onOpenChange={setMore}>
        <DialogContent className="sm:max-w-2xl">
          <DialogTitle className="text-xl font-semibold">
            More from your workspace
          </DialogTitle>
          <DialogDescription>
            Everything you need to manage and grow your money.
          </DialogDescription>
          <div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
            {extraNav.map((key) => {
              const item = pageInfo[key]!
              return (
                <AppLink
                  key={key}
                  page={key}
                  onClick={() => setMore(false)}
                  className="flex items-center gap-3 rounded-lg p-3 hover:bg-secondary"
                >
                  <span className="icon-tile">
                    <item.icon className="size-5" />
                  </span>
                  <span className="text-sm font-semibold">{item.title}</span>
                  <ChevronRight className="ml-auto size-4 text-muted-foreground" />
                </AppLink>
              )
            })}
            <AppLink
              page="login"
              onClick={() => setMore(false)}
              className="flex items-center gap-3 rounded-lg p-3 hover:bg-secondary"
            >
              <span className="icon-tile">
                <LogOut className="size-5" />
              </span>
              <span className="text-sm font-semibold">
                Login & onboarding preview
              </span>
            </AppLink>
          </div>
        </DialogContent>
      </Dialog>
      <Dialog open={search} onOpenChange={setSearch}>
        <DialogContent className="sm:max-w-xl">
          <DialogTitle className="text-xl font-semibold">
            Search your workspace
          </DialogTitle>
          <DialogDescription>
            Find a page, payment, or recipient.
          </DialogDescription>
          <Input
            placeholder="Search wallets, cards, suppliers..."
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <div className="max-h-80 space-y-1 overflow-y-auto">
            {Object.entries(pageInfo)
              .filter(
                (entry): entry is [string, NonNullable<(typeof entry)[1]>] =>
                  Boolean(entry[1]),
              )
              .filter(([, item]) =>
                item.title.toLowerCase().includes(query.toLowerCase()),
              )
              .map(([key, item]) => (
                <AppLink
                  page={key}
                  key={key}
                  onClick={() => setSearch(false)}
                  className="flex items-center gap-3 rounded-lg p-3 hover:bg-muted"
                >
                  <item.icon className="size-4 text-primary" />
                  <span>{item.title}</span>
                  <ChevronRight className="ml-auto size-4" />
                </AppLink>
              ))}
            {Object.entries(pageInfo)
              .filter(
                (entry): entry is [string, NonNullable<(typeof entry)[1]>] =>
                  Boolean(entry[1]),
              )
              .every(
                ([, item]) =>
                  !item.title.toLowerCase().includes(query.toLowerCase()),
              ) && (
              <p className="p-5 text-center text-sm text-muted-foreground">
                No pages found. Try “payments” or “security”.
              </p>
            )}
          </div>
        </DialogContent>
      </Dialog>
      <Dialog open={account} onOpenChange={setAccount}>
        <DialogContent>
          <DialogTitle className="text-xl font-semibold">
            Your accounts
          </DialogTitle>
          <DialogDescription>
            Personal wallet & business workspace
          </DialogDescription>
          <AppLink
            page="dashboard"
            onClick={() => setAccount(false)}
            className="flex items-center gap-3 rounded-xl border p-4 hover:bg-secondary"
          >
            <Avatar initials="AH" />
            <div className="flex-1">
              <p className="font-semibold">Akram Hossain</p>
              <p className="muted">Personal wallet · Everyday account</p>
            </div>
            <ArrowRight className="size-4" />
          </AppLink>
          <AppLink
            page="business-payments"
            onClick={() => setAccount(false)}
            className="flex items-center gap-3 rounded-xl border p-4 hover:bg-secondary"
          >
            <Avatar initials="NT" />
            <div className="flex-1">
              <p className="font-semibold">Nuport Trading</p>
              <p className="muted">STL-884021 · Owner</p>
            </div>
            <ShieldCheck className="size-5 text-success" />
          </AppLink>
          <AppLink page="profile" onClick={() => setAccount(false)}>
            <Button variant="outline" className="w-full">
              Manage profile
            </Button>
          </AppLink>
        </DialogContent>
      </Dialog>
    </div>
  )
}
