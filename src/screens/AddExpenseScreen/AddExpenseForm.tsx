import React, { useCallback } from 'react';
import { View, StyleSheet } from 'react-native';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { AddExpenseFormValuesType, validationSchema } from './validationSchema';
import { Typography } from '@app/components/Typography';
import { CustomButton } from '@app/components/CustomButton';
import { Input } from '@app/components/Input';

const initialValues = {
  amount: '',
  type: '',
  category: '',
};

interface AddExpenseFormProps {
  onSubmit: (data: AddExpenseFormValuesType) => Promise<void>;
}

export const AddExpenseForm = ({ onSubmit }: AddExpenseFormProps) => {
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<AddExpenseFormValuesType>({
    defaultValues: initialValues,
    resolver: yupResolver(validationSchema),
    mode: 'onChange',
  });

  const onSubmitHandler = useCallback(
    async (data: AddExpenseFormValuesType) => {
      await onSubmit(data);
    },
    [onSubmit],
  );

  return (
    <>
      <Input
        label="Amount"
        name="amount"
        control={control}
        keyboardType="number-pad"
        style={styles.input}
      />
      <Input label="Type" name="type" control={control} style={styles.input} />
      <Input label="Category" name="category" control={control} style={styles.input} />

      <View style={styles.buttonsContainer}>
        <CustomButton
          onPress={handleSubmit(onSubmitHandler)}
          style={styles.button}
          disabled={isSubmitting}>
          <Typography type="button">ADD</Typography>
        </CustomButton>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  input: {
    marginTop: 16,
  },
  buttonsContainer: {
    paddingTop: 30,
  },
  button: {
    marginBottom: 20,
  },
});
