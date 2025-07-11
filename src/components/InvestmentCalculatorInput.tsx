import type { InvestmentCalculatorDataProps } from './InvestMentCalculator'

const CURRENCIES = ['GBP', 'USD', 'EUR', 'JPY']

interface InvestmentCalculatorInputProps {
  userInput: InvestmentCalculatorDataProps
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  resetForm: (e: React.MouseEvent<HTMLButtonElement>) => void
}

export default function InvestmentCalculatorInput({
  userInput,
  handleChange,
  resetForm,
}: InvestmentCalculatorInputProps) {
  return (
    <section id="user-input" className="mx-auto w-3/4 p-2">
      <form>
        <div className="input-group flex flex-row justify-between border-1 border-black p-2 odd:bg-green-300/50 even:bg-red-300">
          <div>
            <label htmlFor="initialInvestment">Initial Investment ($)</label>
          </div>
          <div>
            <input
              type="number"
              id="initialInvestment"
              name="initialInvestment"
              value={userInput.initialInvestment}
              onChange={handleChange}
              className="text-right backdrop-brightness-115 focus:ring-2 focus:ring-black focus:outline-none"
            />
          </div>
        </div>
        <div className="input-group flex flex-row justify-between border-1 border-black p-2 odd:bg-green-300/50 even:bg-red-300">
          <div>
            <label htmlFor="annualInvestment">Annual Investment ($)</label>
          </div>
          <div>
            <input
              type="number"
              id="annualInvestment"
              name="annualInvestment"
              value={userInput.annualInvestment}
              onChange={handleChange}
              className="text-right backdrop-brightness-115 focus:ring-2 focus:ring-black focus:outline-none"
            />
          </div>
        </div>
        <div className="input-group flex flex-row justify-between border-1 border-black p-2 odd:bg-green-300/50 even:bg-red-300">
          <div>
            <label htmlFor="expectedReturn">Expected Return (%)</label>
          </div>
          <div>
            <input
              type="number"
              id="expectedReturn"
              name="expectedReturn"
              value={userInput.expectedReturn}
              onChange={handleChange}
              className="text-right backdrop-brightness-115 focus:ring-2 focus:ring-black focus:outline-none"
            />
          </div>
        </div>
        <div className="input-group flex flex-row justify-between border-1 border-black p-2 odd:bg-green-300/50 even:bg-red-300">
          <div>
            <label htmlFor="duration">Duration (years)</label>
          </div>
          <div>
            <input
              type="number"
              id="duration"
              name="duration"
              value={userInput.duration}
              onChange={handleChange}
              className="text-right backdrop-brightness-115 focus:ring-2 focus:ring-black focus:outline-none"
            />
          </div>
        </div>
        <div>
          <button
            className="m-2 cursor-pointer border-1 border-black bg-green-300/50 p-2"
            onClick={resetForm}
          >
            Reset Form
          </button>
        </div>
      </form>
    </section>
  )
}
