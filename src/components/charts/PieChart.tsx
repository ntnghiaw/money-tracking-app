import { View } from 'react-native'
import { PieChart } from 'react-native-gifted-charts'

interface PieProps {
  data: Array<{ value: number; color: string }>
  innerRadius: number
  centerComponent?: React.FC
}


const Pie = ({ data, innerRadius, centerComponent }: PieProps) => {
  const pieData = [
    { value: 70, color: '#177AD5' },
    { value: 30, color: 'lightgray' },
  ]
  return (
    <View >
      <PieChart
        donut
        innerRadius={innerRadius}
        data={data}
        centerLabelComponent={centerComponent}
      />
    </View>
  )
}

export default Pie