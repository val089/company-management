import { Pressable, StyleSheet, View, ViewStyle } from 'react-native';
import { TextStyle } from 'react-native';
import { SafeAreaProvider, SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { AddIcon } from '@app/assets/icons/AddIcon';
import { BackArrowIcon } from '@app/assets/icons/BackArrowIcon';
import { bgColor, fontColor, GlobalStyles } from '@app/constants/styles';
import { useNavigation } from '@react-navigation/native';

import { Typography } from './Typography';

type BasicHeaderProps = {
  title?: string;
  isBackIcon?: boolean;
  onPlusPress?: () => void;
};

export const BasicHeader = ({ title = '', isBackIcon = true, onPlusPress }: BasicHeaderProps) => {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();

  const headerStyle: ViewStyle = {
    justifyContent: isBackIcon ? 'flex-start' : 'space-between',
  };

  const labelStyle: TextStyle = {
    paddingLeft: isBackIcon ? 20 : 0,
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView>
        <View style={[styles.header, headerStyle]}>
          {isBackIcon && (
            <Pressable onPress={() => navigation.goBack()} hitSlop={10}>
              <BackArrowIcon fill={fontColor} />
            </Pressable>
          )}
          <Typography type="large" style={[styles.title, labelStyle]}>
            {title}
          </Typography>
          {onPlusPress && (
            <Pressable onPress={onPlusPress}>
              <AddIcon />
            </Pressable>
          )}
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  header: {
    height: 70,
    paddingHorizontal: 16,
    backgroundColor: bgColor,
    alignItems: 'center',
    flexDirection: 'row',
    elevation: 20,
    shadowColor: GlobalStyles.colors.black,
    shadowOffset: { width: -2, height: 5 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  title: {
    fontWeight: 'bold',
    color: GlobalStyles.colors.blue100,
  },
});
