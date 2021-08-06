import { useSelector } from 'react-redux'
import { State } from '../types'


export const useGetGeneralCurrency = () => {
  return useSelector((state: State) => state.general.currency)
}