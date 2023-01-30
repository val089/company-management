import { StyleSheet, FlatList, View } from 'react-native';
import React from 'react';
import { IEmployeeItem } from '@app/types';
import { RecentlyHiredEmployeesListItem } from './RecentlyHiredEmployeesListItem';
import { Typography } from '@app/components/Typography';
import { getDateMinusDays } from '@app/utils/getDateMinusDayes';

interface Props {
  employees: IEmployeeItem[];
}

export const RecentlyHiredEmployeesList = ({ employees }: Props) => {
  const recentlyHirdeEmployees = employees.filter(employee => {
    const today = new Date();
    const date7DaysAgo = getDateMinusDays(today, 7);
    const employmentDate = new Date(employee.employmentDate.slice(0, 10));

    return employmentDate > date7DaysAgo && employmentDate <= today;
  });

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
  },
  list: {
    paddingHorizontal: 16,
    paddingVertical: 20,
  },
});
