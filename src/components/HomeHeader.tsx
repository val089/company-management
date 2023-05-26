import { useContext } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { ExitDoorIcon } from '@app/assets/icons/ExitDoorIcon';
import { GlobalStyles } from '@app/constants/styles';
import { bgColor } from '@app/constants/styles';
import { AuthContext } from '@app/context/auth-context';
import { useAppDispatch } from '@app/hooks/reduxHooks';
import { apiSlice } from '@app/store/slices/api';

import { Avatar } from './Avatar';
import { Typography } from './Typography';

export const HomeHeader = () => {
  const { user, logout } = useContext(AuthContext);
  const dispatch = useAppDispatch();

  const logoutHandler = () => {
    dispatch(apiSlice.util.resetApiState());
    logout();
  };

  return (
    <View style={styles.header}>
      <View style={styles.userInfo}>
        <Avatar size={40} />
        <Typography type="normal" style={styles.userInfo_text}>
          Hello <Text style={styles.userInfo_email}>{user?.email}</Text>
        </Typography>
      </View>
      <Pressable onPress={logoutHandler}>
        <ExitDoorIcon fill={GlobalStyles.colors.blue100} size={35} />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    height: 70,
    paddingHorizontal: 16,
    backgroundColor: bgColor,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    elevation: 20,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userInfo_text: {
    paddingLeft: 10,
  },
  userInfo_email: {
    fontWeight: 'bold',
  },
});
