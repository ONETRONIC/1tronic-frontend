import { LaunchpadConfig } from './types'

const launchpads: LaunchpadConfig[] = [
  {
    projectId: 1,
    projectTitle: 'Alchemy Toys',
    projectTagline: 'Experience fully on-chain gaming and trading.',
    projectDescription: 'GAT Network is a registered German Tech company that offers an ecosystem for fully on-chain gaming and trading with collectible NFTs that are backed by real value. The first game in the ecosystem, Alchemy Toys, has already been launched in May and with over 45,000+ minted TOYs and many excited players, Alchemy Toys belongs to the most intense NFT projects on BSC.',
    projectBannerUrl: 'https://www.bakeryswap.org/static/media/gat.e594836a.png',
    projectWebsiteUrl: 'https://gat.network/',
    symbol: 'GAT',
    amount: 300000,
    supportedCoin: ['BNB'],
    price: 0.005,
    startBlock: '0',
    endOffer: ' 07.19 7:00 AM UTC',
    status: 'open'
  },
  {
    projectId: 2,
    projectTitle: 'Spartan',
    projectTagline: 'The first live staking casino on the Bsc&Ethereum.',
    projectDescription: 'Spartan Casino is the first live staking casino on the Bsc chain and cross chain with Ethereum. Spartan Casino will provide a Live dealer experience with a wide range of 3rd party partners to bring that real casino experience and more.',
    projectBannerUrl: 'https://www.bakeryswap.org/static/media/spartant.17bd5c3e.png',
    projectWebsiteUrl: 'https://spartan.casino/',
    symbol: 'WAR',
    amount: 16000000 ,
    supportedCoin: ['BUSD'],
    price: 0.05,
    startBlock: '0',
    endOffer: ' 07.19 7:00 AM UTC',
    status: 'ended'
  },
  {
    projectId: 3,
    projectTitle: 'Crudeoil',
    projectTagline: 'The next generation decentralized deflationary farming platform.',
    projectDescription: 'Crudeoil Finance is a next generation decentralized deflationary farming platform and yield aggregator/optimizer built on binance smart chain to power the DEFI economy.',
    projectBannerUrl: 'https://www.bakeryswap.org/static/media/diesel.bb07a18d.png',
    projectWebsiteUrl: 'https://crudeoil.finance/',
    symbol: 'DIESEL',
    amount: 150000,
    supportedCoin: ['BNB'],
    price: 0.008,
    startBlock: '0',
    endOffer: ' 07.19 7:00 AM UTC',
    status: 'ended'
  }
]

export default launchpads
