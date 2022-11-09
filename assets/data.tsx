import { TStore } from '../src/types'

const Jasons: TStore = {
  id: '01',
  name: "Jason's",
  owner: '635b2f6ce7788cfd72bfaf0c',
  address: '1680 pride',
  phone: '805-915-9336',
  status: 'online',
  navigation: 'jason'
}

const Venessas: TStore = {
  id: '02',
  name: "Venessas's",
  owner: '635b2f6ce7788cfd72bfaf0c',
  address: '1680 gay',
  phone: '818-939-5090',
  status: 'online',
  navigation: 'venes'
}

const JimmyJons: TStore = {
  id: '02',
  name: "Jimmy John's",
  owner: '635b2f6ce7788cfd72bfaf0c',
  address: '1680 nonpride',
  phone: '818-939-5090',
  status: 'offline',
  navigation: 'venes'
}

const Shs: TStore = {
  id: '02',
  name: "Sh's",
  owner: '635b2f6ce7788cfd72bfaf0c',
  address: '1680 nonpride',
  phone: '818-939-5090',
  status: 'offline',
  navigation: 'venes'
}

const StoresList = [Jasons, Venessas, JimmyJons, Shs]

const testStore: TStore = {
  id: '69',
  name: 'string',
  owner: '635b2f6ce7788cfd72bfaf0c',
  address: 'string',
  phone: 'string',
  status: 'online',
}
export { StoresList, testStore }