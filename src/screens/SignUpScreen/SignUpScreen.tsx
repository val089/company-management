import { useState } from 'react';
import { ScrollView, StyleSheet, View, Alert } from 'react-native';

import { GlobalStyles } from '@app/constants/styles';

import { SignUpForm } from './SignUpForm';
import { LoadingOverlay } from '@app/components/LoadingOverlay';

import { createUser } from '@app/utils/auth';

export const SignUpScreen = () => {
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  const submitHandler = async (email: string, password: string): Promise<void> => {
    setIsAuthenticating(true);
    try {
      await createUser(email, password);
      setIsAuthenticating(false);
    } catch (error) {
      Alert.alert(
        'Authentication failed',
        'Could not create user, please check your input and try again later.',
      );
      setIsAuthenticating(false);
    }
  };

  if (isAuthenticating) {
    return <LoadingOverlay message="Creating user..." />;
  }

  return (
    <ScrollView contentContainerStyle={styles.screen}>
      <View style={styles.innerScreen}>
        <SignUpForm onSubmit={submitHandler} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    paddingHorizontal: 16,
    backgroundColor: GlobalStyles.colors.primary100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  innerScreen: {
    width: '100%',
  },
});
