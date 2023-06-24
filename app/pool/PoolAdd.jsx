// tools
import Image from "next/image"
import assessts from "../../public"

// hooks
import { useState } from "react"

// components
import TokenSelect from "../../components/TokenSelect"
import TokenSetting from "../../components/TokenSetting"

export default function PoolShow({ setAddPool }) {
    // hooks
    // token pair
    const [token1, setToken1] = useState()
    const [token2, setToken2] = useState()
    const [token1Amount, setToken1Amount] = useState()
    const [token2Amount, setToken2Amount] = useState()

    // fee level
    const [txFeeLevel, setTxFeeLevel] = useState(3000)
    const [openSetFeeLevel, setOpenSetFeeLevel] = useState(false)
    // price range
    const [minPrice, setMinPrice] = useState()
    const [maxPrice, setMaxPrice] = useState()

    // variables
    const feePairs = [
        {
            fee: "0.01%",
            info: "适合非常稳定的币对",
            number: "选择0%",
            feeSystem: 100,
        },
        {
            fee: "0.05%",
            info: "适合稳定币币对",
            number: "选择38%",
            feeSystem: 500,
        },
        {
            fee: "0.3%",
            info: "适合大多数币对",
            number: "选择59%",
            feeSystem: 3000,
        },
        {
            fee: "1%",
            info: "适合低交易量币对",
            number: "选择2%",
            feeSystem: 10000,
        },
    ]

    return (
        <div className="h-screen flex justify-center ">
            <div className="mt-20  p-4 w-8/12 rounded-lg">
                {/* control bar */}
                <div className="flex justify-between">
                    <Image
                        src={assessts.arrowLeft}
                        width={30}
                        height={30}
                        alt="left-arrow"
                        onClick={() => setAddPool(false)}
                    />
                    <p className="text-lg place-self-center">添加流动性</p>
                    <div className="flex gap-2 items-center">
                        {token1 && token2 && (
                            <p className=" text-info">
                                {token1.symbol} - {token2.symbol}
                            </p>
                        )}
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
                </div>

                <div className="divider" />

                {/* set pool info */}
                <div className="md:columns-2 sm:columns-auto">
                    {/* left */}
                    <div className="grid gap-2">
                        <p>选择代币对</p>
                        {/* select token pair */}
                        <div className="grid gap-2">
                            <div className="flex gap-2">
                                <label
                                    className="btn flex gap-2 w-1/2"
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
                                        <p>选择代币</p>
                                    )}
                                </label>
                                <label
                                    className="btn flex gap-2 ml-auto w-1/2"
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
                                        <p>选择代币</p>
                                    )}
                                </label>
                            </div>

                            <div className="flex items-center">
                                <div>
                                    <p>选择手续费级别</p>
                                    <p className="text-sm">默认为0.3%</p>
                                </div>{" "}
                                <p
                                    className="ml-auto btn"
                                    onClick={() =>
                                        setOpenSetFeeLevel(!openSetFeeLevel)
                                    }
                                >
                                    {openSetFeeLevel ? "隐藏" : "显示"}
                                </p>
                            </div>
                            {/* tx fee info*/}
                            {openSetFeeLevel && (
                                <div className="flex">
                                    <div className="grid grid-cols-4 gap-3">
                                        {feePairs.map((el, i) => (
                                            <div className="outline rounded-lg grid gap-2 p-1">
                                                <div className=" form-control flex">
                                                    <label className="label cursor-pointer">
                                                        <span className="label-text font-bold">
                                                            {el.fee}
                                                        </span>
                                                        <input
                                                            type="radio"
                                                            name="radio-fee"
                                                            className="radio"
                                                            onChange={() =>
                                                                setTxFeeLevel(
                                                                    el.feeSystem
                                                                )
                                                            }
                                                            checked={
                                                                el.feeSystem ===
                                                                txFeeLevel
                                                            }
                                                        />
                                                    </label>
                                                </div>

                                                <p className="text-sm">
                                                    {el.info}
                                                </p>
                                                <span className="badge">
                                                    {el.number}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* deposit amount */}
                        <p>充值数额</p>
                        {/* token1 */}
                        <div className="flex items-center input-bordered rounded-lg px-2 bg-neutral">
                            <input
                                className="text-lg input-lg outline-none bg-transparent"
                                placeholder="0.00"
                                type="number"
                                onChange={(e) =>
                                    setToken1Amount(e.target.value)
                                }
                            ></input>
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
                        </div>
                        {/* token2 */}
                        <div className="flex items-center input-bordered rounded-lg px-2 bg-neutral">
                            <input
                                className="text-lg input-lg outline-none bg-transparent"
                                placeholder="0.00"
                                type="number"
                                onChange={(e) =>
                                    setToken2Amount(e.target.value)
                                }
                            ></input>
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
                        </div>
                    </div>

                    {/* right */}
                    <div className="grid gap-4">
                        <p>设置兑换率范围</p>
                        <div className="grid grid-cols-2 gap-3 cursor-pointer">
                            {/*Min*/}
                            <div className="grid grid-rows-3 rounded-lg place-items-center outline ">
                                <p className="text-center">最低兑换率</p>
                                <input
                                    type="number"
                                    placeholder="0.000"
                                    min="0.000"
                                    step="0.001"
                                    className="input w-full bg-neutral text-lg outline-none text-center "
                                    input
                                    onChange={(e) =>
                                        setMinPrice(e.target.value)
                                    }
                                />
                                <p className="text-center">
                                    {token1 &&
                                        token2 &&
                                        `1${token2.symbol} 每 ${token1.symbol}`}
                                </p>
                            </div>
                            {/* MAX */}
                            <div className="grid grid-rows-3 rounded-lg place-items-center outline ">
                                <p className="text-center">最高兑换率</p>
                                <input
                                    type="number"
                                    placeholder="0.000"
                                    min="0.000"
                                    step="0.001"
                                    className="input w-full bg-neutral text-lg outline-none text-center "
                                    onChange={(e) =>
                                        setMaxPrice(e.target.value)
                                    }
                                />
                                <p className="text-center">
                                    {token1 &&
                                        token2 &&
                                        `1${token2.symbol} 每 ${token1.symbol}`}
                                </p>
                            </div>
                        </div>
                        <button className="btn btn-block ">全范围</button>
                        {
                            // whether select token
                            token1 && token2 ? (
                                // selected, whether input amount
                                token1Amount && token2Amount ? (
                                    // inputed， whether have enough balance of token1
                                    token1.balance >= token1Amount ? (
                                        // have, whether have enough balance of token2
                                        token1.balance >= token1Amount ? (
                                            // have,
                                            <button className="btn btn-block">
                                                创建流动性池
                                            </button>
                                        ) : (
                                            // don't have enough token2
                                            <button
                                                className="btn btn-block"
                                                disabled
                                            >
                                                {token2.symbol} 余额不足
                                            </button>
                                        )
                                    ) : (
                                        // don't have enough token1
                                        <button
                                            className="btn btn-block"
                                            disabled
                                        >
                                            {token2.symbol} 余额不足
                                        </button>
                                    )
                                ) : (
                                    //uninputed
                                    <button className="btn btn-block" disabled>
                                        请输入金额
                                    </button>
                                )
                            ) : (
                                // unselected
                                <button className="btn btn-block" disabled>
                                    请选择代币对
                                </button>
                            )
                        }
                    </div>
                </div>
            </div>
            {/* modal dialog */}
            <>
                {/* select token pair dialog */}
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
