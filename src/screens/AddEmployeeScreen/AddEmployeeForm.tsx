import React, { useCallback, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { AddEmployeeFormValuesType, validationSchema } from './validationSchema';
import { Typography, CustomButton, TextFieldButton, Input } from '@app/components';
import DatePicker from 'react-native-date-picker';

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

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
    getValues,
    setValue,
  } = useForm<AddEmployeeFormValuesType>({
    defaultValues: initialValues,
    resolver: yupResolver(validationSchema),
    mode: 'onChange',
  });

  const onSubmitHandler = useCallback(
    async (data: AddEmployeeFormValuesType) => {
      await onSubmit(data);
    },
    [onSubmit],
  );

  console.log(getValues().employmentDate);

  return (
    <>
      <Input label="First name" name="firstName" control={control} />
      <Input label="Last name" name="lastName" control={control} style={styles.input} />
      <Input label="Job position" name="jobPosition" control={control} style={styles.input} />
      <Input label="E-mail" name="email" control={control} style={styles.input} />
      <Input label="Salary" name="salary" control={control} style={styles.input} />

      <TextFieldButton
        onPress={() => setIsDatePickerOpen(true)}
        label="Employment date:"
        style={styles.input}>
        <Typography type="normal">
          {getValues().employmentDate.toLocaleDateString('pl-PL')}
        </Typography>
      </TextFieldButton>

      <View style={styles.buttonsContainer}>
        <CustomButton
          onPress={handleSubmit(onSubmitHandler)}
          style={styles.button}
          disabled={isSubmitting}>
          <Typography type="button">ADD</Typography>
        </CustomButton>
      </View>

      <DatePicker
        mode="date"
        modal
        open={isDatePickerOpen}
        date={getValues().employmentDate}
        onConfirm={(date: Date) => {
          setIsDatePickerOpen(false);
          setValue('employmentDate', date);
        }}
        onCancel={() => {
          setIsDatePickerOpen(false);
        }}
      />
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
