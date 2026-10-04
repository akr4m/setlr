import { useEffect, useState } from 'react'
import {
  ArrowDownLeft,
  ArrowDownToLine,
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Check,
  CheckCircle2,
  Clock3,
  Copy,
  Download,
  FileCheck2,
  Globe2,
  Landmark,
  LoaderCircle,
  Plus,
  QrCode,
  Receipt,
  ScanLine,
  ShieldCheck,
  Smartphone,
  Wallet,
  XCircle,
} from 'lucide-react'
import QRCode from 'qrcode'
import {
  AppLink,
  Alert,
  Avatar,
  Button,
  DigitInput,
  Field,
  FileUpload,
  InlineLink,
  Input,
  PageHeading,
  Panel,
  QR,
  SecurityNote,
  StatusBadge,
  useDemo,
} from './shared'
import { money, paymentModes } from './data'
import { cn } from '#/lib/utils'
import { downloadReceipt } from '#/lib/demo-export'

const actions = [
  {
    page: 'send-money',
    title: 'Send money',
    detail: 'Pay a contact or supplier',
    icon: ArrowUpRight,
  },
  {
    page: 'add-money',
    title: 'Add money',
    detail: 'From your bank or card',
    icon: Plus,
  },
  {
    page: 'receive-money',
    title: 'Receive money',
    detail: 'Your account details & QR',
    icon: ArrowDownLeft,
  },
  {
    page: 'request-money',
    title: 'Request money',
    detail: 'Send a payment request',
    icon: Receipt,
  },
  {
    page: 'bank-transfer',
    title: 'Bank transfer',
    detail: 'To any supported bank',
    icon: Landmark,
  },
  {
    page: 'withdraw-money',
    title: 'Withdraw',
    detail: 'Move funds to your bank',
    icon: ArrowDownToLine,
  },
  {
    page: 'qr-payment',
    title: 'QR payment',
    detail: 'Scan, review, and pay',
    icon: QrCode,
  },
  {
    page: 'bill-payment',
    title: 'Pay a bill',
    detail: 'Utilities, internet & more',
    icon: FileCheck2,
  },
  {
    page: 'mobile-recharge',
    title: 'Mobile recharge',
    detail: 'Top up any operator',
    icon: Smartphone,
  },
]
export function Payments() {
  const { contacts } = useDemo()
  return (
    <div className="page-enter">
      <PageHeading
        title="Payments"
        description="From everyday payments to your next overseas shipment."
      >
        <AppLink page="send-money">
          <Button>
            <Plus /> New payment
          </Button>
        </AppLink>
      </PageHeading>
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[1.8fr_1fr]">
        <div className="space-y-6">
          <Panel title="What would you like to do?">
            <div className="grid grid-cols-2 gap-2 p-4 md:grid-cols-3">
              {actions.map((a) => (
                <AppLink
                  page={a.page}
                  key={a.page}
                  className="group rounded-xl p-4 hover:bg-secondary"
                >
                  <span className="icon-tile mb-3 group-hover:bg-card">
                    <a.icon className="size-5" />
                  </span>
                  <p className="font-semibold">{a.title}</p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {a.detail}
                  </p>
                </AppLink>
              ))}
            </div>
          </Panel>
          <Panel
            title="Recent recipients"
            action={<InlineLink page="beneficiaries">Manage</InlineLink>}
          >
            <div className="grid grid-cols-2 gap-4 p-6 sm:grid-cols-4">
              {contacts.slice(0, 4).map((r) => (
                <AppLink
                  page="send-money"
                  key={r.id}
                  className="flex flex-col items-center gap-2 text-center"
                >
                  <Avatar
                    initials={r.initials}
                    className="size-12 rounded-full"
                  />
                  <span className="text-xs font-medium">{r.name}</span>
                </AppLink>
              ))}
            </div>
          </Panel>
          <Panel title="Upcoming payments">
            <div className="px-6">
              <div className="data-row">
                <span className="flex items-center gap-3">
                  <span className="icon-tile">
                    <FileCheck2 className="size-5" />
                  </span>
                  <span>
                    <p className="font-semibold">DESCO electricity</p>
                    <p className="muted">Due 07 October · Saved biller</p>
                  </span>
                </span>
                <AppLink page="bill-payment">
                  <Button variant="outline">Pay ৳3,240</Button>
                </AppLink>
              </div>
              <div className="data-row">
                <span className="flex items-center gap-3">
                  <Avatar initials="GT" />
                  <span>
                    <p className="font-semibold">Guangzhou Textiles</p>
                    <p className="muted">Invoice GT-208 · In review</p>
                  </span>
                </span>
                <StatusBadge status="Pending" />
              </div>
            </div>
          </Panel>
        </div>
        <div className="space-y-6">
          <Panel className="overflow-hidden">
            <div className="bg-secondary p-6">
              <Globe2 className="mb-5 size-8 text-primary" />
              <h2 className="text-2xl font-semibold tracking-tight">
                Business without borders.
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                Manage China supplier payments, invoices, and settlement in one
                place.
              </p>
              <AppLink page="business-payments">
                <Button className="mt-5 w-full">
                  Business payments <ArrowRight />
                </Button>
              </AppLink>
            </div>
            <div className="space-y-4 p-5">
              {[
                'BDT → CNY quotes with transparent fees',
                'Verified suppliers and invoice records',
                'Settlement tracking through partner banks',
              ].map((s) => (
                <p className="flex items-start gap-2 text-sm" key={s}>
                  <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-success" />
                  {s}
                </p>
              ))}
            </div>
          </Panel>
          <Panel title="Pending requests">
            <div className="p-5">
              <p className="text-sm text-muted-foreground">
                Nusrat Rahman requested ৳2,400 for the team lunch.
              </p>
              <AppLink page="send-money">
                <Button variant="outline" className="mt-4 w-full">
                  Review request <ArrowRight />
                </Button>
              </AppLink>
            </div>
          </Panel>
          <p className="flex items-start gap-2 px-2 text-xs leading-relaxed text-muted-foreground">
            <ShieldCheck className="size-4 shrink-0" /> All amounts, rates, and
            payments in this workspace are sample data.
          </p>
        </div>
      </div>
    </div>
  )
}

export function PaymentFlow({ mode }: { mode: string }) {
  const config = paymentModes[mode]!
  const {
    contacts,
    addTransaction,
    walletBalances,
    businessBalance,
    updateBalance,
  } = useDemo()
  const [stage, setStage] = useState(0)
  const [recipient, setRecipient] = useState(
    mode === 'add-money' || mode === 'withdraw-money'
      ? 'Eastern Bank PLC •• 4821'
      : mode === 'bill-payment'
        ? 'DESCO · Electricity'
        : mode === 'mobile-recharge'
          ? 'Grameenphone'
          : mode === 'qr-payment'
            ? ''
            : mode === 'supplier-payment'
              ? contacts[0].name
              : contacts[2]?.name || contacts[0].name,
  )
  const [currency, setCurrency] = useState(
    mode === 'supplier-payment' ? 'CNY' : 'BDT',
  )
  const [amount, setAmount] = useState(
    mode === 'bill-payment' ? '3240' : mode === 'mobile-recharge' ? '500' : '',
  )
  const [note, setNote] = useState('')
  const [account, setAccount] = useState('')
  const [document, setDocument] = useState('')
  const [error, setError] = useState('')
  const [auth, setAuth] = useState('')
  const [method, setMethod] = useState('PIN')
  const [seconds, setSeconds] = useState(120)
  const [outcome, setOutcome] = useState<'Completed' | 'Pending' | 'Failed'>(
    'Completed',
  )
  const [receiptId] = useState(
    () => `STL-${Math.floor(21000 + Math.random() * 80000)}`,
  )
  const value = Number(amount)
  const crossBorder =
    currency === 'CNY' &&
    ['send-money', 'bank-transfer', 'supplier-payment'].includes(mode)
  const fee =
    mode === 'request-money' ||
    mode === 'add-money' ||
    mode === 'mobile-recharge'
      ? 0
      : crossBorder
        ? 250
        : 15
  const total = (crossBorder ? value * 17.29 : value) + fee
  const balance =
    mode === 'supplier-payment' ? businessBalance : walletBalances.BDT
  useEffect(() => {
    if (stage !== 2 || method !== 'OTP' || seconds <= 0) return
    const timer = setTimeout(() => setSeconds((s) => s - 1), 1000)
    return () => clearTimeout(timer)
  }, [stage, method, seconds])
  useEffect(() => {
    if (stage !== 3) return
    const timer = setTimeout(() => {
      const scenario =
        mode === 'request-money'
          ? 'Completed'
          : sessionStorage.getItem('setlr-outcome') || 'Completed'
      const result = ['Completed', 'Pending', 'Failed'].includes(scenario)
        ? (scenario as typeof outcome)
        : 'Completed'
      setOutcome(result)
      if (result !== 'Failed' && mode !== 'request-money')
        addTransaction({
          id: receiptId,
          name: recipient,
          initials: recipient
            .split(' ')
            .slice(0, 2)
            .map((x) => x[0])
            .join(''),
          category: config.title,
          date: '04 Oct, Just now',
          amount: value,
          currency,
          status: result,
          incoming: mode === 'add-money',
          note: note || 'Demo payment · No real funds moved',
        })
      if (result !== 'Failed' && mode !== 'request-money') {
        if (mode === 'add-money' && result === 'Completed') updateBalance(value)
        else if (mode !== 'add-money')
          updateBalance(-total, mode === 'supplier-payment')
      }
      setStage(4)
    }, 1600)
    return () => clearTimeout(timer)
  }, [stage])
  function review() {
    if (!recipient)
      return setError('Choose a recipient or scan a demo merchant QR.')
    if (!Number.isFinite(value) || value <= 0)
      return setError('Enter an amount greater than zero.')
    if (value > (crossBorder ? 30000 : 500000))
      return setError(
        'Daily payment limit exceeded. Choose a smaller amount or review your account limits.',
      )
    if (total > balance && !['add-money', 'request-money'].includes(mode))
      return setError(
        'Insufficient balance. Add money or choose a smaller amount.',
      )
    if (
      ['bill-payment', 'mobile-recharge'].includes(mode) &&
      !/^[0-9+ -]{6,18}$/.test(account)
    )
      return setError(
        mode === 'mobile-recharge'
          ? 'Enter a valid mobile number.'
          : 'Enter a valid customer or meter number.',
      )
    if (crossBorder && !document)
      return setError('Attach an invoice for this supplier payment.')
    setError('')
    setStage(1)
  }
  function authenticate() {
    if (method === 'OTP' && seconds <= 0)
      return setError('OTP expired. Request a new code to continue.')
    if (auth !== (method === 'PIN' ? '4821' : '123456'))
      return setError(`Incorrect ${method}. Use the sample code shown below.`)
    setError('')
    setStage(3)
  }
  const details = [
    ['Recipient', recipient],
    ['Amount', `${money(value, currency)} ${currency}`],
    ...(crossBorder
      ? [
          ['Sample bank quote', '1 CNY = 17.2900 BDT'],
          ['Invoice', document],
        ]
      : []),
    ['Payment fee', money(fee)],
    ['Total from BDT wallet', money(total)],
  ]
  return (
    <div className="page-enter">
      <AppLink
        page="payments"
        className="mb-5 inline-flex items-center gap-2 text-sm text-muted-foreground"
      >
        <ArrowLeft className="size-4" />
        Back to payments
      </AppLink>
      <PageHeading title={config.title} description={config.subtitle} />
      <div className="mx-auto grid max-w-[1080px] grid-cols-1 items-start gap-6 lg:grid-cols-[1.65fr_1fr]">
        <Panel className="overflow-hidden">
          <div
            className="payment-progress flex border-b px-4 py-4 sm:px-6 sm:py-5"
            aria-label="Payment progress"
          >
            {['Details', 'Review', 'Confirm', 'Receipt'].map((label, i) => (
              <div
                key={label}
                className="flex flex-1 items-center gap-2 text-xs"
              >
                <span
                  className={cn(
                    'flex size-6 items-center justify-center rounded-full font-semibold',
                    stage >= i
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted text-muted-foreground',
                  )}
                >
                  {stage > i ? <Check className="size-3" /> : i + 1}
                </span>
                <span
                  className={
                    stage >= i ? 'font-semibold' : 'text-muted-foreground'
                  }
                >
                  {label}
                </span>
              </div>
            ))}
          </div>
          <div className="p-5 sm:p-8">
            {stage === 0 && (
              <div className="space-y-5">
                {mode === 'qr-payment' && (
                  <div className="rounded-xl bg-secondary p-5">
                    <div className="relative mx-auto mb-4 flex aspect-[1.5] max-w-xs items-center justify-center rounded-xl border-2 border-dashed border-primary/30 bg-card">
                      <ScanLine className="size-16 text-primary/35" />
                      <span className="absolute bottom-3 text-xs text-muted-foreground">
                        Position a merchant QR inside the frame
                      </span>
                    </div>
                    <Button
                      className="w-full"
                      variant="outline"
                      onClick={() => setRecipient('North End Coffee · Gulshan')}
                    >
                      Scan demo merchant QR
                    </Button>
                    <p className="mt-2 text-xs text-muted-foreground">
                      Camera preview · No camera access required.
                    </p>
                  </div>
                )}
                <Field label={config.recipient}>
                  <select
                    className="select"
                    value={recipient}
                    onChange={(e) => setRecipient(e.target.value)}
                  >
                    <option value="">Choose an option</option>
                    {(mode === 'add-money'
                      ? [
                          'Eastern Bank PLC •• 4821',
                          'BRAC Bank •• 8072',
                          'Visa card •• 4821',
                          'Cash-in agent',
                        ]
                      : mode === 'withdraw-money'
                        ? [
                            'Eastern Bank PLC •• 4821',
                            'BRAC Bank •• 8072',
                            'Cash-out agent',
                          ]
                        : mode === 'bill-payment'
                          ? [
                              'DESCO · Electricity',
                              'Titas · Gas',
                              'Dhaka WASA · Water',
                              'Link3 · Internet',
                              'Akash · TV',
                              'Education fees',
                              'Government fees',
                              'Insurance premium',
                            ]
                          : mode === 'mobile-recharge'
                            ? [
                                'Grameenphone',
                                'Robi',
                                'Banglalink',
                                'Airtel',
                                'Teletalk',
                              ]
                            : mode === 'qr-payment'
                              ? [
                                  'North End Coffee · Gulshan',
                                  'Unimart · Dhanmondi',
                                ]
                              : contacts.map((r) => r.name)
                    ).map((r) => (
                      <option key={r}>{r}</option>
                    ))}
                  </select>
                </Field>
                {['bill-payment', 'mobile-recharge'].includes(mode) && (
                  <Field
                    label={
                      mode === 'mobile-recharge'
                        ? 'Mobile number'
                        : 'Customer / meter number'
                    }
                  >
                    <Input
                      placeholder={
                        mode === 'mobile-recharge'
                          ? '+880 17...'
                          : 'Enter your customer number'
                      }
                      value={account}
                      onChange={(e) => setAccount(e.target.value)}
                    />
                  </Field>
                )}
                {mode === 'mobile-recharge' && (
                  <Field label="Connection type">
                    <select className="select">
                      <option>Prepaid</option>
                      <option>Postpaid</option>
                    </select>
                  </Field>
                )}
                <Field
                  label={config.label}
                  hint={
                    mode === 'add-money'
                      ? 'Funds are added to your personal BDT wallet.'
                      : mode === 'request-money'
                        ? 'Sending a request does not move funds.'
                        : `Available: ${money(balance)} · ${mode === 'supplier-payment' ? 'Business' : 'Personal'} BDT wallet`
                  }
                >
                  <div className="flex items-center gap-2 rounded-xl border bg-card px-4 py-3">
                    <span className="text-2xl text-muted-foreground">
                      {currency === 'CNY' ? '¥' : '৳'}
                    </span>
                    <input
                      type="number"
                      inputMode="decimal"
                      min="0.01"
                      step="0.01"
                      aria-label={config.label}
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      placeholder="0.00"
                      className="money w-full min-w-0 bg-transparent text-[32px] font-semibold outline-none"
                    />
                    <select
                      aria-label="Payment currency"
                      className="rounded-md bg-muted px-2 py-2 text-sm"
                      value={currency}
                      onChange={(e) => setCurrency(e.target.value)}
                    >
                      <option>BDT</option>
                      {[
                        'send-money',
                        'bank-transfer',
                        'supplier-payment',
                      ].includes(mode) && <option>CNY</option>}
                    </select>
                  </div>
                </Field>
                {mode === 'mobile-recharge' && (
                  <div className="flex gap-2">
                    {[100, 200, 500, 1000].map((v) => (
                      <button
                        key={v}
                        className="flex-1 rounded-lg border py-2 text-sm hover:bg-secondary"
                        onClick={() => setAmount(String(v))}
                      >
                        ৳{v}
                      </button>
                    ))}
                  </div>
                )}
                {crossBorder && (
                  <>
                    <Alert>
                      Sample bank quote: 1 CNY = 17.2900 BDT. Final settlement
                      goes through a partner bank.
                    </Alert>
                    <FileUpload
                      label="Attach supplier invoice"
                      onFile={setDocument}
                    />
                  </>
                )}
                <Field label="Note (optional)">
                  <Input
                    placeholder="What’s this payment for?"
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                  />
                </Field>
                {error && (
                  <Alert tone="error">
                    {error}
                    {error.includes('balance') && (
                      <AppLink page="add-money" className="ml-1 underline">
                        Add money
                      </AppLink>
                    )}
                    {error.includes('limit') && (
                      <AppLink page="security" className="ml-1 underline">
                        View limits
                      </AppLink>
                    )}
                  </Alert>
                )}
                <div className="rounded-xl bg-muted p-4 lg:hidden">
                  <div className="flex items-center justify-between gap-3 text-sm">
                    <span className="text-muted-foreground">
                      {mode === 'add-money'
                        ? 'Amount to add'
                        : mode === 'request-money'
                          ? 'Request amount'
                          : 'Total to pay'}
                    </span>
                    <span className="money text-lg font-semibold">
                      {money(value ? total : 0)}
                    </span>
                  </div>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {fee === 0
                      ? 'No payment fee'
                      : `Includes ${money(fee)} payment fee`}
                    {crossBorder ? ' · BDT funding, CNY settlement' : ''}
                  </p>
                </div>
                <Button className="w-full" onClick={review}>
                  Review {mode === 'request-money' ? 'request' : 'payment'}{' '}
                  <ArrowRight />
                </Button>
                <SecurityNote />
              </div>
            )}
            {stage === 1 && (
              <div className="space-y-5">
                <div>
                  <h2 className="text-xl font-semibold">
                    Everything look right?
                  </h2>
                  <p className="muted mt-1">
                    Confirm the details before continuing.
                  </p>
                </div>
                <div className="rounded-xl border px-4">
                  {details.map(([label, val]) => (
                    <div className="data-row text-sm" key={label}>
                      <span className="text-muted-foreground">{label}</span>
                      <span className="max-w-[65%] text-right font-semibold">
                        {val}
                      </span>
                    </div>
                  ))}
                </div>
                <Alert tone="warning">
                  {crossBorder
                    ? 'Supplier payments may require bank review. Expected settlement: 1–2 business days in this demo.'
                    : 'Check your recipient carefully. Completed payments may not be reversible.'}
                </Alert>
                <div className="flex gap-3">
                  <Button variant="outline" onClick={() => setStage(0)}>
                    Edit details
                  </Button>
                  <Button
                    className="flex-1"
                    onClick={() => {
                      setStage(mode === 'request-money' ? 3 : 2)
                      setAuth('')
                      if (
                        sessionStorage.getItem('setlr-outcome') ===
                        'OTP expired'
                      ) {
                        setMethod('OTP')
                        setSeconds(0)
                      }
                    }}
                  >
                    Confirm & continue <ArrowRight />
                  </Button>
                </div>
              </div>
            )}
            {stage === 2 && (
              <div className="space-y-6 text-center">
                <span className="mx-auto flex size-16 items-center justify-center rounded-2xl bg-secondary">
                  <ShieldCheck className="size-8 text-primary" />
                </span>
                <div>
                  <h2 className="text-xl font-semibold">Confirm it’s you</h2>
                  <p className="muted mt-2">
                    {method === 'PIN'
                      ? 'Enter your 4-digit transaction PIN.'
                      : 'Enter the code sent to +880 1714 ••• 906.'}
                  </p>
                </div>
                <div className="flex justify-center gap-2">
                  {['PIN', 'OTP'].map((m) => (
                    <Button
                      key={m}
                      variant={method === m ? 'default' : 'outline'}
                      onClick={() => {
                        setMethod(m)
                        setAuth('')
                        setError('')
                      }}
                    >
                      {m}
                    </Button>
                  ))}
                </div>
                <DigitInput
                  value={auth}
                  onChange={setAuth}
                  length={method === 'PIN' ? 4 : 6}
                  secret={method === 'PIN'}
                  label={`Transaction ${method}`}
                />
                <p className="text-xs text-muted-foreground">
                  Demo {method}:{' '}
                  <strong>{method === 'PIN' ? '4821' : '123456'}</strong>
                  {method === 'OTP' &&
                    ` · ${seconds > 0 ? `Expires in ${seconds}s` : 'Code expired'}`}
                </p>
                {method === 'OTP' && (
                  <button
                    className="text-sm font-semibold text-primary"
                    onClick={() => {
                      setSeconds(120)
                      setAuth('')
                      setError('')
                    }}
                  >
                    Resend code
                  </button>
                )}
                {error && <Alert tone="error">{error}</Alert>}
                <Button className="w-full" onClick={authenticate}>
                  Authorize {money(total)} <ShieldCheck />
                </Button>
                <Button variant="ghost" onClick={() => setStage(1)}>
                  Back to review
                </Button>
                <SecurityNote />
              </div>
            )}
            {stage === 3 && (
              <div
                role="status"
                className="flex flex-col items-center py-16 text-center"
              >
                <LoaderCircle className="processing-ring mb-6 size-12 text-primary" />
                <h2 className="text-xl font-semibold">
                  Processing your{' '}
                  {mode === 'request-money' ? 'request' : 'payment'}
                </h2>
                <p className="muted mt-2">
                  We’re preparing your confirmation. Please keep this page open.
                </p>
                <div className="mt-6 h-1.5 w-48 overflow-hidden rounded-full bg-muted">
                  <div className="h-full w-2/3 animate-pulse rounded-full bg-primary" />
                </div>
              </div>
            )}
            {stage === 4 && (
              <div className="space-y-5">
                <div className="py-4 text-center">
                  <span
                    className={cn(
                      'mx-auto mb-4 flex size-20 items-center justify-center rounded-full',
                      outcome === 'Completed'
                        ? 'bg-success-soft text-success'
                        : outcome === 'Pending'
                          ? 'bg-warning-soft text-warning'
                          : 'bg-danger-soft text-destructive',
                    )}
                  >
                    {outcome === 'Completed' ? (
                      <CheckCircle2 className="size-10" />
                    ) : outcome === 'Pending' ? (
                      <Clock3 className="size-10" />
                    ) : (
                      <XCircle className="size-10" />
                    )}
                  </span>
                  <h2 className="text-2xl font-semibold">
                    {outcome === 'Completed'
                      ? mode === 'request-money'
                        ? 'Request sent'
                        : 'Payment successful'
                      : outcome === 'Pending'
                        ? 'Payment is in review'
                        : 'Payment could not be completed'}
                  </h2>
                  <p className="money mt-3 text-3xl font-semibold">
                    {money(value, currency)}
                  </p>
                  <p className="muted mt-2">
                    {outcome === 'Failed'
                      ? 'No funds were deducted. You can safely try again.'
                      : `${mode === 'add-money' ? 'From' : 'To'} ${recipient}`}
                  </p>
                </div>
                {outcome === 'Pending' && (
                  <Alert tone="warning">
                    Your partner bank is reviewing this payment. Track updates
                    in Transactions.
                  </Alert>
                )}
                <div className="rounded-xl border px-4">
                  {[
                    ['Reference', receiptId],
                    ['Status', outcome],
                    ['Fee', money(fee)],
                    ['Date', '04 October 2026'],
                  ].map(([label, val]) => (
                    <div className="data-row text-sm" key={label}>
                      <span className="text-muted-foreground">{label}</span>
                      <span className="font-semibold">{val}</span>
                    </div>
                  ))}
                </div>
                {outcome === 'Failed' ? (
                  <Button
                    className="w-full"
                    onClick={() => {
                      setStage(0)
                      setAuth('')
                    }}
                  >
                    Try again
                  </Button>
                ) : (
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() =>
                      downloadReceipt({
                        reference: receiptId,
                        recipient,
                        amount: value,
                        currency,
                        fee,
                        status: outcome,
                      })
                    }
                  >
                    <Download /> Download receipt
                  </Button>
                )}
                <AppLink page="transactions" className="block">
                  <Button className="w-full">
                    View transactions <ArrowRight />
                  </Button>
                </AppLink>
                <SecurityNote />
              </div>
            )}
          </div>
        </Panel>
        <div className="hidden space-y-5 lg:block">
          <Panel className="p-6">
            <div className="mb-5 flex items-center gap-2">
              <Wallet className="size-5 text-primary" />
              <h2 className="font-semibold">Payment summary</h2>
            </div>
            <p className="text-sm text-muted-foreground">From BDT wallet</p>
            <p className="money mt-2 text-2xl font-semibold">
              {money(value ? total : 0)}
            </p>
            <div className="mt-5 space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Available balance</span>
                <span>{money(balance)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Payment fee</span>
                <span>{fee === 0 ? 'Free' : money(fee)}</span>
              </div>
              {crossBorder && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">
                    Settlement currency
                  </span>
                  <span>CNY</span>
                </div>
              )}
            </div>
          </Panel>
          <div className="px-2">
            <ShieldCheck className="mb-2 size-5 text-success" />
            <p className="text-sm font-semibold">You’re always in control.</p>
            <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
              You review every recipient, amount, and fee before authorizing.
              We’ll never ask for your PIN over a call.
            </p>
            <InlineLink page="support">Get help with a payment</InlineLink>
          </div>
        </div>
      </div>
    </div>
  )
}

export function ReceiveMoney() {
  const { toast } = useDemo()
  const [tab, setTab] = useState('Account details')
  return (
    <div className="page-enter">
      <PageHeading
        title="Receive money"
        description="Share your details and let the money come to you."
      />
      <div className="mx-auto max-w-xl">
        <Panel className="p-7">
          <div className="mb-6 flex gap-2">
            {['Account details', 'My QR code'].map((t) => (
              <Button
                key={t}
                variant={tab === t ? 'default' : 'outline'}
                onClick={() => setTab(t)}
              >
                {t}
              </Button>
            ))}
          </div>
          {tab === 'My QR code' ? (
            <div className="text-center">
              <QR />
              <h2 className="mt-4 text-lg font-semibold">Akram Hossain</h2>
              <p className="muted">STL-884021 · BDT wallet</p>
              <Button
                variant="outline"
                className="mt-5"
                onClick={async () => {
                  const url = await QRCode.toDataURL(
                    'setlr:demo:akram-hossain:STL-884021',
                    { width: 800 },
                  )
                  const a = document.createElement('a')
                  a.href = url
                  a.download = 'setlr-demo-qr.png'
                  a.click()
                }}
              >
                <Download /> Download QR
              </Button>
            </div>
          ) : (
            <>
              <div className="mb-6 flex items-center gap-3">
                <Avatar initials="AH" />
                <div>
                  <h2 className="font-semibold">Akram Hossain</h2>
                  <StatusBadge status="Verified" />
                </div>
              </div>
              {[
                ['Account holder', 'Akram Hossain'],
                ['Setlr account ID', 'STL-884021'],
                ['Phone number', '+880 1714 582 906'],
                ['Currency', 'Bangladeshi Taka (BDT)'],
              ].map(([label, value]) => (
                <div className="data-row text-sm" key={label}>
                  <span className="text-muted-foreground">{label}</span>
                  <span className="font-semibold">{value}</span>
                </div>
              ))}
              <Button
                className="mt-6 w-full"
                onClick={async () => {
                  await navigator.clipboard.writeText(
                    'Akram Hossain\nSetlr ID: STL-884021\nPhone: +880 1714 582 906\nBDT wallet · Demo account',
                  )
                  toast('Account details copied.')
                }}
              >
                <Copy /> Copy account details
              </Button>
            </>
          )}
          <div className="mt-6">
            <Alert>
              This QR and account ID belong to the demo. Use them to explore the
              receiving experience.
            </Alert>
          </div>
        </Panel>
        <AppLink
          page="request-money"
          className="mt-5 flex items-center justify-center gap-2 text-sm font-semibold text-primary"
        >
          Request a specific amount <ArrowRight className="size-4" />
        </AppLink>
      </div>
    </div>
  )
}
