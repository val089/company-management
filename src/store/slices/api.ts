import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import { Employee, EmployeeOmitID, Expense, ExpenseOmitID } from '@app/types';
// import { getTimestampFirstDayOfMonthsAgo } from '@app/utils/getTimestampFirstDayOfMonthsAgo';

const employeesRef = firestore().collection('employees');
const expenseRef = firestore().collection('expenses');

interface FetchExpensesParams {
  filterByMonthsNumber?: boolean;
  monthsNumber?: number;
}

//  .where('createdAt', '<', firstDayOfMonthsAgo)

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fakeBaseQuery(),
  tagTypes: ['Employees', 'Expenses'],
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
    fetchExpenses: builder.query<Expense[], FetchExpensesParams>({
      queryFn: async () => {
        try {
          const userId = auth().currentUser?.uid;
          const allExpenses = await expenseRef.where('userId', '==', userId).get();

          const expenses = [] as Expense[];
          for (const doc of allExpenses.docs) {
            expenses.push({
              id: doc.id,
              ...doc.data(),
            } as Expense);
          }
          return { data: expenses };
        } catch (error) {
          return { error };
        }
      },
      providesTags: ['Expenses'],
    }),
    // fetchExpenses: builder.query<Expense[], FetchExpensesParams>({
    //   queryFn: async ({ filterByMonthsNumber = false, monthsNumber = 3 }) => {
    //     try {
    //       const firstDayOfMonthsAgo = getTimestampFirstDayOfMonthsAgo(monthsNumber);

    //       const userId = auth().currentUser?.uid;
    //       const allExpenses = await expenseRef.where('userId', '==', userId).get();

    //       const expenses = [] as Expense[];
    //       for (const doc of allExpenses.docs) {
    //         expenses.push({
    //           id: doc.id,
    //           ...doc.data(),
    //         } as Expense);
    //       }
    //       return { data: expenses };
    //     } catch (error) {
    //       return { error };
    //     }
    //   },
    //   providesTags: ['Expenses'],
    // }),
    addExpense: builder.mutation({
      queryFn: async (expense: ExpenseOmitID) => {
        try {
          await expenseRef.add(expense);
          return { data: 'ok' };
        } catch (error) {
          return { error };
        }
      },
      invalidatesTags: ['Expenses'],
    }),
  }),
});

export const {
  useFetchEmployeesQuery,
  useAddEmployeeMutation,
  useUpdateEmployeeMutation,
  useAddExpenseMutation,
  useFetchExpensesQuery,
} = apiSlice;
