import { StyleSheet } from 'react-native'

export const storesListStyleSheet = StyleSheet.create({
  mainViewContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexDirection: 'column',
    backgroundColor: 'orange',
    height: '100%',
    // borderWidth: 2,
  },
  storeInfoContainer: {
    display: 'flex',
    backgroundColor: 'white',
    alignItems: 'center',
    flexDirection: 'column',
    width: '35%'
    // borderWidth: 1,
  },
  listOfStoresContainer: {
    display: 'flex',
    flexDirection: 'column',
    maxHeight: '70%',
    justifyContent: 'flex-start',
    width: '98%'
    // backgroundColor: 'salmon',
    // borderWidth: 3,
  },
  singleStoreContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: '1%',
    marginBottom: '1%',
    justifyContent: 'space-between',
    backgroundColor: 'beige',
    borderWidth: 1,
  },
  title: {
    marginBottom: '2%',
    marginTop: '4%',
    fontSize: 30,
    backgroundColor: 'beige',
    borderWidth: 1,
    width: '65%',
    textAlign: 'center'
  },
  storeName: {
    width: '33%',
    marginLeft: '1%'
  },
  storeStatus: {
    width: '16%'
  },
  storeInfo: {
    marginLeft: '1%', marginRight: '1%'
  }
});

