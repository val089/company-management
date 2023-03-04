import { FirebaseAuthTypes } from '@react-native-firebase/auth';

export type AuthUserType = FirebaseAuthTypes.User;

export interface Employee {
  id: string;
  firstName: string;
  lastName: string;
  jobPosition: string;
  salary: string;
  email: string;
  createdAt: string;
  employmentDate: string;
  imageUri?: string;
}

export type EmployeeOmitID = Omit<Employee, 'id'>;

export type ExpenseType = 'income' | 'expense';
export interface Expense {
  type: ExpenseType;
  category: string;
  createdAt: string;
  amount: number;
  userId: string;
}

export type ExpenseOmitID = Omit<Expense, 'id'>;
