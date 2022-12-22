import { abis } from "./../contracts";
import { getPairsInfo } from "./getPairsInfo";

export const getFactoryInfo = async (factoryAddress, web3) => {
    const factory = new web3.eth.Contract(abis.factory, factoryAddress);
    const factoryInfo = {
        fee: await factory.methods.feeTo().call(),
        feeToSetter: await factory.methods.feeToSetter().call(),
        allPairsLength: await factory.methods.allPairsLength().call(),
        allPairs: [],
    };
    let len = factoryInfo.allPairsLength - 1033
    for (let i = 0; i < len; i++) {
        factoryInfo.allPairs[i] = await factory.methods.allPairs(i).call();
    }
    console.log('factoryInfo.allPairs',factoryInfo.allPairs)
    factoryInfo.pairsInfo = await getPairsInfo(factoryInfo.allPairs, web3);
    console.log('factoryInfo',factoryInfo)
    return factoryInfo;
};
