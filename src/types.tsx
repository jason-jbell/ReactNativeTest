export type TOwner = {
  email: string,
  password: string
}

export type TStore = {
  id: string,
  name: string,
  owner: string,
  address: string,
  phone: string,
  status: 'online' | 'offline',
  navigation?: string
}
