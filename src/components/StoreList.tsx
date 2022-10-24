import { View, Text, TouchableOpacity } from 'react-native'
import { StoresList, testStore }from '../../assets/data';
import { TStore } from '../types';
import { storesListStyleSheet as styles} from '../styles/GlobalStyles';
import Header from './Header'
import Footer from './Footer';
import { useState } from 'react'

const renderStore = (store: TStore, idx: number, navigation: any) => {
  return (
  <TouchableOpacity key={idx} onPress={() => navigation.navigate('SingleStore')}>

    <View style={styles.singleStoreContainer}>
      <Text style={styles.storeName}>
        {store.name}
      </Text>

      <Text style={styles.storeStatus}>{store.status.toUpperCase()}</Text>
      
      <View style={styles.storeInfoContainer}>
        <Text style={styles.storeInfo}>{store.phone}</Text>
        <Text style={styles.storeInfo}>{store.address}</Text>
      </View>
    </View>
  </TouchableOpacity>
  )
}


export default function StoreList({ navigation }: any) {
  const [stores, setStores] = useState([...StoresList])

  // const testFunc = () => {
  //   StoresList.push(testStore)
  //   setStores([...stores, testStore])
  //   console.log('new storesList: ', StoresList.length, stores.length)
  // }

  return (
    <View style={{height:'100%'}}>
      <Header />
      
      <View style={styles.mainViewContainer}>
      
        <Text style={styles.title}>
          List of Stores
        </Text>
        <View style={styles.listOfStoresContainer}>
          {stores.map((store, idx) => renderStore(store, idx, navigation))} 
        </View>

        {/* create a form and submit button that takes in a TStore object and pushes it to the StoresList, causing a re-render I think */}
        {/* <View style={styles.createAStoreContainer}>
          <Text>CREATE A STORE PLACEHOLDER</Text>
          <TouchableOpacity onPress={testFunc}>
            <Text>PRESSMEEMEMEMEMEME</Text>
          </TouchableOpacity>
        </View> */}

      </View>

      <Footer />
    </View>
    
  );
}
