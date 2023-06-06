import { Dimensions, StyleSheet, View } from 'react-native';
import { BarChart } from 'react-native-chart-kit';
import { GlobalStyles } from '@app/constants/styles';
import { fontColor } from '@app/constants/styles';
import { Expense } from '@app/types';
import { formatDataForChart } from '@app/utils/formatDataForChart';
import { getTimestampFirstDayOfMonthsAgo } from '@app/utils/getTimestampFirstDayOfMonthsAgo';

import { Typography } from './Typography';

interface ChartProps {
  expenses: Expense[];
}

const filterAndFormatExpenses = (expenses: Expense[]) => {
  const firstDayOfMonthsAgo = getTimestampFirstDayOfMonthsAgo(2);
  const filteredExpenses = expenses
    .filter(({ createdAt }) => createdAt >= firstDayOfMonthsAgo)
    .map(({ createdAt, amount, type }) => {
      const date = new Date(createdAt);
      return {
        month: date.toLocaleString('en', { month: 'long' }),
        amount: type === 'expense' ? -amount : amount,
      };
    });

  return formatDataForChart(filteredExpenses);
};

export const Chart = ({ expenses = [] }: ChartProps) => {
  if (!expenses || expenses.length === 0) {
    return (
      <Typography type="normal" style={styles.info}>
        No expenses to display chart
      </Typography>
    );
  }

  const formatedDataForChart = filterAndFormatExpenses(expenses);

  const chartLabels = formatedDataForChart.map(({ month }) => month);
  const chartData = formatedDataForChart.map(({ amount }) => amount);

  const data = {
    labels: chartLabels,
    datasets: [
      {
        data: chartData,
      },
    ],
  };

  return (
    <>
      <Typography type="normal" style={styles.sectionTitle}>
        Revenue during thwo months
      </Typography>

      <View style={styles.container}>
        <BarChart
          segments={4}
          fromZero
          style={styles.chart}
          data={data}
          width={Dimensions.get('window').width}
          height={300}
          chartConfig={{
            decimalPlaces: 0,
            backgroundGradientFrom: GlobalStyles.colors.blue100,
            backgroundGradientFromOpacity: 0.95,
            backgroundGradientTo: GlobalStyles.colors.blue100,
            backgroundGradientToOpacity: 1,
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            labelColor: (opacity = 10) => `rgba(255, 255, 255, ${opacity})`,
          }}
          verticalLabelRotation={0}
          yAxisLabel="$"
          yAxisSuffix=""
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  chart: {
    paddingTop: 20,
  },
  filters: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  filterBtn: {
    backgroundColor: GlobalStyles.colors.blue100,
    borderRadius: 10,
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginHorizontal: 5,
  },
  filterText: {
    color: GlobalStyles.colors.white,
  },
  sectionTitle: {
    paddingTop: 16,
    fontWeight: 'bold',
    paddingHorizontal: 16,
    color: fontColor,
  },
  info: {
    paddingHorizontal: 16,
    paddingTop: 32,
  },
});
