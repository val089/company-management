import React, { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { StyleSheet, View } from 'react-native';
import { CustomButton, Input, Typography } from '@app/components';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigation } from '@react-navigation/native';

import { LoginFormValuesType, validationSchema } from './validationSchema';

const initialValues = {
  email: '',
  password: '',
};

interface LoginFormProps {
  onSubmit: (email: string, pasword: string) => Promise<void>;
}

export const LoginForm = ({ onSubmit }: LoginFormProps) => {
  const navigation = useNavigation();

  const { control, handleSubmit } = useForm<LoginFormValuesType>({
    defaultValues: initialValues,
    resolver: yupResolver(validationSchema),
    mode: 'onChange',
  });

  const onSubmitHandler = useCallback(
    async (data: LoginFormValuesType) => {
      await onSubmit(data.email, data.password);
    },
    [onSubmit],
  );

  return (
    <>
      <Input name="email" label="E-mail" control={control} style={styles.input} />
      <Input
        label="Password"
        name="password"
        type="password"
        control={control}
        style={styles.input}
      />

      <View style={styles.buttonsContainer}>
        <CustomButton onPress={handleSubmit(onSubmitHandler)} style={styles.button}>
          <Typography type="button">Login</Typography>
        </CustomButton>

        <CustomButton onPress={() => navigation.navigate('SignUp')} style={styles.button}>
          <Typography type="button">Sign up</Typography>
        </CustomButton>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  input: {
    marginTop: 30,
  },
  buttonsContainer: {
    paddingTop: 30,
  },
  button: {
    marginBottom: 20,
  },
});
