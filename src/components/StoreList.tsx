import { View, Text, TouchableOpacity } from 'react-native'
import StoresList from '../../assets/data';
import { TStore } from '../types';
import { storesListStyleSheet as styles} from '../styles/GlobalStyles';
import Header from './Header'
import Footer from './Footer';

const renderStore = (store: TStore, idx: number, navigation: any) => {
  return (
  <TouchableOpacity onPress={() => navigation.navigate('SingleStore')}>

    <View key={idx} style={styles.singleStoreContainer}>
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
  return (
    <View style={{height:'100%'}}>
      <Header />
      
      <View style={styles.mainViewContainer}>
      
        <Text style={styles.title}>
          List of Stores
        </Text>
        <View style={styles.listOfStoresContainer}>
          {StoresList.map((store, idx) => renderStore(store, idx, navigation))} 
        </View>
      
      </View>

      <Footer />
    </View>
    
  );
}
