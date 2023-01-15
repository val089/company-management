import * as Yup from 'yup';

export const validationSchema = Yup.object().shape({
  email: Yup.string().email('Invalid e-mail address').required('Enter your e-mail'),
  password: Yup.string()
    .min(8)
    .required('required')
    .matches(/[a-z]/)
    .matches(/[A-Z]/)
    .matches(/[0-9]/),
  repeatPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Must be the same')
    .required('Enter your password'),
});

export type SignUpFormValuesType = Yup.InferType<typeof validationSchema>;
