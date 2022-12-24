import React, { useEffect } from 'react';

import WalletConnectProvider from '@walletconnect/web3-provider'
import { useEthers, ChainId } from '@usedapp/core'



import { usePools } from './hooks';
import styles from './styles';
import { logo } from './assets';
import { Exchange, Loader, WalletButton } from "./components";


const App = () => {
  const [loading, pools] = usePools();

  const {
    account,
    active,
    activate,
    chainId,
  } = useEthers()

  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", () => {
        window.location.reload();
      });
    }
  });

  
  useEffect(() => {
   
    const checkWalletConnectSession = async () => {
      if (window.localStorage.walletconnect) {
        const provider = new WalletConnectProvider({
          qrcode: true,
          bridge: 'https://bridge.walletconnect.org',
          rpc: {
            [ChainId.Cronos]: "https://evm.cronos.org",
          },
          chainId: ChainId.Cronos
        })
        await provider.enable()
        await activate(provider)
      }
    }
    
    checkWalletConnectSession()
    if (active && ChainId.Cronos !== chainId) {
      alert('Connect to Cronos Chain and refresh page')
    }
  }, [chainId])

  return (
  <>
    <div className={ styles.container }>
      <div className={styles.innerContainer}>
        <header className={styles.header}>
          <img src={logo} alt="uniswap logo" className="w-16 h-16 object-contain" />
          <WalletButton />
        </header>
        <div className={styles.exchangeContainer}>
          <h1 className={styles.headTitle}>EZswap</h1>
          <p className={styles.subTitle}>Exchange tokens in seconds</p>
          <div className={styles.exchangeBoxWrapper}>
            <div className={styles.exchangeBox}>
              <div className="pink_gradient" />
              <div className={styles.exchange}>
                {account
                  ? (loading
                    ? (<Loader title="Loading pools, please wait!" />)
                    : <Exchange pools={pools} />)
                  : <Loader title="Please connect your wallet" />}
              </div>
              <div className="blue_gradient" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </>
  );
};

export default App;