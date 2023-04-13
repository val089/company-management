import React, { useCallback } from 'react';
import { View, StyleSheet } from 'react-native';
import { useForm, Controller, FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { AddExpenseFormValuesType, validationSchema } from './validationSchema';
import { Typography, CustomButton, Input, Radio } from '@app/components';

// const sexOptions = ['Woman', 'Man', 'Non-binary', 'I prefer not to answer'];

const initialValues = {
  amount: '',
  type: '',
};

interface AddExpenseFormProps {
  onSubmit: (data: AddExpenseFormValuesType) => Promise<void>;
}

export const AddExpenseForm = ({ onSubmit }: AddExpenseFormProps) => {
  const methods = useForm<AddExpenseFormValuesType>({
    defaultValues: initialValues,
    resolver: yupResolver(validationSchema),
    mode: 'onChange',
  });

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmitHandler = useCallback(
    async (data: AddExpenseFormValuesType) => {
      console.log(data);
      await onSubmit(data);
    },
    [onSubmit],
  );

  return (
    <FormProvider {...methods}>
      <View style={styles.typeContainer}>
        <Controller
          control={control}
          name="type"
          render={({ field }) => (
            <Radio
              onPress={() => field.onChange('expense')}
              option={field.value}
              size={31}
              value="expense"
              label="expense"
            />
          )}
        />
        <Controller
          control={control}
          name="type"
          render={({ field }) => (
            <Radio
              onPress={() => field.onChange('income')}
              option={field.value}
              size={31}
              value="income"
              label="income"
            />
          )}
        />
      </View>

      <Input
        label="Amount"
        name="amount"
        control={control}
        keyboardType="number-pad"
        style={styles.input}
      />

      {/* <View style={{ marginTop: 30 }}>
        <Select label="Sex" options={sexOptions} control={control} name="category" />
      </View> */}

      <View style={styles.buttonsContainer}>
        <CustomButton
          onPress={handleSubmit(onSubmitHandler)}
          style={styles.button}
          disabled={isSubmitting}>
          <Typography type="button">ADD</Typography>
        </CustomButton>
      </View>
    </FormProvider>
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
  typeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 16,
  },
});
