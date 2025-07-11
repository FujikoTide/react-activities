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

export default function PasswordGenerator({ initialValue = '' }) {
  const [password, setPassword] = useState(initialValue)
  const [passwordFlags, setPasswordFlags] = useState({
    lengthOfPassword: 10,
    uppercase: true,
    numbers: true,
    excludeSimilar: true,
    specialCharacters: true,
  })

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

  return (
    <WideContainer>
      <div>
        <form>
          <div className="flex flex-row gap-1 p-2">
            <div className="flex w-2/5 flex-col">
              <div className="flex flex-row justify-between">
                <div>
                  <label htmlFor="password-length" className="text-base">
                    Password Length
                  </label>
                </div>
                <div>
                  <input
                    id="password-length"
                    className="w-15 text-right text-base outline-2 focus:ring-0"
                    type="number"
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
                  <input id="uppercase" className="h-5 w-5" type="checkbox" />
                </div>
              </div>
              <div className="flex flex-row justify-between">
                <div>
                  <label htmlFor="numbers" className="text-base">
                    Include Numbers
                  </label>
                </div>
                <div>
                  <input id="numbers" className="h-5 w-5" type="checkbox" />
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
                    id="special-characters"
                    className="h-5 w-5"
                    type="checkbox"
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
                    id="exclude-similar"
                    className="h-5 w-5"
                    type="checkbox"
                  />
                </div>
              </div>
            </div>
            <div className="flex w-3/5 flex-col gap-1 pl-2 text-left">
              <div className="flex flex-row">
                <div className="pr-2 text-base">password:</div>
                <div className="text-base">{password}</div>
              </div>
              <div className="flex flex-row">
                <div className="pr-2 text-base">strength:</div>
                <div className="mt-1 h-4 w-[80%] bg-amber-300"></div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </WideContainer>
  )
}
