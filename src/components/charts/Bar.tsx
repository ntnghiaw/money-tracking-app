import { CartesianChart, Bar } from 'victory-native'
import { StyleSheet, Text, View } from 'react-native'
import { BrandColor } from '@/src/constants/Colors'

type BarChartProps = {
  data: Array<any>

}

const DATA = Array.from({ length: 7 }, (_, i) => ({
  day: i,
  highTmp: 40 + 30 * Math.random(),
}))

const BarChart = () => {
  return (
    <View>
      <CartesianChart
        data={DATA}
        xKey='day'
        yKeys={['highTmp']}
        // axisOptions={{ formatYLabel: (v) => `${formatter(v, currentCurrency)}` }}
      >
        {({ points, chartBounds }) => (
          //👇 pass a PointsArray to the Bar component, as well as options.
          <Bar
            points={points.highTmp}
            chartBounds={chartBounds}
            color={BrandColor.PrimaryColor[400]}
            roundedCorners={{ topLeft: 10, topRight: 10 }}
          />
        )}
      </CartesianChart>
    </View>
  )
}
export default BarChart
const styles = StyleSheet.create({})