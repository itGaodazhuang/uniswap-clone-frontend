import { BigNumber, ethers } from "ethers"

export function fromReadableAmount(
    amount: number,
    decimals: number
): BigNumber {
    return ethers.utils.parseUnits(amount.toString(), decimals)
}

export function toReadableAmount(rawAmount: number, decimals: number): string {
    return ethers.utils.formatUnits(rawAmount, decimals)
}
