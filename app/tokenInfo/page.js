"use client"
// tools
import Image from "next/image"
import assessts from "../../public"

// context
import { useContext } from "react"
import { SwapInfoContext } from "../../context/swapInfoContext"

export default function Home() {
    const { topTokenList } = useContext(SwapInfoContext)

    return (
        <div className="h-screen flex justify-center mt-20">
            <div className="grid gap-4">
                <span className=" text-2xl">Uniswap 代币交易量</span>
                <div className="flex gap-4">
                    <button className="btn gap-2">
                        <Image
                            src={assessts.ethereum}
                            alt="logo"
                            width={20}
                            height={20}
                        />
                        Ethereum
                    </button>
                    <input
                        className="input bg-neutral"
                        placeholder="筛选代币"
                    />
                </div>
                {/* top 20 token list */}
                <div class="overflow-x-auto">
                    <table class="table table-zebra">
                        {/* <!-- head --> */}
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>代币名称</th>
                                <th>价格 (ETH)</th>
                                <th>总锁仓量 (USD)</th>
                                <th>总交易次数</th>
                                <th>交易体量 (USD)</th>
                            </tr>
                        </thead>
                        <tbody>
                            {topTokenList.map((el, i) => (
                                <tr>
                                    <th>{i + 1}</th>
                                    <td className="flex items-center gap-1">
                                        <Image
                                            src={assessts.ethereum}
                                            height={15}
                                            width={15}
                                            alt="eth-logo"
                                        />
                                        {el.name.length > 15 ? (
                                            <small>
                                                {el.name.slice(0, 15)}...{" "}
                                            </small>
                                        ) : (
                                            <small>{el.name} </small>
                                        )}
                                        {el.symbol}
                                    </td>
                                    <td>{el.derivedETH.slice(0, 9)}</td>
                                    <td>
                                        {el.totalValueLockedUSD.slice(0, 12)}
                                    </td>
                                    <td>{el.txCount}</td>
                                    <td>{el.volumeUSD.slice(0, 14)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}
