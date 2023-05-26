import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from '../store';

type ExpenseCategoriesState = {
  category: string;
};

const initialState: ExpenseCategoriesState = {
  category: 'category01',
};

const expenseCategorySlice = createSlice({
  name: 'expenseCategory',
  initialState,
  reducers: {
    setCategory: (state, action: PayloadAction<string>) => {
      state.category = action.payload;
    },
  },
});

export const { setCategory } = expenseCategorySlice.actions;
export const selectCategory = (state: RootState) => state.expenseCategory.category;

export default expenseCategorySlice.reducer;
