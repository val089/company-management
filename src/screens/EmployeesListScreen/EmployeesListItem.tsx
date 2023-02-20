import { Employee } from '@app/types';
import { useNavigation } from '@react-navigation/native';
import { View, StyleSheet, Pressable } from 'react-native';
import { Typography } from '@app/components/Typography';
import { GlobalStyles } from '@app/constants/styles';
import { Avatar } from '@app/components/Avatar';

type EmployeesListItemProps = Pick<
  Employee,
  'id' | 'firstName' | 'lastName' | 'jobPosition' | 'salary' | 'imageUri'
>;

export const EmployeesListItem = ({
  id,
  firstName,
  lastName,
  jobPosition,
  salary,
  imageUri,
}: EmployeesListItemProps) => {
  const navigation = useNavigation();
  return (
    <Pressable
      style={styles.item}
      onPress={() => navigation.navigate('EmployeeDetails', { employeeId: id })}>
      <Avatar imageUri={imageUri} />
      <View>
        <Typography type="normal" style={[styles.nameText, styles.paddingText]}>
          {`${firstName} ${lastName}`}
        </Typography>
        <Typography type="small" style={styles.paddingText}>
          {jobPosition}
        </Typography>
        <Typography type="small" style={styles.paddingText}>
          <Typography type="normal" style={styles.salaryText}>
            {`${salary} `}
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
  imgContainer: {
    overflow: 'hidden',
    borderRadius: 50,
  },
  image: {
    width: 80,
    height: 84,
  },
});
