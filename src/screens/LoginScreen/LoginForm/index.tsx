import React, { useCallback } from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Button, StyleSheet } from 'react-native';
import { Formik } from 'formik';
import { LoginFormValuesType, validationSchema } from './validationSchema';
import { CustomTextField } from '../../../components/CustomTextField';

const initialValues = {
  email: '',
  password: '',
};

interface LoginFormProps {
  onSubmit: (email: string, pasword: string) => Promise<void>;
}

export const LoginForm = ({ onSubmit }: LoginFormProps) => {
  const navigation = useNavigation();

  const onSubmitHandler = useCallback(
    async (data: LoginFormValuesType) => {
      await onSubmit(data.email, data.password);
    },
    [onSubmit],
  );

  return (
    <Formik
      validateOnChange
      validateOnBlur
      validationSchema={validationSchema}
      initialValues={initialValues as LoginFormValuesType}
      onSubmit={onSubmitHandler}>
      {({ handleChange, handleBlur, handleSubmit }) => (
        <View>
          <CustomTextField
            name="email"
            label="E-mail"
            onChangeText={handleChange('email')}
            onBlur={handleBlur('email')}
          />

          <View style={styles.inputGroup}>
            <CustomTextField
              name="password"
              label="Password"
              onChangeText={handleChange('password')}
              onBlur={handleBlur('password')}
              type="password"
            />
          </View>

          <View style={styles.buttonsContainer}>
            <Button onPress={() => handleSubmit()} title="Login" />
            <Button onPress={() => navigation.navigate('SignUp')} title="Sign up" />
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
});
