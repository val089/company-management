import { useState } from 'react';
import { ScrollView, StyleSheet, View, Alert } from 'react-native';

import { GlobalStyles } from '@app/constants/styles';

import { LoginForm } from './LoginForm';
import { LoadingOverlay } from '@app/components/LoadingOverlay';
import { signIn } from '@app/utils/auth';
import { Logo } from '@app/components/Logo';

export const LoginScreen = () => {
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const submitHandler = async (email: string, password: string): Promise<void> => {
    setIsAuthenticating(true);
    try {
      await signIn(email, password);
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
    return <LoadingOverlay message="Log in..." />;
  }

  return (
    <ScrollView contentContainerStyle={styles.screen}>
      <View style={styles.innerScreen}>
        <Logo style={styles.logo} />
        <LoginForm onSubmit={submitHandler} />
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
  logo: {
    paddingBottom: 40,
  },
});
