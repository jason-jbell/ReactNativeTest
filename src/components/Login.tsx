import { StatusBar } from 'expo-status-bar';
import { useState } from 'react'
import { Button, StyleSheet, Text, View, TextInput } from 'react-native';

export default function Login({ navigation }: any) {
  const [user, setUser] = useState('')
  const [pass, setPass] = useState('')

  const handleUserChange = (evt:any) => {
    setUser(evt.nativeEvent.text)
  }

  const handlePassChange = (evt:any) => {
    setPass(evt.nativeEvent.text)
  }

  const handleSubmitPress = () => {
    console.log('Logging in with User: ', user, 'and Password: ', pass)
    setUser('')
    setPass('')
  }

  return (
    <View style={styles.container}>
      
      <Text style={styles.title}>
        POS 365
      </Text>
      
      <TextInput 
        style={styles.input}
        keyboardType='default'
        maxLength={6}
        value={user}
        placeholder='TODO: Username'
        onChange={handleUserChange}
        autoCapitalize='none'
      />

      <TextInput
        style={styles.input}
        keyboardType='default'
        maxLength={6}
        secureTextEntry={true}
        value={pass}
        placeholder='TODO: Password'
        onChange={handlePassChange}
        autoCapitalize='none'
      />

      <Button
        color={'#2D2A28'}
        title="Submit"
        onPress={handleSubmitPress}
        accessibilityLabel="submit"
      />
      <View style={styles.buttonSpacer} />
      <Button
        color={'#2D2A28'}
        title="Go to your List of Stores"
        onPress={() => navigation.navigate('List of Stores')}
      />
      <View style={styles.buttonSpacer} />
      <Button
        color={'#2D2A28'}
        title="Go to CREATE A STORE"
        onPress={() => navigation.navigate('Create a Store')}
      />

      <StatusBar style='dark'/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#554E4D',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column'
  },
  title: {
    marginBottom: '10%',
    fontSize: 40,
    backgroundColor: '#2D2A28',
    color: '#C82C16'
  },
  input: {
    border: '1px solid black',
    borderRadius: 2,
    marginBottom: '10%',
    width: '50%',
    backgroundColor: '#EE4123',
    // color: '#C82C16',
    textAlign: 'center'
  },
  test: {
    // height: '15%',
    // width: '100%',
    // marginBottom: '10%',
    fontSize: 50,
    backgroundColor: 'transparent'
  },
  buttonSpacer: {
    width: '0%',
    height: '1%',
    backgroundColor: 'transparent'
  }
});

