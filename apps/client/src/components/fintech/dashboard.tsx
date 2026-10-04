import { useState } from 'react'
import {
  ArrowDownLeft,
  ArrowDownToLine,
  ArrowLeftRight,
  ArrowRight,
  ArrowUpRight,
  CalendarDays,
  CircleHelp,
  Globe2,
  Plus,
  QrCode,
  ShieldCheck,
  Sparkles,
  Target,
  TrendingUp,
} from 'lucide-react'
import {
  AppLink,
  Avatar,
  BalanceVisibility,
  BankCard,
  CashflowChart,
  InlineLink,
  Panel,
  Progress,
  StatementButton,
  TransactionTable,
  useDemo,
} from './shared'
import { money } from './data'

export function Dashboard() {
  const { hidden, activity, goals, walletBalances } = useDemo()
  const [period, setPeriod] = useState('Month')
  return (
    <div className="page-enter dashboard-layout">
      <div className="dashboard-heading flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="mb-1 text-sm text-muted-foreground">
            Sunday, October 4, 2026
          </p>
          <h1 className="text-[26px] font-semibold tracking-[-0.8px] sm:text-[30px]">
            Good afternoon, Akram<span className="text-primary">.</span>
          </h1>
          <p className="mt-1 text-[15px] text-muted-foreground">
            Your money, your plans. All looking good.
          </p>
        </div>
        <div className="hidden gap-2 sm:flex">
          <StatementButton />
          <span className="inline-flex items-center gap-2 rounded-lg border bg-card px-3 text-sm text-muted-foreground">
            <CalendarDays className="size-4" /> October 2026
          </span>
        </div>
      </div>
      <div className="dashboard-balance balance-card brand-orbits relative overflow-hidden rounded-xl p-5 sm:p-6">
        <div className="relative z-10 flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2 text-sm text-white/75">
              Total available balance <BalanceVisibility />
            </div>
            <div className="money mt-2 text-[36px] leading-tight font-semibold sm:text-[38px]">
              {hidden
                ? '••••••••'
                : money(128450 + walletBalances.BDT - 96420).split('.')[0]}
              <span className="text-2xl text-white/60">
                {hidden ? '' : '.00'}
              </span>
            </div>
            <p className="mt-2 inline-flex items-center gap-1.5 text-xs text-white/80">
              <TrendingUp className="size-3.5 text-brand-yellow" />
              <span className="font-semibold text-brand-yellow">
                +12.8%
              </span>{' '}
              from last month
            </p>
          </div>
          <span className="hidden rounded-full border border-white/20 px-2.5 py-1 text-[11px] text-white/80 min-[380px]:block">
            Personal wallet
          </span>
        </div>
        <div className="relative z-10 mt-7 grid grid-cols-3 gap-3 border-t border-white/15 pt-4">
          {[
            [
              'BDT',
              '৳',
              walletBalances.BDT.toLocaleString('en-US', {
                minimumFractionDigits: 2,
              }),
            ],
            ['CNY', '¥', '1,280.00'],
            ['USD', '$', '78.40'],
          ].map(([currency, sign, amount]) => (
            <AppLink
              page="wallet"
              key={currency}
              className="border-r border-white/15 last:border-0"
            >
              <div className="flex items-center gap-2 text-xs text-white/70">
                <span className="flex size-5 items-center justify-center rounded-full bg-white/10 text-[10px]">
                  {sign}
                </span>
                {currency} wallet
              </div>
              <div className="money mt-2 text-[15px] font-semibold sm:text-lg">
                {hidden ? '••••••' : `${sign}${amount}`}
              </div>
            </AppLink>
          ))}
        </div>
      </div>
      <div className="dashboard-actions flex flex-wrap items-center gap-3">
        <span className="hidden text-xs font-medium text-muted-foreground sm:block">
          QUICK ACTIONS
        </span>
        {[
          { page: 'send-money', label: 'Send money', icon: ArrowUpRight },
          { page: 'add-money', label: 'Add money', icon: Plus },
          { page: 'withdraw-money', label: 'Withdraw', icon: ArrowDownToLine },
          { page: 'bill-payment', label: 'Pay a bill', icon: ArrowLeftRight },
          { page: 'qr-payment', label: 'Scan QR', icon: QrCode },
        ].map((a) => (
          <AppLink
            key={a.page}
            page={a.page}
            className="quick-action flex min-h-10 items-center gap-2 rounded-lg border bg-card px-3.5 text-sm font-medium hover:border-primary/40 hover:bg-secondary"
          >
            <a.icon className="size-4 text-primary" />
            {a.label}
          </AppLink>
        ))}
      </div>
      <Panel
        className="dashboard-transactions"
        title="Recent transactions"
        action={<InlineLink page="transactions">View all</InlineLink>}
      >
        <TransactionTable
          compact
          items={activity
            .filter((t) => t.category !== 'Supplier payment')
            .slice(0, 5)}
        />
      </Panel>
      <Panel
        className="dashboard-cashflow"
        title="Cash flow"
        action={
          <select
            aria-label="Cash flow period"
            value={period}
            onChange={(e) => setPeriod(e.target.value)}
            className="rounded-md border bg-card px-2 py-1 text-xs"
          >
            <option>Month</option>
            <option>Week</option>
          </select>
        }
      >
        <div className="px-6 pt-5">
          <div className="mb-4 flex flex-wrap gap-10">
            <div>
              <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <span className="size-2 rounded-full bg-primary" /> Money in{' '}
                <ArrowDownLeft className="size-3" />
              </span>
              <p className="money mt-1 text-2xl font-semibold">
                {hidden
                  ? '••••••'
                  : period === 'Month'
                    ? '৳148,500.00'
                    : '৳38,620.00'}
              </p>
            </div>
            <div>
              <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <span className="size-2 rounded-full bg-[var(--chart-2)]" />{' '}
                Money out <ArrowUpRight className="size-3" />
              </span>
              <p className="money mt-1 text-2xl font-semibold">
                {hidden
                  ? '••••••'
                  : period === 'Month'
                    ? '৳54,820.00'
                    : '৳14,230.00'}
              </p>
            </div>
            <div className="ml-auto hidden text-right sm:block">
              <p className="text-xs text-muted-foreground">Net cash flow</p>
              <p className="mt-2 text-sm font-semibold text-success">
                +৳93,680.00
              </p>
            </div>
          </div>
          <CashflowChart period={period} />
        </div>
        <div className="mt-3 flex items-center justify-between border-t px-6 py-3">
          <p className="flex items-center gap-2 text-xs text-muted-foreground">
            <Sparkles className="size-3.5 text-primary" /> Your income is 16%
            higher than last month.
          </p>
          <AppLink
            page="budgets"
            className="text-xs font-semibold text-primary"
          >
            View insights <ArrowRight className="ml-1 inline size-3" />
          </AppLink>
        </div>
      </Panel>
      <Panel
        className="dashboard-cards"
        title="Your cards"
        action={<InlineLink page="cards">Manage</InlineLink>}
      >
        <div className="p-5">
          <BankCard />
          <div className="mt-4 flex items-center justify-between">
            <div>
              <p className="text-xs text-muted-foreground">Spent this month</p>
              <p className="money mt-1 font-semibold">
                ৳24,850{' '}
                <span className="font-normal text-muted-foreground">
                  / ৳50,000
                </span>
              </p>
            </div>
            <span className="pill bg-success-soft text-success">
              <span className="size-1.5 rounded-full bg-current" />
              Active
            </span>
          </div>
          <div className="mt-3">
            <Progress value={49.7} />
          </div>
        </div>
      </Panel>
      <div className="dashboard-planning space-y-5">
        <Panel
          title="Savings goals"
          action={
            <AppLink
              page="savings"
              label="Create savings goal"
              className="inline-flex size-11 items-center justify-center rounded-lg hover:bg-muted"
            >
              <Plus className="size-4 text-muted-foreground" />
            </AppLink>
          }
        >
          <div className="px-5 py-1">
            {goals.slice(0, 2).map((goal) => (
              <AppLink
                page="savings"
                key={goal.name}
                className="block border-b py-4 last:border-0"
              >
                <div className="mb-3 flex items-center gap-3">
                  <span className="icon-tile size-9">
                    <Target className="size-4" />
                  </span>
                  <div className="flex-1">
                    <p className="text-sm font-semibold">{goal.name}</p>
                    <p className="mt-0.5 text-xs text-muted-foreground">
                      {money(goal.amount)}{' '}
                      <span className="text-muted-foreground">
                        of {money(goal.target)}
                      </span>
                    </p>
                  </div>
                  <span className="text-xs font-semibold">
                    {Math.round((goal.amount / goal.target) * 100)}%
                  </span>
                </div>
                <Progress value={(goal.amount / goal.target) * 100} />
              </AppLink>
            ))}
          </div>
        </Panel>
        <Panel className="p-5">
          <div className="flex items-start gap-3">
            <Avatar
              initials="GT"
              className="bg-accent text-accent-foreground"
            />
            <div>
              <p className="text-sm font-semibold">
                Business payments, when you need them
              </p>
              <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                Pay China suppliers, manage invoices, and track settlement.
              </p>
              <AppLink
                page="business-payments"
                className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-primary"
              >
                Explore business payments <ArrowRight className="size-3" />
              </AppLink>
            </div>
          </div>
        </Panel>
      </div>
      <div className="dashboard-promo relative flex flex-col justify-between overflow-hidden rounded-xl border border-brand-yellow/30 bg-accent p-6">
        <div className="flex items-center justify-between">
          <span className="eyebrow text-accent-foreground">
            MAKE IT A HABIT
          </span>
          <span className="flex size-8 items-center justify-center rounded-full bg-brand-yellow/35">
            <Globe2 className="size-4 text-accent-foreground" />
          </span>
        </div>
        <div className="mt-3">
          <h2 className="max-w-[220px] text-[23px] leading-tight font-semibold tracking-tight">
            A little more
            <br />
            room for tomorrow.
          </h2>
          <p className="mt-2 max-w-[250px] text-sm text-accent-foreground">
            Turn small steps into big plans. Put your next goal in motion.
          </p>
        </div>
        <AppLink
          page="savings"
          className="mt-5 flex items-center justify-between text-sm font-semibold"
        >
          <span>Create a savings goal</span>
          <ArrowUpRight className="size-4" />
        </AppLink>
        <div className="absolute top-16 -right-16 size-44 rounded-full border border-brand-yellow/40" />
        <div className="absolute top-24 -right-8 size-32 rounded-full border border-brand-yellow/40" />
      </div>
      <div className="dashboard-footer flex flex-wrap items-center justify-between gap-3 text-xs text-muted-foreground">
        <p className="flex items-center gap-1.5">
          <ShieldCheck className="size-3.5" /> Your workspace is protected with
          two-step verification.
        </p>
        <AppLink page="support" className="flex items-center gap-1.5">
          <CircleHelp className="size-3.5" /> Need a hand? We’re here.
        </AppLink>
      </div>
    </div>
  )
}
