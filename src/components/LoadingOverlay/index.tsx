import { View, ActivityIndicator, StyleSheet, Text } from 'react-native';

type LoadingOverlayProps = {
  message: string;
};

export const LoadingOverlay = ({ message }: LoadingOverlayProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.message}>{message}</Text>
      <ActivityIndicator size="large" color="white" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
    backgroundColor: 'rgba(0,0,0,0.7)',
  },
  message: {
    color: '#fff',
  },
});
