import * as Yup from 'yup';

/^(?:\d|(?:[1-9]\d*))(?:[.,]\d{(1, 2)})?$/;

export const validationSchema = Yup.object({
  amount: Yup.string()
    .matches(
      /^(?<=\b)(?<!\d)(?:[1-9]\d*(?:,\d{8})*|0)(?:\.\d{1,2})?\b$/,
      'Give correct amount e.g. 100.50',
    )
    .required('Enter amount'),
  type: Yup.string().oneOf(['expense', 'income']).required('Enter type'),
  category: Yup.string().required(),
});

export type AddExpenseFormValuesType = Yup.InferType<typeof validationSchema>;
