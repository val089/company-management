import { Expense } from '@app/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

type ExpensesState = {
  expenses: Expense[];
};

const initialState: ExpensesState = {
  expenses: [],
};

const expensesSlice = createSlice({
  name: 'expenses',
  initialState,
  reducers: {
    setExpenses: (state, action: PayloadAction<Expense[]>) => {
      if (action.payload) {
        state.expenses = action.payload;
      }
    },
  },
});

export const { setExpenses } = expensesSlice.actions;
export const selectExpenses = (state: RootState) => state.expenses.expenses;

export default expensesSlice.reducer;
