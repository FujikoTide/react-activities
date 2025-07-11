import type { AnnualDataProps } from '../util/investment'

export interface InvestmentCalculatorOutputDataProps {
  annualData: AnnualDataProps[]
}

export default function InvestmentCalculatorOutputData({
  annualData,
}: InvestmentCalculatorOutputDataProps) {
  return (
    <>
      {annualData.length > 0 ? (
        <div>
          <div className="grid w-full grid-cols-9 bg-amber-300">
            <div className="border-1 border-l-0 border-black px-2 text-base font-bold">
              Year
            </div>
            <div className="col-span-2 border-1 border-l-0 border-black px-2 text-base font-bold">
              Investment Value
            </div>
            <div className="col-span-2 border-1 border-l-0 border-black px-2 text-base font-bold">
              Interest (Year)
            </div>
            <div className="col-span-2 border-1 border-l-0 border-black px-2 text-base font-bold">
              Total Interest
            </div>
            <div className="col-span-2 border-y-1 border-black px-2 text-base font-bold">
              Invested Capital
            </div>
          </div>
          {annualData.map((yearData, index) => (
            <div
              key={index}
              className="grid w-full grid-cols-9 odd:bg-green-300/50 even:bg-red-300"
            >
              <div className="border-r-1 border-b-1 [border-right-style:dashed] border-black px-2">
                {yearData.year}
              </div>
              <div className="col-span-2 border-r-1 border-b-1 [border-right-style:dashed] border-black px-2">
                {yearData.investmentValue.toFixed(2)}
              </div>
              <div className="col-span-2 border-r-1 border-b-1 [border-right-style:dashed] border-black px-2">
                {yearData.interest.toFixed(2)}
              </div>
              <div className="col-span-2 border-r-1 border-b-1 [border-right-style:dashed] border-black px-2">
                {yearData.totalInterest.toFixed(2)}
              </div>
              <div className="col-span-2 border-b-1 border-black px-2">
                {yearData.investedCapital.toFixed(2)}
              </div>
            </div>
          ))}
        </div>
      ) : null}
    </>
  )
}
