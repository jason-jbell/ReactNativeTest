import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View } from 'react-native';
// import * as ReactNative from 'react-native'
export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Hello TestyMcTest!!!</Text>
      <Text style={styles.content}>Some text below the title that would serve to describe information about something relevant to said title and would contain the very information describing forementioned things.</Text>
      <Text style={styles.title}>Another Title</Text>
      <Text style={styles.content}>Some text below the title</Text>
      <Text style={styles.title}>Hello TestyMcTest!!!</Text>
      <Text style={styles.content}>Some text below the title</Text>
      {/* <Button>Learn More</Button> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'aquamarine',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  title: {
    fontSize: 30
  },
  content: {
    marginLeft: '15%',
    marginRight: '15%',
    marginTop: '4%',
    marginBottom: '8%'
  }
});

