import { ChainId } from "@usedapp/core";
// export const ROUTER_ADDRESS = process.env.REACT_APP_ROUTER_ADDRESS;
export const ROUTER_ADDRESS = '0xeC0A7a0C2439E8Cb67b992b12ecd020Ea943c7Be'; 

export const DAPP_CONFIG = {
  pollingInterval: 5000,
  autoConnect: true,
  readOnlyChainId: ChainId.Cronos,
  readOnlyUrls: {
    [ChainId.Cronos]: "https://evm.cronos.org"
    // [ChainId.Cronos]: "https://node.croswap.com/rpc"
  },
};