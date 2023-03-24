import * as Yup from 'yup';

export const validationSchema = Yup.object({
  email: Yup.string().email('Invalid e-mail address').required('Enter your e-mail'),
  password: Yup.string()
    .min(8)
    .required('required')
    .matches(/[a-z]/)
    .matches(/[A-Z]/)
    .matches(/[0-9]/),
});

export type LoginFormValuesType = Yup.InferType<typeof validationSchema>;
