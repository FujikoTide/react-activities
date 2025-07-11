import { useEffect, useState } from 'react'
import type { InvestmentCalculatorOutputDataProps } from './InvestmentCalculatorOutputData'

export default function InvestmentCalculatorGraph({
  annualData,
}: InvestmentCalculatorOutputDataProps) {
  const [highestInvestmentValue, setHighestInvestmentValue] = useState(0)

  useEffect(() => {
    const highestValue = annualData.reduce(
      (prev, curr) =>
        (prev = curr.investmentValue >= prev ? curr.investmentValue : prev),
      0,
    )
    setHighestInvestmentValue(Number(highestValue.toFixed(0)))
  }, [annualData])

  const investmentAsPercentageOfHighest = (currentValue: number) => {
    return ((currentValue / highestInvestmentValue) * 100).toFixed(0)
  }

  const heightString = (value: number) => {
    const height = investmentAsPercentageOfHighest(value)
    return `${height}px`
  }

  return (
    <>
      {annualData.length > 0 ? (
        <div className="mx-auto mt-20 mb-2">
          <div
            className={`flex flex-row items-end gap-1 border-b-1 border-l-1 border-black`}
            style={{ height: heightString(highestInvestmentValue) }}
          >
            {annualData.map((yearData, index) =>
              index >= annualData.length - 15 ? (
                <div
                  key={index}
                  className={`w-8 content-center bg-amber-300`}
                  style={{ height: heightString(yearData.investmentValue) }}
                >
                  <div className="rotate-270 text-xs">
                    {yearData.investmentValue.toFixed(0)}
                  </div>
                </div>
              ) : null,
            )}
          </div>
          <div className={`flex flex-row items-end gap-1`}>
            {annualData.map((yearData, index) =>
              index >= annualData.length - 15 ? (
                <div key={index}>
                  <div className="w-8">{yearData.year}</div>
                </div>
              ) : null,
            )}
          </div>
        </div>
      ) : null}
    </>
  )
}
