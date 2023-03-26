import { View, Text, StyleSheet } from 'react-native';
import { bgColor } from '@app/constants/styles';

export const ExpensesScreen = () => {
  return (
    <View style={styles.screen}>
      <Text>ExpensesScreen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: bgColor,
  },
});
