import { InjectedConnector } from '@web3-react/injected-connector';
import { WalletConnectConnector } from '@web3-react/walletconnect-connector';
const NETWORK_URL = process.env.REACT_APP_NETWORK_URL;
export const NETWORK_CHAIN_ID = parseInt(
  process.env.REACT_APP_CHAIN_ID ?? '250',
);
export const injected = new InjectedConnector({
  supportedChainIds: [NETWORK_CHAIN_ID, 250],
});
export const walletconnect = new WalletConnectConnector({
  rpc: { [NETWORK_CHAIN_ID]: NETWORK_URL },
  bridge: 'https://bridge.walletconnect.org',
  qrcode: true,
  pollingInterval: 15000,
  supportedChainIds: [NETWORK_CHAIN_ID, 250],
  chainId: NETWORK_CHAIN_ID,
});
export const SUPPORTED_WALLETS = {
  METAMASK: {
    connector: injected,
    name: 'MetaMask',
    iconName: 'metamask.svg',
    description: 'Easy-to-use browser extension.',
    href: null,
    color: '#E8831D',
    isInstalled: () => window.ethereum && window.ethereum.isMetaMask,
  },
  WALLET_CONNECT: {
    connector: walletconnect,
    name: 'WalletConnect',
    iconName: 'walletconnect.svg',
    description: 'Connect to Trust Wallet, Rainbow Wallet and more...',
    href: null,
    color: '#4196FC',
    mobile: true,
    isInstalled: () => true,
  },
};
