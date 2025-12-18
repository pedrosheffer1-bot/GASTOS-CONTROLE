
export interface Transaction {
  id: string;
  type: 'income' | 'expense';
  category: string;
  amount: number;
  date: string;
  merchant: string;
}

export interface UserProfile {
  name: string;
  balance: number;
  currency: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}
