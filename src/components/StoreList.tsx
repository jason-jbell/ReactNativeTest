import { View, Text, TouchableOpacity } from 'react-native'
import axios from 'axios'
import { TStore } from '../types';
import { storesListStyleSheet as styles} from '../styles/GlobalStyles';
import Footer from './Footer';
import { useEffect, useState } from 'react'

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

export default function StoreList ({ navigation }: any) {
  const [stores, setStores] = useState([])
  const fetchStores = async () => {
    await axios.get('http://localhost:8080/stores').then((response) => {
      setStores(response.data)
    })
    
  }
  useEffect(() => {
    fetchStores()
  }, [])
  
  return (
    <View style={{height:'100%'}}>
      
      <View style={styles.mainViewContainer}>
      
        <Text style={styles.title}>
          List of Stores
        </Text>
        <View style={styles.listOfStoresContainer}>
          {stores.map((store, idx) => renderStore(store, idx, navigation))} 
        </View>

        {/* create a form and submit button that takes in a TStore object and pushes it to the StoresList, causing a re-render I think */}
        <View style={styles.createAStoreContainer}>
          <Text>CREATE A STORE PLACEHOLDER</Text>
        </View>

      </View>

      <Footer />
    </View>
    
  );
}

