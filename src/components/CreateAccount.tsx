import { StatusBar } from 'expo-status-bar';
import { useState, useEffect } from 'react'
import { Button, StyleSheet, Text, View, TextInput } from 'react-native';
import Axios from 'axios'

export default function CreateAccount({ navigation }: any) {
  const [username, setUsername] = useState('')
  const [pass, setPass] = useState('')

  const handleCreateUser = async () => {
    try {
      // await fetch(
      //   'http://localhost:8080/user/login', { method: 'POST', headers: { 'Content-Type': 'application/json', body: JSON.stringify({ email: username, password: pass}) }}
      // ).then((response) => response.json())
      const res = (await Axios.post('http://localhost:8080/owner/signup', {email: username, password: pass})).data
      // setUser(res.owner)
        .then(() => {
          console.log('AFTER AWAIT')
          navigation.navigate('Login', {owner: res.owner, token: res.token})})
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

    //   console.error(error)
    // })
  }

  // const [pending, setPending] = useState(true)

  // useEffect(() => {
  //   onAuthStateChanged(auth, (currentUser) => {
  //     if(currentUser) setUser(user)
  //     if(pending) setPending(false)
  //   })
  // }, [])

  // const handleSignOut = (evt:any) => {
  //   signOut(auth)
  //     .then(() => console.log('sign out successfull'))
  //     .catch((error) => console.error(error))
  //   setUser(undefined)
  // }
  const handleUserChange = (evt:any) => {
    setUsername(evt.nativeEvent.text)
  }

  const handlePassChange = (evt:any) => {
    setPass(evt.nativeEvent.text)
  }

  // const handleCreateUser = () => {
    // createUserWithEmailAndPassword(auth, username, pass)
    // .then((userCredential) => {
    //   const current = userCredential.user
    //   setUser(current)
    //   setUsername('')
    //   setPass('')
    // })
    // .catch(error => {
    //   if (error.code === 'auth/email-already-in-use') {
    //     console.log('That email address is already in use!')
    //   }
    //   if (error.code === 'auth/invalid-email') {
    //     console.log('That email address is invalid!')
    //   }

    //   console.error(error)
    // })
  // }

  // if (!user) {
    return (
      <View style={styles.container}>
        
        <Text style={styles.title}>
          Account Sign-up
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
          onPress={handleCreateUser}
          accessibilityLabel="submit"
          disabled={username === '' || pass === '' ? true : false}
        />
        <View style={styles.buttonSpacer} />
        <Button
          color={'#2D2A28'}
          title="Go back"
          onPress={() => navigation.goBack()}
        />
        <StatusBar style='dark'/>
      </View>
    );
  // }
  // return (
  //   <View style={styles.container}>
  //     <Text style={styles.title}>
  //       Welcome {user.email}!
  //     </Text>
  //     <Button title='Homepage' onPress={() => navigation.navigate('SingleStore')} />
  //     <Button title='Log out' onPress={handleSignOut} />
  //   </View>
  //   // navigation.navigate('SingleStore')
  // )
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

