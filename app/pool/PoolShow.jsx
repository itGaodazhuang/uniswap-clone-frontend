// tools
import Image from "next/image"
import assessts from "../../public"

export default function PoolShow({ setAddPool }) {
    return (
        <div className="h-screen flex justify-center">
            <div className="mt-20">
                <div className="grid gap-4 rounded-lg">
                    {/* control bar */}
                    <div className="flex items-center">
                        <span className="text-xl">流动性池</span>
                        <button
                            className="btn ml-auto"
                            onClick={() => setAddPool(true)}
                        >
                            + 新仓位
                        </button>
                    </div>
                    {/* liquidity pool show */}
                    <div className="grid place-items-center gap-2">
                        <Image
                            src={assessts.wallet}
                            alt="wallet-log"
                            width={80}
                            height={80}
                        />
                        <p>您的流动性仓位将会显示在这里</p>
                    </div>
                    {/* extral info */}
                    <div className="flex gap-3">
                        <div className="grid gap-2 rounded-lg outline p-2 w-1/2">
                            <p className="text-xl">流动性的相关信息 ↗</p>
                            <p>查看我们的v3流动池介绍和迁移指南。</p>
                        </div>
                        <div className="grid gap-2 rounded-lg outline p-2 w-1/2">
                            <p className="text-xl">顶级流动池 ↗</p>
                            <p>查看 Uniswap 分析。</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
