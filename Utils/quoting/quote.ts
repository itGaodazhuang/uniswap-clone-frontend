import { ethers } from "ethers"
import { quoteInfoConfig, TokenBasic, QuoteInfoConfig } from "./config"
import { computePoolAddress } from "@uniswap/v3-sdk"
import Quoter from "@uniswap/v3-periphery/artifacts/contracts/lens/Quoter.sol/Quoter.json"
import IUniswapV3PoolABI from "@uniswap/v3-core/artifacts/contracts/interfaces/IUniswapV3Pool.sol/IUniswapV3Pool.json"
import {
    POOL_FACTORY_CONTRACT_ADDRESS,
    QUOTER_CONTRACT_ADDRESS,
} from "./constants"
import { toReadableAmount, fromReadableAmount } from "./conversion"

export async function quote(
    token0: TokenBasic,
    token1: TokenBasic,
    amountIn: number
): Promise<string> {
    const CurrentConfig = quoteInfoConfig(token0, token1, amountIn)
    const provider = new ethers.providers.JsonRpcProvider(
        CurrentConfig.rpc.mainnet
    )
    const quoterContract = new ethers.Contract(
        QUOTER_CONTRACT_ADDRESS,
        Quoter.abi,
        provider
    )
    const poolConstants = await getPoolConstants(CurrentConfig)

    const quotedAmountOut =
        await quoterContract.callStatic.quoteExactInputSingle(
            poolConstants.token0,
            poolConstants.token1,
            poolConstants.fee,
            fromReadableAmount(
                CurrentConfig.tokens.amountIn,
                CurrentConfig.tokens.in.decimals
            ).toString(),
            0
        )
    return toReadableAmount(quotedAmountOut, CurrentConfig.tokens.out.decimals)
}

async function getPoolConstants(CurrentConfig: QuoteInfoConfig): Promise<{
    token0: string
    token1: string
    fee: number
}> {
    const provider = new ethers.providers.JsonRpcProvider(
        CurrentConfig.rpc.mainnet
    )
    const currentPoolAddress = computePoolAddress({
        factoryAddress: POOL_FACTORY_CONTRACT_ADDRESS,
        tokenA: CurrentConfig.tokens.in,
        tokenB: CurrentConfig.tokens.out,
        fee: CurrentConfig.tokens.poolFee,
    })

    const poolContract = new ethers.Contract(
        currentPoolAddress,
        IUniswapV3PoolABI.abi,
        provider
    )
    let [token0, token1, fee] = await Promise.all([
        poolContract.token0(),
        poolContract.token1(),
        poolContract.fee(),
    ])
    // token0，token1 need to be swaped sometimes
    // with unkonwen reason
    if (token0.toString() != CurrentConfig.tokens.in.address) {
        const temp = token0
        token0 = token1
        token1 = temp
    }

    // console.log("CurrentConfig", CurrentConfig)
    // console.log("poolAddress", currentPoolAddress)
    // console.log("token0", token0)
    // console.log("token1", token1)

    return {
        token0,
        token1,
        fee,
    }
}
