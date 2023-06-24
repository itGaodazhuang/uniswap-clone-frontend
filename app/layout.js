"use client"
import "./globals.css"
import { Inter } from "next/font/google"

import { useState } from "react"
import { WagmiConfig } from "wagmi"
import { config } from "../Utils/wagmiConfig"

// components
import NavBar from "../components/NavBar"
import SwapInfoProvider from "../context/swapInfoContext"

const inter = Inter({ subsets: ["latin"] })

export default function RootLayout({ children }) {
    const [theme, setTheme] = useState("luxury")

    return (
        <WagmiConfig config={config}>
            <SwapInfoProvider>
                <html lang="zh-CN" data-theme={theme}>
                    <head>
                        <title>SWAP ERC-20 TOKENS</title>
                    </head>
                    <body className={inter.className}>
                        <NavBar setTheme={setTheme} theme={theme} />
                        {children}
                    </body>
                </html>
            </SwapInfoProvider>
        </WagmiConfig>
    )
}
