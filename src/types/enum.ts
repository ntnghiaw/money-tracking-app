export enum ModalType {
  SignIn = 'signin',
  SignUp = 'signup',
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
  type: 'private' | 'shared'
  transactions: Transaction[]
  financial_plans: FinancialPlan[]
  debts: Debt[]
}

export interface CategoryResponse {
  _id: string
  name: string
  icon: string
  type: 'expense' | 'income'
  subCategories: SubCategory[]
}

export interface WalletResponse {
  _id: string
  name: string
  currency: string
  balance: number
  type: 'private' | 'shared'
  
}

export interface TransactionResponse {
  _id: string
  amount: number
  category: SubCategory
  createdAt: string
  description: string
  type: 'expense' | 'income'
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
  type: 'private' | 'shared'
  image_url?: string
  transactions: string[]
  financial_plans: string[]
  debts: string[]
  createdAt: string
}

export interface WalletsState {
  wallets: string[]
  currentWallet?: string

}

export type FinancialPlanAttribute = Goal | Budget


export type FinancialPlan = {
  _id: string
  name: string
  description?: string
  type: 'budget'
  records?: Transaction[]
  attributes: Budget
} | {
  _id: string
  name: string
  description?: string
  type: 'goal'
  records?: Transaction[]
  attributes: Goal
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
  target_amount: number | string
  spentAmount: number | string
  categories: SubCategory[]
  start_date: string
  due_date: string
  records: Transaction[]
}



export interface Category {
  _id: string
  name: string
  icon: string
  type: 'expense' | 'income'
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
  title: string
  category: Category 
  createdAt: string
  description: string
  type: 'expense' | 'income'
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
