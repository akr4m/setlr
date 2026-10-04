import {
  cloneElement,
  createContext,
  isValidElement,
  useContext,
  useEffect,
  useId,
  useRef,
  useState,
} from 'react'
import { Link } from '@tanstack/react-router'
import {
  ArrowDownLeft,
  ArrowRight,
  ArrowUpRight,
  Check,
  CheckCircle2,
  ChevronRight,
  Download,
  Eye,
  EyeOff,
  FileText,
  Info,
  Nfc,
  LoaderCircle,
  XCircle,
  Search,
  ShieldCheck,
  Upload,
  X,
} from 'lucide-react'
import QRCode from 'qrcode'
import { Button } from '#/components/ui/button'
import { Input } from '#/components/ui/input'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from '#/components/ui/dialog'
import { Switch } from '#/components/ui/switch'
import { cn } from '#/lib/utils'
import { downloadReceipt } from '#/lib/demo-export'
import {
  initialGoals,
  initialNotices,
  money,
  recipients,
  transactions,
} from './data'
import type { ComponentProps, ReactElement, ReactNode } from 'react'
import type { Status, Transaction } from './data'

export { Button, Input }
export type FormField = {
  name: string
  label: string
  type?: string
  placeholder?: string
  options?: string[]
  value?: string
  optional?: boolean
  max?: number
}
type DemoContextType = {
  dark: boolean
  setDark: (value: boolean) => void
  walletBalances: { BDT: number; CNY: number; USD: number }
  businessBalance: number
  updateBalance: (delta: number, business?: boolean) => void
  hidden: boolean
  setHidden: (value: boolean) => void
  toast: (message: string) => void
  activity: Transaction[]
  addTransaction: (transaction: Transaction) => void
  selected: Transaction | null
  setSelected: (transaction: Transaction | null) => void
  contacts: typeof recipients
  setContacts: React.Dispatch<React.SetStateAction<typeof recipients>>
  goals: typeof initialGoals
  setGoals: React.Dispatch<React.SetStateAction<typeof initialGoals>>
  notices: typeof initialNotices
  setNotices: React.Dispatch<React.SetStateAction<typeof initialNotices>>
  openForm: (
    title: string,
    description: string,
    fields: FormField[],
    onSave?: (values: Record<string, string>) => void,
  ) => void
  confirm: (title: string, description: string, onConfirm: () => void) => void
}
const DemoContext = createContext<DemoContextType | null>(null)
export function useDemo() {
  const context = useContext(DemoContext)
  if (!context) throw new Error('DemoProvider is required')
  return context
}
export function DemoProvider({ children }: { children: ReactNode }) {
  const [dark, setDark] = useState(
    () => localStorage.getItem('setlr-theme') === 'dark',
  )
  const [hidden, setHidden] = useState(false)
  const [walletBalances, setWalletBalances] = useState({
    BDT: 96420,
    CNY: 1280,
    USD: 78.4,
  })
  const [businessBalance, setBusinessBalance] = useState(842350)
  const [message, setMessage] = useState('')
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const [activity, setActivity] = useState(transactions)
  const [selected, setSelected] = useState<Transaction | null>(null)
  const [contacts, setContacts] = useState(recipients)
  const [goals, setGoals] = useState(initialGoals)
  const [notices, setNotices] = useState(initialNotices)
  const [form, setForm] = useState<{
    title: string
    description: string
    fields: FormField[]
    onSave?: (values: Record<string, string>) => void
  } | null>(null)
  const [confirmation, setConfirmation] = useState<{
    title: string
    description: string
    onConfirm: () => void
  } | null>(null)
  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark)
    localStorage.setItem('setlr-theme', dark ? 'dark' : 'light')
  }, [dark])
  useEffect(
    () => () => {
      if (toastTimer.current) clearTimeout(toastTimer.current)
    },
    [],
  )
  function toast(text: string) {
    setMessage(text)
    if (toastTimer.current) clearTimeout(toastTimer.current)
    toastTimer.current = setTimeout(() => setMessage(''), 4500)
  }
  return (
    <DemoContext.Provider
      value={{
        dark,
        setDark,
        walletBalances,
        businessBalance,
        updateBalance: (delta, business = false) =>
          business
            ? setBusinessBalance((v) => v + delta)
            : setWalletBalances((all) => ({ ...all, BDT: all.BDT + delta })),
        hidden,
        setHidden,
        toast,
        activity,
        addTransaction: (t) => setActivity((all) => [t, ...all]),
        selected,
        setSelected,
        contacts,
        setContacts,
        goals,
        setGoals,
        notices,
        setNotices,
        openForm: (title, description, fields, onSave) =>
          setForm({ title, description, fields, onSave }),
        confirm: (title, description, onConfirm) =>
          setConfirmation({ title, description, onConfirm }),
      }}
    >
      {children}
      <Dialog
        open={!!form}
        onOpenChange={(open) => {
          if (!open) setForm(null)
        }}
      >
        <DialogContent className="sm:max-w-lg">
          <DialogTitle className="text-xl font-semibold">
            {form?.title}
          </DialogTitle>
          <DialogDescription>{form?.description}</DialogDescription>
          {form && (
            <FormPreview
              key={form.title}
              form={form}
              close={() => setForm(null)}
            />
          )}
        </DialogContent>
      </Dialog>
      <Dialog
        open={!!confirmation}
        onOpenChange={(open) => {
          if (!open) setConfirmation(null)
        }}
      >
        <DialogContent>
          <DialogTitle className="text-xl font-semibold">
            {confirmation?.title}
          </DialogTitle>
          <DialogDescription>{confirmation?.description}</DialogDescription>
          <div className="mt-3 flex justify-end gap-2">
            <Button variant="outline" onClick={() => setConfirmation(null)}>
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={() => {
                confirmation?.onConfirm()
                setConfirmation(null)
              }}
            >
              Confirm
            </Button>
          </div>
        </DialogContent>
      </Dialog>
      <TransactionDetails />
      {message && (
        <div
          role="status"
          className="fixed right-4 bottom-24 z-50 flex max-w-[calc(100%-32px)] items-center gap-3 rounded-xl border bg-card px-5 py-4 shadow-lg lg:bottom-6"
        >
          <CheckCircle2 className="size-5 shrink-0 text-success" />
          <span className="text-sm">{message}</span>
          <button
            aria-label="Dismiss notification"
            onClick={() => setMessage('')}
            className="ml-2 p-2"
          >
            <X className="size-4" />
          </button>
        </div>
      )}
    </DemoContext.Provider>
  )
}
export function AppLink({
  page,
  children,
  className,
  onClick,
  label,
  ariaCurrent,
}: {
  page: string
  children: ReactNode
  className?: string
  onClick?: () => void
  label?: string
  ariaCurrent?: ComponentProps<'a'>['aria-current']
}) {
  const link =
    page === 'dashboard' ? (
      <Link
        to="/"
        className={className}
        onClick={onClick}
        aria-label={label}
        aria-current={ariaCurrent}
      />
    ) : (
      <Link
        to="/$page"
        params={{ page }}
        className={className}
        onClick={onClick}
        aria-label={label}
        aria-current={ariaCurrent}
      />
    )
  if (isValidElement(children) && children.type === Button) {
    const button = children as ReactElement<ComponentProps<typeof Button>>
    return cloneElement(button, {
      render: link,
      nativeButton: false,
      role: 'link',
      className: cn(button.props.className, className, 'inline-flex'),
    })
  }
  return cloneElement(link, {}, children)
}
export function Brand({
  compact = false,
  light = false,
}: {
  compact?: boolean
  light?: boolean
}) {
  return (
    <span className="inline-flex items-center gap-2.5">
      <img
        src="/brand/setlr-mark.svg"
        alt=""
        className="h-7 w-10 object-contain"
      />
      {!compact && (
        <span
          className={cn(
            'font-brand text-[31px] leading-none font-black tracking-[-1.2px]',
            light ? 'text-white' : 'text-foreground',
          )}
        >
          Setlr<span className="text-primary">.</span>
        </span>
      )}
    </span>
  )
}
export function Panel({
  children,
  className,
  title,
  action,
}: {
  children: ReactNode
  className?: string
  title?: string
  action?: ReactNode
}) {
  return (
    <section className={cn('panel', className)}>
      {title && (
        <div className="panel-head">
          <h2 className="text-base font-semibold">{title}</h2>
          {action}
        </div>
      )}
      {children}
    </section>
  )
}
export function PageHeading({
  title,
  description,
  children,
}: {
  title: string
  description: string
  children?: ReactNode
}) {
  return (
    <div className="mb-7 flex flex-wrap items-center justify-between gap-4">
      <div>
        <h1 className="text-[29px] leading-tight font-semibold tracking-[-0.7px]">
          {title}
        </h1>
        <p className="mt-1.5 text-[15px] text-muted-foreground">
          {description}
        </p>
      </div>
      {children}
    </div>
  )
}
export function Field({
  label,
  children,
  hint,
  error,
}: {
  label: string
  children: ReactNode
  hint?: string
  error?: string
}) {
  const id = useId()
  const control =
    isValidElement(children) &&
    (children.type === Input ||
      ['input', 'select', 'textarea'].includes(String(children.type)))
      ? (children as ReactElement<{
          id?: string
          'aria-describedby'?: string
          'aria-invalid'?: boolean
        }>)
      : null
  const controlId = control?.props.id || id
  return (
    <div className="field">
      <label className="field-label" htmlFor={control ? controlId : undefined}>
        {label}
      </label>
      {control
        ? cloneElement(control, {
            id: controlId,
            'aria-describedby':
              error || hint ? `${id}-help` : control.props['aria-describedby'],
            'aria-invalid': error ? true : control.props['aria-invalid'],
          })
        : children}
      {error ? (
        <span
          id={`${id}-help`}
          role="alert"
          className="text-xs text-destructive"
        >
          {error}
        </span>
      ) : (
        hint && (
          <span id={`${id}-help`} className="text-xs text-muted-foreground">
            {hint}
          </span>
        )
      )}
    </div>
  )
}

export function Avatar({
  initials,
  className,
}: {
  initials: string
  className?: string
}) {
  return (
    <span
      className={cn(
        'flex size-10 shrink-0 items-center justify-center rounded-xl bg-secondary text-sm font-semibold text-primary',
        className,
      )}
    >
      {initials}
    </span>
  )
}
export function StatusBadge({
  status,
}: {
  status: Status | 'Verified' | 'Active' | 'Frozen' | 'In review' | 'Open'
}) {
  const good = ['Completed', 'Verified', 'Active', 'Refunded'].includes(status)
  const bad = status === 'Failed'
  return (
    <span
      className={cn(
        'pill whitespace-nowrap',
        good
          ? 'bg-success-soft text-success'
          : bad
            ? 'bg-danger-soft text-destructive'
            : 'bg-warning-soft text-warning',
      )}
    >
      <span className="size-1.5 rounded-full bg-current" />
      {status}
    </span>
  )
}
export function Alert({
  children,
  tone = 'info',
}: {
  children: ReactNode
  tone?: 'info' | 'error' | 'success' | 'warning'
}) {
  return (
    <div
      role={tone === 'error' ? 'alert' : undefined}
      className={cn(
        'flex items-start gap-2.5 rounded-lg p-3 text-sm',
        tone === 'error'
          ? 'bg-danger-soft text-destructive'
          : tone === 'success'
            ? 'bg-success-soft text-success'
            : tone === 'warning'
              ? 'bg-warning-soft text-warning'
              : 'bg-secondary text-secondary-foreground',
      )}
    >
      <Info aria-hidden="true" className="mt-0.5 size-4 shrink-0" />
      <span>{children}</span>
    </div>
  )
}
export function EmptyState({
  title,
  description,
  action,
}: {
  title: string
  description: string
  action?: ReactNode
}) {
  return (
    <div className="flex flex-col items-center px-6 py-14 text-center">
      <div className="mb-4 flex size-16 items-center justify-center rounded-2xl bg-secondary">
        <Search className="size-7 text-primary" />
      </div>
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="mt-2 max-w-xs text-sm text-muted-foreground">
        {description}
      </p>
      {action && <div className="mt-5">{action}</div>}
    </div>
  )
}
export function Progress({
  value,
  label = 'Progress',
}: {
  value: number
  label?: string
}) {
  return (
    <div
      className="progress-track"
      role="progressbar"
      aria-label={label}
      aria-valuenow={Math.round(value)}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <div
        className="progress-fill"
        style={{ width: `${Math.min(value, 100)}%` }}
      />
    </div>
  )
}
export function Stat({
  label,
  value,
  change,
  icon,
}: {
  label: string
  value: string
  change?: string
  icon?: ReactNode
}) {
  return (
    <Panel className="p-5">
      <div className="mb-3 flex items-center justify-between">
        <span className="text-sm text-muted-foreground">{label}</span>
        {icon}
      </div>
      <div className="money text-[28px] font-semibold">{value}</div>
      {change && <p className="mt-1 text-xs text-success">{change}</p>}
    </Panel>
  )
}
export function ToggleRow({
  title,
  description,
  initial = true,
  onChange,
}: {
  title: string
  description: string
  initial?: boolean
  onChange?: (value: boolean) => void
}) {
  const [checked, setChecked] = useState(initial)
  return (
    <div className="data-row">
      <div>
        <p className="font-medium">{title}</p>
        <p className="muted mt-1">{description}</p>
      </div>
      <Switch
        aria-label={title}
        checked={checked}
        onCheckedChange={(value) => {
          setChecked(value)
          onChange?.(value)
        }}
      />
    </div>
  )
}
export function DigitInput({
  value,
  onChange,
  length = 6,
  secret = false,
  label = 'Verification code',
}: {
  value: string
  onChange: (value: string) => void
  length?: number
  secret?: boolean
  label?: string
}) {
  return (
    <div className="relative">
      <div className="digit-cells flex justify-center gap-2" aria-hidden="true">
        {Array.from({ length }, (_, i) => (
          <span
            key={i}
            className={cn(
              'digit-cell flex h-14 w-11 items-center justify-center rounded-lg border bg-card text-2xl font-semibold',
              i === value.length && 'border-primary ring-2 ring-primary/10',
            )}
          >
            {value[i] ? (secret ? '•' : value[i]) : ''}
          </span>
        ))}
      </div>
      <input
        aria-label={label}
        type={secret ? 'password' : 'text'}
        inputMode="numeric"
        autoComplete="one-time-code"
        maxLength={length}
        value={value}
        onChange={(e) =>
          onChange(e.target.value.replace(/\D/g, '').slice(0, length))
        }
        className="absolute inset-0 h-full w-full cursor-text opacity-0"
      />
    </div>
  )
}
export function FileUpload({
  label = 'Upload document',
  onFile,
}: {
  label?: string
  onFile?: (name: string) => void
}) {
  const [file, setFile] = useState('')
  return (
    <label className="flex cursor-pointer flex-col items-center gap-2 rounded-xl border-2 border-dashed p-7 text-center hover:border-primary">
      <Upload className="size-6 text-primary" />
      <span className="text-sm font-semibold">{file || label}</span>
      <span className="text-xs text-muted-foreground">
        PDF, JPG or PNG · Maximum 10 MB
      </span>
      <input
        type="file"
        className="sr-only"
        accept=".pdf,.png,.jpg,.jpeg"
        onChange={(e) => {
          const next = e.target.files?.[0]
          if (next && next.size <= 10 * 1024 * 1024) {
            setFile(next.name)
            onFile?.(next.name)
          } else if (next) {
            setFile('File too large. Choose a file under 10 MB.')
            onFile?.('')
          }
        }}
      />
    </label>
  )
}
export function QR({
  value = 'setlr:demo:akram-hossain:STL-884021',
}: {
  value?: string
}) {
  const [src, setSrc] = useState('')
  useEffect(() => {
    let active = true
    QRCode.toDataURL(value, {
      width: 240,
      margin: 2,
      color: { dark: '#2e3092', light: '#ffffff' },
    }).then((url) => {
      if (active) setSrc(url)
    })
    return () => {
      active = false
    }
  }, [value])
  return src ? (
    <img
      src={src}
      alt="Demo payment QR code for Akram Hossain"
      className="mx-auto size-52 rounded-xl bg-white p-2"
    />
  ) : (
    <div
      className="mx-auto size-52 animate-pulse rounded-xl bg-muted"
      aria-label="Generating QR code"
    />
  )
}
export function downloadFile(
  name: string,
  content: string,
  type = 'text/plain',
) {
  const url = URL.createObjectURL(new Blob([content], { type }))
  const a = document.createElement('a')
  a.href = url
  a.download = name
  a.click()
  setTimeout(() => URL.revokeObjectURL(url), 1000)
}
export function downloadTransactions(items: Transaction[]) {
  downloadFile(
    'setlr-statement.csv',
    'Reference,Recipient,Date,Amount,Currency,Status\n' +
      items
        .map((t) =>
          [t.id, t.name, t.date, t.amount, t.currency, t.status]
            .map((v) => `"${String(v).replaceAll('"', '""')}"`)
            .join(','),
        )
        .join('\n'),
    'text/csv',
  )
}
export function TransactionTable({
  items,
  compact = false,
}: {
  items: Transaction[]
  compact?: boolean
}) {
  const { setSelected } = useDemo()
  return items.length ? (
    <>
      <div className="divide-y sm:hidden" role="list" aria-label="Transactions">
        {items.map((t) => (
          <div key={t.id} role="listitem">
            <button
              type="button"
              className="mobile-transaction w-full text-left hover:bg-muted/50"
              onClick={() => setSelected(t)}
            >
              <Avatar
                initials={t.initials}
                className={cn(
                  'size-10 rounded-xl',
                  t.incoming && 'bg-success-soft text-success',
                )}
              />
              <span className="min-w-0 flex-1">
                <span className="flex items-start justify-between gap-3">
                  <span className="min-w-0">
                    <span className="block truncate font-semibold">
                      {t.name}
                    </span>
                    <span className="mt-0.5 block text-xs text-muted-foreground">
                      {t.category}
                    </span>
                  </span>
                  <span
                    className={cn(
                      'money shrink-0 text-right font-semibold',
                      t.incoming && 'text-success',
                    )}
                  >
                    {t.incoming ? '+' : '−'}
                    {money(t.amount, t.currency)}
                    <span className="mt-0.5 block text-[11px] font-normal tracking-normal text-muted-foreground">
                      {t.currency}
                    </span>
                  </span>
                </span>
                <span className="mt-2 flex items-center justify-between gap-2">
                  <span className="text-xs text-muted-foreground">
                    {t.date}
                  </span>
                  <StatusBadge status={t.status} />
                </span>
              </span>
            </button>
          </div>
        ))}
      </div>
      <div className="hidden overflow-x-auto sm:block">
        <table className="transaction-table">
          <thead>
            <tr>
              <th>Transaction</th>
              <th className="hidden md:table-cell">Date</th>
              {!compact && <th className="hidden xl:table-cell">Reference</th>}
              <th>Amount</th>
              <th className="hidden sm:table-cell">Status</th>
              <th className="w-10">
                <span className="sr-only">Details</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {items.map((t) => (
              <tr key={t.id} onClick={() => setSelected(t)}>
                <td>
                  <div className="flex items-center gap-3">
                    <Avatar
                      initials={t.initials}
                      className={cn(
                        'size-9 rounded-lg',
                        t.incoming && 'bg-success-soft text-success',
                      )}
                    />
                    <div>
                      <button
                        className="text-left font-semibold"
                        onClick={(e) => {
                          e.stopPropagation()
                          setSelected(t)
                        }}
                      >
                        {t.name}
                      </button>
                      <p className="mt-0.5 text-xs text-muted-foreground">
                        {t.category}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="hidden whitespace-nowrap text-xs text-muted-foreground md:table-cell">
                  {t.date}
                </td>
                {!compact && (
                  <td className="hidden text-xs text-muted-foreground xl:table-cell">
                    {t.id}
                  </td>
                )}
                <td
                  className={cn(
                    'money whitespace-nowrap font-semibold',
                    t.incoming && 'text-success',
                  )}
                >
                  {t.incoming ? '+' : '−'}
                  {money(t.amount, t.currency)}
                  <span className="mt-0.5 block text-[10px] font-normal tracking-normal text-muted-foreground">
                    {t.currency}
                  </span>
                </td>
                <td className="hidden sm:table-cell">
                  <StatusBadge status={t.status} />
                </td>
                <td>
                  <ChevronRight className="size-4 text-muted-foreground" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  ) : (
    <EmptyState
      title="No transactions found"
      description="Try another search or change your filters."
    />
  )
}
function TransactionDetails() {
  const { selected: t, setSelected, toast, openForm } = useDemo()
  return (
    <Dialog
      open={!!t}
      onOpenChange={(open) => {
        if (!open) setSelected(null)
      }}
    >
      <DialogContent className="sm:max-w-lg">
        <DialogTitle className="text-xl font-semibold">
          Transaction details
        </DialogTitle>
        <DialogDescription>Payment reference {t?.id}</DialogDescription>
        {t && (
          <>
            <div className="flex flex-col items-center py-4">
              <Avatar initials={t.initials} className="mb-3 size-14 text-lg" />
              <h3 className="font-semibold">{t.name}</h3>
              <p className="money my-3 text-3xl font-semibold">
                {t.incoming ? '+' : '−'}
                {money(t.amount, t.currency)}
              </p>
              <StatusBadge status={t.status} />
            </div>
            <div className="rounded-xl border px-4">
              {[
                ['Category', t.category],
                ['Date', t.date],
                ['Paid from', `${t.currency} wallet`],
                ['Note', t.note],
              ].map(([label, value]) => (
                <div className="data-row text-sm" key={label}>
                  <span className="text-muted-foreground">{label}</span>
                  <span className="max-w-[65%] text-right">{value}</span>
                </div>
              ))}
            </div>
            <div className="mt-2 space-y-3">
              <p className="text-sm font-semibold">Payment timeline</p>
              {[
                'Payment created',
                'Security verification passed',
                t.status === 'Pending'
                  ? 'Awaiting partner bank review'
                  : t.status === 'Failed'
                    ? 'Payment failed · no funds deducted'
                    : 'Settlement confirmed',
              ].map((text, i) => (
                <div key={text} className="flex items-center gap-3 text-sm">
                  <span
                    className={cn(
                      'flex size-5 items-center justify-center rounded-full',
                      i < 2 || t.status === 'Completed'
                        ? 'bg-success-soft text-success'
                        : 'bg-warning-soft text-warning',
                    )}
                  >
                    <Check className="size-3" />
                  </span>
                  {text}
                </div>
              ))}
            </div>
            <Button
              onClick={() =>
                downloadReceipt({
                  reference: t.id,
                  recipient: t.name,
                  amount: t.amount,
                  currency: t.currency,
                  status: t.status,
                  note: t.note,
                })
              }
            >
              <Download /> Download receipt
            </Button>
            <Button
              variant="outline"
              onClick={() => {
                setSelected(null)
                openForm(
                  'Report a payment issue',
                  'Tell us what happened. This creates a demo support request.',
                  [
                    {
                      name: 'reason',
                      label: 'Reason',
                      options: [
                        'Payment not received',
                        'Incorrect amount',
                        'Duplicate payment',
                        'Refund requested',
                      ],
                    },
                    { name: 'description', label: 'What happened?' },
                  ],
                  () => toast('Demo dispute submitted. Reference DSP-482.'),
                )
              }}
            >
              Report a problem
            </Button>
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}
export function CashflowChart({ period = 'Month' }: { period?: string }) {
  const [point, setPoint] = useState(3)
  const [compact, setCompact] = useState(false)
  useEffect(() => {
    const media = window.matchMedia('(max-width: 639px)')
    const update = () => setCompact(media.matches)
    update()
    media.addEventListener('change', update)
    return () => media.removeEventListener('change', update)
  }, [])
  const labels =
    period === 'Week'
      ? ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
      : ['01 Oct', '05 Oct', '10 Oct', '15 Oct', '20 Oct', '25 Oct', '30 Oct']
  const x = (index: number) => (compact ? 40 + index * 41 : 55 + index * 76)
  const income =
    period === 'Week'
      ? [54, 74, 46, 92, 82, 124, 102]
      : [58, 94, 68, 122, 112, 161, 135]
  const expense = [35, 49, 43, 69, 51, 81, 63]
  const path = (values: number[]) =>
    values.map((v, i) => `${i === 0 ? 'M' : 'L'} ${x(i)} ${180 - v}`).join(' ')
  return (
    <div>
      <div className="relative">
        <svg
          viewBox={`0 0 ${compact ? 320 : 550} 225`}
          className="h-auto w-full"
          role="img"
          aria-label={`${period} cash flow chart. Income exceeds expenses throughout the period.`}
        >
          <defs>
            <linearGradient id="cash-fill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--chart-1)" stopOpacity="0.12" />
              <stop offset="100%" stopColor="var(--chart-1)" stopOpacity="0" />
            </linearGradient>
          </defs>
          {[30, 80, 130, 180].map((y, i) => (
            <g key={y}>
              <line
                x1={compact ? 32 : 48}
                x2={compact ? 300 : 520}
                y1={y}
                y2={y}
                className="chart-grid"
                strokeDasharray="3 5"
              />
              <text x="0" y={y + 4} className="chart-label">
                {[150, 100, 50, 0][i]}k
              </text>
            </g>
          ))}
          <path
            d={`${path(income)} L ${x(6)} 180 L ${x(0)} 180 Z`}
            fill="url(#cash-fill)"
          />
          <path
            d={path(expense)}
            fill="none"
            className="chart-secondary"
            strokeWidth="2.5"
            strokeDasharray="5 5"
          />
          <path
            d={path(income)}
            fill="none"
            className="chart-line"
            strokeWidth="3"
            strokeLinejoin="round"
            strokeLinecap="round"
          />
          {income.map((v, i) => (
            <g key={i}>
              <circle
                cx={x(i)}
                cy={180 - v}
                r={i === point ? 5 : 3}
                fill="var(--chart-1)"
                stroke="var(--card)"
                strokeWidth="2"
              />
              <text
                x={x(i)}
                y="216"
                textAnchor="middle"
                className="chart-label"
              >
                {compact && i % 2 !== 0 ? '' : labels[i]}
              </text>
            </g>
          ))}
        </svg>
      </div>
      <div className="mt-3 flex items-center justify-between gap-3">
        <span className="text-xs font-medium text-muted-foreground">
          Inspect date
        </span>
        <select
          aria-label="Inspect cash flow date"
          value={point}
          onChange={(event) => setPoint(Number(event.target.value))}
          className="h-11 rounded-lg border bg-card px-3 text-sm"
        >
          {labels.map((label, index) => (
            <option key={label} value={index}>
              {label}
            </option>
          ))}
        </select>
      </div>
      <p role="status" className="mt-2 text-xs text-muted-foreground">
        In {money(income[point] * 1000)} · Out {money(expense[point] * 1000)}
      </p>
    </div>
  )
}
export function BankCard({
  virtual = false,
  frozen = false,
  reveal = false,
}: {
  virtual?: boolean
  frozen?: boolean
  reveal?: boolean
}) {
  return (
    <div
      className={cn(
        'bank-card brand-orbits relative overflow-hidden rounded-xl p-5',
        frozen && 'opacity-60',
      )}
    >
      <div className="flex items-center justify-between">
        <span className="text-2xl font-black tracking-tight">Setlr.</span>
        <span className="rounded-full border border-white/25 px-2 py-0.5 text-[10px]">
          {virtual ? 'VIRTUAL' : 'DEBIT'}
        </span>
      </div>
      <div className="mt-5 flex items-center gap-2">
        <div className="card-chip h-6 w-8 rounded-md">
          <div className="mt-2.5 border-t border-[#b9ac87]" />
        </div>
        <Nfc className="size-5 text-white/60" />
      </div>
      <p className="money mt-4 text-[17px] tracking-[0.14em]">
        {reveal ? '4821 9302 7610 ' : '••••  ••••  ••••  '}
        {virtual ? '9024' : '4821'}
      </p>
      <div className="mt-3 flex items-end justify-between">
        <div>
          <p className="text-[9px] tracking-wider text-white/60">
            PERSONAL ACCOUNT
          </p>
          <p className="mt-0.5 text-xs text-white/80">AKRAM HOSSAIN</p>
        </div>
        <span className="text-lg font-bold italic">VISA</span>
      </div>
    </div>
  )
}
export function BalanceVisibility() {
  const { hidden, setHidden } = useDemo()
  return (
    <button
      onClick={() => setHidden(!hidden)}
      aria-label={hidden ? 'Show balance' : 'Hide balance'}
      className="inline-flex size-11 shrink-0 items-center justify-center rounded-full hover:bg-white/10"
    >
      {hidden ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
    </button>
  )
}
export function InlineLink({
  page,
  children,
}: {
  page: string
  children: ReactNode
}) {
  return (
    <AppLink
      page={page}
      className="inline-flex items-center gap-1 text-sm font-semibold text-primary"
    >
      {children}
      <ArrowRight className="size-3.5" />
    </AppLink>
  )
}
export function DirectionIcon({ incoming = false }: { incoming?: boolean }) {
  return incoming ? (
    <ArrowDownLeft className="size-4 text-success" />
  ) : (
    <ArrowUpRight className="size-4 text-primary" />
  )
}
export function SecurityNote() {
  return (
    <p className="flex items-center justify-center gap-1.5 text-xs text-muted-foreground">
      <ShieldCheck className="size-3.5" /> Demo only · No real money moves
    </p>
  )
}
export function StatementButton() {
  return (
    <AppLink page="statements">
      <Button variant="outline">
        <FileText /> Statements
      </Button>
    </AppLink>
  )
}

function FormPreview({
  form,
  close,
}: {
  form: {
    title: string
    description: string
    fields: FormField[]
    onSave?: (values: Record<string, string>) => void
  }
  close: () => void
}) {
  const { toast, walletBalances, updateBalance } = useDemo()
  const [stage, setStage] = useState(0)
  const [values, setValues] = useState<Record<string, string>>({})
  const [pin, setPin] = useState('')
  const [error, setError] = useState('')
  const [status, setStatus] = useState<'Completed' | 'Pending' | 'Failed'>(
    'Completed',
  )
  const financial = form.fields.some((field) => field.name === 'amount')
  const creditBack = /^(Withdraw|Sell)/.test(form.title)
  useEffect(() => {
    if (stage !== 3) return
    const timer = setTimeout(() => {
      const outcome = sessionStorage.getItem('setlr-outcome')
      const result =
        outcome === 'Pending' || outcome === 'Failed' ? outcome : 'Completed'
      setStatus(result)
      if (result === 'Completed') {
        form.onSave?.(values)
        updateBalance(Number(values.amount) * (creditBack ? 1 : -1))
      }
      setStage(4)
    }, 1100)
    return () => clearTimeout(timer)
  }, [stage])
  if (stage === 0)
    return (
      <form
        className="mt-2 space-y-4"
        onSubmit={(event) => {
          event.preventDefault()
          const next = Object.fromEntries(
            Array.from(new FormData(event.currentTarget).entries()).map(
              ([key, value]) => [
                key,
                typeof value === 'string' ? value : value.name,
              ],
            ),
          )
          if (
            financial &&
            !creditBack &&
            Number(next.amount) > walletBalances.BDT
          ) {
            setError('Insufficient wallet balance. Choose a smaller amount.')
            return
          }
          setValues(next)
          if (financial) setStage(1)
          else {
            form.onSave?.(next)
            close()
            toast(`${form.title} saved in this demo.`)
          }
        }}
      >
        {form.fields.map((field) => (
          <Field key={field.name} label={field.label}>
            {field.options ? (
              <select
                className="select"
                name={field.name}
                defaultValue={values[field.name] || field.value}
                required={!field.optional}
              >
                {field.options.map((option) => (
                  <option key={option}>{option}</option>
                ))}
              </select>
            ) : (
              <Input
                name={field.name}
                type={field.type || 'text'}
                placeholder={field.placeholder}
                defaultValue={values[field.name] || field.value}
                required={!field.optional}
                min={field.type === 'number' ? 0.01 : undefined}
                max={field.max}
                step={field.type === 'number' ? '0.01' : undefined}
                accept={
                  field.type === 'file'
                    ? '.pdf,.png,.jpg,.jpeg,.csv'
                    : undefined
                }
              />
            )}
          </Field>
        ))}
        {error && <Alert tone="error">{error}</Alert>}
        <Alert>Changes are saved for this preview session.</Alert>
        <div className="flex justify-end gap-2 pt-2">
          <Button type="button" variant="outline" onClick={close}>
            Cancel
          </Button>
          <Button type="submit">
            {financial ? 'Review transaction' : 'Save & continue'}{' '}
            <ArrowRight />
          </Button>
        </div>
      </form>
    )
  if (stage === 1)
    return (
      <div className="space-y-5">
        <h3 className="text-lg font-semibold">Review your transaction</h3>
        <div className="rounded-xl border px-4">
          {form.fields.map((field) => (
            <div className="data-row text-sm" key={field.name}>
              <span className="text-muted-foreground">{field.label}</span>
              <span className="max-w-[65%] text-right font-semibold">
                {field.name === 'amount'
                  ? money(Number(values[field.name]))
                  : values[field.name]}
              </span>
            </div>
          ))}
          <div className="data-row text-sm">
            <span className="text-muted-foreground">Fee</span>
            <span>৳0.00 · Sample</span>
          </div>
        </div>
        <Alert>
          Review carefully. This action updates local demo data only.
        </Alert>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => setStage(0)}>
            Back
          </Button>
          <Button className="flex-1" onClick={() => setStage(2)}>
            Confirm & continue <ShieldCheck />
          </Button>
        </div>
      </div>
    )
  if (stage === 2)
    return (
      <div className="space-y-5 text-center">
        <ShieldCheck className="mx-auto size-10 text-primary" />
        <h3 className="text-lg font-semibold">Authorize with your PIN</h3>
        <DigitInput
          label="Confirmation PIN"
          value={pin}
          onChange={setPin}
          length={4}
          secret
        />
        <p className="text-xs text-muted-foreground">
          Demo transaction PIN: 4821
        </p>
        {error && <Alert tone="error">{error}</Alert>}
        <Button
          className="w-full"
          onClick={() => {
            if (pin !== '4821') {
              setError('Incorrect PIN. Use 4821 for this preview.')
              return
            }
            setError('')
            setStage(3)
          }}
        >
          Authorize {money(Number(values.amount))}
        </Button>
        <SecurityNote />
      </div>
    )
  if (stage === 3)
    return (
      <div role="status" className="py-12 text-center">
        <LoaderCircle className="processing-ring mx-auto mb-4 size-10 text-primary" />
        <h3 className="text-lg font-semibold">Processing your transaction</h3>
        <p className="muted mt-2">Preparing your confirmation...</p>
      </div>
    )
  return (
    <div className="space-y-5 py-3 text-center">
      {status === 'Failed' ? (
        <XCircle className="mx-auto size-12 text-destructive" />
      ) : (
        <CheckCircle2
          className={cn(
            'mx-auto size-12',
            status === 'Pending' ? 'text-warning' : 'text-success',
          )}
        />
      )}
      <h3 className="text-xl font-semibold">
        {status === 'Completed'
          ? 'Transaction complete'
          : status === 'Pending'
            ? 'Transaction pending review'
            : 'Transaction could not be completed'}
      </h3>
      <p className="money text-3xl font-semibold">
        {money(Number(values.amount))}
      </p>
      <p className="muted">
        {status === 'Failed'
          ? 'Your balance was not changed. You can try again.'
          : status === 'Pending'
            ? 'Your demo request is waiting for review.'
            : form.title}
      </p>
      <StatusBadge status={status} />
      {status !== 'Failed' && (
        <Button
          variant="outline"
          className="w-full"
          onClick={() =>
            downloadReceipt({
              reference: 'STL-DEMO',
              recipient: form.title,
              amount: Number(values.amount),
              currency: 'BDT',
              status,
            })
          }
        >
          <Download />
          Download receipt
        </Button>
      )}
      <Button
        className="w-full"
        onClick={
          status === 'Failed'
            ? () => {
                setStage(0)
                setPin('')
              }
            : close
        }
      >
        {status === 'Failed' ? 'Try again' : 'Done'}
      </Button>
    </div>
  )
}
