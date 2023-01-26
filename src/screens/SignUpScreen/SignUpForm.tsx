import React, { useCallback } from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, StyleSheet } from 'react-native';
import { Formik } from 'formik';
import { SignUpFormValuesType, validationSchema } from './validationSchema';
import { CustomTextField } from '@app/components/CustomTextField';
import { Typography } from '@app/components/Typography';
import { CustomButton } from '@app/components/CustomButton';

const initialValues = {
  email: '',
  password: '',
  repeatPassword: '',
};

interface SignUpFormProps {
  onSubmit: (email: string, pasword: string) => Promise<void>;
}

export const SignUpForm = ({ onSubmit }: SignUpFormProps) => {
  const navigation = useNavigation();

  const onSubmitHandler = useCallback(
    async (data: SignUpFormValuesType) => {
      await onSubmit(data.email, data.password);
    },
    [onSubmit],
  );

  return (
    <Formik
      validateOnChange
      validateOnBlur
      validationSchema={validationSchema}
      initialValues={initialValues as SignUpFormValuesType}
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

          <View style={styles.inputGroup}>
            <CustomTextField
              name="repeatPassword"
              label="Repeat Password"
              onChangeText={handleChange('repeatPassword')}
              onBlur={handleBlur('repeatPassword')}
              type="password"
            />
          </View>

          <View style={styles.buttonsContainer}>
            <CustomButton onPress={() => handleSubmit()} style={styles.button}>
              <Typography type="button">Sign up</Typography>
            </CustomButton>

            <CustomButton onPress={() => navigation.navigate('Login')} style={styles.button}>
              <Typography type="button">Login</Typography>
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
