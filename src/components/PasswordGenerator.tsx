import { useEffect, useState } from 'react'
import WideContainer from './WideContainer'

const lowercaseLetters = 'abcdefghijklmnopqrstuvwxyz'
const uppercaseLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
const numbers = '0123456789'
const specialCharacters = `!@#$%^&*+~`
const similarCharacters = 'iI1loO0'

const filterCharacters = (characterSet: string) => {
  return [...characterSet]
    .filter((character: string) => !similarCharacters.includes(character))
    .join('')
}

const passwordLengthBounds = {
  min: 10,
  max: 30,
}

const passwordStrengthCharacterValues = {
  lowercaseLetters: 26,
  uppercaseLetters: 26,
  numbers: 36,
  specialCharacters: 36,
  zero: 0,
}

const passwordStrengthMap = {
  terrible: 0,
  weak: 35,
  medium: 50,
  strong: 70,
  'very strong': 80,
}

const passwordStrengthBarValues = {
  terrible: {
    strength: 'terrible',
    barColor: 'bg-white',
    textColor: 'text-red-500',
  },
  weak: { strength: 'weak', barColor: 'bg-red-500', textColor: 'text-white' },
  medium: {
    strength: 'medium',
    barColor: 'bg-amber-300',
    textColor: 'text-black',
  },
  strong: {
    strength: 'strong',
    barColor: 'bg-green-600',
    textColor: 'text-black',
  },
  'very strong': {
    strength: 'very strong',
    barColor: 'bg-black',
    textColor: 'text-white',
  },
}

const passwordStrength = (password: string) => {
  return [...password].reduce((prev, curr) => {
    if (lowercaseLetters.includes(curr)) {
      prev += passwordStrengthCharacterValues.lowercaseLetters
    } else if (uppercaseLetters.includes(curr)) {
      prev += passwordStrengthCharacterValues.uppercaseLetters
    } else if (numbers.includes(curr)) {
      prev += passwordStrengthCharacterValues.numbers
    } else if (specialCharacters.includes(curr)) {
      prev += passwordStrengthCharacterValues.specialCharacters
    } else {
      prev += passwordStrengthCharacterValues.zero
    }
    return prev
  }, 0)
}

const minStrength = () => {
  return (
    passwordLengthBounds.min *
    Object.values(passwordStrengthCharacterValues).reduce((prev, curr) => {
      if (curr !== passwordStrengthCharacterValues.zero) {
        prev = prev < curr ? prev : curr
      }
      return prev
    }, Infinity)
  )
}

const maxStrength = () => {
  return (
    passwordLengthBounds.max *
    Object.values(passwordStrengthCharacterValues).reduce((prev, curr) => {
      if (curr !== passwordStrengthCharacterValues.zero) {
        prev = prev > curr ? prev : curr
      }
      return prev
    }, 0)
  )
}

const strengthAsPercentageOfMax = (password: string) => {
  return Number(((passwordStrength(password) / maxStrength()) * 100).toFixed(0))
}

const getStrengthBarValues = (strength: number) => {
  if (strength >= passwordStrengthMap['very strong']) {
    return passwordStrengthBarValues['very strong']
  }
  if (strength >= passwordStrengthMap.strong) {
    return passwordStrengthBarValues.strong
  }
  if (strength >= passwordStrengthMap.medium) {
    return passwordStrengthBarValues.medium
  }
  if (strength >= passwordStrengthMap.weak) {
    return passwordStrengthBarValues.weak
  }
  return passwordStrengthBarValues.terrible
}

const getBarValues = (password: string) => {
  const strength = strengthAsPercentageOfMax(password)
  console.log(strength)
  return getStrengthBarValues(strength)
}

export default function PasswordGenerator({ initialValue = '' }) {
  const [password, setPassword] = useState(initialValue)
  const [passwordFlags, setPasswordFlags] = useState({
    lengthOfPassword: passwordLengthBounds.min,
    uppercase: false,
    numbers: false,
    excludeSimilar: false,
    specialCharacters: false,
  })

  const formHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.type === 'checkbox') {
      const { name, checked } = e.target
      setPasswordFlags((prevPasswordFlags) => ({
        ...prevPasswordFlags,
        [name]: checked,
      }))
    } else {
      const { name, value } = e.target
      setPasswordFlags((prevPasswordFlags) => ({
        ...prevPasswordFlags,
        [name]: Number(value),
      }))
    }
  }

  useEffect(() => {
    const generatePassword = () => {
      let charactersToUse = lowercaseLetters
      if (passwordFlags.uppercase) {
        charactersToUse += uppercaseLetters
      }
      if (passwordFlags.numbers) {
        charactersToUse += numbers
      }
      if (passwordFlags.specialCharacters) {
        charactersToUse += specialCharacters
      }
      if (passwordFlags.excludeSimilar) {
        charactersToUse = filterCharacters(charactersToUse)
      }
      const characterArrayLength = charactersToUse.length
      const password = Array.from(
        { length: passwordFlags.lengthOfPassword },
        () => {
          const randomIndex = Math.floor(Math.random() * characterArrayLength)
          return charactersToUse[randomIndex]
        },
      )
      return password.join('')
    }
    setPassword(generatePassword())
  }, [passwordFlags])

  const copyToClipboard = () => {
    navigator.clipboard.writeText(password)
  }

  const barValues = getBarValues(password)

  // add strength gauge
  // add minium count of extra characters to password generator (upper, numbers, special)
  // add multiple password output

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
