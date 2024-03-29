import { useState } from 'react';
import { Alert, ScrollView, StyleSheet, View } from 'react-native';
import { LoadingOverlay, Logo } from '@app/components';
import { bgColor } from '@app/constants/styles';
import { signIn } from '@app/utils/auth';

import { LoginForm } from './LoginForm';

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
    backgroundColor: bgColor,
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
