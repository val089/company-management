import { useState } from 'react';
import { Alert, ScrollView, StyleSheet, View } from 'react-native';
import { LoadingOverlay } from '@app/components';
import { bgColor } from '@app/constants/styles';
import { createUser } from '@app/utils/auth';

import { SignUpForm } from './SignUpForm';

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
    backgroundColor: bgColor,
    alignItems: 'center',
    justifyContent: 'center',
  },
  innerScreen: {
    width: '100%',
  },
});
