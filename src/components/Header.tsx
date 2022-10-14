import { View, Text } from 'react-native'

export default function Header() {
  return (
    <View style={{
      borderWidth: 2,
      width: '100%',
      height: '10%',
      backgroundColor: 'beige',
      borderColor: 'red',
      display: 'flex',
      justifyContent: 'center'
    }}>
      <Text style={{color: 'black', textAlign: 'center', fontSize: 24}}>HEADER</Text>
    </View>
  )
}