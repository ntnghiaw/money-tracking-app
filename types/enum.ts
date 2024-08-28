export enum ModalType {
  SignIn = 'signin',
  SignUp = 'signup',
}


export enum WalletType {
  Private = 'private',
  Shared = 'shared',
}

export enum TransactionType {
  Income = 'income',
  Expense = 'expense',
}

export enum Gender {
  Male = 'male',
  Female = 'female',
  Other = 'other',
}

export enum FinancialPlanType {
  Goal = 'goal',
  Budget = 'budget',
}

export interface Tokens {
  accessToken: string
  refreshToken: string
}

export interface UserResponse {
  _id: string
  name: string
  email: string
  avatar_url: string
  wallets: string[]
}

export interface WalletResponse {
  _id: string
  name: string
  currency: string
  balance: number
  type: WalletType
  transactions: Transaction[]
  financial_plans: FinancialPlan[]
  debts: Debt[]
}

export interface CategoryResponse {
  _id: string
  name: string
  icon: string
  type: TransactionType
  subCategories: SubCategory[]
}

export interface WalletResponse {
  _id: string
  name: string
  currency: string
  balance: number
  type: WalletType
  
}

export interface TransactionResponse {
  _id: string
  amount: number
  category: SubCategory
  createdAt: string
  description: string
  type: TransactionType
}


export interface Response<T> {
  message: string
  status: number
  metadata: T
}

export interface AuthResponse {
  tokens: Tokens
  user: User
}

export interface AuthState {
  tokens: Tokens
  userId: string
  walletId: string
  [others: string]: any
  isAuthenticated: boolean
}


export interface Wallet {
  _id: string
  name: string
  balance: number
  currency: string
  type: WalletType
  image_url?: string
  transactions: string[]
  financial_plans: string[]
  debts: string[]
  createdAt: string
}

export interface WalletsState {
  wallets: string[]
  currentWallet: string
  currentCurrency: string

}

export type FinancialPlanAttribute = Goal | Budget

export interface FinancialPlan {
  _id: string
  name: string
  description?: string
  type: FinancialPlanType
  records?: Transaction[]
  attribute: FinancialPlanAttribute
}

export interface Goal {
  targetAmount: number
  desiredDate: string
  currentAmount: number
  records: Transaction[]
}

export interface Debt {
  name: string
  _id: string
  amount: number
  borrower: string
  lender: string
  description: string
  dueDate: string
  status: 'active' | 'completed' | 'overdue'
  interestRate: number
}

export interface Budget {
  targetAmount: number
  spentAmount: number
  categories: SubCategory[]
  startDate: string
  dueDate: string
  records: Transaction[]
}



export interface Category {
  _id: string
  name: string
  icon: string
  type: TransactionType
  sub_categories: SubCategory[]
}
export interface SubCategory {
  _id: string
  name: string
  icon: string
  belong_to: string
}

export interface Transaction {
  _id: string
  amount: number
  category: SubCategory 
  createdAt: string
  description: string
  type: TransactionType
}

export interface User {
  _id: string
  name: string
  email: string
  avatar_url: string
  dob?: string
  gender?: 'male' | 'female'
  phone?: string
  categories: string[]
  wallets: string[]
}

export type UserProfile = Pick<User, 'name' | 'gender' | 'avatar_url' | 'dob' | '_id' | 'email' | 'phone'>
