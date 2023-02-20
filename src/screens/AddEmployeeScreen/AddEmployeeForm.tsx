import React, { useCallback, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Formik } from 'formik';

import { AddEmployeeFormValuesType, validationSchema } from './validationSchema';
import { CustomTextField } from '@app/components/CustomTextField';
import { Typography } from '@app/components/Typography';
import { CustomButton } from '@app/components/CustomButton';
import DatePicker from 'react-native-date-picker';
import { TextFieldButton } from '@app/components/TextFieldButton';

const initialValues = {
  firstName: '',
  lastName: '',
  jobPosition: '',
  salary: '',
  email: '',
  employmentDate: new Date(),
};

interface AddEmployeeFormProps {
  onSubmit: (data: AddEmployeeFormValuesType) => Promise<void>;
}

export const AddEmployeeForm = ({ onSubmit }: AddEmployeeFormProps) => {
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);

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
      {({ handleChange, handleBlur, handleSubmit, values, setFieldValue, isSubmitting }) => (
        <>
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

            <View style={styles.inputGroup}>
              <TextFieldButton onPress={() => setIsDatePickerOpen(true)} label="Employment date:">
                <Typography type="normal" style={{ color: 'white' }}>
                  {values.employmentDate.toLocaleDateString('pl-PL')}
                </Typography>
              </TextFieldButton>
            </View>

            <View style={styles.buttonsContainer}>
              <CustomButton
                onPress={() => handleSubmit()}
                style={styles.button}
                disabled={isSubmitting}>
                <Typography type="button">ADD</Typography>
              </CustomButton>
            </View>
          </View>

          <DatePicker
            mode="date"
            modal
            open={isDatePickerOpen}
            date={values.employmentDate}
            onConfirm={(date: Date) => {
              setIsDatePickerOpen(false);
              setFieldValue('employmentDate', date);
            }}
            onCancel={() => {
              setIsDatePickerOpen(false);
            }}
          />
        </>
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
