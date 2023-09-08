import { Appearance, Text } from 'react-native';
import { fontColor, GlobalStyles } from '@app/constants/styles';

import { TypographyProps } from './types';

const colorScheme = Appearance.getColorScheme();

export const Typography = ({ type, style = null, children, ...restProps }: TypographyProps) => {
  const typographyTypes = {
    logoText: {
      fontSize: 40,
      fontFamily: GlobalStyles.fonts.poppinsBold,
      color: fontColor,
    },
    button: {
      fontSize: 18,
      fontFamily: GlobalStyles.fonts.poppinsRegular,
      color: GlobalStyles.colors.white,
    },
    tabMenu: {
      fontSize: 14,
      fontFamily: GlobalStyles.fonts.poppinsRegular,
      color: GlobalStyles.colors.white,
    },
    normal: {
      fontSize: 16,
      fontFamily: GlobalStyles.fonts.poppinsRegular,
      color: fontColor,
    },
    normalBold: {
      fontSize: 16,
      fontFamily: GlobalStyles.fonts.poppinsBold,
      color: fontColor,
    },
    small: {
      fontSize: 13,
      fontFamily: GlobalStyles.fonts.poppinsRegular,
      color: colorScheme === 'dark' ? GlobalStyles.colors.white : GlobalStyles.colors.black,
    },
    large: {
      fontSize: 24,
      fontFamily: GlobalStyles.fonts.poppinsRegular,
    },
  };
  return (
    <Text style={[typographyTypes[type], style]} {...restProps}>
      {children}
    </Text>
  );
};
