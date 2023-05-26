import { Appearance } from 'react-native';

export const colorScheme = Appearance.getColorScheme();

export const GlobalStyles = {
  colors: {
    primary100: '#1e1e1e',
    secondary100: '#2196f3',
    error100: '#E70202',
    grey500: '#39324a',
    grey700: '#b7b7b7',
    white: '#fff',
    green100: '#2bb879',
    blue100: '#2196f3',
    black: '#000',
  },
  fonts: {
    poppinsRegular: 'Poppins-Regular',
    poppinsMedium: 'Poppins-Medium',
    poppinsBold: 'Poppins-Bold',
  },
};

export const bgColor =
  colorScheme === 'dark' ? GlobalStyles.colors.primary100 : GlobalStyles.colors.white;

export const fontColor =
  colorScheme === 'dark' ? GlobalStyles.colors.white : GlobalStyles.colors.black;
