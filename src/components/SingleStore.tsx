import { View, Text } from 'react-native'
import { storesListStyleSheet as styles } from '../styles/GlobalStyles';
import { StoresList } from '../../assets/data'

const Jasons = StoresList[0]

export default function SingleStore() {
  // console.log(Object.keys(Jasons))
  return (
    <View style={styles.mainViewContainer}>
      <Text style={styles.title}>
        {Jasons.name}
      </Text>
    </View>
  );
}
