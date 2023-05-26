import { Controller, useFormContext } from 'react-hook-form';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { Radio } from '@app/components';
import { fontColor, GlobalStyles } from '@app/constants/styles';
import { ExpenseType } from '@app/types';

import { AddExpenseFormValuesType } from './validationSchema';

export const AmountAndType = () => {
  const {
    control,
    setValue,
    formState: { errors },
    watch,
  } = useFormContext<AddExpenseFormValuesType>();

  return (
    <>
      <View style={styles.typeContainer}>
        <Controller
          control={control}
          name="type"
          render={({ field }) => (
            <Radio
              onPress={() => setValue('type', 'expense')}
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
              onPress={() => setValue('type', 'income')}
              option={field.value}
              size={31}
              value="income"
              label="income"
            />
          )}
        />
      </View>
      <Controller
        control={control}
        name="amount"
        render={({ field: { onBlur, onChange, value } }) => (
          <View style={styles.currencyInputContainer}>
            <Text style={styles.currencyText}>
              {watch('type') === ExpenseType.INCOME ? '+' : '-'}
            </Text>
            <TextInput
              value={value}
              onBlur={onBlur}
              onChangeText={onChange}
              keyboardType="number-pad"
              textAlign="right"
              placeholder="0"
              style={[styles.currencyInput, styles.currencyText]}
            />
            <Text style={styles.currencyText}>PLN</Text>
          </View>
        )}
      />
      {errors.amount && <Text style={styles.currencyErrorMessage}>{errors.amount.message}</Text>}
    </>
  );
};

const styles = StyleSheet.create({
  input: {
    marginTop: 16,
  },
  typeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 16,
  },
  currencyInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  currencyText: {
    fontSize: 30,
    color: fontColor,
  },
  currencyInput: {
    flex: 1,
  },
  currencyErrorMessage: {
    color: GlobalStyles.colors.error100,
    textAlign: 'right',
  },
});
