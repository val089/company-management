import { ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { RootStackNavigation } from '@app/App';
import { Avatar, Typography } from '@app/components';
import { useAppSelector } from '@app/hooks/reduxHooks';
import { formatISOstring } from '@app/utils/formatISOstring';

export const EmployeeDetailsScreen = ({ route }: RootStackNavigation<'EmployeeDetails'>) => {
  const { employeeId } = route.params;
  const employees = useAppSelector(state => state.employees.employees);

  const insets = useSafeAreaInsets();
  const safeArea = { paddingTop: insets.top + 70, paddingBottom: insets.bottom + 40 };

  const employeeDetails = employees.find(employee => employee.id === employeeId);

  if (!employeeDetails) {
    return <Typography type="normal">Sorry, something went wrong.</Typography>;
  }

  return (
    <SafeAreaView style={[styles.screen, safeArea]}>
      <ScrollView>
        <View>
          <View style={styles.imageContainer}>
            <Avatar imageUri={employeeDetails.imageUri} size={100} />
          </View>
          <View style={styles.mainInfoDescription}>
            <View style={styles.textGroup}>
              <Typography type="normalBold">Name:</Typography>
              <Typography type="normal">
                {`${employeeDetails.firstName} ${employeeDetails.lastName}`}
              </Typography>
            </View>

            <View style={styles.textGroup}>
              <Typography type="normalBold">Email:</Typography>
              <Typography type="normal">{employeeDetails.email}</Typography>
            </View>

            <View style={styles.textGroup}>
              <Typography type="normalBold">Job position:</Typography>
              <Typography type="normal">{employeeDetails.jobPosition}</Typography>
            </View>

            <View style={styles.textGroup}>
              <Typography type="normalBold">Salary:</Typography>
              <Typography type="normal"> {employeeDetails.salary}</Typography>
            </View>

            <View style={styles.textGroup}>
              <Typography type="normalBold">Employment date:</Typography>
              <Typography type="normal">
                {formatISOstring(employeeDetails.employmentDate)}
              </Typography>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 16,
  },
  imageContainer: {
    marginBottom: 32,
    alignItems: 'center',
  },
  mainInfoDescription: {
    flex: 1,
  },
  label: {
    fontWeight: 'bold',
  },
  textGroup: {
    marginBottom: 10,
  },
});
