import { useContext } from 'react';
import { Text, View, Button } from 'react-native';
import { AuthContext } from '../../context/auth-context';

export const HomeScreen = () => {
  const { user, logout } = useContext(AuthContext);

  if (!user) return null;

  return (
    <View>
      <Text>Welcome {user.email}</Text>
      {/* <Button title="Logout" onPress={logout} /> */}
      <Button title="Logout" onPress={logout} />
    </View>
  );
};
