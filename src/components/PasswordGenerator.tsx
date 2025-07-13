import { useEffect, useState } from 'react'
import WideContainer from './WideContainer'
import {
  generatePassword,
  getBarValues,
  passwordLengthBounds,
  type PasswordFlagsProps,
} from '../util/password'

export default function PasswordGenerator({ initialValue = '' }) {
  const [password, setPassword] = useState(initialValue)
  const [passwordFlags, setPasswordFlags] = useState<PasswordFlagsProps>({
    lengthOfPassword: passwordLengthBounds.min,
    uppercase: false,
    numbers: false,
    excludeSimilar: false,
    specialCharacters: false,
  })

  const formHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked, type } = e.target
    setPasswordFlags((prevPasswordFlags) => ({
      ...prevPasswordFlags,
      [name]: type === 'checkbox' ? checked : Number(value),
    }))
  }

  useEffect(() => {
    setPassword(generatePassword(passwordFlags))
  }, [passwordFlags])

  const copyToClipboard = () => {
    navigator.clipboard.writeText(password)
  }

  const barValues = getBarValues(password)

  return (
    <WideContainer>
      <div>
        <form>
          <div className="flex flex-row gap-1 p-2">
            <div className="flex w-2/5 flex-col">
              <div className="flex flex-row justify-between">
                <div>
                  <label htmlFor="password-length" className="text-base">
                    Password Length (10-30)
                  </label>
                </div>
                <div>
                  <input
                    id="password-length"
                    className="w-15 text-right text-base focus:ring-0 focus:outline-none"
                    type="number"
                    min={passwordLengthBounds.min}
                    max={passwordLengthBounds.max}
                    name="lengthOfPassword"
                    value={passwordFlags.lengthOfPassword}
                    onChange={formHandler}
                  />
                </div>
              </div>
              <div className="flex flex-row justify-between">
                <div>
                  <label htmlFor="uppercase" className="text-base">
                    Include Uppercase
                  </label>
                </div>
                <div>
                  <input
                    name="uppercase"
                    id="uppercase"
                    className="h-5 w-5"
                    type="checkbox"
                    checked={passwordFlags.uppercase}
                    onChange={formHandler}
                  />
                </div>
              </div>
              <div className="flex flex-row justify-between">
                <div>
                  <label htmlFor="numbers" className="text-base">
                    Include Numbers
                  </label>
                </div>
                <div>
                  <input
                    name="numbers"
                    id="numbers"
                    className="h-5 w-5"
                    type="checkbox"
                    checked={passwordFlags.numbers}
                    onChange={formHandler}
                  />
                </div>
              </div>
              <div className="flex flex-row justify-between">
                <div>
                  <label htmlFor="special-characters" className="text-base">
                    Include Special Characters
                  </label>
                </div>
                <div>
                  <input
                    name="specialCharacters"
                    id="special-characters"
                    className="h-5 w-5"
                    type="checkbox"
                    checked={passwordFlags.specialCharacters}
                    onChange={formHandler}
                  />
                </div>
              </div>
              <div className="flex flex-row justify-between">
                <div>
                  <label htmlFor="exclude-similar" className="text-base">
                    Exclude Similar Characters
                  </label>
                </div>
                <div>
                  <input
                    name="excludeSimilar"
                    id="exclude-similar"
                    className="h-5 w-5"
                    type="checkbox"
                    checked={passwordFlags.excludeSimilar}
                    onChange={formHandler}
                  />
                </div>
              </div>
            </div>
            <div className="flex w-3/5 flex-col gap-1 pl-2 text-left">
              <div className="flex flex-row">
                <div className="pr-1 text-sm">password:</div>
                <div className="text-sm">{password}</div>
              </div>
              <div className="flex flex-row">
                <div className="pr-2 text-sm">strength:</div>
                <div
                  className={`flex h-5 w-[80%] items-center justify-center ${barValues.barColor} text-base font-bold ${barValues.textColor}`}
                >
                  {barValues.strength}
                </div>
              </div>
              <div className="flex flex-row">
                <button
                  type="button"
                  onClick={copyToClipboard}
                  className="w-full cursor-pointer border-1 border-black bg-green-300/50 hover:bg-red-300"
                >
                  Copy To Clipboard
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </WideContainer>
  )
}
