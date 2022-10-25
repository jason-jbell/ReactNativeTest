import { StatusBar } from 'expo-status-bar';
import { useState, useEffect } from 'react'
import { Button, StyleSheet, Text, View, TextInput } from 'react-native';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, User as FirebaseUser, signOut } from 'firebase/auth'
import { auth } from '../../firebaseConfig';

export default function Login({ navigation }: any) {
  const [user, setUser] = useState<FirebaseUser>()
  const [username, setUsername] = useState('')
  const [pass, setPass] = useState('')
  const [pending, setPending] = useState(true)

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      if(currentUser) setUser(user)
      if(pending) setPending(false)
    })
  }, [])

  const handleSignOut = (evt:any) => {
    signOut(auth)
      .then(() => console.log('sign out successfull'))
      .catch((error) => console.error(error))
    setUser(undefined)
  }
  const handleUserChange = (evt:any) => {
    setUsername(evt.nativeEvent.text)
  }

  const handlePassChange = (evt:any) => {
    setPass(evt.nativeEvent.text)
  }
  const handleSubmitPress = () => {
    signInWithEmailAndPassword(auth, username, pass)
    .then((userCredential) => {
      console.log('Logging in with User: ', username, 'and Password: ', pass)
      const current = userCredential.user
      setUser(current)
      console.log('current: ', current.email)
      setUsername('')
      setPass('')
    })
    .catch(error => {
      if (error.code === 'auth/email-already-in-use') {
        console.log('That email address is already in use!')
      }
      if (error.code === 'auth/invalid-email') {
        console.log('That email address is invalid!')
      }

      console.error(error)
    })
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
          placeholder='TODO: Username'
          onChange={handleUserChange}
          autoCapitalize='none'
        />
  
        <TextInput
          style={styles.input}
          keyboardType='default'
          maxLength={60}
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
          disabled={username === '' || pass === '' ? true : false}
        />
        <View style={styles.buttonSpacer} />
        <Button
          color={'#2D2A28'}
          title="Create an Account"
          onPress={() => navigation.navigate('Create Account')}
        />
        {/* <View style={styles.buttonSpacer} />
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
        /> */}
  
        <StatusBar style='dark'/>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Welcome {user.email}!
      </Text>
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

