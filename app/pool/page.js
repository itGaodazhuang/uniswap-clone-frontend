"use client"
// hooks
import { useContext, useState } from "react"

// context
import { SwapInfoContext } from "../../context/swapInfoContext"

// components
import PoolShow from "./PoolShow"
import PoolAdd from "./PoolAdd"

export default function Home() {
    // hooks
    // show toogle
    const [addPool, setAddPool] = useState(false)
    // const { topTokenList } = useContext(SwapInfoContext)
    return (
        <>
            {addPool ? (
                <PoolAdd setAddPool={setAddPool} />
            ) : (
                <PoolShow setAddPool={setAddPool} />
            )}
        </>
    )
}
