import { useSelector } from 'react-redux'
import { State } from '../types'


export const useGetGeneralCurrency = () => {
  const _defaultCurrency = {
    address: "0x8BaBbB98678facC7342735486C851ABD7A0d17Ca",
    chainId: 97,
    decimals: 18,
    symbol: "ETH",
    logoURI: "https://pancakeswap.finance/images/tokens/0x2170ed0880ac9a755fd29b2688956bd959f933f8.png",
    name: "Ethereum Token",
  }
  return useSelector((state: State) => state.general.currency ? state.general.currency : _defaultCurrency)
}