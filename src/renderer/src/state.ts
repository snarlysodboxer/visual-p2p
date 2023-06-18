import { atom } from 'recoil'

export const messagesState = atom<string[]>({
  key: 'messagesState', // unique ID (with respect to other atoms/selectors)
  default: [], // default value (aka initial value)
})
