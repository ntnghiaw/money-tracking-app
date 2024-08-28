import { Colors } from '@/constants/Colors'
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native'

interface ButtonProps {
  title: string;
  type: 'success' | 'danger';
  handleFn: () => void
}

const screenWidth = Dimensions.get('window').width


const Button = (props: ButtonProps) => {
 const { title, handleFn } = props
  return (
    <TouchableOpacity
      onPress={handleFn}
      style={[
        styles.button,
        props.type === 'success'
          ? { backgroundColor: Colors.primary }
          : { backgroundColor: Colors.danger },
      ]}
    >
      <Text style={[styles.text]}>{title}</Text>
    </TouchableOpacity>
  )
}


const styles = StyleSheet.create({
  button: {
    alignSelf: 'center',
    borderRadius: 12,
    width: screenWidth*0.92,
    height: 54,
    backgroundColor: Colors.primary,
    paddingHorizontal: 12,
    justifyContent: 'center',
  },
  text: {
    fontSize: 18,
    color: '#fff',
    textAlign: 'center',
    fontWeight: '400',
    alignSelf: 'center',
    textTransform:'capitalize'
  },
})
export default Button