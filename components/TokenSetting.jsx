// tools
import Image from "next/image"
import assessts from "../public"

export default function TokenSstting() {
    return (
        <div>
            {/* auto router API */}
            <div className="form-control">
                <label className="cursor-pointer label">
                    <span className="label-text">
                        <p className="text-lg">自动路由 API</p>
                        <small>使用Uniswap Labs API获得报价</small>
                    </span>
                    <input
                        type="checkbox"
                        className="toggle toggle-lg ml-auto"
                    />
                </label>
            </div>
            <div className="divider" />
            {/* transaction slip */}
            <div className="grid gap-2">
                <span className="flex gap-2">
                    <p>最大滑点</p>
                    <div
                        className=" tooltip tooltip-right flex items-center"
                        data-tip="如果兑换率变动超过此百分比，则将还原该交易"
                    >
                        <Image
                            src={assessts.tips}
                            alt="tick"
                            width={15}
                            height={15}
                        />
                    </div>
                </span>
                <div className="form-control flex">
                    <label className="label cursor-pointer">
                        <span className="label-text text-lg">自动</span>
                        <input type="checkbox" className="checkbox ml-4" />
                        <input
                            className=" input bg-neutral text-lg text-right ml-auto"
                            placeholder="0.10 %"
                        />
                    </label>
                </div>
            </div>
            <div className="divider" />
            {/* transaction deadline */}
            <div className="form-control grid gap-2">
                <span className="flex gap-2">
                    <p>交易截止期限</p>
                    <div
                        className=" tooltip tooltip-right flex items-center"
                        data-tip="如果您的交易待处理超过此时间期限，则将还原该交易"
                    >
                        <Image
                            src={assessts.tips}
                            alt="tick"
                            width={15}
                            height={15}
                        />
                    </div>
                </span>
                <input
                    className=" input bg-neutral text-lg text-right"
                    placeholder="30 min"
                />
            </div>
        </div>
    )
}
