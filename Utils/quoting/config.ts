import { SupportedChainId, Token } from "@uniswap/sdk-core"
import { FeeAmount } from "@uniswap/v3-sdk"

// Inputs that configure this example to run
export interface QuoteInfoConfig {
    rpc: {
        local: string
        mainnet: string
    }
    tokens: {
        in: Token
        amountIn: number
        out: Token
        poolFee: number
    }
}

export interface TokenBasic {
    symbol: string
    address: string
    decimals: number
    balance: bigint
}

// Example Configuration

export function quoteInfoConfig(
    tokenIn: TokenBasic,
    tokenOut: TokenBasic,
    amountIn: number
): QuoteInfoConfig {
    const token0 = new Token(
        SupportedChainId.MAINNET,
        tokenIn.address,
        tokenIn.decimals,
        tokenIn.symbol
    )
    const token1 = new Token(
        SupportedChainId.MAINNET,
        tokenOut.address,
        tokenOut.decimals,
        tokenOut.symbol
    )
    const CurrentConfig: QuoteInfoConfig = {
        rpc: {
            local: "http://localhost:8545",
            mainnet:
                "https://eth-mainnet.g.alchemy.com/v2/NRgQW5bcNa1oaHlJ6ROzzN6Pr1fHJ-86",
        },
        tokens: {
            in: token0,
            amountIn: amountIn,
            out: token1,
            poolFee: FeeAmount.MEDIUM,
        },
    }
    return CurrentConfig
}
