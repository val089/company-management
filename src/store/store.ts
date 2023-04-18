import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from './slices/api';
import employeesReducer from './slices/employees';
import expenseCategoryReducer from './slices/expenseCategory';

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    employees: employeesReducer,
    expenseCategory: expenseCategoryReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      // serializableCheck: false, // https://stackoverflow.com/questions/61704805/getting-an-error-a-non-serializable-value-was-detected-in-the-state-when-using
    }).concat(apiSlice.middleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
