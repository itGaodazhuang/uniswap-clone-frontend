import Image from "next/image"
import assessts from "../public"
import Link from "next/link"

// swap info context
import { useContext } from "react"
import { SwapInfoContext } from "../context/swapInfoContext"

export default function NavBar({ theme, setTheme }) {
    const themes = ["luxury", "light", "valentine", "synthwave"]
    const chainNet = ["Ethereum", "Polygon", "BNB Chain"]

    const { isConnected, connect, userAddress } = useContext(SwapInfoContext)

    return (
        <div className="navbar flex px-4 justify-between">
            {/* left */}
            <div className="flex gap-6">
                {/* logo */}
                <Image
                    src={
                        theme === "luxury" || theme === "synthwave"
                            ? assessts.Uni_light_logo
                            : assessts.Uni_dark_logo
                    }
                    height={35}
                    width={35}
                    className="ml-8"
                    alt="logo"
                />

                {/* index of pages */}
                {[
                    ["兑换", ""],
                    ["代币", "/tokenInfo"],
                    ["流动池", "/pool"],
                ].map(([title, url]) => (
                    <Link
                        href={url}
                        className="text-lg hover:text-primary-focus"
                        key={title}
                    >
                        {title}
                    </Link>
                ))}
            </div>

            {/* cnter */}
            <div className="">
                <input
                    type="text"
                    placeholder="搜索"
                    className="input input-bordered"
                />
            </div>

            {/* right */}
            <div className="gap-6">
                {/* theme */}
                <div className="dropdown dropdown-end">
                    <label tabIndex={0} className="btn m-1 rounded-full">
                        主 题
                    </label>
                    <ul
                        tabIndex={0}
                        className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52"
                    >
                        {themes.map((el, i) => (
                            <li onClick={() => setTheme(el)} key={el}>
                                <a>{el}</a>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* chain */}
                <div className="dropdown dropdown-end">
                    <label tabIndex={1} className="btn btn-circle avatar">
                        <div className="w-10 rounded-full">
                            <Image src={assessts.ethereum} alt="logo" />
                        </div>
                    </label>
                    <ul
                        tabIndex={1}
                        className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52"
                    >
                        {chainNet.map((el, i) => (
                            <li key={el}>
                                <a>{el}</a>
                            </li>
                        ))}
                    </ul>
                </div>
                {/* connect */}
                {isConnected ? (
                    <label className="btn">
                        {userAddress.slice(0, 6)}...{userAddress.slice(-2)}
                    </label>
                ) : (
                    <button className="btn" onClick={() => connect()}>
                        Connect
                    </button>
                )}
            </div>
        </div>
    )
}
