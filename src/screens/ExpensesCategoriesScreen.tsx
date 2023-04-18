import { FlatList, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Radio } from '@app/components';
import { bgColor } from '@app/constants/styles';
import { useAppDispatch, useAppSelector } from '@app/hooks/reduxHooks';
import { selectCategory, setCategory } from '@app/store/slices/expenseCategory';

const categories = [
  { id: 1, value: 'category01', label: 'category 1' },
  { id: 2, value: 'category02', label: 'category 2' },
  { id: 3, value: 'category03', label: 'category 3' },
  { id: 4, value: 'category04', label: 'category 4' },
  { id: 5, value: 'category05', label: 'category 5' },
  { id: 6, value: 'category06', label: 'category 6' },
  { id: 7, value: 'category07', label: 'category 7' },
  { id: 8, value: 'category08', label: 'category 8' },
  { id: 9, value: 'category09', label: 'category 9' },
  { id: 10, value: 'category10', label: 'category 10' },
  { id: 11, value: 'category11', label: 'category 11' },
];

export const ExpensesCategoriesScreen = () => {
  const dispatch = useAppDispatch();
  const category = useAppSelector(selectCategory);
  const navigation = useNavigation();

  return (
    <FlatList
      contentContainerStyle={styles.list}
      keyExtractor={({ id }) => `${id}`}
      data={categories}
      renderItem={({ item }) => (
        <Radio
          onPress={() => {
            dispatch(setCategory(item.value));
            navigation.goBack();
          }}
          option={category}
          size={31}
          value={item.value}
          label={item.label}
        />
      )}
    />
  );
};

const styles = StyleSheet.create({
  list: {
    flex: 1,
    backgroundColor: bgColor,
    padding: 16,
  },
});
