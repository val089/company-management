import React, { useCallback } from 'react';
import { View, StyleSheet } from 'react-native';
import { Formik } from 'formik';

import { AddEmployeeFormValuesType, validationSchema } from './validationSchema';
import { CustomTextField } from '@app/components/CustomTextField';
import { Typography } from '@app/components/Typography';
import { CustomButton } from '@app/components/CustomButton';

const initialValues = {
  firstName: '',
  lastName: '',
  jobPosition: '',
  salary: '',
  email: '',
};

interface AddEmployeeFormProps {
  onSubmit: (data: AddEmployeeFormValuesType) => Promise<void>;
}

export const AddEmployeeForm = ({ onSubmit }: AddEmployeeFormProps) => {
  const onSubmitHandler = useCallback(
    async (data: AddEmployeeFormValuesType) => {
      await onSubmit(data);
    },
    [onSubmit],
  );

  return (
    <Formik
      validateOnChange
      validateOnBlur
      validationSchema={validationSchema}
      initialValues={initialValues as AddEmployeeFormValuesType}
      onSubmit={onSubmitHandler}>
      {({ handleChange, handleBlur, handleSubmit }) => (
        <View>
          <CustomTextField
            name="firstName"
            label="First name"
            onChangeText={handleChange('firstName')}
            onBlur={handleBlur('firstName')}
          />

          <View style={styles.inputGroup}>
            <CustomTextField
              name="lastName"
              label="Last name"
              onChangeText={handleChange('lastName')}
              onBlur={handleBlur('lastName')}
            />
          </View>

          <View style={styles.inputGroup}>
            <CustomTextField
              name="jobPosition"
              label="Job position"
              onChangeText={handleChange('jobPosition')}
              onBlur={handleBlur('jobPosition')}
            />
          </View>

          <View style={styles.inputGroup}>
            <CustomTextField
              name="email"
              label="E-mail"
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
            />
          </View>

          <View style={styles.inputGroup}>
            <CustomTextField
              name="salary"
              label="Salary"
              onChangeText={handleChange('salary')}
              onBlur={handleBlur('salary')}
            />
          </View>

          <View style={styles.buttonsContainer}>
            <CustomButton onPress={() => handleSubmit()} style={styles.button}>
              <Typography type="button">ADD</Typography>
            </CustomButton>
          </View>
        </View>
      )}
    </Formik>
  );
};

const styles = StyleSheet.create({
  inputGroup: {
    paddingTop: 30,
  },
  buttonsContainer: {
    paddingTop: 30,
  },
  button: {
    marginBottom: 20,
  },
});
