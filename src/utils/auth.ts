import { Alert } from 'react-native';
import auth from '@react-native-firebase/auth';
import { firebase } from '@react-native-firebase/database';

interface IUser {
  uid: string;
  email: string;
}

const databaseURL =
  'https://company-management-278a5-default-rtdb.europe-west1.firebasedatabase.app/';

export const writeUserData = (user: IUser) => {
  return firebase.app().database(databaseURL).ref(`/users/${user.uid}`).set(user);
};

export const getUserData = (uid: string) => {
  return firebase.app().database(databaseURL).ref(`/users/${uid}`);
};

export const createUser = async (email: string, password: string) => {
  try {
    const userAuth = await auth().createUserWithEmailAndPassword(email, password);

    if (userAuth) {
      const user = {
        uid: userAuth.user.uid,
        email: userAuth.user.email as string,
      };

      await writeUserData(user);

      return userAuth;
    }
  } catch (error) {
    Alert.alert(
      'Authentication failed',
      'Could not create user, please check your input and try again later.',
    );
  }
};

export const signIn = (email: string, password: string) => {
  return auth().signInWithEmailAndPassword(email, password);
};
