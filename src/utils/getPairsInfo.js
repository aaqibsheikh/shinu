import { abis } from "./../contracts";

export const getPairsInfo = async (pairAddressesOld, web3) => {
    let pairAddresses = ['0x4c32dCc8138bbD129E54cED488298bD73f71cC91', '0x3d2180DB9E1B909f35C398BC39EF36108C0FC8c3', '0x8898f7742FC132a009Bc3EEecE8a1d460ADFb584', '0xDCB68AbA4c9B87C76fA6ADB54214451e91bFD1bC'];
    const pairsInfo = [];
    const pairABI = abis.pair;
    const tokenABI = abis.erc20.abi;
    for (let i = 0; i < pairAddresses.length; i++) {
        const pairAddress = pairAddresses[i];
        const pair = new web3.eth.Contract(pairABI, pairAddress);
        const token0Address = await pair.methods.token0().call();
        const token1Address = await pair.methods.token1().call();
        const token0Contract = new web3.eth.Contract(tokenABI, token0Address);
        const token1Contract = new web3.eth.Contract(tokenABI, token1Address);
        const token0Name = await token0Contract.methods.name().call();
        const token1Name = await token1Contract.methods.name().call();
        pairsInfo.push({
            address: pairAddress,
            token0Address,
            token1Address,
            token0Name,
            token1Name,
        });
    }
    return pairsInfo;
};
