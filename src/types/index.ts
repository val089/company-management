import { FirebaseAuthTypes } from '@react-native-firebase/auth';

export type AuthUserType = FirebaseAuthTypes.User;

export interface IEmployeeItem {
  id: string;
  firstName: string;
  lastName: string;
  jobPosition: string;
  salary: string;
  email: string;
}
