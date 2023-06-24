import { configureChains, createConfig, mainnet } from "wagmi"
import { alchemyProvider } from "wagmi/providers/alchemy"
import { jsonRpcProvider } from "wagmi/providers/jsonRpc"
import { publicProvider } from "wagmi/providers/public"
import { hardhat } from "viem/chains"
import { InjectedConnector } from "@wagmi/core"

// config chains
export const { chains, publicClient, webSocketPublicClient } = configureChains(
    [mainnet, hardhat],
    [
        alchemyProvider({ apiKey: process.env.NEXT_PUBLIC_ALCHEMY_API_KEY }),
        jsonRpcProvider({
            rpc: () => ({
                http: "http://127.0.0.1:8545/",
            }),
        }),
    ]
)
// create a wagmi config
export const config = createConfig({
    publicClient,
    connectors: [new InjectedConnector({ chains })],
    webSocketPublicClient,
})
