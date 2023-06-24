// tools
import Image from "next/image"
import assessts from "../public"
// components
import TokenSelect from "./TokenSelect"
import TokenSetting from "./TokenSetting"
// methods
import { quote } from "../Utils/quoting/quote"
// hooks
import { useAccount } from "wagmi"
import { useState } from "react"
// swap info context
import { useContext } from "react"
import { SwapInfoContext } from "../context/swapInfoContext"

export default function SwapToken() {
    // hooks
    const { isConnected } = useAccount()
    const [token1, setToken1] = useState()
    const [token2, setToken2] = useState()
    const [amountIn, setAmountIn] = useState()
    const [amountOut, setAmountOut] = useState()
    const [search, setSearch] = useState(false)
    // context
    const { swapSingleToken } = useContext(SwapInfoContext)

    // fetch amount out info
    async function quoteOutputPrice(value) {
        setSearch(true)
        console.log("输入金额：", value)
        const quoteData = await quote(token1, token2, value)
        setAmountIn(value)
        setAmountOut(quoteData)
        setSearch(false)
    }

    return (
        <div className="flex h-1/2 justify-center mt-20">
            {/* swap box */}
            <div className="grid p-4 bg-base-300 rounded-lg h-full">
                {/* control bar */}
                <div className="flex items-center">
                    <div className="flex gap-4">
                        <p className=" cursor-pointer">兑换</p>
                        <p className=" cursor-pointer">购买</p>
                    </div>
                    <label
                        className="bg-transparent ml-auto cursor-pointer"
                        htmlFor="tokenSetting"
                    >
                        <Image
                            src={assessts.gear}
                            width={30}
                            height={30}
                            alt="control logo"
                        ></Image>
                    </label>
                </div>

                {/* swap info */}
                <div className="gap-2 grid mt-4 h-5/6">
                    {/* input swap amount */}
                    <label className="flex form-control items-center bg-base-100 input-bordered rounded-lg px-2">
                        <label className="flex items-center">
                            <input
                                className=" text-lg input-lg outline-none bg-transparent"
                                type="number"
                                min={0.00001}
                                onBlur={(e) => {
                                    const value = parseFloat(e.target.value)
                                    if (token1 && token2 && value) {
                                        quoteOutputPrice(value)
                                    }
                                }}
                            ></input>
                            <label
                                className="btn flex gap-2 border-none ml-auto"
                                htmlFor="selectToken1"
                            >
                                {token1 ? (
                                    <div className="flex items-center gap-2">
                                        <Image
                                            src={assessts.ethlogo}
                                            alt="logo"
                                            width={20}
                                            height={20}
                                        ></Image>
                                        {token1.symbol}
                                    </div>
                                ) : (
                                    "选择代币"
                                )}
                            </label>
                        </label>
                    </label>
                    {/* calculate amount display */}
                    <label className="flex items-center bg-base-100 input-bordered rounded-lg px-2">
                        <label className="flex items-center h-11/12 w-full">
                            <div className=" text-lg input-lg outline-none bg-transparent flex items-center">
                                {search ? (
                                    <progress className="progress progress-primary w-56"></progress>
                                ) : amountOut ? (
                                    amountOut
                                ) : (
                                    ""
                                )}
                            </div>
                            <label
                                className="btn flex gap-2 border-none ml-auto"
                                htmlFor="selectToken2"
                            >
                                {token2 ? (
                                    <div className="flex items-center gap-2">
                                        <Image
                                            src={assessts.ethlogo}
                                            alt="logo"
                                            width={20}
                                            height={20}
                                        ></Image>
                                        {token2.symbol}
                                    </div>
                                ) : (
                                    "选择代币"
                                )}
                            </label>
                        </label>
                    </label>
                </div>

                <div className="divider" />

                {/* swap button */}
                {isConnected ? (
                    <button
                        className="btn btn-block"
                        onClick={() =>
                            swapSingleToken(token1, token2, amountIn)
                        }
                    >
                        兑换
                    </button>
                ) : (
                    <button className="btn btn-block">连接钱包</button>
                )}
            </div>
            {/* modal dialog */}
            <>
                {/* select token modal dialog */}
                {/* token1 */}
                <input
                    type="checkbox"
                    id="selectToken1"
                    className="modal-toggle"
                />
                <label htmlFor="selectToken1" className="modal cursor-pointer">
                    <label className="modal-box relative" htmlFor="">
                        <TokenSelect setToken={setToken1} />
                    </label>
                </label>
                {/* token2 */}
                <input
                    type="checkbox"
                    id="selectToken2"
                    className="modal-toggle"
                />
                <label htmlFor="selectToken2" className="modal cursor-pointer">
                    <label className="modal-box relative" htmlFor="">
                        <TokenSelect setToken={setToken2} />
                    </label>
                </label>

                {/* tokenSetting */}
                <input
                    type="checkbox"
                    id="tokenSetting"
                    className="modal-toggle"
                />
                <label htmlFor="tokenSetting" className="modal cursor-pointer">
                    <label className="modal-box relative" htmlFor="">
                        <TokenSetting />
                    </label>
                </label>
            </>
        </div>
    )
}
