import { abis } from "./../contracts";

export const getPairsInfo = async (pairAddressesOld, web3) => {
    let pairAddresses = ['0x4c32dCc8138bbD129E54cED488298bD73f71cC91', '0x3d2180DB9E1B909f35C398BC39EF36108C0FC8c3', '0x8898f7742FC132a009Bc3EEecE8a1d460ADFb584', '0xDCB68AbA4c9B87C76fA6ADB54214451e91bFD1bC',
        '0xbA452A1c0875D33a440259B1ea4DcA8f5d86D9Ae',
        '0xC58cE0D8E2739bF0B587Fe7d664E18b097358121',
        '0x00FcaF5fE48D2a91D802701f72d3934F8B4352cc',
        '0xC3d6c4Dc34fdF640aCCe5D148Bde9F1BE8e38348',
        '0xb6a10514F7eFbb31a2778Db5DA27bB5F0b4ce092',
        '0x100f76725fa3f56699E4Ec9Ab15D1E5a9858aEF2',
        '0x1CD85eeFAE1843b1Ae77A3C81bc01f384d0E55b7',
        '0xd141aeD3FA86f411808D5D74BEbBC038e94f300D',
        '0x4bEB3E14d0beE6858131799fE4B0AC45822321d2',
        '0xbf62c67eA509E86F07c8c69d0286C0636C50270b',
        '0x8F09fFf247B8fDB80461E5Cf5E82dD1aE2EBd6d7',
        '0xA111C17f8B8303280d3EB01BBcd61000AA7F39F9',
        '0x4B377121d968Bf7a62D51B96523d59506e7c2BF0',
        '0x8bC556Cb72e7D77f79f9a3f5C4E27a22E60F20cf',
        '0x18AE87AE14279D42fCdde542c7Faa65768434024',
        '0x15fF6fB9D18AD509ae67aC81ce155a4341295299',
        '0xDCBEe84e534c8aC458Ef0F57E2137f086e034F09'
    ];
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
