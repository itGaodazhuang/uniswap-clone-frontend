import Image from "next/image"
import assessts from "../public"
import { formatEther } from "viem"

// context
import { useContext } from "react"
import { SwapInfoContext } from "../context/swapInfoContext"

export default function TokenSelect({ setToken }) {
    const { tokensInfo } = useContext(SwapInfoContext)

    return (
        <div className="p-2 grid gap-4">
            {/* control info bar */}
            <div className="flex justify-center">
                <p className=" text-xl">选择代币</p>
            </div>
            {/* search */}
            <input
                type="text"
                placeholder="搜索代币或粘贴地址"
                className="input input-bordered"
            />
            <div className=" divider" />
            {/* all tokens list */}
            <div>
                <ul>
                    {tokensInfo.map((el, i) => (
                        <li
                            className="flex p-2 text-lg gap-2 items-center rounded hover:bg-neutral hover:cursor-pointer"
                            onClick={() => setToken(el)}
                            key={i}
                        >
                            <Image
                                src={assessts.ethlogo}
                                alt="logo"
                                width={25}
                                height={25}
                            />
                            <p>{el.symbol}</p>
                            <p className="ml-auto">
                                {el.formatted.slice(0, 8)}
                            </p>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}
