import React, { useState, useEffect } from 'react';
import WalletConnectProvider from '@walletconnect/web3-provider'

import { ChainId, shortenAddress, useEthers, useLookupAddress } from '@usedapp/core';

import styles from '../styles';

const WalletButton = () => {
  const [accountAddress, setAccountAddress] = useState(null);
  const { ens } = useLookupAddress();
  const { account, activateBrowserWallet, deactivate, activate } = useEthers();

  useEffect(() => {
    if (ens) {
      setAccountAddress(ens);
    }
    else if (account) {
      setAccountAddress(shortenAddress(account));
    }
    else {
      setAccountAddress(null);
    }
  }, [account, ens, setAccountAddress]);

  const connectToWalletConnect = async () => {
    try {
      const provider = new WalletConnectProvider({
        qrcode: true,
        bridge: 'https://bridge.walletconnect.org',
        rpc: {
          [ChainId.Cronos]: "https://node.croswap.com/rpc",
        },
      })

      await provider.enable()
      activate(provider)

      console.log('WalletConnect Provider', provider)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <>
      <button onClick={() => {
        if (!account) {
          activateBrowserWallet();
        } else {
          deactivate();
        }
      }} className={styles.walletButton}>
        {(accountAddress) ? accountAddress : 'Connect Wallet'}
      </button>

      <button onClick={() => {
        if (!account) {
          connectToWalletConnect();
        } else {
          deactivate();
        }
      }} className={styles.walletConnectButton}>
        {(accountAddress) ? accountAddress : 'Connect Wallet'}
      </button>
    </>
  
  );
};

export default WalletButton;
