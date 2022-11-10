export type TOwner = {
  _id?: string,
  email: string,
  password: string
}
export type TProps = {
  owner: TOwner,
  success: boolean,
  token: string
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
