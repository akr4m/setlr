import {
  ArrowLeftRight,
  BarChart3,
  Bell,
  BookOpen,
  CircleDollarSign,
  CreditCard,
  FileCheck2,
  FileText,
  Gift,
  Globe2,
  HelpCircle,
  Landmark,
  LayoutDashboard,
  Receipt,
  Settings,
  ShieldCheck,
  Target,
  TrendingUp,
  Users,
  Wallet,
} from 'lucide-react'

export const money = (amount: number, currency = 'BDT') =>
  `${currency === 'BDT' ? '৳' : currency === 'CNY' ? '¥' : '$'}${amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
export const pageInfo: Partial<
  Record<string, { title: string; description: string; icon: typeof Wallet }>
> = {
  dashboard: {
    title: 'Overview',
    description: 'A clear view of your money, all in one place.',
    icon: LayoutDashboard,
  },
  wallet: {
    title: 'Wallets',
    description: 'Your balances, ready for wherever life takes you.',
    icon: Wallet,
  },
  payments: {
    title: 'Payments',
    description: 'Move money with confidence. Across town or across borders.',
    icon: ArrowLeftRight,
  },
  cards: {
    title: 'Cards',
    description: 'One workspace. Complete control over every card.',
    icon: CreditCard,
  },
  transactions: {
    title: 'Transactions',
    description: 'Every movement of money, accounted for.',
    icon: Receipt,
  },
  beneficiaries: {
    title: 'Beneficiaries',
    description: 'The people and businesses you pay.',
    icon: Users,
  },
  savings: {
    title: 'Savings',
    description: 'Give your next big plan a head start.',
    icon: Target,
  },
  investments: {
    title: 'Investments',
    description: 'Build a portfolio around your ambitions.',
    icon: TrendingUp,
  },
  budgets: {
    title: 'Budgets & insights',
    description: 'Understand your spending. Make room for what matters.',
    icon: BarChart3,
  },
  loans: {
    title: 'Loans & financing',
    description: 'A little more room for your next big plan.',
    icon: Landmark,
  },
  credit: {
    title: 'Credit & installments',
    description: 'Plan purchases and stay ahead of repayments.',
    icon: CircleDollarSign,
  },
  rewards: {
    title: 'Rewards',
    description: 'More value from your everyday spending.',
    icon: Gift,
  },
  notifications: {
    title: 'Notifications',
    description: 'Your activity, updates, and reminders.',
    icon: Bell,
  },
  profile: {
    title: 'Your profile',
    description: 'Your details and business identity.',
    icon: Users,
  },
  security: {
    title: 'Security',
    description: 'Keep your money and your account protected.',
    icon: ShieldCheck,
  },
  settings: {
    title: 'Account settings',
    description: 'Make Setlr work your way.',
    icon: Settings,
  },
  support: {
    title: 'Help & support',
    description: 'A real answer when you need one.',
    icon: HelpCircle,
  },
  disputes: {
    title: 'Disputes & refunds',
    description: 'Track a payment issue from start to resolution.',
    icon: FileCheck2,
  },
  legal: {
    title: 'Legal & compliance',
    description: 'Clear terms. Transparent fees. Your choices.',
    icon: BookOpen,
  },
  statements: {
    title: 'Statements',
    description: 'Your finances, neatly documented.',
    icon: FileText,
  },
  'linked-accounts': {
    title: 'Linked accounts',
    description: 'Manage the accounts that fund your wallet.',
    icon: Landmark,
  },
  verification: {
    title: 'Verify your identity',
    description: 'A few details to unlock more from your wallet.',
    icon: ShieldCheck,
  },
  'business-payments': {
    title: 'Business payments',
    description: 'Suppliers, invoices, and cross-border settlement.',
    icon: Globe2,
  },
  'design-system': {
    title: 'Design system',
    description: 'The foundations, components, and states behind Setlr.',
    icon: LayoutDashboard,
  },
}
export const mainNav = [
  'dashboard',
  'wallet',
  'payments',
  'cards',
  'transactions',
  'beneficiaries',
  'business-payments',
]
export const growNav = ['savings', 'investments', 'budgets', 'rewards']
export const extraNav = [
  'loans',
  'credit',
  'statements',
  'linked-accounts',
  'verification',
  'profile',
  'security',
  'settings',
  'support',
  'disputes',
  'legal',
  'design-system',
]
export type Status =
  'Completed' | 'Pending' | 'Failed' | 'Refunded' | 'Processing'
export type Transaction = {
  id: string
  name: string
  initials: string
  category: string
  date: string
  amount: number
  currency: string
  status: Status
  incoming?: boolean
  note: string
}
export const transactions: Transaction[] = [
  {
    id: 'STL-10485',
    name: 'North End Coffee',
    initials: 'NE',
    category: 'Food & dining',
    date: '04 Oct, 11:24 AM',
    amount: 480,
    currency: 'BDT',
    status: 'Completed',
    note: 'QR payment · Gulshan',
  },
  {
    id: 'STL-10484',
    name: 'Nusrat Rahman',
    initials: 'NR',
    category: 'Money received',
    date: '04 Oct, 10:18 AM',
    amount: 2400,
    currency: 'BDT',
    status: 'Completed',
    incoming: true,
    note: 'Shared dinner bill',
  },
  {
    id: 'STL-10483',
    name: 'Daraz',
    initials: 'D',
    category: 'Shopping',
    date: '03 Oct, 04:48 PM',
    amount: 2850,
    currency: 'BDT',
    status: 'Completed',
    note: 'Online purchase · Debit card •• 4821',
  },
  {
    id: 'STL-10482',
    name: 'Shenzhen Jinhai Trading',
    initials: 'JT',
    category: 'Supplier payment',
    date: '04 Oct, 10:42 AM',
    amount: 12840,
    currency: 'CNY',
    status: 'Completed',
    note: 'Invoice JH-2026-084 · Packaging materials',
  },
  {
    id: 'STL-10481',
    name: 'Eastern Bank PLC',
    initials: 'EB',
    category: 'Money added',
    date: '04 Oct, 09:15 AM',
    amount: 250000,
    currency: 'BDT',
    status: 'Completed',
    incoming: true,
    note: 'Bank account •• 4821',
  },
  {
    id: 'STL-10480',
    name: 'Guangzhou Textiles Co.',
    initials: 'GT',
    category: 'Supplier payment',
    date: '03 Oct, 03:28 PM',
    amount: 8560,
    currency: 'CNY',
    status: 'Pending',
    note: 'Invoice GT-208 · Bank review in progress',
  },
  {
    id: 'STL-10479',
    name: 'Notion',
    initials: 'N',
    category: 'Software & tools',
    date: '03 Oct, 11:06 AM',
    amount: 24,
    currency: 'USD',
    status: 'Completed',
    note: 'Business subscription · Virtual card •• 9024',
  },
  {
    id: 'STL-10478',
    name: 'Nusrat Rahman',
    initials: 'NR',
    category: 'Money sent',
    date: '02 Oct, 04:35 PM',
    amount: 18500,
    currency: 'BDT',
    status: 'Completed',
    note: 'October freelance invoice',
  },
  {
    id: 'STL-10477',
    name: 'DESCO',
    initials: 'D',
    category: 'Bill payment',
    date: '02 Oct, 02:12 PM',
    amount: 3240,
    currency: 'BDT',
    status: 'Failed',
    note: 'Provider unavailable. Your balance was not charged.',
  },
  {
    id: 'STL-10476',
    name: 'Pathao',
    initials: 'P',
    category: 'Transport',
    date: '01 Oct, 06:20 PM',
    amount: 460,
    currency: 'BDT',
    status: 'Refunded',
    note: 'Refund credited to your BDT wallet.',
  },
]
export const recipients = [
  {
    id: '1',
    name: 'Shenzhen Jinhai Trading',
    initials: 'JT',
    detail: 'China · Bank of China •• 6318',
    type: 'Business',
    favorite: true,
  },
  {
    id: '2',
    name: 'Guangzhou Textiles Co.',
    initials: 'GT',
    detail: 'China · ICBC •• 2048',
    type: 'Business',
    favorite: true,
  },
  {
    id: '3',
    name: 'Nusrat Rahman',
    initials: 'NR',
    detail: 'Bangladesh · +880 1714 582 906',
    type: 'Personal',
    favorite: false,
  },
  {
    id: '4',
    name: 'Rafiq Hasan',
    initials: 'RH',
    detail: 'Bangladesh · BRAC Bank •• 8072',
    type: 'Personal',
    favorite: false,
  },
]
export const initialGoals = [
  { name: 'Rainy day fund', amount: 42500, target: 75000, icon: 'shield' },
  { name: 'A trip to Kyoto', amount: 28750, target: 120000, icon: 'building' },
  { name: 'New laptop', amount: 18400, target: 90000, icon: 'travel' },
]
export const initialNotices = [
  {
    title: 'Supplier payment completed',
    detail: 'Shenzhen Jinhai Trading received ¥12,840.00.',
    time: '12 minutes ago',
    type: 'Transaction',
    read: false,
  },
  {
    title: 'Your October statement is ready',
    detail: 'Download your account activity for September.',
    time: '1 hour ago',
    type: 'Account',
    read: false,
  },
  {
    title: 'Electricity bill due in 3 days',
    detail: 'Your saved DESCO bill is ৳3,240.00.',
    time: '2 hours ago',
    type: 'Reminder',
    read: false,
  },
  {
    title: 'New sign-in from Chrome on macOS',
    detail: 'Dhaka, Bangladesh · 04 Oct at 9:02 AM',
    time: '3 hours ago',
    type: 'Security',
    read: true,
  },
]
export const paymentModes: Partial<
  Record<
    string,
    { title: string; subtitle: string; label: string; recipient: string }
  >
> = {
  'supplier-payment': {
    title: 'Pay a supplier',
    subtitle: 'Prepare a documented payment to your China supplier.',
    label: 'Supplier receives',
    recipient: 'Verified supplier',
  },
  'send-money': {
    title: 'Send money',
    subtitle: 'To a contact, bank account, or supplier.',
    label: 'Recipient receives',
    recipient: 'Select a recipient',
  },
  'bank-transfer': {
    title: 'Bank transfer',
    subtitle: 'Pay directly to a verified bank account.',
    label: 'Transfer amount',
    recipient: 'Bank account',
  },
  'add-money': {
    title: 'Add money',
    subtitle: 'Fund your wallet from a linked bank or card.',
    label: 'Amount to add',
    recipient: 'Funding method',
  },
  'withdraw-money': {
    title: 'Withdraw money',
    subtitle: 'Move wallet funds to your linked bank.',
    label: 'Amount to withdraw',
    recipient: 'Destination account',
  },
  'request-money': {
    title: 'Request money',
    subtitle: 'Send a clear, trackable payment request.',
    label: 'Requested amount',
    recipient: 'Request from',
  },
  'bill-payment': {
    title: 'Pay a bill',
    subtitle: 'Keep your essential payments on track.',
    label: 'Payment amount',
    recipient: 'Bill provider',
  },
  'mobile-recharge': {
    title: 'Mobile recharge',
    subtitle: 'Top up a number in a few simple steps.',
    label: 'Recharge amount',
    recipient: 'Mobile operator',
  },
  'qr-payment': {
    title: 'QR payment',
    subtitle: 'Scan a merchant code and review before paying.',
    label: 'Payment amount',
    recipient: 'Merchant',
  },
}
