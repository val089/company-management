import { StyleSheet, View } from 'react-native';
import { GlobalStyles } from '@app/constants/styles';

import { Typography } from '../Typography';

import { MoneySummaryProps } from './types';

export const MoneySummary = ({ money, style = null }: MoneySummaryProps) => {
  const backgroundColor =
    money && money < 0 ? GlobalStyles.colors.error100 : GlobalStyles.colors.green100;

  return (
    <View style={[style, styles.summaryContainer, { backgroundColor }]}>
      <Typography type="small" style={styles.text}>
        Money
      </Typography>
      <Typography type="normal" style={styles.text}>
        {money ?? 0} PLN
      </Typography>
    </View>
  );
};

const styles = StyleSheet.create({
  summaryContainer: {
    paddingVertical: 10,
    borderRadius: 10,
    paddingHorizontal: 20,
  },
  text: {
    color: GlobalStyles.colors.white,
    fontWeight: 'bold',
  },
});
