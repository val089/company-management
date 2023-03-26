import { StyleSheet, FlatList, View } from 'react-native';
import { Employee } from '@app/types';
import { RecentlyHiredEmployeesListItem } from './RecentlyHiredEmployeesListItem';
import { Typography } from '@app/components';
import { filterRecentlyHiredEmployees } from '@app/utils/filterRecentlyHiredEmployees';
import { fontColor } from '@app/constants/styles';

interface Props {
  employees: Employee[];
}

export const RecentlyHiredEmployeesList = ({ employees }: Props) => {
  const recentlyHirdeEmployees = filterRecentlyHiredEmployees(employees, 7);

  return (
    <View style={styles.container}>
      <Typography type="normal" style={styles.sectionTitle}>
        Recently hired employees
      </Typography>
      <FlatList
        data={recentlyHirdeEmployees}
        keyExtractor={item => item.id}
        renderItem={RecentlyHiredEmployeesListItem}
        contentContainerStyle={styles.list}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
  },
  sectionTitle: {
    fontWeight: 'bold',
    paddingHorizontal: 16,
    color: fontColor,
  },
  list: {
    paddingHorizontal: 16,
    paddingVertical: 20,
  },
});
