import * as Yup from 'yup';

export const validationSchema = Yup.object({
  firstName: Yup.string().required('Enter first name'),
  lastName: Yup.string().required('Enter last name'),
  jobPosition: Yup.string().required('Enter job position'),
  salary: Yup.string().required('Enter salary'),
  email: Yup.string().email('Invalid e-mail address').required('Enter e-mail'),
  employmentDate: Yup.date().required('Enter employment date'),
});

export type AddEmployeeFormValuesType = Yup.InferType<typeof validationSchema>;
