import { StatusBar } from 'expo-status-bar';
import { useState, useEffect } from 'react'
import { Button, StyleSheet, Text, View, TextInput } from 'react-native';
import Axios from 'axios'

export default function CreateAccount({ navigation }: any) {
  const [username, setUsername] = useState('')
  const [pass, setPass] = useState('')
  const [error, setError] = useState('')

  const handleCreateUser = async () => {
    try {
      const res = (await Axios.post('http://localhost:8080/api/owners/signup', {email: username, password: pass})).data
      // setUser(res.owner)
      setUsername('')
      setPass('')
      if (!res.success) {
        setError(res.error)
      } else {
        setError('')
        navigation.navigate('Homepage', {owner: res.owner, token: res.token})
      }
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

  useEffect(() => {
    console.log('hit the error useEffect')
    console.log(error)
  }, [error])
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

  // if (!error) {
    return (
      <View style={styles.container}>
        
        <Text style={styles.title}>
          Account Sign-up
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
  }
  // }
//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>
//         Error! {error}
//       </Text>
//       {/* <Button title='Homepage' onPress={() => navigation.navigate('SingleStore')} />
//       <Button title='Log out' onPress={handleSignOut} /> */}
//     </View>
//     // navigation.navigate('SingleStore')
//   )
// }  

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

