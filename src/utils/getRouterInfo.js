import { abis } from "./../contracts";
console.log('abi',abis)
export const getRouterInfo = async (routerAddress, web3) => {
    const router = new web3.eth.Contract(abis.router02, routerAddress);
    console.log('router',await router.methods.factory().call())
    return {
        factory: await router.methods.factory().call(),
    };
};
