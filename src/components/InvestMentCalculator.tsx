import InvestmentCalculatorHeader from './InvestmentCalculatorHeader'
import InvestmentCalculatorInput from './InvestmentCalculatorInput'
import InvestmentCalculatorOutputData from './InvestmentCalculatorOutputData'
import WideContainer from './WideContainer'

import { useState } from 'react'

const INITIAL_FORM_VALUES = {
  initialInvestment: 10000,
  annualInvestment: 1200,
  expectedReturn: 6,
  duration: 10,
}

export interface InvestmentCalculatorDataProps {
  initialInvestment: number
  annualInvestment: number
  expectedReturn: number
  duration: number
}

export default function InvestMentCalculator() {
  const [userInput, setUserInput] = useState(INITIAL_FORM_VALUES)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    if (Number(value) >= 0) {
      setUserInput((prevUserInput) => ({
        ...prevUserInput,
        [name]: Number(value),
      }))
    }
  }

  const resetForm = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    setUserInput(INITIAL_FORM_VALUES)
  }

  return (
    <WideContainer>
      <InvestmentCalculatorHeader />
      <InvestmentCalculatorInput
        userInput={userInput}
        handleChange={handleChange}
        resetForm={resetForm}
      />
      <InvestmentCalculatorOutputData {...userInput} />
    </WideContainer>
  )
}
