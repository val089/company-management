import { FlatList, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { bgColor } from '@app/constants/styles';
import { useAppSelector } from '@app/hooks/reduxHooks';

import { EmployeesListItem } from './EmployeesListItem';

export const EmployeesListScreen = () => {
  const employees = useAppSelector(state => state.employees.employees);

  const insets = useSafeAreaInsets();
  const safeArea = { paddingTop: insets.top + 70, paddingBottom: insets.bottom + 40 };

  return (
    <View style={[styles.screen, safeArea]}>
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
  screen: { flex: 1, backgroundColor: bgColor, paddingBottom: 500 },
  list: {
    padding: 16,
  },
});
