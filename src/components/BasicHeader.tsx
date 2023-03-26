import { View, Pressable, StyleSheet, ViewStyle } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { BackArrowIcon } from '@app/assets/icons/BackArrowIcon';
import { GlobalStyles, fontColor, bgColor } from '@app/constants/styles';
import { Typography } from './Typography';
import { AddIcon } from '@app/assets/icons/AddIcon';
import { TextStyle } from 'react-native';

type BasicHeaderProps = {
  title?: string;
  isBackIcon?: boolean;
  onPlusPress?: () => void;
};

export const BasicHeader = ({ title = '', isBackIcon = true, onPlusPress }: BasicHeaderProps) => {
  const navigation = useNavigation();

  const headerStyle: ViewStyle = {
    justifyContent: isBackIcon ? 'flex-start' : 'space-between',
  };

  const labelStyle: TextStyle = {
    paddingLeft: isBackIcon ? 20 : 0,
  };

  return (
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
  },
  title: {
    fontWeight: 'bold',
    color: GlobalStyles.colors.blue100,
  },
});
