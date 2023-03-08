import { StyleSheet, View, FlatList } from 'react-native';
import { useAppSelector } from '@app/hooks/reduxHooks';
import { EmployeesListItem } from './EmployeesListItem';

export const EmployeesListScreen = () => {
  const employees = useAppSelector(state => state.employees.employees);

  return (
    <View style={styles.screen}>
      <FlatList
        data={employees}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <EmployeesListItem
            id={item.id}
            firstName={item.firstName}
            lastName={item.lastName}
            jobPosition={item.jobPosition}
            salary={item.salary}
            imageUri={item.imageUri}
          />
        )}
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
