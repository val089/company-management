import { Pressable, StyleSheet, View } from 'react-native';
import { Avatar, Typography } from '@app/components';
import { bgColor } from '@app/constants/styles';
import { Employee } from '@app/types';
import { useNavigation } from '@react-navigation/native';

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
            {`${salary} zł`}
          </Typography>
          / month
        </Typography>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  item: {
    backgroundColor: bgColor,
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
    fontWeight: 'bold',
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
