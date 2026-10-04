import { useEffect, useState } from 'react'
import {
  ArrowDownLeft,
  ArrowLeftRight,
  ArrowRight,
  ArrowUpRight,
  Bell,
  Check,
  CheckCircle2,
  ChevronRight,
  CreditCard,
  Download,
  Eye,
  EyeOff,
  FileCheck2,
  FileText,
  Gift,
  Globe2,
  Landmark,
  Laptop,
  LockKeyhole,
  Mail,
  MessageCircle,
  Plus,
  RefreshCw,
  Search,
  ShieldCheck,
  Smartphone,
  Snowflake,
  Star,
  Target,
  Trash2,
  TrendingUp,
  Upload,
} from 'lucide-react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '#/components/ui/tabs'
import { Switch } from '#/components/ui/switch'
import {
  Alert,
  AppLink,
  Avatar,
  BalanceVisibility,
  BankCard,
  Button,
  CashflowChart,
  EmptyState,
  Field,
  FileUpload,
  InlineLink,
  Input,
  PageHeading,
  Panel,
  Progress,
  Stat,
  StatusBadge,
  ToggleRow,
  TransactionTable,
  downloadTransactions,
  useDemo,
} from './shared'
import { money, pageInfo } from './data'
import { cn } from '#/lib/utils'
import { downloadStatementPDF } from '#/lib/demo-export'
import type { Status } from './data'

export function FeaturePage({ page }: { page: string }) {
  const info = pageInfo[page]
  if (page === 'wallet') return <WalletPage />
  if (page === 'cards' || page === 'virtual-cards')
    return <CardsPage virtual={page === 'virtual-cards'} />
  if (page === 'transactions') return <TransactionsPage />
  if (page === 'beneficiaries') return <BeneficiariesPage />
  if (page === 'savings') return <SavingsPage />
  if (page === 'investments') return <InvestmentsPage />
  if (page === 'budgets') return <BudgetsPage />
  if (page === 'loans') return <LoansPage />
  if (page === 'credit') return <CreditPage />
  if (page === 'rewards') return <RewardsPage />
  if (page === 'notifications') return <NotificationsPage />
  if (page === 'profile') return <ProfilePage />
  if (page === 'security') return <SecurityPage />
  if (page === 'settings') return <SettingsPage />
  if (page === 'support') return <SupportPage />
  if (page === 'disputes') return <DisputesPage />
  if (page === 'legal') return <LegalPage />
  if (page === 'statements') return <StatementsPage />
  if (page === 'linked-accounts') return <LinkedAccountsPage />
  if (page === 'verification') return <VerificationPage />
  if (page === 'design-system') return <DesignSystemPage />
  if (page === 'business-payments') return <BusinessPage />
  return (
    <EmptyState
      title={info?.title || 'Page not found'}
      description="Choose a page from your workspace navigation."
      action={
        <AppLink page="dashboard">
          <Button>Back to overview</Button>
        </AppLink>
      }
    />
  )
}
function Heading({
  page,
  children,
}: {
  page: string
  children?: React.ReactNode
}) {
  const info = pageInfo[page]!
  return (
    <PageHeading title={info.title} description={info.description}>
      {children}
    </PageHeading>
  )
}
function WalletPage() {
  const { hidden, activity, walletBalances } = useDemo()
  const [currency, setCurrency] = useState('BDT')
  const amounts: Record<string, number> = walletBalances
  return (
    <div className="page-enter">
      <Heading page="wallet">
        <AppLink page="add-money">
          <Button>
            <Plus />
            Add money
          </Button>
        </AppLink>
      </Heading>
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1.7fr_1fr]">
        <div className="space-y-6">
          <Panel className="p-6">
            <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
              <h2 className="flex items-center gap-2 font-semibold">
                Your balances <BalanceVisibility />
              </h2>
              <AppLink page="receive-money" className="text-sm text-primary">
                Account details <ArrowUpRight className="inline size-3.5" />
              </AppLink>
            </div>
            <Tabs
              value={currency}
              onValueChange={(v) => setCurrency(String(v))}
            >
              <TabsList>
                {['BDT', 'CNY', 'USD'].map((c) => (
                  <TabsTrigger key={c} value={c}>
                    {c} wallet
                  </TabsTrigger>
                ))}
              </TabsList>
              {['BDT', 'CNY', 'USD'].map((c) => (
                <TabsContent key={c} value={c}>
                  <div className="py-6">
                    <p className="muted">Available balance</p>
                    <p className="money mt-2 text-4xl font-semibold">
                      {hidden ? '••••••••' : money(amounts[c], c)}
                    </p>
                    <p className="mt-2 text-xs text-muted-foreground">
                      {c === 'CNY'
                        ? 'Bank-linked settlement view · Sample balance'
                        : c === 'USD'
                          ? 'International payments · Sample balance'
                          : 'Ready for everyday payments'}
                    </p>
                  </div>
                </TabsContent>
              ))}
            </Tabs>
            <div className="flex flex-wrap gap-2">
              {[
                ['send-money', 'Send money'],
                ['add-money', 'Add money'],
                ['withdraw-money', 'Withdraw'],
                ['receive-money', 'Receive'],
              ].map(([p, label]) => (
                <AppLink key={p} page={p}>
                  <Button variant={p === 'send-money' ? 'default' : 'outline'}>
                    {label}
                  </Button>
                </AppLink>
              ))}
            </div>
          </Panel>
          <Panel
            title="Wallet activity"
            action={<InlineLink page="transactions">View all</InlineLink>}
          >
            <TransactionTable
              compact
              items={activity
                .filter((t) => t.currency === currency)
                .slice(0, 5)}
            />
          </Panel>
        </div>
        <div className="space-y-6">
          <Panel
            title="Wallet limits"
            action={<InlineLink page="security">Manage</InlineLink>}
          >
            <div className="space-y-5 p-6">
              {[
                ['Daily payments', 148250, 500000],
                ['Monthly transfers', 682450, 2000000],
              ].map(([label, amount, limit]) => (
                <div key={label}>
                  <div className="mb-2 flex justify-between text-sm">
                    <span>{label}</span>
                    <span className="text-xs text-muted-foreground">
                      {Math.round((Number(amount) / Number(limit)) * 100)}% used
                    </span>
                  </div>
                  <Progress value={(Number(amount) / Number(limit)) * 100} />
                  <p className="mt-2 text-xs text-muted-foreground">
                    {money(Number(amount))} of {money(Number(limit))}
                  </p>
                </div>
              ))}
              <StatusBadge status="Verified" />
            </div>
          </Panel>
          <Panel title="Funding accounts">
            <div className="p-5">
              <div className="mb-4 flex items-center gap-3">
                <span className="icon-tile">
                  <Landmark className="size-5" />
                </span>
                <div>
                  <p className="font-semibold">Eastern Bank PLC</p>
                  <p className="muted">Savings account •• 4821</p>
                </div>
              </div>
              <InlineLink page="linked-accounts">
                Manage linked accounts
              </InlineLink>
            </div>
          </Panel>
          <Panel className="bg-accent p-5">
            <p className="font-semibold">A clear record of your money</p>
            <p className="muted mt-2">
              Download your wallet statement for any date range.
            </p>
            <AppLink page="statements">
              <Button variant="outline" className="mt-4 w-full">
                <FileText />
                View statements
              </Button>
            </AppLink>
          </Panel>
        </div>
      </div>
    </div>
  )
}
function CardsPage({ virtual }: { virtual: boolean }) {
  const { toast, openForm, confirm, activity } = useDemo()
  const [kind, setKind] = useState(virtual ? 'Virtual' : 'Physical')
  const [frozen, setFrozen] = useState(false)
  const [reveal, setReveal] = useState(false)
  const [cvv, setCvv] = useState(false)
  const [limit, setLimit] = useState('100000')
  return (
    <div className="page-enter">
      <Heading page="cards">
        <Button
          onClick={() =>
            openForm(
              'Create virtual card',
              'Give this demo card a name and monthly spending limit.',
              [
                {
                  name: 'name',
                  label: 'Card name',
                  placeholder: 'Online subscriptions',
                },
                {
                  name: 'limit',
                  label: 'Monthly limit (BDT)',
                  type: 'number',
                  value: '25000',
                },
              ],
              () => {
                setKind('Virtual')
                toast('Your demo virtual card is ready.')
              },
            )
          }
        >
          <Plus />
          New virtual card
        </Button>
      </Heading>
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_1.5fr]">
        <Panel className="p-6">
          <Tabs
            value={kind}
            onValueChange={(v) => {
              setKind(String(v))
              setReveal(false)
              setCvv(false)
            }}
          >
            <TabsList className="mb-6">
              <TabsTrigger value="Physical">Physical card</TabsTrigger>
              <TabsTrigger value="Virtual">Virtual card</TabsTrigger>
            </TabsList>
          </Tabs>
          <BankCard
            virtual={kind === 'Virtual'}
            frozen={frozen}
            reveal={reveal}
          />
          <div className="mt-5 flex items-center justify-between">
            <span className="font-semibold">{kind} debit card</span>
            <StatusBadge status={frozen ? 'Frozen' : 'Active'} />
          </div>
          <div className="mt-5 grid grid-cols-2 gap-2">
            <Button variant="outline" onClick={() => setReveal(!reveal)}>
              {reveal ? <EyeOff /> : <Eye />}
              {reveal ? 'Hide' : 'Show'} details
            </Button>
            <Button
              variant="outline"
              onClick={() => {
                setFrozen(!frozen)
                toast(
                  frozen
                    ? 'Demo card unfrozen.'
                    : 'Demo card frozen. New payments are blocked in this preview.',
                )
              }}
            >
              <Snowflake />
              {frozen ? 'Unfreeze' : 'Freeze'} card
            </Button>
          </div>
          {reveal && (
            <div className="mt-4 rounded-lg bg-muted p-4 text-sm">
              <div className="flex justify-between">
                <span>Valid through</span>
                <span>09/29</span>
              </div>
              <div className="mt-2 flex justify-between">
                <span>Security code</span>
                <button
                  className="font-semibold text-primary"
                  onClick={() => setCvv(!cvv)}
                >
                  {cvv ? '384 · Demo' : 'Reveal CVV'}
                </button>
              </div>
            </div>
          )}
          <p className="mt-4 text-xs text-muted-foreground">
            Sample card details. This card cannot make real payments.
          </p>
        </Panel>
        <div className="space-y-6">
          <Panel title="Card controls">
            <div className="px-6">
              <ToggleRow
                title="Online payments"
                description="Subscriptions and internet purchases"
              />
              <ToggleRow
                title="Contactless payments"
                description="Tap to pay in supported stores"
              />
              <ToggleRow
                title="International payments"
                description="Purchases outside Bangladesh"
                initial={false}
              />
              <ToggleRow
                title="ATM withdrawals"
                description="Cash withdrawals with your physical card"
              />
              <div className="data-row">
                <div>
                  <p className="font-medium">Monthly spending limit</p>
                  <p className="muted">{money(Number(limit))} per month</p>
                </div>
                <Button
                  variant="outline"
                  onClick={() =>
                    openForm(
                      'Change spending limit',
                      'Choose a monthly cap for your demo card.',
                      [
                        {
                          name: 'limit',
                          label: 'Monthly limit (BDT)',
                          type: 'number',
                          value: limit,
                        },
                      ],
                      (v) => setLimit(v.limit),
                    )
                  }
                >
                  Edit
                </Button>
              </div>
            </div>
          </Panel>
          <Panel title="Card security">
            <div className="px-6">
              <AppLink page="pin-setup" className="data-row">
                <span className="flex items-center gap-3">
                  <LockKeyhole className="size-4 text-primary" />
                  Change card PIN
                </span>
                <ChevronRight className="size-4" />
              </AppLink>
              <button
                className="data-row w-full text-left"
                onClick={() =>
                  confirm(
                    'Report card lost or stolen?',
                    'This freezes the demo card immediately. You can then request a replacement.',
                    () => {
                      setFrozen(true)
                      toast('Demo card frozen. Replacement request created.')
                    },
                  )
                }
              >
                <span className="flex items-center gap-3 text-destructive">
                  <ShieldCheck className="size-4" />
                  Report lost or stolen
                </span>
                <ChevronRight className="size-4" />
              </button>
              <button
                className="data-row w-full text-left"
                onClick={() =>
                  openForm(
                    'Request replacement card',
                    'Confirm the delivery address for this demo replacement.',
                    [
                      {
                        name: 'address',
                        label: 'Delivery address',
                        value: 'House 18, Road 7, Dhanmondi, Dhaka 1209',
                      },
                    ],
                  )
                }
              >
                <span className="flex items-center gap-3">
                  <CreditCard className="size-4 text-primary" />
                  Replace physical card
                </span>
                <ChevronRight className="size-4" />
              </button>
            </div>
          </Panel>
        </div>
      </div>
      <Panel title="Recent card activity" className="mt-6">
        <TransactionTable
          compact
          items={activity.filter((t) => ['Notion', 'Pathao'].includes(t.name))}
        />
      </Panel>
    </div>
  )
}
function TransactionsPage() {
  const { activity } = useDemo()
  const [search, setSearch] = useState('')
  const [status, setStatus] = useState('All statuses')
  const [currency, setCurrency] = useState('All currencies')
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    if (!loading) return
    const timer = setTimeout(() => setLoading(false), 850)
    return () => clearTimeout(timer)
  }, [loading])
  const filtered = activity.filter(
    (t) =>
      `${t.name} ${t.id} ${t.category}`
        .toLowerCase()
        .includes(search.toLowerCase()) &&
      (status === 'All statuses' || t.status === status) &&
      (currency === 'All currencies' || t.currency === currency),
  )
  return (
    <div className="page-enter">
      <Heading page="transactions">
        <div className="flex gap-2">
          <Button
            variant="outline"
            aria-label="Refresh transactions"
            onClick={() => setLoading(true)}
          >
            <RefreshCw className={cn('size-4', loading && 'processing-ring')} />
          </Button>
          <Button
            variant="outline"
            onClick={() => downloadTransactions(filtered)}
          >
            <Download />
            Export CSV
          </Button>
        </div>
      </Heading>
      <div className="mb-6 grid gap-4 sm:grid-cols-3">
        <Stat
          label="Money in · October"
          value="৳682,450.00"
          icon={<ArrowDownLeft className="size-5 text-success" />}
        />
        <Stat
          label="Money out · October"
          value="৳428,180.00"
          icon={<ArrowUpRight className="size-5 text-primary" />}
        />
        <Stat
          label="Pending payments"
          value={`${activity.filter((t) => t.status === 'Pending').length} payment(s)`}
          icon={<RefreshCw className="size-5 text-warning" />}
        />
      </div>
      <Panel>
        <div className="flex flex-wrap gap-3 p-5">
          <div className="relative min-w-48 flex-1">
            <Search className="absolute top-3.5 left-3 size-4 text-muted-foreground" />
            <Input
              className="pl-9"
              aria-label="Search transactions"
              placeholder="Search recipient, reference, or category"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <select
            aria-label="Filter by status"
            className="select w-auto"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            {['All statuses', 'Completed', 'Pending', 'Failed', 'Refunded'].map(
              (s) => (
                <option key={s}>{s}</option>
              ),
            )}
          </select>
          <select
            aria-label="Filter by currency"
            className="select w-auto"
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
          >
            {['All currencies', 'BDT', 'CNY', 'USD'].map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
        </div>
        {loading ? (
          <div
            role="status"
            aria-label="Loading transactions"
            className="space-y-5 p-6"
          >
            {Array.from({ length: 5 }, (_, i) => (
              <div className="flex animate-pulse gap-4" key={i}>
                <div className="size-10 rounded-lg bg-muted" />
                <div className="flex-1 space-y-2">
                  <div className="h-3 w-2/5 rounded bg-muted" />
                  <div className="h-3 w-1/4 rounded bg-muted" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <TransactionTable items={filtered} />
        )}
        <div className="flex justify-between border-t px-6 py-4 text-xs text-muted-foreground">
          <span>{filtered.length} transactions</span>
          <span>All times in Asia/Dhaka</span>
        </div>
      </Panel>
    </div>
  )
}
function BeneficiariesPage() {
  const { contacts, setContacts, openForm, confirm } = useDemo()
  const [search, setSearch] = useState('')
  const add = () =>
    openForm(
      'Add beneficiary',
      'Save verified recipient details for future payments.',
      [
        { name: 'name', label: 'Full name / business name' },
        { name: 'country', label: 'Country', options: ['Bangladesh', 'China'] },
        {
          name: 'bank',
          label: 'Bank name',
          options: ['Eastern Bank PLC', 'BRAC Bank', 'Bank of China', 'ICBC'],
        },
        { name: 'account', label: 'Account number' },
      ],
      (v) =>
        setContacts((all) => [
          ...all,
          {
            id: String(Date.now()),
            name: v.name,
            initials: v.name
              .split(' ')
              .slice(0, 2)
              .map((x) => x[0])
              .join(''),
            detail: `${v.country} · ${v.bank} •• ${v.account.slice(-4)}`,
            type: v.country === 'China' ? 'Business' : 'Personal',
            favorite: false,
          },
        ]),
    )
  return (
    <div className="page-enter">
      <Heading page="beneficiaries">
        <Button onClick={add}>
          <Plus />
          Add beneficiary
        </Button>
      </Heading>
      <Input
        className="mb-6 max-w-md"
        placeholder="Search people or businesses"
        aria-label="Search beneficiaries"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {contacts
          .filter((r) => r.name.toLowerCase().includes(search.toLowerCase()))
          .map((r) => (
            <Panel className="p-5" key={r.id}>
              <div className="flex items-center gap-3">
                <Avatar initials={r.initials} className="size-12" />
                <div className="min-w-0 flex-1">
                  <h2 className="font-semibold">{r.name}</h2>
                  <p className="text-xs text-muted-foreground">
                    {r.type} recipient
                  </p>
                </div>
                <button
                  aria-label={
                    r.favorite
                      ? `Remove ${r.name} from favorites`
                      : `Favorite ${r.name}`
                  }
                  className="p-2"
                  onClick={() =>
                    setContacts((all) =>
                      all.map((c) =>
                        c.id === r.id ? { ...c, favorite: !c.favorite } : c,
                      ),
                    )
                  }
                >
                  <Star
                    className={cn(
                      'size-4',
                      r.favorite
                        ? 'fill-brand-yellow text-accent-foreground'
                        : 'text-muted-foreground',
                    )}
                  />
                </button>
              </div>
              <p className="my-5 text-sm text-muted-foreground">{r.detail}</p>
              <div className="flex gap-2">
                <AppLink page="send-money" className="flex-1">
                  <Button variant="outline" className="w-full">
                    Send money <ArrowUpRight />
                  </Button>
                </AppLink>
                <Button
                  variant="ghost"
                  aria-label={`Edit ${r.name}`}
                  onClick={() =>
                    openForm(
                      'Edit beneficiary',
                      'Update the name used in your contact list.',
                      [
                        {
                          name: 'name',
                          label: 'Recipient name',
                          value: r.name,
                        },
                      ],
                      (v) =>
                        setContacts((all) =>
                          all.map((c) =>
                            c.id === r.id ? { ...c, name: v.name } : c,
                          ),
                        ),
                    )
                  }
                >
                  Edit
                </Button>
                <Button
                  variant="ghost"
                  aria-label={`Delete ${r.name}`}
                  onClick={() =>
                    confirm(
                      'Remove beneficiary?',
                      `${r.name} will be removed from this demo contact list.`,
                      () =>
                        setContacts((all) => all.filter((c) => c.id !== r.id)),
                    )
                  }
                >
                  <Trash2 className="size-4 text-destructive" />
                </Button>
              </div>
            </Panel>
          ))}
      </div>
      {contacts.every(
        (r) => !r.name.toLowerCase().includes(search.toLowerCase()),
      ) && (
        <EmptyState
          title="No recipients found"
          description="Try another name, or add a new beneficiary."
          action={<Button onClick={add}>Add beneficiary</Button>}
        />
      )}
    </div>
  )
}
function SavingsPage() {
  const { goals, setGoals, openForm } = useDemo()
  const [tab, setTab] = useState('Goals')
  const total = goals.reduce((sum, g) => sum + g.amount, 0)
  return (
    <div className="page-enter">
      <Heading page="savings">
        <Button
          onClick={() =>
            openForm(
              'Create savings goal',
              'Give your goal a name, target, and date.',
              [
                {
                  name: 'name',
                  label: 'Goal name',
                  placeholder: 'A trip to Kyoto',
                },
                {
                  name: 'target',
                  label: 'Target amount (BDT)',
                  type: 'number',
                },
                { name: 'date', label: 'Target date', type: 'date' },
              ],
              (v) =>
                setGoals((all) => [
                  ...all,
                  {
                    name: v.name,
                    target: Number(v.target),
                    amount: 0,
                    icon: 'travel',
                  },
                ]),
            )
          }
        >
          <Plus />
          Create goal
        </Button>
      </Heading>
      <div className="mb-6 grid gap-4 sm:grid-cols-2">
        <Stat
          label="Total saved"
          value={money(total)}
          change="+৳18,500 added this month"
          icon={<Target className="size-5 text-primary" />}
        />
        <Stat
          label="Active goals"
          value={`${goals.length} goals`}
          change="Small steps, real progress"
          icon={<TrendingUp className="size-5 text-success" />}
        />
      </div>
      <Tabs value={tab} onValueChange={(v) => setTab(String(v))}>
        <TabsList className="mb-5">
          <TabsTrigger value="Goals">Savings goals</TabsTrigger>
          <TabsTrigger value="Deposits">Fixed deposits</TabsTrigger>
        </TabsList>
        <TabsContent value="Goals">
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
            {goals.map((g, i) => (
              <Panel key={g.name} className="p-6">
                <div className="mb-5 flex items-center justify-between">
                  <span className="icon-tile">
                    <Target className="size-5" />
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {Math.round((g.amount / g.target) * 100)}% complete
                  </span>
                </div>
                <h2 className="text-lg font-semibold">{g.name}</h2>
                <p className="money mt-4 text-2xl font-semibold">
                  {money(g.amount)}
                </p>
                <p className="muted mt-1">of {money(g.target)} target</p>
                <div className="my-5">
                  <Progress value={(g.amount / g.target) * 100} />
                </div>
                <div className="flex gap-2">
                  <Button
                    className="flex-1"
                    onClick={() =>
                      openForm(
                        'Add to savings goal',
                        `Move a demo amount into ${g.name}.`,
                        [
                          {
                            name: 'amount',
                            label: 'Amount (BDT)',
                            type: 'number',
                            max: g.target - g.amount,
                          },
                        ],
                        (v) =>
                          setGoals((all) =>
                            all.map((goal, index) =>
                              index === i
                                ? {
                                    ...goal,
                                    amount: Math.min(
                                      goal.target,
                                      goal.amount + Number(v.amount),
                                    ),
                                  }
                                : goal,
                            ),
                          ),
                      )
                    }
                  >
                    <Plus />
                    Add money
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() =>
                      openForm(
                        'Withdraw from goal',
                        `Available: ${money(g.amount)}. This is a demo transfer.`,
                        [
                          {
                            name: 'amount',
                            label: 'Amount (BDT)',
                            type: 'number',
                            max: g.amount,
                          },
                        ],
                        (v) =>
                          setGoals((all) =>
                            all.map((goal, index) =>
                              index === i
                                ? {
                                    ...goal,
                                    amount: Math.max(
                                      0,
                                      goal.amount - Number(v.amount),
                                    ),
                                  }
                                : goal,
                            ),
                          ),
                      )
                    }
                  >
                    Withdraw
                  </Button>
                </div>
              </Panel>
            ))}
          </div>
          <Panel title="Put saving on autopilot" className="mt-6">
            <div className="px-6">
              <ToggleRow
                title="Round-up savings"
                description="Round everyday payments up to the next ৳100."
                initial={false}
              />
              <ToggleRow
                title="Auto-save on payday"
                description="Set aside ৳5,000 on the first day of each month."
                initial={false}
              />
            </div>
          </Panel>
        </TabsContent>
        <TabsContent value="Deposits">
          <Panel className="p-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <span className="pill bg-secondary text-primary">
                  Sample deposit
                </span>
                <h2 className="mt-3 text-xl font-semibold">
                  6-month fixed deposit
                </h2>
                <p className="muted mt-1">
                  Partner bank product · Illustrative rate
                </p>
              </div>
              <p className="money text-3xl font-semibold">৳100,000.00</p>
            </div>
            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              {[
                ['Illustrative annual rate', '7.25%'],
                ['Maturity date', '04 April 2027'],
                ['Estimated at maturity', '৳103,625.00'],
              ].map(([l, v]) => (
                <div key={l}>
                  <p className="muted">{l}</p>
                  <p className="mt-2 font-semibold">{v}</p>
                </div>
              ))}
            </div>
            <div className="mt-6">
              <Alert>
                Deposit terms are sample content. No deposit is opened in this
                preview.
              </Alert>
            </div>
          </Panel>
        </TabsContent>
      </Tabs>
    </div>
  )
}
function InvestmentsPage() {
  const { openForm, toast } = useDemo()
  const [period, setPeriod] = useState('Month')
  const [holdings, setHoldings] = useState([
    {
      name: 'Balanced growth fund',
      amount: 86500,
      change: '+8.4%',
      risk: 'Medium risk',
    },
    {
      name: 'Government bond fund',
      amount: 65000,
      change: '+5.2%',
      risk: 'Lower risk',
    },
    {
      name: 'Equity index fund',
      amount: 32700,
      change: '+11.8%',
      risk: 'Higher risk',
    },
  ])
  return (
    <div className="page-enter">
      <Heading page="investments">
        <Button
          onClick={() =>
            openForm(
              'Investment risk assessment',
              'Choose the profile that reflects your goals. This is a demo questionnaire.',
              [
                {
                  name: 'horizon',
                  label: 'Time horizon',
                  options: ['Under 1 year', '1–3 years', 'More than 3 years'],
                },
                {
                  name: 'risk',
                  label: 'Comfort with price changes',
                  options: [
                    'Preserve capital',
                    'Accept moderate changes',
                    'Comfortable with larger changes',
                  ],
                },
              ],
            )
          }
        >
          <ShieldCheck />
          Risk profile
        </Button>
      </Heading>
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1.7fr_1fr]">
        <Panel className="p-6">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <p className="muted">Portfolio value</p>
              <p className="money mt-2 text-4xl font-semibold">
                {money(holdings.reduce((s, h) => s + h.amount, 0))}
              </p>
              <p className="mt-2 text-sm text-success">
                +৳13,842.60 (8.12%) all time
              </p>
            </div>
            <select
              aria-label="Performance period"
              className="select h-9 w-auto"
              value={period}
              onChange={(e) => setPeriod(e.target.value)}
            >
              <option>Month</option>
              <option>Week</option>
            </select>
          </div>
          <div className="mt-6">
            <CashflowChart period={period} />
          </div>
        </Panel>
        <Panel title="Your allocation">
          <div className="p-6">
            <div
              className="relative mx-auto mb-6 flex size-36 items-center justify-center rounded-full"
              style={{
                background:
                  'conic-gradient(var(--chart-1) 0% 47%, var(--chart-2) 47% 82%, var(--brand-yellow) 82% 100%)',
              }}
              role="img"
              aria-label="Portfolio allocation: balanced fund 47%, bonds 35%, equity 18%"
            >
              <span className="flex size-28 items-center justify-center rounded-full bg-card text-sm font-semibold">
                3 products
              </span>
            </div>
            {holdings.map((h) => (
              <div key={h.name} className="flex justify-between py-2 text-sm">
                <span className="text-muted-foreground">{h.name}</span>
                <span className="font-semibold">{money(h.amount)}</span>
              </div>
            ))}
          </div>
        </Panel>
      </div>
      <Panel title="Your investments" className="mt-6">
        <div className="px-6">
          {holdings.map((h, i) => (
            <div className="data-row flex-wrap" key={h.name}>
              <div className="flex items-center gap-3">
                <span className="icon-tile">
                  <TrendingUp className="size-5" />
                </span>
                <div>
                  <p className="font-semibold">{h.name}</p>
                  <p className="muted">{h.risk} · Sample product</p>
                </div>
              </div>
              <div className="flex items-center gap-5">
                <div className="text-right">
                  <p className="money font-semibold">{money(h.amount)}</p>
                  <p className="text-xs text-success">{h.change}</p>
                </div>
                <Button
                  variant="outline"
                  onClick={() =>
                    openForm(
                      'Buy investment',
                      'Review the sample fund and choose an amount. This creates a demo holding.',
                      [
                        { name: 'product', label: 'Product', value: h.name },
                        {
                          name: 'amount',
                          label: 'Investment amount (BDT)',
                          type: 'number',
                        },
                        {
                          name: 'consent',
                          label: 'Risk acknowledgment',
                          options: [
                            'I understand that investment values can fall',
                          ],
                        },
                      ],
                      (v) =>
                        setHoldings((all) =>
                          all.map((x, n) =>
                            n === i
                              ? { ...x, amount: x.amount + Number(v.amount) }
                              : x,
                          ),
                        ),
                    )
                  }
                >
                  Buy
                </Button>
                <Button
                  variant="ghost"
                  onClick={() =>
                    openForm(
                      'Sell investment',
                      `Your sample holding: ${money(h.amount)}.`,
                      [
                        {
                          name: 'amount',
                          label: 'Amount to sell (BDT)',
                          type: 'number',
                          max: h.amount,
                        },
                      ],
                      (v) => {
                        setHoldings((all) =>
                          all.map((x, n) =>
                            n === i
                              ? {
                                  ...x,
                                  amount: Math.max(
                                    0,
                                    x.amount - Number(v.amount),
                                  ),
                                }
                              : x,
                          ),
                        )
                        toast('Demo redemption submitted for review.')
                      },
                    )
                  }
                >
                  Sell
                </Button>
              </div>
            </div>
          ))}
        </div>
      </Panel>
      <div className="mt-5">
        <Alert tone="warning">
          Illustrative products and past performance. Investment values can rise
          or fall. This preview does not provide financial advice or execute
          trades.
        </Alert>
      </div>
    </div>
  )
}
function BudgetsPage() {
  const { openForm } = useDemo()
  const [budgets, setBudgets] = useState([
    { name: 'Shopping', spent: 18420, limit: 25000 },
    { name: 'Food & dining', spent: 12850, limit: 18000 },
    { name: 'Transport', spent: 6240, limit: 10000 },
    { name: 'Bills & utilities', spent: 16480, limit: 15000 },
  ])
  const [period, setPeriod] = useState('Month')
  return (
    <div className="page-enter">
      <Heading page="budgets">
        <Button
          onClick={() =>
            openForm(
              'Create budget',
              'Set a monthly spending target for a category.',
              [
                { name: 'name', label: 'Category' },
                {
                  name: 'limit',
                  label: 'Monthly budget (BDT)',
                  type: 'number',
                },
              ],
              (v) =>
                setBudgets((all) => [
                  ...all,
                  { name: v.name, limit: Number(v.limit), spent: 0 },
                ]),
            )
          }
        >
          <Plus />
          Create budget
        </Button>
      </Heading>
      <div className="mb-6 grid gap-4 sm:grid-cols-3">
        <Stat
          label="Monthly income"
          value="৳148,500"
          change="+8.2% from September"
        />
        <Stat
          label="Monthly spending"
          value={money(budgets.reduce((s, b) => s + b.spent, 0))}
        />
        <Stat
          label="Left to spend"
          value={money(
            Math.max(
              0,
              budgets.reduce((s, b) => s + b.limit - b.spent, 0),
            ),
          )}
        />
      </div>
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1.5fr_1fr]">
        <Panel title="Category budgets">
          <div className="px-6">
            {budgets.map((b, i) => (
              <div key={b.name} className="border-b py-5 last:border-0">
                <div className="mb-3 flex items-center justify-between">
                  <h2 className="font-semibold">{b.name}</h2>
                  <button
                    className="text-sm text-primary"
                    onClick={() =>
                      openForm(
                        'Edit budget',
                        `Update your ${b.name.toLowerCase()} budget.`,
                        [
                          {
                            name: 'limit',
                            label: 'Monthly limit (BDT)',
                            type: 'number',
                            value: String(b.limit),
                          },
                        ],
                        (v) =>
                          setBudgets((all) =>
                            all.map((x, n) =>
                              n === i ? { ...x, limit: Number(v.limit) } : x,
                            ),
                          ),
                      )
                    }
                  >
                    Edit
                  </button>
                </div>
                <Progress value={(b.spent / b.limit) * 100} />
                <div className="mt-2 flex justify-between text-xs">
                  <span className="text-muted-foreground">
                    {money(b.spent)} of {money(b.limit)}
                  </span>
                  <span
                    className={
                      b.spent > b.limit ? 'text-destructive' : 'text-primary'
                    }
                  >
                    {b.spent > b.limit
                      ? 'Over budget'
                      : `${Math.round((b.spent / b.limit) * 100)}% used`}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </Panel>
        <div className="space-y-6">
          <Panel className="bg-secondary p-6">
            <TrendingUp className="mb-4 size-6 text-primary" />
            <h2 className="text-lg font-semibold">
              A little insight goes a long way.
            </h2>
            <p className="muted mt-3 leading-relaxed">
              Your transport spending is 18% lower than last month. You have
              ৳3,760 left in that budget.
            </p>
            <p className="mt-4 text-sm font-semibold text-primary">
              Keep the momentum going.
            </p>
          </Panel>
          <Panel
            title="Monthly comparison"
            action={
              <select
                aria-label="Budget chart period"
                value={period}
                onChange={(e) => setPeriod(e.target.value)}
                className="rounded border bg-card px-2 py-1 text-xs"
              >
                <option>Month</option>
                <option>Week</option>
              </select>
            }
          >
            <div className="p-4">
              <CashflowChart period={period} />
            </div>
          </Panel>
        </div>
      </div>
    </div>
  )
}
function LoansPage() {
  const { openForm } = useDemo()
  const [amount, setAmount] = useState(150000)
  const [term, setTerm] = useState(12)
  const [step, setStep] = useState(-1)
  const [uploaded, setUploaded] = useState(false)
  const monthly = (amount * (1 + (0.105 * term) / 12)) / term
  return (
    <div className="page-enter">
      <Heading page="loans" />
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1.4fr_1fr]">
        <Panel className="p-7">
          <span className="pill bg-secondary text-primary">
            Partner financing · Demo offer
          </span>
          <h2 className="mt-4 text-2xl font-semibold">
            Make room for your next big plan.
          </h2>
          <p className="muted mt-3 leading-relaxed">
            Explore a personal loan or working capital for a business purchase.
            Applications are reviewed by a lending partner.
          </p>
          <div className="my-6 grid grid-cols-2 gap-4">
            <div>
              <p className="muted">Sample eligible amount</p>
              <p className="money mt-1 text-3xl font-semibold">৳300,000</p>
            </div>
            <div>
              <p className="muted">Illustrative annual rate</p>
              <p className="money mt-1 text-3xl font-semibold">10.5%</p>
            </div>
          </div>
          <Button onClick={() => setStep(0)}>
            Explore application <ArrowRight />
          </Button>
          <div className="mt-6">
            <Alert>
              Eligibility and rates are illustrative. No credit check or
              application is sent to a lender.
            </Alert>
          </div>
        </Panel>
        <Panel title="Repayment calculator">
          <div className="space-y-5 p-6">
            <Field label={`Loan amount · ${money(amount)}`}>
              <input
                type="range"
                aria-label="Loan amount"
                min={25000}
                max={300000}
                step={5000}
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
                className="accent-primary"
              />
            </Field>
            <Field label="Repayment period">
              <select
                className="select"
                value={term}
                onChange={(e) => setTerm(Number(e.target.value))}
              >
                {[6, 12, 18, 24].map((v) => (
                  <option value={v} key={v}>
                    {v} months
                  </option>
                ))}
              </select>
            </Field>
            <div className="rounded-xl bg-secondary p-4">
              <p className="muted">Illustrative monthly payment</p>
              <p className="money mt-2 text-3xl font-semibold text-primary">
                {money(monthly)}
              </p>
              <p className="mt-2 text-xs text-muted-foreground">
                Simple-interest illustration · Fees excluded
              </p>
            </div>
          </div>
        </Panel>
      </div>
      {step >= 0 && (
        <Panel className="mt-6 p-6">
          <div className="mb-5 flex justify-between">
            <h2 className="text-xl font-semibold">
              {
                [
                  'Personal & income details',
                  'Supporting documents',
                  'Review application',
                  'Application submitted',
                ][step]
              }
            </h2>
            <span className="muted">Step {Math.min(step + 1, 3)} of 3</span>
          </div>
          {step === 0 && (
            <form
              className="grid grid-cols-1 gap-4 sm:grid-cols-2"
              onSubmit={(e) => {
                e.preventDefault()
                setStep(1)
              }}
            >
              <Field label="Full name">
                <Input name="name" defaultValue="Akram Hossain" required />
              </Field>
              <Field label="Occupation">
                <select className="select">
                  <option>Business owner</option>
                  <option>Employed</option>
                  <option>Self-employed</option>
                </select>
              </Field>
              <Field label="Monthly income (BDT)">
                <Input type="number" min="1" defaultValue="148500" required />
              </Field>
              <Field label="Loan purpose">
                <select className="select">
                  <option>Working capital</option>
                  <option>Personal expenses</option>
                  <option>Home improvement</option>
                  <option>Education</option>
                </select>
              </Field>
              <Button type="submit" className="sm:col-span-2">
                Continue <ArrowRight />
              </Button>
            </form>
          )}
          {step === 1 && (
            <div className="space-y-5">
              <FileUpload
                label="Upload income proof or bank statement"
                onFile={(v) => setUploaded(!!v)}
              />
              <div className="flex gap-2">
                <Button variant="outline" onClick={() => setStep(0)}>
                  Back
                </Button>
                <Button disabled={!uploaded} onClick={() => setStep(2)}>
                  Review application
                </Button>
              </div>
            </div>
          )}
          {step === 2 && (
            <div className="space-y-5">
              <div className="grid grid-cols-1 gap-4 rounded-xl bg-muted p-5 sm:grid-cols-3">
                {[
                  ['Amount', money(amount)],
                  ['Term', `${term} months`],
                  ['Monthly repayment', money(monthly)],
                ].map(([k, v]) => (
                  <div key={k}>
                    <p className="muted">{k}</p>
                    <p className="mt-1 font-semibold">{v}</p>
                  </div>
                ))}
              </div>
              <Alert>
                This submits a preview application only. Your documents remain
                in the browser.
              </Alert>
              <Button onClick={() => setStep(3)}>
                Submit demo application <ArrowRight />
              </Button>
            </div>
          )}
          {step === 3 && (
            <div className="py-8 text-center">
              <CheckCircle2 className="mx-auto mb-4 size-12 text-success" />
              <h3 className="text-xl font-semibold">
                Your demo application is in review
              </h3>
              <p className="muted mt-2">
                Reference LN-2841 · We’ll show the next update here.
              </p>
              <div className="mt-4">
                <StatusBadge status="In review" />
              </div>
              <Button
                variant="outline"
                className="mt-5"
                onClick={() => setStep(-1)}
              >
                Back to financing
              </Button>
            </div>
          )}
        </Panel>
      )}
      <Panel title="Repayment schedule · Sample active loan" className="mt-6">
        <div className="px-6">
          {[
            ['07 October 2026', 'Due soon'],
            ['07 November 2026', 'Upcoming'],
            ['07 December 2026', 'Upcoming'],
          ].map(([date, status]) => (
            <div
              className="data-row flex-col items-stretch gap-3 sm:flex-row sm:items-center"
              key={date}
            >
              <div>
                <p className="font-semibold">{date}</p>
                <p className="muted">{status}</p>
              </div>
              <span className="money">৳8,420.00</span>
              <Button
                variant="outline"
                onClick={() =>
                  openForm(
                    'Pay loan installment',
                    'Review and authorize this demo repayment.',
                    [
                      {
                        name: 'amount',
                        label: 'Repayment amount (BDT)',
                        type: 'number',
                        value: '8420',
                      },
                    ],
                  )
                }
              >
                Pay installment
              </Button>
            </div>
          ))}
        </div>
      </Panel>
    </div>
  )
}
function CreditPage() {
  const { openForm } = useDemo()
  return (
    <div className="page-enter">
      <Heading page="credit" />
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1.4fr_1fr]">
        <Panel className="p-7">
          <span className="eyebrow">YOUR CREDIT AT A GLANCE</span>
          <div className="my-6">
            <p className="muted">Available credit</p>
            <p className="money mt-2 text-4xl font-semibold">৳74,500.00</p>
            <p className="muted mt-2">of ৳100,000.00 illustrative limit</p>
          </div>
          <Progress value={25.5} />
          <div className="mt-6 flex justify-between text-sm">
            <span>Outstanding balance</span>
            <span className="font-semibold">৳25,500.00</span>
          </div>
          <Button
            className="mt-6"
            onClick={() =>
              openForm(
                'Pay credit balance',
                'Review your demo repayment before confirming.',
                [
                  {
                    name: 'amount',
                    label: 'Repayment amount (BDT)',
                    type: 'number',
                    value: '25500',
                  },
                ],
              )
            }
          >
            Make a repayment <ArrowRight />
          </Button>
        </Panel>
        <Panel className="p-6">
          <ShieldCheck className="mb-4 size-7 text-success" />
          <h2 className="text-xl font-semibold">Stay on top of your credit</h2>
          <p className="muted mt-3">
            2 payments on time. Your next installment is due on 12 October.
          </p>
          <div className="mt-5 rounded-lg bg-success-soft p-4">
            <p className="text-sm font-semibold text-success">
              Healthy payment history
            </p>
            <p className="mt-1 text-xs text-success">
              Sample insight · No real credit score retrieved
            </p>
          </div>
        </Panel>
      </div>
      <Panel title="Your installment plans" className="mt-6">
        <div className="px-6">
          {[
            ['Daraz · Laptop purchase', 18500, 6167, 3],
            ['Unimart · Home essentials', 7000, 2334, 3],
          ].map(([name, total, monthly, term]) => (
            <div className="data-row flex-wrap" key={name}>
              <div className="flex items-center gap-3">
                <span className="icon-tile">
                  <CreditCard className="size-5" />
                </span>
                <div>
                  <p className="font-semibold">{name}</p>
                  <p className="muted">{term} monthly installments · 1 paid</p>
                </div>
              </div>
              <div className="flex items-center gap-5">
                <div>
                  <p className="money font-semibold">
                    {money(Number(monthly))} / month
                  </p>
                  <p className="muted">Total {money(Number(total))}</p>
                </div>
                <Button
                  variant="outline"
                  onClick={() =>
                    openForm(
                      'Pay installment',
                      'Confirm your demo installment payment.',
                      [
                        {
                          name: 'amount',
                          label: 'Amount (BDT)',
                          type: 'number',
                          value: String(monthly),
                        },
                      ],
                    )
                  }
                >
                  Pay now
                </Button>
              </div>
            </div>
          ))}
        </div>
      </Panel>
      <div className="mt-6">
        <Alert>
          Credit and buy-now-pay-later products are UI previews. All limits,
          offers, and repayment terms are examples.
        </Alert>
      </div>
    </div>
  )
}
function RewardsPage() {
  const { toast, openForm } = useDemo()
  const [points, setPoints] = useState(4280)
  const [claimed, setClaimed] = useState<string[]>([])
  return (
    <div className="page-enter">
      <Heading page="rewards">
        <Button
          variant="outline"
          onClick={async () => {
            await navigator.clipboard.writeText('SETLR-AKRAM-4821')
            toast('Demo referral code copied.')
          }}
        >
          Invite a friend <Gift />
        </Button>
      </Heading>
      <div className="mb-6 grid gap-5 sm:grid-cols-2">
        <Panel className="balance-card brand-orbits relative overflow-hidden p-7">
          <p className="text-sm text-white/70">Your reward points</p>
          <p className="money mt-2 text-4xl font-semibold">
            {points.toLocaleString()}
          </p>
          <p className="mt-3 text-sm text-white/70">
            +640 points earned this month
          </p>
        </Panel>
        <Panel className="bg-accent p-7">
          <p className="text-sm text-accent-foreground">Cashback earned</p>
          <p className="money mt-2 text-4xl font-semibold">৳1,842.50</p>
          <p className="mt-3 text-sm text-accent-foreground">
            Good things come from everyday spending.
          </p>
        </Panel>
      </div>
      <h2 className="mb-4 text-lg font-semibold">A little something for you</h2>
      <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
        {[
          ['Coffee on us', 'North End Coffee', 800],
          ['৳500 shopping voucher', 'Daraz', 1500],
          ['৳200 mobile recharge', 'Any operator', 600],
        ].map(([title, partner, cost]) => (
          <Panel className="p-6" key={title}>
            <span className="mb-5 flex size-12 items-center justify-center rounded-xl bg-accent">
              <Gift className="size-6 text-accent-foreground" />
            </span>
            <h3 className="text-lg font-semibold">{title}</h3>
            <p className="muted mt-1">{partner}</p>
            <p className="mt-5 font-semibold text-primary">{cost} points</p>
            <Button
              className="mt-4 w-full"
              variant="outline"
              disabled={
                claimed.includes(String(title)) || points < Number(cost)
              }
              onClick={() =>
                openForm(
                  'Redeem reward',
                  `${title} · ${cost} points. Confirm to claim a demo voucher.`,
                  [
                    {
                      name: 'reward',
                      label: 'Selected reward',
                      value: String(title),
                    },
                  ],
                  () => {
                    setPoints((p) => p - Number(cost))
                    setClaimed((all) => [...all, String(title)])
                    toast('Demo voucher claimed. Code: SETLR-PREVIEW.')
                  },
                )
              }
            >
              {claimed.includes(String(title)) ? 'Claimed' : 'Redeem reward'}
            </Button>
          </Panel>
        ))}
      </div>
      <Panel title="Rewards activity" className="mt-6">
        <div className="px-6">
          <div className="data-row">
            <span>October card spending bonus</span>
            <span className="font-semibold text-success">+640 points</span>
          </div>
          <div className="data-row">
            <span>September cashback credited</span>
            <span className="font-semibold text-success">+৳842.50</span>
          </div>
        </div>
      </Panel>
    </div>
  )
}
function NotificationsPage() {
  const { notices, setNotices } = useDemo()
  const [filter, setFilter] = useState('All')
  const filtered = notices.filter(
    (n) =>
      filter === 'All' ||
      (filter === 'Unread' && !n.read) ||
      (filter === 'Security' && n.type === 'Security'),
  )
  return (
    <div className="page-enter">
      <Heading page="notifications">
        <Button
          variant="outline"
          onClick={() =>
            setNotices((all) => all.map((n) => ({ ...n, read: true })))
          }
        >
          <Check />
          Mark all as read
        </Button>
      </Heading>
      <Tabs value={filter} onValueChange={(v) => setFilter(String(v))}>
        <TabsList className="mb-5">
          {['All', 'Unread', 'Security'].map((v) => (
            <TabsTrigger value={v} key={v}>
              {v}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1.8fr_1fr]">
        <Panel>
          {filtered.length ? (
            filtered.map((n) => (
              <button
                key={n.title}
                className={cn(
                  'flex w-full items-start gap-4 border-b p-6 text-left last:border-0 hover:bg-muted',
                  !n.read && 'bg-secondary/30',
                )}
                onClick={() =>
                  setNotices((all) =>
                    all.map((x) =>
                      x.title === n.title ? { ...x, read: true } : x,
                    ),
                  )
                }
              >
                <span className="icon-tile">
                  {n.type === 'Security' ? (
                    <ShieldCheck className="size-5" />
                  ) : (
                    <Bell className="size-5" />
                  )}
                </span>
                <span className="flex-1">
                  <span className="block font-semibold">{n.title}</span>
                  <span className="mt-1 block text-sm text-muted-foreground">
                    {n.detail}
                  </span>
                  <span className="mt-2 block text-xs text-muted-foreground">
                    {n.time}
                  </span>
                </span>
                {!n.read && (
                  <span className="mt-2 size-2 rounded-full bg-primary" />
                )}
              </button>
            ))
          ) : (
            <EmptyState
              title="You’re all caught up"
              description="New updates will appear here when there’s something to share."
            />
          )}
        </Panel>
        <Panel title="Notification preferences">
          <div className="px-5">
            <ToggleRow
              title="Transaction alerts"
              description="Payments and balance updates"
            />
            <ToggleRow
              title="Security updates"
              description="New sign-ins and account changes"
            />
            <ToggleRow
              title="Bill reminders"
              description="A heads-up before payments are due"
            />
            <ToggleRow
              title="Offers & rewards"
              description="Occasional things you might like"
              initial={false}
            />
          </div>
        </Panel>
      </div>
    </div>
  )
}
function ProfilePage() {
  const { openForm } = useDemo()
  const [profile, setProfile] = useState({
    name: 'Akram Hossain',
    email: 'akram.hossain@email.com',
    phone: '+880 1714 582 906',
    address: 'House 18, Road 7, Dhanmondi, Dhaka 1209',
  })
  return (
    <div className="page-enter">
      <Heading page="profile">
        <Button
          variant="outline"
          onClick={() =>
            openForm(
              'Edit profile',
              'Update your personal information for this session.',
              [
                { name: 'name', label: 'Full name', value: profile.name },
                {
                  name: 'email',
                  label: 'Email address',
                  type: 'email',
                  value: profile.email,
                },
                { name: 'phone', label: 'Phone number', value: profile.phone },
                { name: 'address', label: 'Address', value: profile.address },
              ],
              (v) => setProfile(v as typeof profile),
            )
          }
        >
          Edit profile
        </Button>
      </Heading>
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_1.6fr]">
        <Panel className="p-7 text-center">
          <Avatar
            initials="AH"
            className="mx-auto mb-4 size-20 rounded-full bg-accent text-2xl text-accent-foreground"
          />
          <h2 className="text-xl font-semibold">{profile.name}</h2>
          <p className="muted mt-1">Member since February 2026</p>
          <div className="mt-4">
            <StatusBadge status="Verified" />
          </div>
          <p className="mt-6 text-xs text-muted-foreground">
            Setlr ID · STL-884021
          </p>
          <AppLink page="verification">
            <Button className="mt-4 w-full" variant="outline">
              View verification <ShieldCheck />
            </Button>
          </AppLink>
          <div className="mt-5">
            <FileUpload label="Change profile photo" />
          </div>
        </Panel>
        <div className="space-y-6">
          <Panel title="Personal information">
            <div className="px-6">
              {[
                ['Full name', profile.name],
                ['Email address', profile.email],
                ['Phone number', profile.phone],
                ['Date of birth', '18 March 1994'],
                ['Address', profile.address],
              ].map(([l, v]) => (
                <div className="data-row text-sm" key={l}>
                  <span className="text-muted-foreground">{l}</span>
                  <span className="max-w-[65%] text-right font-medium">
                    {v}
                  </span>
                </div>
              ))}
            </div>
          </Panel>
          <Panel title="Business profile">
            <div className="p-6">
              <div className="flex items-center gap-3">
                <Avatar initials="NT" />
                <div>
                  <h3 className="font-semibold">Nuport Trading</h3>
                  <p className="muted">Import & trading · Business workspace</p>
                </div>
              </div>
              <AppLink page="business-payments">
                <Button variant="outline" className="mt-5">
                  Open business payments <ArrowRight />
                </Button>
              </AppLink>
            </div>
          </Panel>
        </div>
      </div>
    </div>
  )
}
function SecurityPage() {
  const { toast, openForm, confirm } = useDemo()
  const [devices, setDevices] = useState([
    'Chrome on macOS · Current device',
    'Setlr on iPhone 15',
  ])
  return (
    <div className="page-enter">
      <Heading page="security" />
      <Panel className="mb-6 flex items-center gap-4 bg-success-soft p-6">
        <ShieldCheck className="size-9 text-success" />
        <div>
          <h2 className="font-semibold text-success">
            Your account is well protected
          </h2>
          <p className="mt-1 text-sm text-success">
            Two-step verification is enabled. Last security check: 04 October
            2026.
          </p>
        </div>
      </Panel>
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Panel title="Sign-in & authentication">
          <div className="px-6">
            <AppLink page="reset-password" className="data-row">
              <span>
                <p className="font-medium">Change password</p>
                <p className="muted">Last changed 18 September 2026</p>
              </span>
              <ChevronRight className="size-4" />
            </AppLink>
            <AppLink page="pin-setup" className="data-row">
              <span>
                <p className="font-medium">Transaction PIN</p>
                <p className="muted">A separate PIN for moving money</p>
              </span>
              <ChevronRight className="size-4" />
            </AppLink>
            <ToggleRow
              title="Two-factor authentication"
              description="Require a code for new sign-ins"
            />
            <ToggleRow
              title="Biometric sign-in"
              description="Face ID or fingerprint on supported devices"
              initial={false}
              onChange={() =>
                toast('Biometric preference updated in this preview.')
              }
            />
          </div>
        </Panel>
        <Panel title="Trusted devices">
          <div className="px-6">
            {devices.map((device, i) => (
              <div className="data-row" key={device}>
                <span className="flex items-center gap-3">
                  {i === 0 ? (
                    <Laptop className="size-5 text-primary" />
                  ) : (
                    <Smartphone className="size-5 text-primary" />
                  )}
                  <span>
                    <p className="text-sm font-medium">{device}</p>
                    <p className="text-xs text-muted-foreground">
                      Dhaka, Bangladesh · Active today
                    </p>
                  </span>
                </span>
                {i === 0 ? (
                  <span className="pill bg-success-soft text-success">
                    Current
                  </span>
                ) : (
                  <button
                    className="p-2 text-destructive"
                    aria-label={`Remove ${device}`}
                    onClick={() =>
                      confirm(
                        'Remove trusted device?',
                        'This demo device will be signed out of the preview list.',
                        () =>
                          setDevices((all) => all.filter((d) => d !== device)),
                      )
                    }
                  >
                    <Trash2 className="size-4" />
                  </button>
                )}
              </div>
            ))}
            <Button
              variant="outline"
              className="my-5 w-full"
              onClick={() =>
                confirm(
                  'Sign out other sessions?',
                  'All other demo sessions will be removed.',
                  () => {
                    setDevices((all) => all.slice(0, 1))
                    toast('Other demo sessions signed out.')
                  },
                )
              }
            >
              Sign out other sessions
            </Button>
          </div>
        </Panel>
        <Panel title="Payment limits">
          <div className="px-6">
            <div className="data-row">
              <span>Daily limit</span>
              <span className="money font-semibold">৳500,000.00</span>
            </div>
            <div className="data-row">
              <span>Monthly limit</span>
              <span className="money font-semibold">৳2,000,000.00</span>
            </div>
            <Button
              className="my-5"
              variant="outline"
              onClick={() =>
                openForm(
                  'Request a limit change',
                  'Choose the limit to request for this demo account.',
                  [
                    {
                      name: 'limit',
                      label: 'Requested daily limit (BDT)',
                      type: 'number',
                    },
                    { name: 'reason', label: 'Reason for change' },
                  ],
                )
              }
            >
              Request limit change
            </Button>
          </div>
        </Panel>
        <Panel title="Recent sign-in activity">
          <div className="px-6">
            {[
              ['Today, 09:02 AM', 'Chrome · macOS · Dhaka'],
              ['03 Oct, 07:45 PM', 'iPhone · Dhaka'],
              ['01 Oct, 08:20 AM', 'Chrome · macOS · Dhaka'],
            ].map(([t, d]) => (
              <div className="data-row" key={t}>
                <span>
                  <p className="text-sm font-medium">{t}</p>
                  <p className="muted">{d}</p>
                </span>
                <CheckCircle2 className="size-4 text-success" />
              </div>
            ))}
          </div>
        </Panel>
      </div>
    </div>
  )
}
function SettingsPage() {
  const { dark, setDark, reducedMotion, setReducedMotion, toast, confirm } =
    useDemo()
  return (
    <div className="page-enter">
      <Heading page="settings" />
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1.5fr_1fr]">
        <div className="space-y-6">
          <Panel title="Preferences">
            <div className="space-y-5 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Dark appearance</p>
                  <p className="muted">A calmer view for evenings</p>
                </div>
                <Switch
                  checked={dark}
                  onCheckedChange={setDark}
                  aria-label="Dark appearance"
                />
              </div>
              <Field label="Display currency">
                <select
                  className="select"
                  onChange={() =>
                    toast('Display currency preference saved for this preview.')
                  }
                >
                  <option>BDT · Bangladeshi Taka</option>
                  <option>CNY · Chinese Yuan</option>
                  <option>USD · US Dollar</option>
                </select>
              </Field>
              <Field label="Language preference">
                <select
                  className="select"
                  onChange={() =>
                    toast(
                      'Language preference saved. This design preview is in English.',
                    )
                  }
                >
                  <option>English</option>
                  <option>বাংলা</option>
                  <option>中文</option>
                </select>
              </Field>
            </div>
          </Panel>
          <Panel title="Privacy & communication">
            <div className="px-6">
              <ToggleRow
                title="Product updates"
                description="Email me about new features"
                initial={false}
              />
              <ToggleRow
                title="Personalized offers"
                description="Use demo spending categories to suggest offers"
                initial={false}
              />
              <ToggleRow
                title="Reduce animations"
                description="Your system motion preference is always respected"
                initial={reducedMotion}
                onChange={setReducedMotion}
              />
            </div>
          </Panel>
        </div>
        <div className="space-y-6">
          <Panel title="Your account">
            <div className="px-6">
              {[
                ['profile', 'Personal information'],
                ['security', 'Security & devices'],
                ['notifications', 'Notification preferences'],
                ['legal', 'Terms & privacy'],
              ].map(([p, l]) => (
                <AppLink key={p} page={p} className="data-row text-sm">
                  <span>{l}</span>
                  <ChevronRight className="size-4" />
                </AppLink>
              ))}
            </div>
          </Panel>
          <Panel title="Account management">
            <div className="px-6">
              <button
                className="data-row w-full text-left text-sm"
                onClick={() =>
                  confirm(
                    'Freeze demo account?',
                    'This shows the restricted-account state. No real account is affected.',
                    () =>
                      toast(
                        'Demo account frozen. Contact support to restore access.',
                      ),
                  )
                }
              >
                Freeze account <Snowflake className="size-4" />
              </button>
              <button
                className="data-row w-full text-left text-sm text-destructive"
                onClick={() =>
                  confirm(
                    'Close demo account?',
                    'This preview has no real account or stored funds. Closing ends the demo session.',
                    () => {
                      window.location.href = '/login'
                    },
                  )
                }
              >
                Close account <Trash2 className="size-4" />
              </button>
              <AppLink page="login" className="data-row text-sm">
                Log out <ArrowRight className="size-4" />
              </AppLink>
            </div>
          </Panel>
          <p className="px-2 text-xs text-muted-foreground">
            Setlr UI preview · All data is illustrative.
          </p>
        </div>
      </div>
    </div>
  )
}
function SupportPage() {
  const { openForm, toast } = useDemo()
  const [search, setSearch] = useState('')
  const [messages, setMessages] = useState([
    'Hi Akram. How can we help you today?',
  ])
  const [draft, setDraft] = useState('')
  const [chat, setChat] = useState(false)
  const faqs = [
    [
      'How do I add money?',
      'Open Wallets, choose Add money, select a linked bank or card, then review and confirm the amount.',
    ],
    [
      'How long does a supplier payment take?',
      'The demo uses a sample 1–2 business day settlement window. A real payment’s timing would depend on bank review, documents, and corridor availability.',
    ],
    [
      'What happens if a payment fails?',
      'Check the transaction details. In this preview a failed payment does not deduct funds. You can retry or report a problem.',
    ],
    [
      'How can I freeze my card?',
      'Open Cards and choose Freeze card. You can unfreeze it from the same screen.',
    ],
    [
      'How do I verify my identity?',
      'Open Profile, then View verification. Complete your details, upload a document, and finish the selfie preview.',
    ],
  ]
  return (
    <div className="page-enter">
      <Heading page="support">
        <Button
          onClick={() =>
            openForm(
              'Create support ticket',
              'Describe your issue. No message is sent outside this preview.',
              [
                {
                  name: 'topic',
                  label: 'Topic',
                  options: [
                    'Payment issue',
                    'Account access',
                    'Cards',
                    'Verification',
                    'Other',
                  ],
                },
                { name: 'subject', label: 'Subject' },
                { name: 'description', label: 'How can we help?' },
              ],
              () => toast('Demo ticket created. Reference SUP-2814.'),
            )
          }
        >
          <Plus />
          Create ticket
        </Button>
      </Heading>
      <Panel className="mb-6 bg-secondary p-8">
        <h2 className="text-2xl font-semibold">Let’s find your answer.</h2>
        <div className="relative mt-5 max-w-xl">
          <Search className="absolute top-3.5 left-3 size-4 text-muted-foreground" />
          <Input
            className="bg-card pl-9"
            aria-label="Search help articles"
            placeholder="Search payments, cards, account access..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </Panel>
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1.6fr_1fr]">
        <Panel title="Common questions">
          <div className="px-6">
            {faqs
              .filter(([q, a]) =>
                `${q} ${a}`.toLowerCase().includes(search.toLowerCase()),
              )
              .map(([q, a]) => (
                <details key={q} className="border-b py-5 last:border-0">
                  <summary className="font-semibold">{q}</summary>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {a}
                  </p>
                </details>
              ))}
            {faqs.every(
              ([q, a]) =>
                !`${q} ${a}`.toLowerCase().includes(search.toLowerCase()),
            ) && (
              <EmptyState
                title="No matching articles"
                description="Try a simpler search or create a support ticket."
              />
            )}
          </div>
        </Panel>
        <div className="space-y-5">
          <Panel className="p-6">
            <MessageCircle className="mb-4 size-6 text-primary" />
            <h2 className="text-lg font-semibold">Talk to us</h2>
            <p className="muted mt-2">
              Explore the support conversation preview.
            </p>
            <Button className="mt-5 w-full" onClick={() => setChat(!chat)}>
              {chat ? 'Close chat' : 'Open chat preview'}
            </Button>
            {chat && (
              <div className="mt-5 space-y-3">
                {messages.map((m, i) => (
                  <p
                    key={`${m}-${i}`}
                    className={cn(
                      'rounded-lg p-3 text-sm',
                      i % 2 ? 'bg-primary text-primary-foreground' : 'bg-muted',
                    )}
                  >
                    {m}
                  </p>
                ))}
                <form
                  className="flex gap-2"
                  onSubmit={(e) => {
                    e.preventDefault()
                    if (!draft.trim()) return
                    setMessages((all) => [
                      ...all,
                      draft,
                      'Thanks. This is a local chat preview. For this issue, the payment details screen and Help Center are a good place to start.',
                    ])
                    setDraft('')
                  }}
                >
                  <Input
                    aria-label="Chat message"
                    placeholder="Write a message..."
                    value={draft}
                    onChange={(e) => setDraft(e.target.value)}
                  />
                  <Button type="submit" aria-label="Send demo chat message">
                    <ArrowUpRight />
                  </Button>
                </form>
              </div>
            )}
          </Panel>
          <Panel className="p-6">
            <ShieldCheck className="mb-4 size-6 text-destructive" />
            <h2 className="text-lg font-semibold">
              Something doesn’t feel right?
            </h2>
            <p className="muted mt-2">
              Freeze your card or report suspicious activity.
            </p>
            <AppLink page="security">
              <Button variant="outline" className="mt-5 w-full">
                Protect my account
              </Button>
            </AppLink>
          </Panel>
        </div>
      </div>
      <Panel title="Your support tickets" className="mt-6">
        <div className="data-row mx-6">
          <span>
            <p className="font-semibold">SUP-2746 · Payment receipt request</p>
            <p className="muted">Updated 02 October 2026</p>
          </span>
          <StatusBadge status="Completed" />
        </div>
      </Panel>
    </div>
  )
}
function DisputesPage() {
  const { activity, openForm } = useDemo()
  const [cases, setCases] = useState<
    Array<{
      id: string
      name: string
      amount: number
      status: Status | 'In review'
      detail: string
    }>
  >([
    {
      id: 'DSP-482',
      name: 'Pathao · Duplicate payment',
      amount: 460,
      status: 'Refunded',
      detail: 'Refund credited on 01 October 2026',
    },
  ])
  return (
    <div className="page-enter">
      <Heading page="disputes">
        <Button
          onClick={() =>
            openForm(
              'Raise a dispute',
              'Choose a payment and tell us what happened. This creates a demo case.',
              [
                {
                  name: 'transaction',
                  label: 'Transaction',
                  options: activity.map((t) => `${t.id} · ${t.name}`),
                },
                {
                  name: 'reason',
                  label: 'Reason',
                  options: [
                    'Payment not received',
                    'Duplicate payment',
                    'Incorrect amount',
                    'Refund requested',
                    'Unrecognized payment',
                  ],
                },
                { name: 'description', label: 'Description' },
                {
                  name: 'evidence',
                  label: 'Evidence (optional)',
                  type: 'file',
                  optional: true,
                },
              ],
              (v) =>
                setCases((all) => [
                  {
                    id: `DSP-${482 + all.length}`,
                    name: `${v.transaction} · ${v.reason}`,
                    amount: 0,
                    status: 'In review',
                    detail: 'Case submitted · Awaiting review',
                  },
                  ...all,
                ]),
            )
          }
        >
          <Plus />
          Raise dispute
        </Button>
      </Heading>
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1.7fr_1fr]">
        <Panel title="Your cases">
          <div className="px-6">
            {cases.map((c) => (
              <div className="border-b py-6 last:border-0" key={c.id}>
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <span className="text-xs text-muted-foreground">
                      {c.id}
                    </span>
                    <h2 className="mt-1 font-semibold">{c.name}</h2>
                    <p className="muted mt-2">{c.detail}</p>
                  </div>
                  <StatusBadge status={c.status} />
                </div>
                <div className="mt-5 flex gap-2">
                  {[
                    'Submitted',
                    'Reviewed',
                    c.status === 'Refunded' ? 'Refunded' : 'Resolution pending',
                  ].map((s, i) => (
                    <span
                      key={s}
                      className={cn(
                        'flex flex-1 items-center gap-2 text-xs',
                        i < 2 || c.status === 'Refunded'
                          ? 'text-success'
                          : 'text-muted-foreground',
                      )}
                    >
                      <span className="flex size-5 items-center justify-center rounded-full bg-muted">
                        <Check className="size-3" />
                      </span>
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Panel>
        <Panel className="p-6">
          <FileCheck2 className="mb-4 size-7 text-primary" />
          <h2 className="text-lg font-semibold">We’ll keep you informed.</h2>
          <p className="muted mt-3 leading-relaxed">
            A dispute begins with the transaction reference, a clear
            description, and any supporting documents. You can follow each step
            here.
          </p>
          <p className="muted mt-3">
            Resolution times vary by payment type and partner. The statuses in
            this preview are examples.
          </p>
          <AppLink page="support">
            <Button variant="outline" className="mt-5 w-full">
              Contact support
            </Button>
          </AppLink>
        </Panel>
      </div>
    </div>
  )
}
function LegalPage() {
  const [tab, setTab] = useState('Terms & conditions')
  const { toast } = useDemo()
  const sections: Record<string, [string, string][]> = {
    'Terms & conditions': [
      [
        'Using this preview',
        'Setlr is presented here as a frontend design prototype. Balances, cards, recipients, fees, quotes, and transaction results are illustrative. No payment or financial service is provided by this preview.',
      ],
      [
        'Your account and security',
        'The production policy would describe identity checks, access requirements, credential protection, account limits, and user responsibilities. Never share a transaction PIN or OTP.',
      ],
      [
        'Payments and fees',
        'A production payment would show the recipient, fees, bank quote where relevant, and expected settlement timing before authorization. Partner review and corridor availability may affect settlement.',
      ],
    ],
    'Privacy policy': [
      [
        'Your information',
        'This UI prototype uses local sample data. Entered form values are held in the preview session; theme preferences and state-preview choices may be stored in your browser.',
      ],
      [
        'Documents and identity',
        'Uploaded files in this preview are used only to display their filenames. They are not sent to a service or processed for identity verification.',
      ],
      [
        'Your choices',
        'The production policy would explain access, correction, deletion, retention, and communication choices in detail.',
      ],
    ],
    'Fees & charges': [
      [
        'Domestic payments',
        'Sample fee: ৳15. Money added and mobile recharge show no fee in this design.',
      ],
      [
        'Supplier payments',
        'Sample platform fee: ৳250. The illustrative exchange rate is displayed separately during review.',
      ],
      [
        'Other products',
        'Card, loan, deposit, and investment terms are examples. Actual terms would require confirmation from the relevant partner.',
      ],
    ],
    'AML & KYC': [
      [
        'Identity verification',
        'Personal and business verification screens illustrate document collection, consent, status tracking, and resubmission.',
      ],
      [
        'Business payment checks',
        'Supplier payments include trade document review and settlement tracking. The business-payment design follows the bank-mediated workflow described in the project requirements.',
      ],
      [
        'Regulatory information',
        'This design does not claim that Setlr is licensed, approved, or operational. Production licensing, safeguarding, complaint-handling, and partner disclosures require confirmed information.',
      ],
    ],
  }
  return (
    <div className="page-enter">
      <Heading page="legal" />
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[240px_1fr]">
        <Panel className="h-fit p-3">
          {Object.keys(sections).map((s) => (
            <button
              className={cn('nav-item w-full text-left', s === tab && 'active')}
              onClick={() => setTab(s)}
              key={s}
            >
              <FileText className="size-4" />
              {s}
            </button>
          ))}
          <button
            className={cn(
              'nav-item w-full text-left',
              tab === 'Consent management' && 'active',
            )}
            onClick={() => setTab('Consent management')}
          >
            <ShieldCheck className="size-4" />
            Consent management
          </button>
        </Panel>
        <Panel className="p-7 sm:p-9">
          <span className="pill bg-warning-soft text-warning">
            Draft policy · Design preview
          </span>
          <h2 className="mt-5 text-2xl font-semibold">{tab}</h2>
          <p className="muted mt-2">Updated 04 October 2026 · Sample content</p>
          {tab === 'Consent management' ? (
            <div className="mt-6">
              <ToggleRow
                title="Essential account communications"
                description="Security and transaction messages"
              />
              <ToggleRow
                title="Product analytics consent"
                description="Optional improvement insights"
                initial={false}
                onChange={() => toast('Demo consent preference updated.')}
              />
              <ToggleRow
                title="Marketing consent"
                description="Optional offers and announcements"
                initial={false}
              />
            </div>
          ) : (
            <div className="mt-8 space-y-7">
              {sections[tab].map(([h, p], i) => (
                <section key={h}>
                  <h3 className="text-lg font-semibold">
                    {i + 1}. {h}
                  </h3>
                  <p className="mt-3 max-w-[70ch] text-sm leading-7 text-muted-foreground">
                    {p}
                  </p>
                </section>
              ))}
            </div>
          )}
        </Panel>
      </div>
    </div>
  )
}
function StatementsPage() {
  const { activity, toast } = useDemo()
  const [currency, setCurrency] = useState('All currencies')
  const [start, setStart] = useState('2026-10-01')
  const [end, setEnd] = useState('2026-10-31')
  const [generated, setGenerated] = useState(false)
  const [error, setError] = useState('')
  const items = activity.filter(
    (t) =>
      (currency === 'All currencies' || t.currency === currency) &&
      `2026-10-${t.date.slice(0, 2)}` >= start &&
      `2026-10-${t.date.slice(0, 2)}` <= end,
  )
  return (
    <div className="page-enter">
      <Heading page="statements" />
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_1.5fr]">
        <Panel title="Create statement">
          <form
            className="space-y-5 p-6"
            onSubmit={(e) => {
              e.preventDefault()
              if (start > end) {
                setError('The end date must be after the start date.')
                return
              }
              setError('')
              setGenerated(true)
            }}
          >
            <Field label="Wallet">
              <select
                className="select"
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
              >
                {['All currencies', 'BDT', 'CNY', 'USD'].map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </select>
            </Field>
            <div className="grid grid-cols-2 gap-4">
              <Field label="From">
                <Input
                  type="date"
                  value={start}
                  required
                  onChange={(e) => setStart(e.target.value)}
                />
              </Field>
              <Field label="To">
                <Input
                  type="date"
                  value={end}
                  required
                  onChange={(e) => setEnd(e.target.value)}
                />
              </Field>
            </div>
            {error && <Alert tone="error">{error}</Alert>}
            <Button type="submit" className="w-full">
              <FileText />
              Generate statement
            </Button>
          </form>
        </Panel>
        <Panel
          title={generated ? 'Your statement is ready' : 'Recent statements'}
        >
          <div className="px-6">
            {(generated ? [`${start} to ${end}`] : ['October 2026']).map(
              (m) => (
                <div className="data-row" key={m}>
                  <span className="flex items-center gap-3">
                    <span className="icon-tile">
                      <FileText className="size-5" />
                    </span>
                    <span>
                      <p className="font-semibold">{m}</p>
                      <p className="muted">
                        {currency} · Sample account activity
                      </p>
                    </span>
                  </span>
                  <Button
                    variant="outline"
                    onClick={() => downloadTransactions(items)}
                  >
                    <Download />
                    CSV
                  </Button>
                </div>
              ),
            )}
            <div className="flex flex-wrap gap-2 py-5">
              <Button
                variant="outline"
                onClick={() => downloadStatementPDF(items, start, end)}
              >
                <FileText />
                Download PDF
              </Button>
              <Button
                variant="ghost"
                onClick={() =>
                  toast('Demo email delivery queued. No email was sent.')
                }
              >
                <Mail />
                Email preview
              </Button>
            </div>
          </div>
        </Panel>
      </div>
      {generated && (
        <Panel title="Statement preview" className="mt-6">
          <Alert>
            Sample activity for the selected wallet. The date controls
            illustrate statement selection.
          </Alert>
          <TransactionTable items={items} />
        </Panel>
      )}
    </div>
  )
}
function LinkedAccountsPage() {
  const { openForm, confirm } = useDemo()
  const [accounts, setAccounts] = useState([
    { bank: 'Eastern Bank PLC', detail: 'Savings · •• 4821', default: true },
    { bank: 'BRAC Bank', detail: 'Current · •• 8072', default: false },
  ])
  return (
    <div className="page-enter">
      <Heading page="linked-accounts">
        <Button
          onClick={() =>
            openForm(
              'Link a bank account',
              'Enter details to create a local account-linking preview.',
              [
                {
                  name: 'bank',
                  label: 'Bank',
                  options: [
                    'Eastern Bank PLC',
                    'BRAC Bank',
                    'City Bank',
                    'Dutch-Bangla Bank',
                  ],
                },
                {
                  name: 'holder',
                  label: 'Account holder',
                  value: 'Akram Hossain',
                },
                { name: 'number', label: 'Account number' },
              ],
              (v) =>
                setAccounts((all) => [
                  ...all,
                  {
                    bank: v.bank,
                    detail: `Savings · •• ${v.number.slice(-4)}`,
                    default: false,
                  },
                ]),
            )
          }
        >
          <Plus />
          Link bank account
        </Button>
      </Heading>
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        {accounts.map((a, i) => (
          <Panel className="p-6" key={`${a.bank}-${i}`}>
            <div className="flex items-center gap-3">
              <span className="icon-tile">
                <Landmark className="size-5" />
              </span>
              <div className="flex-1">
                <h2 className="font-semibold">{a.bank}</h2>
                <p className="muted">{a.detail}</p>
              </div>
              <StatusBadge status="Verified" />
            </div>
            <div className="mt-5 flex items-center justify-between gap-2">
              {a.default ? (
                <span className="pill bg-secondary text-primary">
                  Default funding account
                </span>
              ) : (
                <button
                  className="text-sm font-semibold text-primary"
                  onClick={() =>
                    setAccounts((all) =>
                      all.map((x, n) => ({ ...x, default: n === i })),
                    )
                  }
                >
                  Set as default
                </button>
              )}
              <button
                aria-label={`Remove ${a.bank}`}
                className="p-2 text-destructive"
                onClick={() =>
                  confirm(
                    'Unlink bank account?',
                    'This removes the bank from your demo funding options.',
                    () => setAccounts((all) => all.filter((_, n) => n !== i)),
                  )
                }
              >
                <Trash2 className="size-4" />
              </button>
            </div>
          </Panel>
        ))}
      </div>
      <Panel title="Linked cards" className="mt-6">
        <div className="data-row mx-6">
          <span className="flex items-center gap-3">
            <CreditCard className="size-5 text-primary" />
            <span>
              <p className="font-semibold">Visa debit •• 4821</p>
              <p className="muted">Expires 09/29</p>
            </span>
          </span>
          <Button
            variant="outline"
            onClick={() =>
              openForm(
                'Link a card',
                'Sample card details only. Do not enter real card information.',
                [
                  { name: 'name', label: 'Card label' },
                  {
                    name: 'number',
                    label: 'Demo card number',
                    placeholder: 'Use sample numbers only',
                  },
                  { name: 'expiry', label: 'Expiry (MM/YY)' },
                ],
              )
            }
          >
            Add card
          </Button>
        </div>
      </Panel>
    </div>
  )
}
function VerificationPage() {
  const [step, setStep] = useState(0)
  const [document, setDocument] = useState('')
  const [selfie, setSelfie] = useState(false)
  const [signature, setSignature] = useState('')
  const [details, setDetails] = useState({
    name: 'Akram Hossain',
    address: 'Dhanmondi, Dhaka 1209',
  })
  const [status, setStatus] = useState<Status>('Pending')
  return (
    <div className="page-enter">
      <Heading page="verification" />
      <div className="mx-auto max-w-3xl">
        <Panel className="p-7">
          <div className="mb-7">
            <div className="mb-3 flex justify-between text-sm">
              <span className="font-semibold">
                {
                  [
                    'Get started',
                    'Personal details',
                    'Identity document',
                    'Selfie & signature',
                    'Review',
                    'Verification status',
                  ][step]
                }
              </span>
              <span className="text-muted-foreground">
                {Math.min(step + 1, 5)} of 5
              </span>
            </div>
            <Progress value={(step / 5) * 100} />
          </div>
          {step === 0 && (
            <div className="space-y-5">
              <ShieldCheck className="size-12 text-primary" />
              <h2 className="text-2xl font-semibold">
                A few details. More possibilities.
              </h2>
              <p className="muted leading-relaxed">
                Verify your identity to access higher wallet limits and
                additional features. You’ll need an NID or passport and a clear
                selfie.
              </p>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                {['Personal information', 'Government ID', 'Selfie check'].map(
                  (s) => (
                    <span
                      key={s}
                      className="rounded-xl bg-muted p-4 text-sm font-medium"
                    >
                      <CheckCircle2 className="mb-2 size-5 text-primary" />
                      {s}
                    </span>
                  ),
                )}
              </div>
              <Alert>
                This is a verification design preview. Use sample information;
                documents are not uploaded to a service.
              </Alert>
              <Button onClick={() => setStep(1)}>
                Start verification <ArrowRight />
              </Button>
            </div>
          )}
          {step === 1 && (
            <form
              className="grid grid-cols-1 gap-4 sm:grid-cols-2"
              onSubmit={(e) => {
                e.preventDefault()
                const form = new FormData(e.currentTarget)
                setDetails({
                  name: String(form.get('name')),
                  address: String(form.get('address')),
                })
                setStep(2)
              }}
            >
              <Field label="Full legal name">
                <Input name="name" defaultValue="Akram Hossain" required />
              </Field>
              <Field label="Date of birth">
                <Input
                  type="date"
                  defaultValue="1994-03-18"
                  max="2008-10-04"
                  required
                />
              </Field>
              <Field label="Nationality">
                <select className="select">
                  <option>Bangladesh</option>
                  <option>China</option>
                  <option>Other</option>
                </select>
              </Field>
              <Field label="Occupation">
                <select className="select">
                  <option>Business owner</option>
                  <option>Employed</option>
                  <option>Student</option>
                  <option>Self-employed</option>
                </select>
              </Field>
              <Field label="Source of income">
                <select className="select">
                  <option>Business income</option>
                  <option>Salary</option>
                  <option>Family support</option>
                  <option>Investments</option>
                </select>
              </Field>
              <Field label="Address">
                <Input
                  name="address"
                  defaultValue="Dhanmondi, Dhaka 1209"
                  required
                />
              </Field>
              <Button type="submit" className="sm:col-span-2">
                Continue <ArrowRight />
              </Button>
            </form>
          )}
          {step === 2 && (
            <div className="space-y-5">
              <Field label="Document type">
                <select className="select">
                  <option>National Identity Card (NID)</option>
                  <option>Passport</option>
                </select>
              </Field>
              <FileUpload
                label="Upload a clear image of your identity document"
                onFile={setDocument}
              />
              <Alert>
                Make sure all corners and text are visible. The document should
                be valid and belong to you.
              </Alert>
              <div className="flex gap-3">
                <Button variant="outline" onClick={() => setStep(1)}>
                  Back
                </Button>
                <Button disabled={!document} onClick={() => setStep(3)}>
                  Continue
                </Button>
              </div>
            </div>
          )}
          {step === 3 && (
            <div className="space-y-5">
              <div className="mx-auto flex h-52 w-44 items-center justify-center rounded-[45%] border-2 border-dashed border-primary/30 bg-secondary">
                <span className="text-center text-sm text-primary">
                  {selfie ? (
                    <>
                      <CheckCircle2 className="mx-auto mb-2 size-10" />
                      Demo selfie ready
                    </>
                  ) : (
                    <>
                      Position your face
                      <br />
                      inside the oval
                    </>
                  )}
                </span>
              </div>
              <Button
                variant="outline"
                className="w-full"
                onClick={() => setSelfie(true)}
              >
                Capture demo selfie
              </Button>
              <p className="text-center text-xs text-muted-foreground">
                Camera & liveness preview · No camera access
              </p>
              <Field label="Digital signature">
                <Input
                  placeholder="Type your full legal name"
                  value={signature}
                  onChange={(e) => setSignature(e.target.value)}
                />
              </Field>
              <div className="flex gap-3">
                <Button variant="outline" onClick={() => setStep(2)}>
                  Back
                </Button>
                <Button
                  disabled={!selfie || !signature.trim()}
                  onClick={() => setStep(4)}
                >
                  Review details
                </Button>
              </div>
            </div>
          )}
          {step === 4 && (
            <div className="space-y-5">
              {[
                ['Applicant', details.name],
                ['Identity document', document],
                ['Selfie check', 'Completed in preview'],
                ['Address', details.address],
              ].map(([l, v]) => (
                <div className="data-row" key={l}>
                  <span className="muted">{l}</span>
                  <span className="max-w-[60%] text-right font-medium">
                    {v}
                  </span>
                </div>
              ))}
              <form
                onSubmit={(e) => {
                  e.preventDefault()
                  setStep(5)
                  setStatus('Pending')
                }}
              >
                <label className="mb-5 flex items-start gap-2 text-sm">
                  <input
                    type="checkbox"
                    required
                    className="mt-1 accent-primary"
                  />
                  I confirm that the sample details are correct and consent to
                  this verification preview.
                </label>
                <Button type="submit" className="w-full">
                  Submit verification <ShieldCheck />
                </Button>
              </form>
            </div>
          )}
          {step === 5 && (
            <div className="py-6 text-center">
              <ShieldCheck
                className={cn(
                  'mx-auto mb-5 size-14',
                  status === 'Completed'
                    ? 'text-success'
                    : status === 'Failed'
                      ? 'text-destructive'
                      : 'text-primary',
                )}
              />
              <h2 className="text-2xl font-semibold">
                {status === 'Completed'
                  ? 'You’re verified'
                  : status === 'Failed'
                    ? 'We need a clearer document'
                    : 'Your details are in review'}
              </h2>
              <p className="muted mt-3">
                {status === 'Failed'
                  ? 'The document preview is too blurry. Resubmit a clear image to continue.'
                  : 'Reference KYC-2841 · Sample verification result'}
              </p>
              <div className="mt-5">
                <StatusBadge status={status} />
              </div>
              <div className="mt-7 flex flex-wrap justify-center gap-2">
                <Button
                  variant="outline"
                  onClick={() => setStatus('Completed')}
                >
                  Preview approved
                </Button>
                <Button variant="outline" onClick={() => setStatus('Failed')}>
                  Preview resubmission
                </Button>
                {status === 'Failed' && (
                  <Button onClick={() => setStep(2)}>Resubmit documents</Button>
                )}
              </div>
              <p className="mt-4 text-xs text-muted-foreground">
                Preview controls · No real identity check performed
              </p>
            </div>
          )}
        </Panel>
      </div>
    </div>
  )
}
function BusinessPage() {
  const { openForm, toast, activity } = useDemo()
  const [filter, setFilter] = useState('All invoices')
  const invoices = [
    {
      supplier: 'Shenzhen Jinhai Trading',
      invoice: 'JH-2026-084',
      amount: 12840,
      status: 'Completed' as const,
    },
    {
      supplier: 'Guangzhou Textiles Co.',
      invoice: 'GT-208',
      amount: 8560,
      status: 'Pending' as const,
    },
    {
      supplier: 'Hangzhou Woven Goods',
      invoice: 'HW-0261',
      amount: 6420,
      status: 'Pending' as const,
    },
  ]
  return (
    <div className="page-enter">
      <PageHeading
        title="Business payments"
        description="A dedicated space for suppliers, trade documents, and cross-border settlement."
      >
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={() =>
              openForm(
                'Create batch payment',
                'Upload a sample supplier-payment file for a local review preview.',
                [
                  {
                    name: 'file',
                    label: 'Supplier payment file (CSV)',
                    type: 'file',
                  },
                  {
                    name: 'reference',
                    label: 'Batch reference',
                    placeholder: 'October supplier payments',
                  },
                ],
                () =>
                  toast(
                    'Demo batch prepared. 3 supplier payments await review.',
                  ),
              )
            }
          >
            <Upload />
            Batch payment
          </Button>
          <AppLink page="supplier-payment">
            <Button>
              <Plus />
              Pay supplier
            </Button>
          </AppLink>
        </div>
      </PageHeading>
      <div className="mb-6 grid gap-5 lg:grid-cols-[1.6fr_1fr]">
        <Panel className="balance-card brand-orbits relative overflow-hidden p-7">
          <span className="text-xs tracking-wider text-white/70">
            CHINA PAYMENT WORKSPACE
          </span>
          <h2 className="mt-3 text-[28px] font-semibold">
            Trade with a clearer view.
          </h2>
          <p className="mt-2 max-w-md text-sm text-white/70">
            One place to prepare invoices, manage beneficiaries, and track
            bank-mediated CNY settlement.
          </p>
          <div className="mt-6 grid grid-cols-2 gap-6 border-t border-white/15 pt-5">
            <div>
              <p className="text-xs text-white/60">
                CNY settlement balance · Sample
              </p>
              <p className="money mt-1 text-2xl font-semibold">¥18,420.00</p>
            </div>
            <div>
              <p className="text-xs text-white/60">
                Paid to suppliers this month
              </p>
              <p className="money mt-1 text-2xl font-semibold">¥42,680.00</p>
            </div>
          </div>
        </Panel>
        <Panel className="bg-accent p-6">
          <div className="flex items-center gap-2">
            <Globe2 className="size-5 text-accent-foreground" />
            <span className="eyebrow text-accent-foreground">
              SAMPLE BANK QUOTE
            </span>
          </div>
          <div className="my-5 flex items-center justify-between">
            <span className="text-lg font-semibold">1 CNY</span>
            <ArrowLeftRight className="size-5 text-accent-foreground" />
            <span className="money text-2xl font-semibold">17.2900 BDT</span>
          </div>
          <p className="text-xs leading-relaxed text-accent-foreground">
            The quote and platform fee are reviewed separately. FX execution and
            settlement are represented through a partner bank.
          </p>
          <AppLink page="supplier-payment" className="mt-5 block">
            <Button className="w-full">
              Start a supplier payment <ArrowRight />
            </Button>
          </AppLink>
        </Panel>
      </div>
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1.8fr_1fr]">
        <Panel
          title="Invoices & supplier payments"
          action={
            <select
              aria-label="Filter business invoices"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="rounded border bg-card px-2 py-1 text-xs"
            >
              <option>All invoices</option>
              <option>Pending</option>
              <option>Completed</option>
            </select>
          }
        >
          <div className="px-6">
            {invoices
              .filter((i) => filter === 'All invoices' || i.status === filter)
              .map((i) => (
                <div className="data-row flex-wrap" key={i.invoice}>
                  <div className="flex items-center gap-3">
                    <Avatar
                      initials={i.supplier
                        .split(' ')
                        .slice(0, 2)
                        .map((x) => x[0])
                        .join('')}
                    />
                    <div>
                      <p className="font-semibold">{i.supplier}</p>
                      <p className="muted">Invoice {i.invoice} · China</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="money font-semibold">
                      {money(i.amount, 'CNY')}
                    </span>
                    <StatusBadge status={i.status} />
                  </div>
                </div>
              ))}
          </div>
          <div className="border-t p-5">
            <Button
              variant="outline"
              className="w-full"
              onClick={() =>
                openForm(
                  'Upload trade document',
                  'Add an invoice, purchase order, or shipping record to the document preview.',
                  [
                    {
                      name: 'type',
                      label: 'Document type',
                      options: [
                        'Commercial invoice',
                        'Purchase order',
                        'Packing list',
                        'Shipping document',
                        'Import declaration',
                      ],
                    },
                    { name: 'reference', label: 'Invoice reference' },
                    { name: 'file', label: 'Document', type: 'file' },
                  ],
                )
              }
            >
              <Upload />
              Upload trade document
            </Button>
          </div>
        </Panel>
        <div className="space-y-5">
          <Panel title="Approval workspace">
            <div className="p-5">
              <p className="text-sm">2 payments waiting for document review.</p>
              <div className="mt-4 space-y-3">
                {[
                  'Maker prepares payment',
                  'Checker reviews invoice & recipient',
                  'Partner bank handles settlement',
                ].map((v, i) => (
                  <div
                    key={v}
                    className="flex items-start gap-2 text-xs text-muted-foreground"
                  >
                    <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-secondary text-primary">
                      {i + 1}
                    </span>
                    {v}
                  </div>
                ))}
              </div>
              <Button
                variant="outline"
                className="mt-5 w-full"
                onClick={() =>
                  openForm(
                    'Review payment approval',
                    'Review the sample invoice and beneficiary before approving the instruction.',
                    [
                      {
                        name: 'invoice',
                        label: 'Invoice',
                        value: 'GT-208 · ¥8,560.00',
                      },
                      {
                        name: 'decision',
                        label: 'Decision',
                        options: [
                          'Approve for bank review',
                          'Request document correction',
                          'Decline instruction',
                        ],
                      },
                    ],
                  )
                }
              >
                Review approval queue
              </Button>
            </div>
          </Panel>
          <Panel title="Reconciliation">
            <div className="p-5">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="size-5 text-success" />
                <span className="font-semibold">6 of 7 payments matched</span>
              </div>
              <p className="muted mt-3">
                One settlement is waiting for its bank reference.
              </p>
              <Button
                variant="outline"
                className="mt-4 w-full"
                onClick={() =>
                  downloadTransactions(
                    activity.filter((t) => t.currency === 'CNY'),
                  )
                }
              >
                <Download />
                Export reconciliation
              </Button>
            </div>
          </Panel>
        </div>
      </div>
    </div>
  )
}
function DesignSystemPage() {
  const { toast } = useDemo()
  const [state, setState] = useState('Empty')
  const [outcome, setOutcome] = useState('Completed')
  const states = [
    'Loading',
    'Empty',
    'No results',
    'Success',
    'Pending',
    'Failed',
    'Insufficient balance',
    'Limit exceeded',
    'OTP expired',
    'Offline',
    'Error',
    'Permission denied',
    'Maintenance',
    'Account restricted',
    'Account suspended',
    'KYC required',
    'Transaction timeout',
    'Invalid QR',
    'Expired QR',
  ]
  return (
    <div className="page-enter">
      <Heading page="design-system" />
      <div className="mb-6">
        <Alert>
          Use this page to review shared components and preview alternate
          payment results.
        </Alert>
      </div>
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Panel title="Brand & semantic colors">
          <div className="grid grid-cols-3 gap-4 p-6">
            {[
              ['Brand blue', 'var(--brand-blue)'],
              ['Brand yellow', 'var(--brand-yellow)'],
              ['Accent surface', 'var(--secondary)'],
              ['Success', 'var(--success)'],
              ['Warning', 'var(--warning)'],
              ['Error', 'var(--destructive)'],
            ].map(([l, c]) => (
              <div key={l}>
                <div
                  style={{ background: c }}
                  className="mb-2 h-16 rounded-lg border"
                />
                <p className="text-sm font-medium">{l}</p>
                <p className="text-xs text-muted-foreground">
                  {c.slice(6, -1)}
                </p>
              </div>
            ))}
          </div>
        </Panel>
        <Panel title="Typography & spacing">
          <div className="space-y-4 p-6">
            <p className="font-display text-3xl font-semibold tracking-tight">
              Manrope
            </p>
            <p className="text-xl font-semibold">
              Clear hierarchy. Familiar rhythm.
            </p>
            <p className="text-[15px]">
              IBM Plex Sans · Body copy · 15px / 22px · Regular
            </p>
            <p className="text-sm text-muted-foreground">
              Supporting text · 14px · Semantic muted foreground
            </p>
            <p className="money text-3xl font-semibold">৳128,450.75</p>
            <p className="text-xs text-muted-foreground">
              Tabular financial numerals · 4/8px spacing scale · 8/12/16px radii
            </p>
          </div>
        </Panel>
        <Panel title="Buttons & form controls">
          <div className="space-y-5 p-6">
            <div className="flex flex-wrap gap-2">
              <Button>Primary</Button>
              <Button variant="outline">Secondary</Button>
              <Button variant="ghost">Tertiary</Button>
              <Button variant="destructive">Destructive</Button>
              <Button disabled>Disabled</Button>
            </div>
            <Field label="Account name">
              <Input placeholder="Enter your account name" />
            </Field>
            <Field label="Invalid input" error="Enter a valid email address.">
              <Input aria-invalid="true" placeholder="name@example.com" />
            </Field>
            <ToggleRow
              title="Optional preference"
              description="Visible, labeled switch state"
              initial={false}
            />
          </div>
        </Panel>
        <Panel title="Status & feedback">
          <div className="space-y-4 p-6">
            <div className="flex flex-wrap gap-2">
              {(['Completed', 'Pending', 'Failed', 'Refunded'] as const).map(
                (s) => (
                  <StatusBadge key={s} status={s} />
                ),
              )}
            </div>
            <Alert>Information with a clear next step.</Alert>
            <Alert tone="success">
              Payment completed. Your receipt is ready.
            </Alert>
            <Alert tone="warning">This payment is awaiting bank review.</Alert>
            <Alert tone="error">
              The payment failed. No funds were deducted.
            </Alert>
          </div>
        </Panel>
      </div>
      <Panel title="Experience states" className="mt-6">
        <div className="grid grid-cols-1 gap-6 p-6 lg:grid-cols-[1fr_1.5fr]">
          <div className="flex flex-wrap content-start gap-2">
            {states.map((s) => (
              <button
                key={s}
                className={cn(
                  'rounded-lg border px-3 py-2 text-sm',
                  state === s
                    ? 'border-primary bg-secondary text-primary'
                    : 'hover:bg-muted',
                )}
                onClick={() => setState(s)}
              >
                {s}
              </button>
            ))}
          </div>
          <div className="min-h-64 rounded-xl border">
            {state === 'Loading' ? (
              <div
                className="space-y-5 p-8"
                role="status"
                aria-label="Loading preview"
              >
                <div className="h-8 w-1/2 animate-pulse rounded bg-muted" />
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="h-12 animate-pulse rounded bg-muted"
                  />
                ))}
              </div>
            ) : ['Empty', 'No results'].includes(state) ? (
              <EmptyState
                title={
                  state === 'Empty'
                    ? 'Your next chapter starts here'
                    : 'No matching results'
                }
                description={
                  state === 'Empty'
                    ? 'Add your first goal or transaction to see it in this space.'
                    : 'Try another search or clear your filters.'
                }
                action={
                  <Button
                    onClick={() => toast('Empty-state action previewed.')}
                  >
                    {state === 'Empty' ? 'Get started' : 'Clear filters'}
                  </Button>
                }
              />
            ) : (
              <div className="p-8">
                <div className="mb-5">
                  <Alert
                    tone={
                      state === 'Success'
                        ? 'success'
                        : state === 'Pending'
                          ? 'warning'
                          : 'error'
                    }
                  >
                    {state}
                  </Alert>
                </div>
                <h3 className="text-lg font-semibold">
                  {state === 'Success'
                    ? 'Your payment is complete'
                    : state === 'Pending'
                      ? 'We’re reviewing your payment'
                      : state === 'Offline'
                        ? 'You’re offline'
                        : state === 'Insufficient balance'
                          ? 'Your balance is a little short'
                          : state === 'KYC required'
                            ? 'Verify your identity to continue'
                            : `${state}. Let’s get you back on track.`}
                </h3>
                <p className="muted mt-3">
                  {state === 'OTP expired'
                    ? 'Your code has expired. Request a new code and try again.'
                    : state === 'Limit exceeded'
                      ? 'This payment is above your daily limit. Choose a smaller amount or request a limit change.'
                      : state === 'Success'
                        ? 'You can download a receipt or return to your wallet.'
                        : state === 'Pending'
                          ? 'No further action is needed. Track progress in Transactions.'
                          : 'Your progress is saved in this preview. Check the details and try again, or contact support.'}
                </p>
                <Button
                  className="mt-5"
                  variant="outline"
                  onClick={() => setState('Empty')}
                >
                  {state === 'OTP expired'
                    ? 'Resend code'
                    : state === 'KYC required'
                      ? 'Start verification'
                      : 'Continue preview'}
                </Button>
              </div>
            )}
          </div>
        </div>
      </Panel>
      <Panel title="Payment outcome preview" className="mt-6">
        <div className="flex flex-wrap items-end gap-4 p-6">
          <Field label="Next payment result">
            <select
              className="select min-w-52"
              value={outcome}
              onChange={(e) => {
                setOutcome(e.target.value)
                sessionStorage.setItem('setlr-outcome', e.target.value)
                toast(`Next demo payment: ${e.target.value}`)
              }}
            >
              <option>Completed</option>
              <option>Pending</option>
              <option>Failed</option>
              <option>OTP expired</option>
            </select>
          </Field>
          <AppLink page="send-money">
            <Button>
              Explore payment flow <ArrowRight />
            </Button>
          </AppLink>
          <Button
            variant="outline"
            onClick={() => {
              sessionStorage.removeItem('setlr-outcome')
              setOutcome('Completed')
              toast('Payment preview reset.')
            }}
          >
            Reset preview
          </Button>
        </div>
      </Panel>
    </div>
  )
}
