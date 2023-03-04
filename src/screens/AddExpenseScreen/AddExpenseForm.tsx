import React, { useCallback } from 'react';
import { View, StyleSheet } from 'react-native';
import { Formik } from 'formik';

import { AddExpenseFormValuesType, validationSchema } from './validationSchema';
import { CustomTextField } from '@app/components/CustomTextField';
import { Typography } from '@app/components/Typography';
import { CustomButton } from '@app/components/CustomButton';

const initialValues = {
  amount: '',
  type: '',
  category: '',
};

interface AddExpenseFormProps {
  onSubmit: (data: AddExpenseFormValuesType) => Promise<void>;
}

export const AddExpenseForm = ({ onSubmit }: AddExpenseFormProps) => {
  const onSubmitHandler = useCallback(
    async (data: AddExpenseFormValuesType) => {
      await onSubmit(data);
    },
    [onSubmit],
  );

  return (
    <Formik
      validateOnChange
      validateOnBlur
      validationSchema={validationSchema}
      initialValues={initialValues as AddExpenseFormValuesType}
      onSubmit={onSubmitHandler}>
      {({ handleChange, handleBlur, handleSubmit, isSubmitting }) => (
        <>
          <View>
            <View style={styles.inputGroup}>
              <CustomTextField
                name="amount"
                label="Amount"
                onChangeText={handleChange('amount')}
                onBlur={handleBlur('amount')}
                keyboardType="number-pad"
              />
            </View>

            <View style={styles.inputGroup}>
              <CustomTextField
                name="type"
                label="Type"
                onChangeText={handleChange('type')}
                onBlur={handleBlur('type')}
              />
            </View>

            <View style={styles.inputGroup}>
              <CustomTextField
                name="category"
                label="Category"
                onChangeText={handleChange('category')}
                onBlur={handleBlur('category')}
              />
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
