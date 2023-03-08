import { View, StyleSheet, Text } from 'react-native';
import { Avatar } from './Avatar';
import { useContext } from 'react';
import { AuthContext } from '@app/context/auth-context';
import { GlobalStyles } from '@app/constants/styles';

export const HomeHeader = () => {
  const { user } = useContext(AuthContext);

  return (
    <View style={styles.header}>
      <View style={styles.userInfo}>
        <Avatar size={40} />
        <Text style={styles.userInfo_text}>
          Hello <Text style={styles.userInfo_email}>{user?.email}</Text>
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    height: 70,
    paddingHorizontal: 16,
    backgroundColor: GlobalStyles.colors.white,
    justifyContent: 'center',
  },
  userInfo: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  userInfo_text: {
    fontSize: 16,
    paddingLeft: 10,
  },
  userInfo_email: {
    fontWeight: 'bold',
  },
});
