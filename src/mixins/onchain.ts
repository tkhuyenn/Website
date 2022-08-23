import { Component, Mixins } from 'vue-property-decorator'
import PopupMixin from '@/mixins/popup'

import { namespace } from 'vuex-class'

const bcAuth = namespace('beAuth')
const bcNft = namespace('bcNft')
const beBase = namespace('beBase')

import getRepository from '@/services/index'
import NftRepository from '@/services/repositories/nft'
import NftRepositoryV2 from '@/services/repositories/nftv2'
import NftRepositoryV3 from '@/services/repositories/nftv3'
const apiNft: NftRepository = getRepository('nft')
const apiNftV2: NftRepositoryV2 = getRepository('nftv2')
const apiNftV3: NftRepositoryV3 = getRepository('nftv3')

import Moralis from 'moralis'

import md5 from 'md5'
import Cookies from 'js-cookie'
import filter from 'lodash/filter'

import includes from 'lodash/includes'

import WalletConnectProvider from '@walletconnect/web3-provider'
import Web3 from 'web3'

@Component({
  components: {}
})
export default class OnChainMixin extends Mixins(PopupMixin) {
  [x: string]: any
  @bcAuth.Action('setTokenExternalLogin') setTokenExternalLogin!: (data: Record<string, any>) => void
  @bcAuth.Action('setTokenExternalLoginMobile') setTokenExternalLoginMobile!: (data: Record<string, any>) => void
  @bcAuth.Getter('isLogin') isLogin!: boolean
  @bcAuth.Mutation('SET_WALLET_ADDRESS') setWalletAddress!: (address: string) => void

  @bcNft.Action('setInfoActivity') setInfoActivity!: (info: Record<string, any>) => void
  @bcAuth.State('walletAddress') walletAddress!: string
  @bcAuth.State('user') user!: Record<string, any>
  @bcNft.State('listNftAsset') listNftAssetOnChain!: Array<Record<string, any>>
  @bcNft.State('statusApproveAccount') statusApproveAccount!: string
  @bcNft.Mutation('SET_TYPE_OF_ACTION') setTypeOfAction!: (type: string) => void
  @bcNft.State('listAssetNetwork') listAssetNetwork!: Array<Record<string, any>>
  @bcNft.State('currencySelectBuy') currencySelectBuy!: string

  @bcNft.Mutation('SET_IS_ALREADY_APPROVE') setStatusAlreadyApprove!: (status: boolean) => void
  @bcNft.Mutation('SET_STATUS_APPROVE_ITEM') setStatusApproveItem!: (status: string) => void
  @bcNft.Mutation('SET_TRANSACTION_CODE_ITEM') setTransactionCodeItem!: (code: string) => void
  @bcNft.State('listAcceptCurrency') listAcceptCurrency!: Array<Record<string, any>>
  @bcNft.State('listAcceptCurrencyBuy') listAcceptCurrencyBuy!: Array<Record<string, any>>
  @bcNft.State('tokenNeedGetBalance') tokenNeedGetBalance!: string
  @bcNft.State('isDesktop') isDesktop!: boolean
  @bcNft.State('providerWc') providerWc!: WalletConnectProvider
  @bcNft.Mutation('SET_PROVIDER_WALLET_CONNECT') setProviderWalletConnect!: (provider: WalletConnectProvider) => void

  // khi lần đầu approve, sẽ watch thay đổi status + check thêm dkien isAlreadyApprove
  @bcNft.State('isAlreadyApprove') isAlreadyApprove!: boolean

  @beBase.State('coinMain') coinMain!: string
  @bcAuth.Getter('isShowCheckboxAccept') isShowCheckboxAccept!: boolean

  address = ''
  refApproveAccount: any = null

  isLoading = false
  isOpenPopup = false
  isClickConfirm = false

  chaiId = ''

  checkedAccept = false

  //term cac popup
  get getTerm(): string {
    if (this.systemParamsPublic.length) {
      const param = filter(this.systemParamsPublic, param => param.key === 'system.marketplace.terms.and.conditions')
      return (param[0] && param[0].value) || ''
    }
    return ''
  }

  get contractAddressExchange(): any {
    if (!this.isLogin) {
      const contract = filter(this.listNftAssetOnChain, elm => elm.type === 'EXCHANGE' && elm.isSystem && elm.baseCurrency === this.nftItem.baseCurrency)
      return contract.length ? contract[0].contractAddress : ''
    }
    return ''
  }

  async getAbiCode(currency: string, addressContract?: string): Promise<any> {
    try {
      const type = includes(['USDC', 'USDT', 'CLM', 'LYNK', 'ETH'], currency) ? 'ETH' : 'BNB'
      const contractAddress = addressContract ? addressContract : this.getContractAddressToGetAbiCode(currency)

      const resultAbi = await apiNft.getAbiContract(
        {
          module: 'contract',
          action: 'getabi',
          address: contractAddress,
          apikey: 'B17VBNBDA4EMUUT63JB5HT976WUSC8S55B'
        },
        type
      )
      const abi = JSON.parse(resultAbi)
      return Promise.resolve(abi)
    } catch (error) {
      return Promise.reject(error)
    }
  }

  async getBalance(contractAddress: string, currency: string): Promise<any> {
    try {
      const networkName = includes(['USDC', 'USDT', 'CLM', 'LYNK', 'ETH'], currency) ? process.env.VUE_APP_NETWORK_NAME_ETH : process.env.VUE_APP_NETWORK_NAME_BNB
      await Moralis.enableWeb3()
      if (currency === 'ETH' || currency === 'BNB') {
        const options = {
          chain: networkName,
          address: this.walletAddress
        }
        //@ts-ignore
        const balance = await Moralis.Web3API.account.getNativeBalance(options)
        return Promise.resolve(Number(Moralis.Units.FromWei(balance.balance)))
      }

      const options = {
        chain: networkName,
        address: this.walletAddress
      }
      //@ts-ignore
      const resultAll = await Moralis.Web3API.account.getTokenBalances(options)

      const token = filter(resultAll, elm => elm.token_address === contractAddress.toLowerCase())

      if (token.length) {
        return Promise.resolve(Number(token[0].balance) / Math.pow(10, Number(token[0].decimals)))
      }
      return Promise.resolve(0)

      // if (currency === 'ETH' || currency === 'BNB') {
      //   const options = {
      //     chain: 'ropsten',
      //     address: this.walletAddress
      //   }
      //   //@ts-ignore
      //   const balance = await Moralis.Web3API.account.getNativeBalance(options)
      //   return Number(Moralis.Units.FromWei(balance.balance))
      // } else {
      //   const abi = await this.getAbiCode(contractAddress, currency)

      //   const functionBalanceOf = filter(abi, elm => elm.name === 'balanceOf')[0]
      //   const nameParamsBalanceOf = functionBalanceOf.inputs[0].name

      //   const params = { [nameParamsBalanceOf]: this.walletAddress }
      //   const readOptions = {
      //     contractAddress,
      //     functionName: 'balanceOf',
      //     abi,
      //     params
      //   }
      //   console.log('readOptions', readOptions)

      //   const balances = await Moralis.executeFunction(readOptions)

      //   const decimal = this.$options.filters?.getDecimalsToken(currency)
      //   console.log('balances', (balances['_hex'], 16) / Math.pow(10, decimal))
      //   return parseInt(balances['_hex'], 16) / Math.pow(10, decimal)
      // }
    } catch (error: any) {
      if (error.message === 'Non ethereum enabled browser') {
        const message = this.$t('notify.install-metamask') as string
        this.$message.error({ message, duration: 5000 })
      }
      return Promise.reject(error)
    }
  }

  async actionWhenLogged(itemNft: Record<string, any>, contractAddress: string, type: 'bid' | 'buy' | 'offer', ownerId?: number): Promise<void> {
    const isExitsToken = Cookies.get('access_token') || ''
    //mạng ropsten
    // if (!isExitsToken) {
    //   await this.handleLoginExternal()
    // }
    let balance = 0

    if (type === 'buy') {
      balance = await this.getBalance(this.getContractAddressOfCurrency(this.currencySelectBuy), this.currencySelectBuy)
    } else {
      balance = await this.getBalance(this.getContractAddressOfCurrency(this.tokenNeedGetBalance), this.tokenNeedGetBalance)
    }

    const params = {
      listingId: itemNft?.minListingId,
      itemId: type === 'offer' ? itemNft.id : null,
      ownerId: type === 'offer' ? ownerId : null
    }
    const infoActivity = await apiNft.getLynkeyInfo(itemNft.currency, params)

    if (
      type !== 'buy' &&
      this.$route.name !== 'DetailNftItem' &&
      infoActivity.myOfferStatus !== 'SUCCESS' &&
      infoActivity.myOfferStatus !== 'FAILED' &&
      infoActivity.myOfferStatus !== null
    ) {
      const message = itemNft.itemName + ' ' + this.$t('notify.transaction-is-pending')
      this.$message.error({ message, duration: 5000 })
      return
    }
    await this.setInfoActivity({ ...infoActivity, available: balance })
    if (type === 'buy') {
      this.setOpenPopup({
        popupName: 'popup-buy-nft',
        isOpen: true
      })
    }
    if (type === 'bid') {
      this.setOpenPopup({
        popupName: 'popup-place-bid',
        isOpen: true
      })
    }
    if (type === 'offer') {
      this.setOpenPopup({
        popupName: 'popup-make-offer',
        isOpen: true
      })
    }
  }

  // async handleLoginExternal(): Promise<void> {
  //   try {
  //     const KEY = process.env.VUE_APP_KEY_EXTERNAL
  //     const credential = this.$options.filters?.encryptPassword(md5(this.address + KEY))

  //     const result = await apiNft.externalLogin({
  //       walletType: 'METAMASK',
  //       address: this.address,
  //       credential
  //     })
  //     this.setTokenExternalLogin(result)
  //     return Promise.resolve()
  //   } catch (error) {
  //     return Promise.reject()
  //   }
  // }

  getContractAddressToGetAbiCode(currency: string): string {
    if (this.listAssetNetwork.length) {
      const token = filter(this.listAssetNetwork, token => token.currency === currency)[0]
      if (Object.prototype.hasOwnProperty.call(token, 'implementAddress')) {
        return token.implementAddress
      }
      return token?.contractAddress || ''
    }
    return ''
  }

  getContractAddressOfCurrency(currency: string): string {
    if (this.listAssetNetwork.length) {
      const token = filter(this.listAssetNetwork, token => token.currency === currency)[0]
      return token?.contractAddress || ''
    }
    return ''
  }

  async getAllowance(ownerAddress: string, currency: string): Promise<Record<string, any>> {
    try {
      await Moralis.enableWeb3()
      const contractAddress = this.getContractAddressOfCurrency(currency)

      let abi: Array<Record<string, any>> = []

      abi = await this.getAbiCode(currency)

      const functionAllowance = filter(abi, elm => elm.name === 'allowance')[0]
      const nameParamsOwner = functionAllowance.inputs[0].name
      const nameParamsSpender = functionAllowance.inputs[1].name

      const params = {
        [nameParamsOwner]: ownerAddress,
        [nameParamsSpender]: this.contractAddressExchange
      }

      const readOptions = {
        contractAddress,
        functionName: 'allowance',
        abi,
        params
      }
      const allowance = await Moralis.executeFunction(readOptions)
      const decimal = this.$options.filters?.getDecimalsToken(currency)
      const data = {
        allowance: parseInt(allowance['_hex'], 16) / Math.pow(10, decimal),
        abi
      }
      return data
    } catch (error) {
      return Promise.reject(error)
    }
  }

  async setApprovalForAll(contractAddress: string, spenderWallet: string, currency: string): Promise<any> {
    try {
      await Moralis.enableWeb3()
      console.log('setApprovalForAll')

      const abi = await this.getAbiCode(currency, contractAddress)
      console.log(abi)

      const params = {
        operators: [spenderWallet, this.contractAddressExchange],
        approved: true
      }
      const readOptions = {
        contractAddress,
        functionName: 'setBatchApprovalForAll',
        abi,
        params
      }
      console.log(readOptions)

      const transaction = await Moralis.executeFunction(readOptions)
      this.isClickConfirm = true
      this.setStatusAlreadyApprove(true)
      return Promise.resolve(transaction)
    } catch (error) {
      this.isLoading = false
      console.log(error)
    }
  }

  async putOnSaleOnChain(body: Record<string, any>, contractAddress: string, spenderWallet: string, popupName: string, currency: string): Promise<any> {
    try {
      if (this.statusApproveAccount === 'NONE' || this.statusApproveAccount === 'FAILED') {
        const transaction = await this.setApprovalForAll(contractAddress, spenderWallet, currency)
        await apiNft.validateApprove({}, { hash: transaction.hash, itemId: body.itemId })
      }
      if (this.statusApproveAccount === 'SUCCESS') {
        await apiNftV3.fixedPrice(body)
        this.isLoading = false
        this.setOpenPopup({
          popupName,
          isOpen: false
        })
        const emitValue = popupName === 'popup-fixed-price' ? 'put-fixed' : popupName === 'popup-open-for-bids' ? 'put-open' : 'put-time'
        this.$emit('success', emitValue)
        return Promise.resolve()
      }
    } catch (error) {
      console.log(error)
      return Promise.reject(error)
    }
  }

  async acceptOfferOnchain(body: Record<string, any>, contractAddress: string, spenderWallet: string, popupName: string, currency: string, itemId?: number): Promise<void> {
    try {
      if (this.statusApproveAccount === 'NONE' || this.statusApproveAccount === 'FAILED') {
        const transaction = await this.setApprovalForAll(contractAddress, spenderWallet, currency)
        await apiNft.validateApprove({}, { hash: transaction.hash, itemId })
      }
      if (this.statusApproveAccount === 'SUCCESS') {
        await apiNftV3.postAcceptOffer(body)
        this.isLoading = false
        this.setOpenPopup({
          popupName,
          isOpen: false
        })
        this.setTypeOfAction('offer-accept')
        this.setOpenPopup({
          popupName: 'popup-notify-success',
          isOpen: true
        })
      }
    } catch (error) {
      return Promise.reject(error)
    }
  }

  async approveExchangeSpendTokenOfUser(
    currency: string,
    oldAmount: number,
    amount: number,
    type: 'bid-add' | 'bid-edit' | 'bid-cancel' | 'offer-make' | 'offer-edit' | 'offer-cancel'
  ): Promise<any> {
    try {
      const result = await this.getAllowance(this.walletAddress, currency)

      // eslint-disable-next-line prefer-const
      let { allowance, abi } = result
      if (type === 'bid-add' || type === 'offer-make') {
        allowance += amount
      }
      if (type === 'bid-edit' || type === 'offer-edit') {
        allowance = allowance - oldAmount + amount
      }
      if (type === 'bid-cancel' || type === 'offer-cancel') {
        allowance -= amount
      }
      console.log('allowance', allowance)

      const decimal = this.$options.filters?.getDecimalsToken(currency)

      const functionApprove = filter(abi, elm => elm.name === 'approve')[0]
      const nameParamsSpender = functionApprove.inputs[0].name
      const nameParamsAmount = functionApprove.inputs[1].name

      const params = {
        [nameParamsSpender]: this.contractAddressExchange,
        [nameParamsAmount]:
          currency === 'BNB' || currency === 'BUSD' ? Math.floor((allowance * Math.pow(10, decimal + 1)) / 10).toString() : Math.floor((allowance * Math.pow(10, decimal + 1)) / 10)
      }

      const contractAddress = this.getContractAddressOfCurrency(currency)

      const writeOptions = {
        contractAddress,
        functionName: 'approve',
        abi,
        params
      }
      console.log('writeOptions', writeOptions)

      const transaction = await Moralis.executeFunction(writeOptions)
      console.log(transaction)
      this.setTransactionCodeItem(transaction.hash)
      return Promise.resolve(transaction.hash)
    } catch (error) {
      return Promise.reject(error)
    }
  }
  async switchNetwork(baseCurrency: string): Promise<void> {
    try {
      await Moralis.enableWeb3()
      const chainIdNetWork = await this.getChainId()
      // let chainId = ''
      if (baseCurrency === 'ETH' && chainIdNetWork !== process.env.VUE_APP_CHAIN_ETH) {
        // chainId = process.env.VUE_APP_CHAIN_ETH as string
        // await Moralis.switchNetwork(chainId)

        // return

        const networkName = process.env.VUE_APP_SWITCH_NETWORK_NAME_ETH
        const message = this.$t('notify_switch-network', { network: networkName }) as string
        this.$message.error({ message, duration: 5000 })
        return Promise.reject({ code: 5888 })
      }
      if (baseCurrency === 'BNB' && chainIdNetWork !== process.env.VUE_APP_CHAIN_BNB) {
        // chainId = process.env.VUE_APP_CHAIN_BNB as string
        // await Moralis.switchNetwork(chainId)
        // return
        const networkName = process.env.VUE_APP_SWITCH_NETWORK_NAME_BNB
        const message = this.$t('notify_switch-network', { network: networkName }) as string
        this.$message.error({ message, duration: 5000 })
        return Promise.reject({ code: 5888 })
      }
      return Promise.resolve()
      // const balance = await this.getBalance(this.getContractAddressOfCurrency(this.currencySelectBuy), this.currencySelectBuy)
      // console.log(balance)
    } catch (error: any) {
      console.log(error)
      // if (error.code === 4902) {
      //   //@ts-ignore
      //   await window.ethereum.request({
      //     method: 'wallet_addEthereumChain',
      //     params: [
      //       {
      //         chainId: '0x61',
      //         chainName: 'Binance Smart Chain Testnet',
      //         nativeCurrency: {
      //           name: 'BNB',
      //           symbol: 'BNB',
      //           decimals: 18
      //         },
      //         rpcUrls: ['https://data-seed-prebsc-1-s1.binance.org:8545'],
      //         blockExplorerUrls: ['https://testnet.bscscan.com']
      //       }
      //     ]
      //   })
      //   await this.switchNetwork(baseCurrency)
      // }
      return Promise.reject(error)
    }
  }

  async getChainId(): Promise<string | any> {
    try {
      await Moralis.enableWeb3()
      const chainId = await Moralis.chainId
      return Promise.resolve(chainId)
    } catch (error) {
      console.log(error)
      return Promise.reject(error)
    }
  }

  // Code phần wallet connect mobile

  async enableWeb3Provider(): Promise<WalletConnectProvider> {
    //  Create WalletConnect Provider
    const provider = new WalletConnectProvider({
      rpc: {
        97: 'https://nd-406-881-551.p2pify.com/315129e28d1858397753ab2c06e23fc5',
        3: 'https://nd-910-981-089.p2pify.com/bca35fb26ea8a7972e8be644bc8f6e26'
      },
      // infuraId: '9aa3d95b3bc440fa88ea12eaa4456161',
      qrcodeModalOptions: {
        // mobileLinks: ['rainbow', 'metamask', 'argent', 'trust', 'imtoken', 'pillar']
        mobileLinks: ['metamask']
      }
    })

    return provider
  }

  async autoConnect(): Promise<void> {
    try {
      const isWalletConnect = localStorage.getItem('walletconnect')

      if (isWalletConnect) {
        const provider = await this.enableWeb3Provider()

        await provider.enable()

        //@ts-ignore
        const web3 = new Web3(provider)

        const account = await web3.eth.getAccounts()

        this.setWalletAddress(account[0])

        this.setProviderWalletConnect(provider)
      }
    } catch (error) {
      console.log(error)
    }
  }

  async disconnectWc(): Promise<void> {
    try {
      await this.providerWc.disconnect()
      console.log('disconnect')
      return Promise.resolve()
    } catch (error) {
      console.log(error)
    }
  }
}
