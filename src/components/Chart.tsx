import { StyleSheet, View, Dimensions } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { GlobalStyles } from '@app/constants/styles';

export const Chart = () => {
  const data = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June'],
    datasets: [
      {
        data: [4000, 2000, 6000, 7000, 10000, 8500],
      },
    ],
  };

  return (
    <View style={styles.container}>
      <LineChart
        segments={4}
        fromZero
        data={data}
        width={Dimensions.get('window').width - 32}
        height={300}
        verticalLabelRotation={20}
        bezier
        chartConfig={{
          decimalPlaces: 0,
          backgroundGradientFrom: GlobalStyles.colors.blue100,
          backgroundGradientFromOpacity: 0.95,
          backgroundGradientTo: GlobalStyles.colors.blue100,
          backgroundGradientToOpacity: 1,
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          labelColor: (opacity = 10) => `rgba(255, 255, 255, ${opacity})`,
          strokeWidth: 3, // optional, default 3
        }}
        style={styles.chart}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginTop: 20,
  },
  chart: {
    borderRadius: 20,
  },
});
