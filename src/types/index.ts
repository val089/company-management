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
