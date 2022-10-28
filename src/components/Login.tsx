import { StatusBar } from 'expo-status-bar';
import { useState, useEffect } from 'react'
import { Button, StyleSheet, Text, View, TextInput } from 'react-native';
import Axios from 'axios'
export default function Login({ navigation }: any) {
  const [user, setUser] = useState<TUser>()
  const [username, setUsername] = useState('')
  const [pass, setPass] = useState('')
  const [pending, setPending] = useState(true)

type TUser = {
  email: string,
  password: string
}

  useEffect(() => {
    if(pending) setPending(false)
    navigation.navigate('List of Stores')
  }, [user])

  const handleSignOut = (evt:any) => {
    console.log('SIGNOUT')
    setUser(undefined)
  }

  const handleUserChange = (evt:any) => {
    setUsername(evt.nativeEvent.text)
  }

  const handlePassChange = (evt:any) => {
    setPass(evt.nativeEvent.text)
  }

  const handleLogInSubmit = async () => {
    try {
      // await fetch(
      //   'http://localhost:8080/user/login', { method: 'POST', headers: { 'Content-Type': 'application/json', body: JSON.stringify({ email: username, password: pass}) }}
      // ).then((response) => response.json())
      const res = (await Axios.post('http://localhost:8080/user/login', {email: username, password: pass})).data
      setUser(res.user)
      setUsername('')
      setPass('')
    } catch (e) {
      return (
        <View>
          <Text>{JSON.stringify(e)}</Text>
        </View>
      )
    }
    //   if (error.code === 'auth/email-already-in-use') {
    //     console.log('That email address is already in use!')
    //   }
    //   if (error.code === 'auth/invalid-email') {
    //     console.log('That email address is invalid!')
    //   }

    //   console.error(error)
    // })
  }

  if (!user) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>
          POS 365 Login
        </Text>
        
        <TextInput 
          style={styles.input}
          keyboardType='default'
          maxLength={60}
          value={username}
          placeholder='Username'
          onChange={handleUserChange}
          autoCapitalize='none'
        />
  
        <TextInput
          style={styles.input}
          keyboardType='default'
          maxLength={60}
          secureTextEntry={true}
          value={pass}
          placeholder='Password'
          onChange={handlePassChange}
          autoCapitalize='none'
        />
  
        <Button
          color={'#2D2A28'}
          title="Submit"
          onPress={handleLogInSubmit}
          accessibilityLabel="submit"
          disabled={username === '' || pass === '' ? true : false}
        />
        <View style={styles.buttonSpacer} />
        <Button
          color={'#2D2A28'}
          title="Create an Account"
          onPress={() => navigation.navigate('Create Account')}
        />
        <StatusBar style='dark'/>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Welcome {user.email}!
      </Text>

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
      <Button title='Log out' onPress={handleSignOut} />
    </View>
  )
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

