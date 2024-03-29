import { FlatList, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Typography } from '@app/components';
import { bgColor } from '@app/constants/styles';
import { useFetchEmployeesQuery } from '@app/store/slices/api';

import { EmployeesListItem } from './EmployeesListItem';

export const EmployeesListScreen = () => {
  const { data: employees } = useFetchEmployeesQuery({});

  const insets = useSafeAreaInsets();
  const safeArea = { paddingTop: insets.top + 70, paddingBottom: insets.bottom + 70 };

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
        ListEmptyComponent={
          <Typography type="normal" style={styles.info}>
            No employees to display
          </Typography>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: bgColor, paddingBottom: 500 },
  list: {
    padding: 16,
  },
  info: {
    paddingTop: 32,
  },
});
