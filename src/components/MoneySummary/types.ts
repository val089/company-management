import { StyleProp, ViewStyle } from 'react-native';

export interface MoneySummaryProps {
  money: number | undefined;
  style?: StyleProp<ViewStyle>;
}
