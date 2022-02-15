import Header from '../../components/Header'
import { useEffect, useMemo, useState } from 'react'
import { useWeb3 } from '@3rdweb/hooks'
import { ThirdwebSDK } from '@3rdweb/sdk'
import { useRouter } from 'next/router'
import NFTImage from '../../components/nft/NFTImage'
import GeneralDetails from '../../components/nft/GeneralDetails'
import ItemActivity from '../../components/nft/ItemActivity'
import Purchase from '../../components/nft/Purchase'

const style = {
  wrapper: `flex flex-col items-center container-lg text-[#e5e8eb]`,
  container: `container p-6`,
  topContent: `flex`,
  nftImgContainer: `flex-1 mr-4`,
  detailsContainer: `flex-[2] ml-4`,
}

const Nft = () => {
  const { provider } = useWeb3()
  const [selectedNft, setSelectedNft] = useState()
  const [listings, setListings] = useState([])
  const router = useRouter()

  const nftModule = useMemo(() => {
    if (!provider) return
    const sdk = new ThirdwebSDK(
      provider.getSigner()
      // 'https://eth-rinkeby.alchemyapi.io/v2/hGw0TTlr4PN5UErueCKA4ZK-Ot7NG2mm'
    )
    return sdk.getNFTModule('0xe31D3fCdC4Ab6b3815aA907349d2D7564dB0e09C')
  }, [provider])

  // get all NFTs in the collection
  useEffect(() => {
    if (!nftModule) return
    ;(async () => {
      const nfts = await nftModule.getAll()
      //   returns array of nfts and then well locking to match id
      const selectedNftItem = nfts.find((nft) => nft.id === router.query.nftId)

      //  if matched then put it below
      setSelectedNft(selectedNftItem)
    })()
  }, [nftModule])

  const marketPlaceModule = useMemo(() => {
    if (!provider) return

    const sdk = new ThirdwebSDK(
      provider.getSigner()
      // 'https://eth-rinkeby.alchemyapi.io/v2/hGw0TTlr4PN5UErueCKA4ZK-Ot7NG2mm' was giving error, not needed
    )

    return sdk.getMarketplaceModule(
      '0x8BeB48A322c300BB39240B37151cE2A787A95Dfb'
    )
  }, [provider])

  useEffect(() => {
    if (!marketPlaceModule) return
    ;(async () => {
      setListings(await marketPlaceModule.getAllListings())
    })()
  }, [marketPlaceModule])

  return (
    <div>
      <Header />

      <div className={style.wrapper}>
        <div className={style.container}>
          <div className={style.topContent}>
            <div className={style.nftImgContainer}>
              <NFTImage selectedNft={selectedNft} />
            </div>
            <div className={style.detailsContainer}>
              <GeneralDetails selectedNft={selectedNft} />
              <Purchase
                isListed={router.query.isListed}
                selectedNft={selectedNft}
              />
              marketPlaceModule={marketPlaceModule}
            </div>
          </div>
          <ItemActivity selectedNft={selectedNft} listings={listings} />
        </div>
      </div>
    </div>
  )
}

export default Nft
