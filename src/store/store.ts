import { configureStore } from '@reduxjs/toolkit';
import { employeesApiSlice } from './slices/employeesAPI';
import employeesReducer from './slices/employees';

export const store = configureStore({
  reducer: {
    [employeesApiSlice.reducerPath]: employeesApiSlice.reducer,
    employees: employeesReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      // serializableCheck: false, // https://stackoverflow.com/questions/61704805/getting-an-error-a-non-serializable-value-was-detected-in-the-state-when-using
    }).concat(employeesApiSlice.middleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
