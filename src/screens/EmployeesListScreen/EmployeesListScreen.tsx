import { Pressable, StyleSheet, View, FlatList } from 'react-native';
import { RootStackNavigation } from '@app/App';
import { AddIcon } from '@app/assets/icons/AddIcon';
import { useAppSelector } from '@app/hooks/reduxHooks';
import { EmployeesListItem } from './EmployeesListItem';

export const EmployeesListScreen = ({ navigation }: RootStackNavigation<'EmployeesList'>) => {
  const employees = useAppSelector(state => state.employees.employees);

  return (
    <View style={styles.screen}>
      <Pressable onPress={() => navigation.navigate('AddEmployee')}>
        <AddIcon />
      </Pressable>
      <FlatList
        data={employees}
        keyExtractor={item => item.id}
        renderItem={EmployeesListItem}
        contentContainerStyle={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: { flex: 1 },
  list: {
    padding: 16,
  },
});
