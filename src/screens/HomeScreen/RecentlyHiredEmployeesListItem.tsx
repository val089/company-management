import { StyleSheet, TouchableOpacity, ListRenderItem } from 'react-native';
import { Employee } from '@app/types';
import { Typography } from '@app/components/Typography';
import { GlobalStyles } from '@app/constants/styles';
import { Avatar } from '@app/components/Avatar';

export const RecentlyHiredEmployeesListItem: ListRenderItem<Employee> = itemData => {
  const { item } = itemData;
  return (
    <TouchableOpacity style={styles.item}>
      <Avatar imageUri={item.imageUri} />
      <Typography type="normal" style={styles.nameText}>
        {`${item.firstName} ${item.lastName}`}
      </Typography>
      <Typography type="small">{item.jobPosition}</Typography>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  item: {
    backgroundColor: GlobalStyles.colors.white,
    alignItems: 'center',
    borderRadius: 20,
    padding: 10,
    elevation: 10,
    shadowColor: '#000',
    marginRight: 20,
    width: 200,
    height: 200,
    overflow: 'hidden',
    justifyContent: 'space-around',
  },
  nameText: {
    textAlign: 'center',
    fontWeight: 'bold',
  },
});
