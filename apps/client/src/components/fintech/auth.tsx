import { useEffect, useState } from 'react'
import { useNavigate } from '@tanstack/react-router'
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Eye,
  EyeOff,
  Fingerprint,
  LockKeyhole,
  Mail,
  ShieldCheck,
  Smartphone,
  Wallet,
} from 'lucide-react'
import { Switch } from '#/components/ui/switch'
import {
  Alert,
  AppLink,
  BankCard,
  Brand,
  Button,
  DigitInput,
  Field,
  Input,
  SecurityNote,
  useDemo,
} from './shared'
import { cn } from '#/lib/utils'

export const authPages = [
  'login',
  'register',
  'email-verification',
  'phone-verification',
  'otp-verification',
  'forgot-password',
  'reset-password',
  'pin-setup',
  'security-setup',
  'welcome',
  'onboarding',
  'session-expired',
  'device-verification',
]
const copy: Record<string, [string, string]> = {
  login: [
    'Welcome back.',
    'Your money, your plans. Let’s pick up where you left off.',
  ],
  register: [
    'A fresh start for your money.',
    'Create your Setlr account. It takes just a few minutes.',
  ],
  'email-verification': [
    'Verify your email.',
    'We sent a 6-digit code to akram.hossain@email.com.',
  ],
  'phone-verification': [
    'Verify your phone.',
    'Confirm the number you’ll use to keep your account secure.',
  ],
  'otp-verification': [
    'One quick security check.',
    'Enter the 6-digit code sent to +880 1714 ••• 906.',
  ],
  'device-verification': [
    'A new device? Let’s check.',
    'Confirm your identity before signing in on this device.',
  ],
  'forgot-password': [
    'Let’s get you back in.',
    'Enter your email or phone to start a password reset.',
  ],
  'reset-password': [
    'A new password. A fresh start.',
    'Choose a strong password you haven’t used before.',
  ],
  'pin-setup': [
    'Your money. Your PIN.',
    'Create a 4-digit PIN to authorize payments.',
  ],
  'security-setup': [
    'One more layer of confidence.',
    'Choose the security options that work for you.',
  ],
  welcome: [
    'Money moves. Life happens.',
    'A wallet for today. A little more possibility for tomorrow.',
  ],
  onboarding: [
    'Make yourself at home.',
    'A few preferences to get your wallet ready.',
  ],
  'session-expired': [
    'Your session has ended.',
    'Sign in again to keep your account protected.',
  ],
}
export function AuthPage({ page }: { page: string }) {
  const navigate = useNavigate()
  const { toast } = useDemo()
  const [channel, setChannel] = useState('Email')
  const [password, setPassword] = useState('')
  const [repeat, setRepeat] = useState('')
  const [show, setShow] = useState(false)
  const [code, setCode] = useState('')
  const [pin, setPin] = useState('')
  const [confirmingPin, setConfirmingPin] = useState(false)
  const [error, setError] = useState('')
  const [seconds, setSeconds] = useState(120)
  const [sent, setSent] = useState(false)
  const [biometric, setBiometric] = useState(false)
  const [twoFactor, setTwoFactor] = useState(true)
  const [slide, setSlide] = useState(0)
  const verification = [
    'email-verification',
    'otp-verification',
    'device-verification',
  ].includes(page)
  useEffect(() => {
    if (!verification || seconds <= 0) return
    const timer = setTimeout(() => setSeconds((s) => s - 1), 1000)
    return () => clearTimeout(timer)
  }, [verification, seconds])
  function go(next: string) {
    if (next === 'dashboard') navigate({ to: '/' })
    else navigate({ to: '/$page', params: { page: next } })
  }
  function submitAuth(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (password.length < 8) {
      setError('Use at least 8 characters for your password.')
      return
    }
    if (page === 'register') go('email-verification')
    else {
      toast('Signed in to the demo wallet.')
      go('dashboard')
    }
  }
  return (
    <div className="grid min-h-[100dvh] lg:grid-cols-[1.05fr_1fr]">
      <aside className="balance-card brand-orbits relative hidden flex-col overflow-hidden px-12 py-10 lg:flex">
        <AppLink page="dashboard">
          <Brand light />
        </AppLink>
        <div className="relative z-10 my-auto max-w-lg py-14">
          <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/20 px-3 py-1.5 text-xs text-white/80">
            <span className="size-1.5 rounded-full bg-brand-yellow" />A little
            more possibility
          </span>
          <h2 className="text-[48px] leading-[1.12] font-semibold tracking-[-1.6px]">
            Your money.
            <br />
            Moving with you.
          </h2>
          <p className="mt-5 max-w-sm text-lg leading-relaxed text-white/70">
            From your morning coffee to your next big plan. Make every money
            move feel simple.
          </p>
          <div className="relative mt-12 h-64">
            <div className="absolute top-0 left-0 w-[315px] rotate-[-6deg] rounded-2xl border border-white/15 bg-white/10 p-5">
              <p className="text-xs text-white/70">Personal wallet</p>
              <p className="money mt-2 text-3xl font-semibold">৳128,450.00</p>
              <div className="mt-5 flex gap-2">
                <span className="rounded-lg bg-white/15 px-3 py-2 text-xs">
                  Send money ↗
                </span>
                <span className="rounded-lg bg-white/15 px-3 py-2 text-xs">
                  Add money +
                </span>
              </div>
            </div>
            <div className="absolute top-28 right-1 w-[265px] rotate-[7deg]">
              <BankCard virtual />
            </div>
            <div className="absolute top-14 right-0 rounded-xl border bg-card p-3 text-foreground shadow-sm">
              <p className="flex items-center gap-2 text-xs font-semibold">
                <CheckCircle2 className="size-4 text-success" />
                Payment complete
              </p>
              <p className="mt-1 pl-6 text-xs text-muted-foreground">
                One less thing to think about.
              </p>
            </div>
          </div>
        </div>
        <p className="relative z-10 text-xs text-white/60">
          Setlr design preview · Personal finance, with room for business.
        </p>
      </aside>
      <div className="flex flex-col p-6 sm:p-10">
        <div className="flex items-center justify-between">
          <AppLink page="dashboard" className="lg:hidden">
            <Brand />
          </AppLink>
          <AppLink
            page="dashboard"
            className="ml-auto text-sm text-muted-foreground"
          >
            Explore demo <ArrowUpRightSmall />
          </AppLink>
        </div>
        <div className="mx-auto my-auto w-full max-w-[410px] py-12">
          <div className="mb-8">
            {page !== 'login' && page !== 'welcome' && (
              <AppLink
                page="login"
                className="mb-6 inline-flex items-center gap-2 text-xs text-muted-foreground"
              >
                <ArrowLeft className="size-3.5" />
                Back to sign in
              </AppLink>
            )}
            <h1 className="text-[31px] leading-tight font-semibold tracking-[-0.8px]">
              {copy[page][0]}
            </h1>
            <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground">
              {copy[page][1]}
            </p>
          </div>
          {(page === 'login' || page === 'register') && (
            <>
              <div className="mb-6 flex rounded-lg bg-muted p-1">
                {['Email', 'Phone'].map((c) => (
                  <button
                    key={c}
                    className={cn(
                      'flex flex-1 items-center justify-center gap-2 rounded-md py-2 text-sm',
                      c === channel
                        ? 'bg-card font-semibold shadow-sm'
                        : 'text-muted-foreground',
                    )}
                    onClick={() => setChannel(c)}
                  >
                    {c === 'Email' ? (
                      <Mail className="size-4" />
                    ) : (
                      <Smartphone className="size-4" />
                    )}
                    {c}
                  </button>
                ))}
              </div>
              <form className="space-y-5" onSubmit={submitAuth}>
                {page === 'register' && (
                  <Field label="Full name">
                    <Input
                      placeholder="Your full name"
                      required
                      autoComplete="name"
                    />
                  </Field>
                )}
                <Field
                  label={channel === 'Email' ? 'Email address' : 'Phone number'}
                >
                  <Input
                    type={channel === 'Email' ? 'email' : 'tel'}
                    placeholder={
                      channel === 'Email' ? 'you@example.com' : '+880 17...'
                    }
                    required
                    autoComplete={channel === 'Email' ? 'email' : 'tel'}
                  />
                </Field>
                <Field label="Password">
                  <div className="relative">
                    <Input
                      aria-label="Password"
                      type={show ? 'text' : 'password'}
                      placeholder="At least 8 characters"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      autoComplete={
                        page === 'register'
                          ? 'new-password'
                          : 'current-password'
                      }
                      required
                      className="pr-11"
                    />
                    <button
                      type="button"
                      aria-label={show ? 'Hide password' : 'Show password'}
                      onClick={() => setShow(!show)}
                      className="absolute top-1 right-1 flex size-10 items-center justify-center text-muted-foreground"
                    >
                      {show ? (
                        <EyeOff className="size-4" />
                      ) : (
                        <Eye className="size-4" />
                      )}
                    </button>
                  </div>
                </Field>
                {page === 'login' ? (
                  <div className="flex items-center justify-between text-sm">
                    <label className="flex items-center gap-2">
                      <input type="checkbox" className="accent-primary" />
                      Remember me
                    </label>
                    <AppLink
                      page="forgot-password"
                      className="font-semibold text-primary"
                    >
                      Forgot password?
                    </AppLink>
                  </div>
                ) : (
                  <label className="flex items-start gap-2 text-sm text-muted-foreground">
                    <input
                      type="checkbox"
                      required
                      className="mt-1 accent-primary"
                    />
                    <span>
                      I agree to the{' '}
                      <AppLink
                        page="legal"
                        className="font-semibold text-primary"
                      >
                        Terms & conditions
                      </AppLink>{' '}
                      and Privacy policy.
                    </span>
                  </label>
                )}
                {error && <Alert tone="error">{error}</Alert>}
                <Button className="h-11 w-full" type="submit">
                  {page === 'login' ? 'Sign in' : 'Create account'}
                  <ArrowRight />
                </Button>
              </form>
              <div className="my-6 flex items-center gap-3">
                <span className="flex-1 border-t" />
                <span className="text-xs text-muted-foreground">or</span>
                <span className="flex-1 border-t" />
              </div>
              <Button
                variant="outline"
                className="w-full"
                onClick={() => go('security-setup')}
              >
                <Fingerprint />
                Continue with biometrics
              </Button>
              <p className="mt-7 text-center text-sm text-muted-foreground">
                {page === 'login'
                  ? 'New to Setlr?'
                  : 'Already have an account?'}{' '}
                <AppLink
                  page={page === 'login' ? 'register' : 'login'}
                  className="ml-1 font-semibold text-primary"
                >
                  {page === 'login' ? 'Create an account' : 'Sign in'}
                </AppLink>
              </p>
            </>
          )}
          {verification && (
            <div className="space-y-6">
              <DigitInput value={code} onChange={setCode} />
              <p className="text-center text-xs text-muted-foreground">
                Demo code: <strong>123456</strong> ·{' '}
                {seconds > 0 ? `Expires in ${seconds}s` : 'Code expired'}
              </p>
              {error && <Alert tone="error">{error}</Alert>}
              <Button
                className="w-full"
                onClick={() => {
                  if (seconds <= 0)
                    return setError('OTP expired. Request a new code.')
                  if (code !== '123456')
                    return setError(
                      'Incorrect code. Enter 123456 for this demo.',
                    )
                  go(
                    page === 'email-verification'
                      ? 'phone-verification'
                      : page === 'device-verification'
                        ? 'dashboard'
                        : 'pin-setup',
                  )
                }}
              >
                Verify & continue <ArrowRight />
              </Button>
              <p className="text-center text-sm text-muted-foreground">
                Didn’t get the code?{' '}
                <button
                  className="font-semibold text-primary"
                  onClick={() => {
                    setSeconds(120)
                    setCode('')
                    setError('')
                    toast('New demo code ready: 123456.')
                  }}
                >
                  Resend code
                </button>
              </p>
              <button
                className="mx-auto block text-xs text-muted-foreground underline"
                onClick={() => setSeconds(0)}
              >
                Preview expired code
              </button>
            </div>
          )}
          {page === 'phone-verification' && (
            <form
              className="space-y-5"
              onSubmit={(e) => {
                e.preventDefault()
                go('otp-verification')
              }}
            >
              <Field label="Country code">
                <select className="select">
                  <option>Bangladesh (+880)</option>
                  <option>China (+86)</option>
                </select>
              </Field>
              <Field label="Phone number">
                <Input
                  type="tel"
                  pattern="[0-9+ -]{8,16}"
                  placeholder="1714 582 906"
                  required
                />
              </Field>
              <Alert>
                We’ll show a sample OTP on the next screen. No SMS is sent.
              </Alert>
              <Button type="submit" className="w-full">
                Send verification code <ArrowRight />
              </Button>
            </form>
          )}
          {page === 'forgot-password' &&
            (sent ? (
              <div className="space-y-5">
                <CheckCircle2 className="size-12 text-success" />
                <h2 className="text-xl font-semibold">Check your inbox</h2>
                <p className="muted">
                  In a live app, you’d receive a reset link. Continue below to
                  explore the password reset.
                </p>
                <AppLink page="reset-password">
                  <Button className="w-full">
                    Continue to reset password <ArrowRight />
                  </Button>
                </AppLink>
              </div>
            ) : (
              <form
                className="space-y-5"
                onSubmit={(e) => {
                  e.preventDefault()
                  setSent(true)
                }}
              >
                <Field label="Email address">
                  <Input type="email" placeholder="you@example.com" required />
                </Field>
                <Button type="submit" className="w-full">
                  Send reset link <ArrowRight />
                </Button>
              </form>
            ))}
          {page === 'reset-password' && (
            <form
              className="space-y-5"
              onSubmit={(e) => {
                e.preventDefault()
                if (password.length < 8)
                  return setError('Use at least 8 characters.')
                if (password !== repeat)
                  return setError('Passwords do not match.')
                toast('Demo password reset complete.')
                go('login')
              }}
            >
              <Field label="New password">
                <Input
                  type="password"
                  autoComplete="new-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Field>
              <Field label="Confirm password">
                <Input
                  type="password"
                  autoComplete="new-password"
                  required
                  value={repeat}
                  onChange={(e) => setRepeat(e.target.value)}
                />
              </Field>
              <p className="text-xs text-muted-foreground">
                Use at least 8 characters with a mix of letters and numbers.
              </p>
              {error && <Alert tone="error">{error}</Alert>}
              <Button type="submit" className="w-full">
                Reset password <LockKeyhole />
              </Button>
            </form>
          )}
          {page === 'pin-setup' && (
            <div className="space-y-6">
              <div className="rounded-xl bg-secondary p-4">
                <p className="text-sm font-semibold">
                  {confirmingPin
                    ? 'Confirm your new PIN'
                    : 'Create your transaction PIN'}
                </p>
                <p className="mt-1 text-xs text-muted-foreground">
                  {confirmingPin
                    ? 'Enter the same 4 digits again.'
                    : 'Choose a PIN you can remember. Avoid repeating digits.'}
                </p>
              </div>
              <DigitInput
                value={code}
                onChange={setCode}
                length={4}
                secret
                label={confirmingPin ? 'Confirm PIN' : 'New PIN'}
              />
              {error && <Alert tone="error">{error}</Alert>}
              <Button
                className="w-full"
                onClick={() => {
                  if (code.length !== 4) return setError('Enter a 4-digit PIN.')
                  if (!confirmingPin) {
                    setPin(code)
                    setCode('')
                    setConfirmingPin(true)
                    setError('')
                  } else if (code !== pin) {
                    setError('The PINs do not match. Try again.')
                  } else {
                    toast(
                      'Demo PIN setup complete. Sample payment PIN remains 4821.',
                    )
                    go('security-setup')
                  }
                }}
              >
                {confirmingPin ? 'Confirm PIN' : 'Continue'} <ArrowRight />
              </Button>
              <p className="text-center text-xs text-muted-foreground">
                PIN setup preview · No real credential is stored.
              </p>
            </div>
          )}
          {page === 'security-setup' && (
            <div className="space-y-6">
              <div className="rounded-xl border p-5">
                <div className="flex items-center gap-3">
                  <Fingerprint className="size-7 text-primary" />
                  <div className="flex-1">
                    <p className="font-semibold">Biometric sign-in</p>
                    <p className="text-xs text-muted-foreground">
                      Face ID or fingerprint on your device
                    </p>
                  </div>
                  <Switch
                    checked={biometric}
                    onCheckedChange={setBiometric}
                    aria-label="Enable biometric sign-in"
                  />
                </div>
              </div>
              <div className="rounded-xl border p-5">
                <div className="flex items-center gap-3">
                  <ShieldCheck className="size-7 text-primary" />
                  <div className="flex-1">
                    <p className="font-semibold">Two-step verification</p>
                    <p className="text-xs text-muted-foreground">
                      An extra check on new devices
                    </p>
                  </div>
                  <Switch
                    checked={twoFactor}
                    onCheckedChange={setTwoFactor}
                    aria-label="Enable two-step verification"
                  />
                </div>
              </div>
              <Alert>
                These options preview security preferences. No biometric data is
                collected.
              </Alert>
              <Button className="w-full" onClick={() => go('verification')}>
                Continue to identity verification <ArrowRight />
              </Button>
              <AppLink
                page="dashboard"
                className="block text-center text-sm text-muted-foreground"
              >
                I’ll do this later
              </AppLink>
            </div>
          )}
          {page === 'welcome' && (
            <div className="space-y-6">
              <span className="flex size-20 items-center justify-center rounded-2xl bg-secondary">
                <Wallet className="size-10 text-primary" />
              </span>
              <h2 className="text-xl font-semibold">
                {
                  [
                    'One wallet. Everyday possibilities.',
                    'A clearer picture of your spending.',
                    'Room for your next big plan.',
                  ][slide]
                }
              </h2>
              <p className="muted">
                {
                  [
                    'Send, receive, and pay in a few simple steps.',
                    'Keep budgets, cards, and savings together.',
                    'Explore business payments when you’re ready.',
                  ][slide]
                }
              </p>
              <div className="flex gap-2">
                {[0, 1, 2].map((i) => (
                  <button
                    key={i}
                    aria-label={`Onboarding slide ${i + 1}`}
                    className={cn(
                      'h-2 rounded-full',
                      slide === i ? 'w-7 bg-primary' : 'w-2 bg-muted',
                    )}
                    onClick={() => setSlide(i)}
                  />
                ))}
              </div>
              <Button
                className="w-full"
                onClick={() =>
                  slide < 2 ? setSlide(slide + 1) : go('onboarding')
                }
              >
                Get started <ArrowRight />
              </Button>
              <AppLink
                page="login"
                className="block text-center text-sm text-primary"
              >
                I already have an account
              </AppLink>
            </div>
          )}
          {page === 'onboarding' && (
            <form
              className="space-y-5"
              onSubmit={(e) => {
                e.preventDefault()
                go('register')
              }}
            >
              <Field label="Country">
                <select className="select">
                  <option>Bangladesh</option>
                  <option>China</option>
                </select>
              </Field>
              <Field label="Language">
                <select className="select">
                  <option>English</option>
                  <option>বাংলা</option>
                </select>
              </Field>
              <div className="rounded-xl border p-4">
                <p className="mb-3 flex items-center gap-2 font-semibold">
                  <BellSmall />
                  Stay in the loop
                </p>
                <label className="flex items-center gap-2 text-sm">
                  <input type="checkbox" className="accent-primary" />
                  Enable transaction notification previews
                </label>
              </div>
              <Button type="submit" className="w-full">
                Continue <ArrowRight />
              </Button>
            </form>
          )}
          {page === 'session-expired' && (
            <div className="space-y-5">
              <Alert tone="warning">
                For your security, inactive sessions are closed automatically.
              </Alert>
              <AppLink page="login">
                <Button className="w-full">
                  Sign in again <ArrowRight />
                </Button>
              </AppLink>
            </div>
          )}
          <div className="mt-8">
            <SecurityNote />
          </div>
        </div>
        <div className="flex justify-center gap-5 text-xs text-muted-foreground">
          <AppLink page="legal">Privacy & terms</AppLink>
          <AppLink page="support">Help center</AppLink>
          <span>© 2026 Setlr</span>
        </div>
      </div>
    </div>
  )
}
function ArrowUpRightSmall() {
  return <ArrowRight className="ml-1 inline size-3.5 -rotate-45" />
}
function BellSmall() {
  return <Smartphone className="size-4 text-primary" />
}
