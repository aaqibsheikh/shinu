import Web3 from 'web3';
import { useState, useEffect } from 'react';
import { useConfig } from '@usedapp/core';

import { ROUTER_ADDRESS } from '../config';
import { getFactoryInfo, getRouterInfo } from '../utils';
console.log('ROUTER_ADDRESS',ROUTER_ADDRESS)
export const loadPools = async (providerUrl) => {
  const provider = new Web3.providers.HttpProvider(providerUrl);
  const web3 = new Web3(provider);

  console.log('web3',web3)
  const routerInfo = await getRouterInfo(ROUTER_ADDRESS, web3);
  console.log('routerInfo',routerInfo.factory)
  const factoryInfo = await getFactoryInfo(routerInfo.factory, web3);
  console.log('factoryInfo',factoryInfo)
  return factoryInfo.pairsInfo;
};

export const usePools = () => {
  const { readOnlyChainId, readOnlyUrls } = useConfig();
  const [loading, setLoading] = useState(true);
  const [pools, setPools] = useState([]);
  useEffect(() => {
    loadPools(readOnlyUrls[readOnlyChainId])
      .then((pools) => {
        console.log('pools',pools)
          setPools(pools);
          setLoading(false);
      });
  }, [readOnlyChainId, readOnlyUrls]);

  return [loading, pools];
};
