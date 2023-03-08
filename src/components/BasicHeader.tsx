import { View, Pressable, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { BackArrowIcon } from '@app/assets/icons/BackArrowIcon';
import { GlobalStyles } from '@app/constants/styles';
import { Typography } from './Typography';
import { AddIcon } from '@app/assets/icons/AddIcon';

type BasicHeaderProps = {
  title?: string;
  isBackIcon?: boolean;
  onPlusPress: () => void;
};

export const BasicHeader = ({ title = '', isBackIcon = false, onPlusPress }: BasicHeaderProps) => {
  const navigation = useNavigation();

  return (
    <View style={styles.header}>
      {isBackIcon && (
        <Pressable onPress={() => navigation.goBack()} hitSlop={10}>
          <BackArrowIcon />
        </Pressable>
      )}
      <Typography type="large" style={styles.title}>
        {title}
      </Typography>
      <Pressable onPress={onPlusPress}>
        <AddIcon />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    height: 70,
    paddingHorizontal: 16,
    backgroundColor: GlobalStyles.colors.white,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  title: {
    fontWeight: 'bold',
    color: GlobalStyles.colors.blue100,
  },
});
