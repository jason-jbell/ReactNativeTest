import { View, Text } from 'react-native'

export default function Footer() {
  return (
    <View style={{
      borderWidth: 2,
      width: '100%',
      height: '10%',
      backgroundColor: 'beige',
      borderColor: 'red',
      display: 'flex',
      justifyContent: 'center',
      // position: 'fixed',
      // marginBottom: '0%'
    }}>
      <Text style={{color: 'black', textAlign: 'center', fontSize: 24}}>FOOTER</Text>
    </View>
  )
}