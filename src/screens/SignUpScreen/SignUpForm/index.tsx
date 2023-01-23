import React, { useCallback } from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, StyleSheet } from 'react-native';
import { Formik } from 'formik';
import { SignUpFormValuesType, validationSchema } from './validationSchema';
import { CustomTextField } from '../../../components/CustomTextField';
import { Typography } from '../../../components/Typography';
import { CustomButton } from '../../../components/CustomButton';

// import database from '@react-native-firebase/database';
// import firestore from '@react-native-firebase/firestore';
// import firebase from '@react-native-firebase/app';
// import auth from '@react-native-firebase/auth';
// import { createDatabaseForUser } from '../../../utils/auth';

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

  // const ref = firestore().collection('users');

  const onSubmitHandler = useCallback(
    async (data: SignUpFormValuesType) => {
      await onSubmit(data.email, data.password);
    },
    [onSubmit],
  );

  // const writeToFirestore = async () => {
  //   try {
  //     const res = await ref.add({
  //       name: 'Kamil',
  //     });
  //     console.log(res);
  //     console.log('success create data base for user');
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

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
            {/* <Button onPress={writeToFirestore} title="firestore" /> */}

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
