import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';

type LoadingOverlayProps = {
  message: string;
};

export const LoadingOverlay = ({ message }: LoadingOverlayProps) => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="white" />
      <Text style={styles.message}>{message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  message: {
    paddingTop: 10,
    color: '#fff',
  },
});
