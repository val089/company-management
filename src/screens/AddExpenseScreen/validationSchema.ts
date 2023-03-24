import * as Yup from 'yup';

export const validationSchema = Yup.object({
  amount: Yup.string().required('Enter amount'),
  type: Yup.string().oneOf(['expense', 'income']).required('Enter type'),
  category: Yup.string().required('Enter category'),
});

export type AddExpenseFormValuesType = Yup.InferType<typeof validationSchema>;
