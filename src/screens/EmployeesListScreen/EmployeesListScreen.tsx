import { FlatList, SafeAreaView, StyleSheet, View } from 'react-native';
import { bgColor } from '@app/constants/styles';
import { useAppSelector } from '@app/hooks/reduxHooks';

import { EmployeesListItem } from './EmployeesListItem';

export const EmployeesListScreen = () => {
  const employees = useAppSelector(state => state.employees.employees);

  return (
    <SafeAreaView style={styles.screen}>
      <View>
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
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: bgColor },
  list: {
    padding: 16,
  },
});
