import { RootStackNavigation } from '@app/App';
import { useAppSelector } from '@app/hooks/reduxHooks';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { formatISOstring } from '@app/utils/formatISOstring';

export const EmployeeDetailsScreen = ({
  route,
  navigation,
}: RootStackNavigation<'EmployeeDetails'>) => {
  const { employeeId } = route.params;
  const employees = useAppSelector(state => state.employees.employees);

  const employeeDetails = employees.find(employee => employee.id === employeeId);

  if (!employeeDetails) {
    return null;
  }

  return (
    <SafeAreaView style={styles.screen}>
      <ScrollView>
        <View style={styles.mainInfo}>
          <TouchableOpacity onPress={() => navigation.navigate('TakingPhotoAndUploading')}>
            <View style={styles.imageContainer}>
              <View style={styles.image} />
            </View>
          </TouchableOpacity>
          <View style={styles.mainInfoDescription}>
            <Text>{`name: ${employeeDetails.firstName} ${employeeDetails.lastName}`}</Text>
            <Text>{`Job position: ${employeeDetails.jobPosition}`}</Text>
            <Text>{`Salary: ${employeeDetails.salary}`}</Text>
            <Text>{`Employment date: ${formatISOstring(employeeDetails.employmentDate)}`}</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    paddingHorizontal: 16,
  },
  imageContainer: {
    paddingRight: 20,
  },
  image: {
    width: 100,
    height: 100,
    backgroundColor: '#ddd',
    borderRadius: 50,
  },
  mainInfo: {
    flexDirection: 'row',
    paddingTop: 16,
  },
  mainInfoDescription: {
    flex: 1,
  },
});
