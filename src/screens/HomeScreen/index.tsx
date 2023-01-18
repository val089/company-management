import { useContext } from 'react';
import { Text, View, Button } from 'react-native';
import { AuthContext } from '../../context/auth-context';
// import { firebaseRef } from '../../utils/firebaseRef';
// import firestore from '@react-native-firebase/firestore';

export const HomeScreen = () => {
  // const [isLoading, setIsLoading] = useState(true);
  // const [data, setData] = useState(null);
  const { user, logout } = useContext(AuthContext);

  // const ref = firestore().collection('users').doc(user?.uid);

  // useEffect(() => {
  //   const subscriber = ref.onSnapshot(querySnapshot => {
  //     let users =
  //   });
  // }, []);

  // useEffect(() => {
  //   const onValueChange = firebaseRef.ref(`/users/${user.uid}`).on('value', snapshot => {
  //     console.log(snapshot.val());
  //     setData(snapshot.val());
  //     setIsLoading(false);
  //   });

  //   return () => firebaseRef.ref(`/users/${user?.uid}`).off('value', onValueChange);
  // }, [user]);

  if (!user) return null;

  return (
    <View>
      {/* {data && <Text>{data.email}</Text>} */}
      <Text>Welcome {user.email}</Text>
      <Button title="Logout" onPress={logout} />
    </View>
  );
};
