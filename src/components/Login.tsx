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
        placeholder='Username'
        onChange={handleUserChange}
        autoCapitalize='none'
      />

      <TextInput
        style={styles.input}
        keyboardType='default'
        maxLength={6}
        secureTextEntry={true}
        value={pass}
        placeholder='Password'
        onChange={handlePassChange}
        autoCapitalize='none'
      />

      <Button
        title="Submit"
        onPress={handleSubmitPress}
        accessibilityLabel="submit"
        color='#007AFF'
      />

      <Button
        title="Go to your List of Stores"
        onPress={() => navigation.navigate('List of Stores')}
      />

      <StatusBar style='dark'/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column'
  },
  title: {
    marginBottom: '10%',
    fontSize: 30
  },
  input: {
    border: '1px solid black',
    borderRadius: 50,
    marginBottom: '10%',
    maxWidth: '50%'
  }
});

