import { IEmployeeItem } from '@app/types';
import { View, StyleSheet, ListRenderItem, Pressable } from 'react-native';
import { Typography } from '@app/components/Typography';
import { GlobalStyles } from '@app/constants/styles';

export const EmployeesListItem: ListRenderItem<IEmployeeItem> = itemData => {
  const { item } = itemData;
  return (
    <Pressable style={styles.item}>
      <View style={styles.image} />
      <View>
        <Typography type="normal" style={[styles.nameText, styles.paddingText]}>
          {`${item.firstName} ${item.lastName}`}
        </Typography>
        <Typography type="small" style={styles.paddingText}>
          {item.jobPosition}
        </Typography>
        <Typography type="small" style={styles.paddingText}>
          <Typography type="normal" style={styles.salaryText}>
            {`${item.salary} `}
          </Typography>
          / month
        </Typography>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  item: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 20,
    padding: 15,
    elevation: 20,
    shadowColor: '#000',
    marginBottom: 20,
  },
  paddingText: {
    paddingLeft: 20,
  },
  nameText: {
    fontWeight: 'bold',
  },
  salaryText: {
    color: GlobalStyles.colors.blue100,
  },
  image: {
    width: 50,
    height: 50,
    backgroundColor: '#ddd',
    borderRadius: 50,
    paddingRight: 20,
  },
});
