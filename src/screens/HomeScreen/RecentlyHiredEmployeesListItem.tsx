import { StyleSheet, TouchableOpacity, ListRenderItem, View } from 'react-native';
import { IEmployeeItem } from '@app/types';
import { Typography } from '@app/components/Typography';
import { GlobalStyles } from '@app/constants/styles';

export const RecentlyHiredEmployeesListItem: ListRenderItem<IEmployeeItem> = itemData => {
  const { item } = itemData;
  return (
    <TouchableOpacity style={styles.item}>
      <View style={styles.image} />
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
  image: {
    width: 80,
    height: 80,
    backgroundColor: '#ddd',
    borderRadius: 50,
    paddingRight: 20,
  },
  nameText: {
    textAlign: 'center',
    fontWeight: 'bold',
  },
});
