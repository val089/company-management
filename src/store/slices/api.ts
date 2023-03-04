import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import { Employee, EmployeeOmitID, Expense } from '@app/types';

const employeesRef = firestore().collection('employees');
const expenseRef = firestore().collection('expenses');

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fakeBaseQuery(),
  tagTypes: ['Employees'],
  endpoints: builder => ({
    fetchEmployees: builder.query({
      queryFn: async () => {
        try {
          const userId = auth().currentUser?.uid;
          const allEmployees = await employeesRef.where('userId', '==', userId).get();
          const employeesList = [] as Employee[];
          for (const doc of allEmployees.docs) {
            employeesList.push({
              id: doc.id,
              ...doc.data(),
            } as Employee);
          }
          return { data: employeesList };
        } catch (error) {
          return { error };
        }
      },
      providesTags: ['Employees'],
    }),
    addEmployee: builder.mutation({
      queryFn: async (employee: EmployeeOmitID) => {
        try {
          await employeesRef.add(employee);
          return { data: 'ok' };
        } catch (error) {
          return { error };
        }
      },
      invalidatesTags: ['Employees'],
    }),
    updateEmployee: builder.mutation({
      queryFn: async (employee: Employee) => {
        try {
          await employeesRef.doc(employee.id).update(employee);
          return { data: 'ok' };
        } catch (error) {
          return { error };
        }
      },
    }),
    addExpense: builder.mutation({
      queryFn: async (expense: Expense) => {
        try {
          await expenseRef.add(expense);
          return { data: 'ok' };
        } catch (error) {
          return { error };
        }
      },
    }),
  }),
});

export const {
  useFetchEmployeesQuery,
  useAddEmployeeMutation,
  useUpdateEmployeeMutation,
  useAddExpenseMutation,
} = apiSlice;
