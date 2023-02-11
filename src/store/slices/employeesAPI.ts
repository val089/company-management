import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import { Employee, EmployeeOmitID } from '@app/types';

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
          await ref.add(employee);
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
          await ref.doc(employee.id).update(employee);
          return { data: 'ok' };
        } catch (error) {
          return { error };
        }
      },
    }),
  }),
});

export const { useFetchEmployeesQuery, useAddEmployeeMutation, useUpdateEmployeeMutation } =
  employeesApiSlice;
