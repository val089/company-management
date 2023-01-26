import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '@app/context/auth-context';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { RootStackNavigation } from '@app/App';
import { AddIcon } from '@app/assets/icons/AddIcon';
import firestore from '@react-native-firebase/firestore';
import { IEmployeeItem } from '@app/types';

export const EmployeesListScreen = ({ navigation }: RootStackNavigation<'EmployeesList'>) => {
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [employees, setEmploeeys] = useState<IEmployeeItem[]>([]);
  const ref = firestore().collection('employees');

  useEffect(() => {
    return ref.where('userId', '==', user?.uid).onSnapshot(querySnapshot => {
      const employeesList = [] as IEmployeeItem[];
      querySnapshot.forEach(doc => {
        employeesList.push({
          id: doc.id,
          ...doc.data(),
        } as IEmployeeItem);
      });

      setEmploeeys(employeesList);

      if (loading) {
        setLoading(false);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    console.log(employees);
  }, [employees]);

  if (loading) {
    return (
      <View style={styles.screen}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.screen}>
      <Pressable onPress={() => navigation.navigate('AddEmployee')}>
        <AddIcon />
      </Pressable>
      <FlatList
        data={employees}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View>
            <Text>{item.firstName}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: { flex: 1 },
});
