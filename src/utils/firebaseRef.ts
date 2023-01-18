import { firebase } from '@react-native-firebase/database';

const databaseURL =
  'https://company-management-278a5-default-rtdb.europe-west1.firebasedatabase.app/';

export const firebaseRef = firebase.app().database(databaseURL);
