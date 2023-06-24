"use client"
// hooks
import { createContext, useEffect, useState } from "react"
import {
    useAccount,
    useConnect,
    useBalance,
    useWalletClient,
    useContractWrite,
    useWaitForTransaction,
} from "wagmi"
import { fetchBalance } from "@wagmi/core"
import { InjectedConnector } from "wagmi/connectors/injected"
import { tokensERC20 } from "../address/tokenAddress"
// tool
import axios from "axios"
import { parseUnits } from "viem"
import { erc20ABI } from "wagmi"
// contract address
import { singleSwapTokenAddress } from "../../hardhat-uniswap-fcc/scripts/address"
import singleSwapTokenABI from "../../hardhat-uniswap-fcc/artifacts/contracts/SwapToken.sol/SingleSwapToken.json"
import IWETH from "../ABI/WETH.json"
import { hardhat } from "viem/chains"
// context
export const SwapInfoContext = createContext()

// context componet
export default function SwapInfoProvider({ children }) {
    //account connect info
    const { address: userAddress, isConnected } = useAccount()
    const { connect } = useConnect({
        connector: new InjectedConnector(),
    })
    // token info
    const [tokensInfo, setTokensInfo] = useState([])
    const [topTokenList, setTopTokenList] = useState()
    const { data: walletClient } = useWalletClient({
        account: userAddress,
    })

    // swap single token
    const { data: swapSingleTokenHex, write: SwapSingleToken } =
        useContractWrite({
            address: singleSwapTokenAddress,
            abi: singleSwapTokenABI.abi,
            functionName: "swapExactInputSingle",
        })
    const {
        data: dataConvertETHToWETH,
        isSuccess: convertSuccess,
        write: convertETHToWETH,
    } = useContractWrite({
        address: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
        abi: IWETH,
        functionName: "deposit",
    })
    const { isSuccess: swapSuccess } = useWaitForTransaction({
        hash: swapSingleTokenHex,
    })
    async function swapSingleToken(token1, token2, inputAmount) {
        console.log(typeof inputAmount)
        const amountIn = parseUnits(inputAmount.toString(), token1.decimals)
        // if token1 is ETH, convert ETH to WETH first
        if (token1.address == "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2") {
            convertETHToWETH({ value: amountIn })
        }
        await walletClient.writeContract({
            address: token1.address,
            abi: erc20ABI,
            functionName: "approve",
            args: [singleSwapTokenAddress, amountIn],
            chain: hardhat,
        })
        SwapSingleToken({ args: [token1.address, token2.address, amountIn] })
    }

    // // fetch tokens balance
    // async function fetchTokensInfo() {
    //     const ethInfo = await fetchBalance({ address: userAddress })
    //     console.log(ethInfo)
    //     tokensInfo.push({
    //         ...ethInfo,
    //         address: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
    //     })
    //     tokensERC20.map(async (el) => {
    //         const erc20Info = await fetchBalance({
    //             address: userAddress,
    //             token: el.address,
    //         })
    //         tokensInfo.push({
    //             ...erc20Info,
    //             address: el.address,
    //         })
    //     })
    // }
    // useEffect(() => {
    //     if (isConnected) {
    //         console.log("fetch begin")
    //         fetchTokensInfo()
    //     }
    // }, [isConnected])
    useEffect(() => {
        if (swapSuccess) {
            setTokensInfo([])
            console.log(swapSuccess)
        }
    }, [swapSuccess])

    // fetch ether info
    const {
        data: ethInfo,
        isFetched: isFetchedEthInfo,
        isRefetching: isRefetchingEthInfo,
    } = useBalance({
        address: userAddress,
        watch: true,
    })
    if (
        isFetchedEthInfo &&
        tokensInfo.find((el) => el.symbol === ethInfo.symbol) == undefined
    ) {
        tokensInfo.push({
            ...ethInfo,
            address: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
        })
    }

    //fetch ERC-20 token info
    tokensERC20.map((el, i) => {
        const { data, isFetched, isRefetching } = useBalance({
            address: userAddress,
            token: el.address,
            watch: true,
        })
        if (
            isFetched &&
            tokensInfo.find((el) => el.symbol === data.symbol) == undefined
        ) {
            tokensInfo.push({
                ...data,
                address: el.address,
            })
        }
    })

    //fetch uniswap swap top 20 tokeninfo
    async function fetchTop20Token() {
        const query = `{
            tokens(orderBy: volumeUSD, orderDirection: desc, first: 20) {
                id
                name
                symbol
                txCount
                volumeUSD
                totalSupply
                totalValueLockedUSD
                volume
                feesUSD
                derivedETH
                }
            }`

        const axiosData = await axios.post(
            process.env.NEXT_PUBLIC_UNISWAP_SWAPAMOUNT_URL,
            { query }
        )
        setTopTokenList(axiosData.data.data.tokens)
    }
    useEffect(() => {
        fetchTop20Token()
    }, [])

    return (
        <SwapInfoContext.Provider
            value={{
                isConnected,
                connect,
                userAddress,
                tokensInfo,
                topTokenList,
                swapSingleToken,
            }}
        >
            {children}
        </SwapInfoContext.Provider>
    )
}
