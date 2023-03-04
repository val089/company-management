import { View, Text, Pressable } from 'react-native';
import { AddIcon } from '@app/assets/icons/AddIcon';
import { RootStackNavigation } from '@app/App';

export const ExpensesScreen = ({ navigation }: RootStackNavigation<'Expenses'>) => {
  return (
    <View>
      <Pressable onPress={() => navigation.navigate('AddExpense')}>
        <AddIcon />
      </Pressable>
      <Text>ExpensesScreen</Text>
    </View>
  );
};
