import { Employee } from '@app/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

type EmployeesState = {
  employees: Employee[];
};

const initialState: EmployeesState = {
  employees: [],
};

const employeesSlice = createSlice({
  name: 'employees',
  initialState,
  reducers: {
    setEmployees: (state, action: PayloadAction<Employee[]>) => {
      if (action.payload) {
        state.employees = action.payload;
      }
    },
  },
});

export const { setEmployees } = employeesSlice.actions;
export const selectEmployees = (state: RootState) => state.employees.employees;

export default employeesSlice.reducer;
