import { StatusBar } from 'expo-status-bar';
import { useState, useEffect } from 'react'
import { Button, StyleSheet, Text, View, TextInput } from 'react-native';
import Axios from 'axios'
import { TOwner } from '../types';

export default function Login({ navigation }: any, loggedInUser?: TOwner) {
  const [owner, setOwner] = useState<TOwner>()
  const [username, setUsername] = useState('')
  const [pass, setPass] = useState('')
  const [pending, setPending] = useState(true)
  const [test, setTest] = useState(0)
  const [error, setError] = useState('')

  // if (loggedInUser && test === 0) {
  //   setUser(loggedInUser)
  //   setTest(test + 1)
  //   console.log('successfully brought over user: ', user)
  // }


  // useEffect(() => {
  //   if (pending) setPending(false)
  //   if (user !== undefined && test > 1) navigation.navigate('List of Stores')
    
  // }, [user])

  const handleSignOut = (evt:any) => {
    setOwner(undefined)
    navigation.navigate('Login')
  }

  const handleUserChange = (evt:any) => {
    setUsername(evt.nativeEvent.text)
    if (error) setError('')
  }

  const handlePassChange = (evt:any) => {
    setPass(evt.nativeEvent.text)
    if (error) setError('')
  }

  const handleLogInSubmit = async () => {
    try {
      const res = (await Axios.post('http://localhost:8080/api/owners/login', {email: username, password: pass})).data
      if (!res.success) {
        setError(res.error)
        setPass('')
        return
      }
      else { 
        setError('')
        setOwner(res.owner)
        setTest(test + 1)
      }
      setUsername('')
      setPass('')
    } catch (e:any) {
        if (e.code === 'auth/email-already-in-use') {
          console.log('That email address is already in use!')
        }
        if (e.code === 'auth/invalid-email') {
          console.log('That email address is invalid!')
        }
      return (
        <View>
          <Text>{JSON.stringify(e)}</Text>
        </View>
      )
    }
  }

  if (!owner) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>
          POS 365 Login
        </Text>
        
        {error ? (
          <View>
            <Text style={styles.error}>
              {error}
            </Text>
          </View>
        ) : (
          <>
          </>
        )}

        <TextInput 
          style={styles.input}
          keyboardType='default'
          maxLength={60}
          value={username}
          placeholder='E-mail'
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
        Welcome {owner.email}!
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
  },
  error: {
    color: 'red',
    marginBottom: '2%'
  }
});

