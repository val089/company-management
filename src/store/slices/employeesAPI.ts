import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import { IEmployeeItem } from '@app/types';

const ref = firestore().collection('employees');

export const employeesApiSlice = createApi({
  reducerPath: 'employeesAPI',
  baseQuery: fakeBaseQuery(),
  tagTypes: ['Employees'],
  endpoints: builder => ({
    fetchEmployees: builder.query({
      queryFn: async () => {
        try {
          const userId = auth().currentUser?.uid;
          const allEmployees = await ref.where('userId', '==', userId).get();
          const employeesList = [] as IEmployeeItem[];
          for (const doc of allEmployees.docs) {
            employeesList.push({
              id: doc.id,
              ...doc.data(),
            } as IEmployeeItem);
          }
          return { data: employeesList };
        } catch (error) {
          return { error };
        }
      },
      providesTags: ['Employees'],
    }),
    addEmployee: builder.mutation({
      queryFn: async employee => {
        try {
          const userId = auth().currentUser?.uid;
          await ref.add({
            ...employee,
            userId,
            // createdAt: new Date(), // błąd z non-serializable values
            createdAt: new Date().toISOString(),
            employmentDate: employee.employmentDate.toISOString(),
          } as IEmployeeItem);
          return { data: 'ok' };
        } catch (error) {
          return { error };
        }
      },
      invalidatesTags: ['Employees'],
    }),
  }),
});

export const { useFetchEmployeesQuery, useAddEmployeeMutation } = employeesApiSlice;
