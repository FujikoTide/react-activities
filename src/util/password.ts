const lowercaseLetters = 'abcdefghijklmnopqrstuvwxyz'
const uppercaseLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
const numbers = '0123456789'
const specialCharacters = `!@#$%^&*+~`
const similarCharacters = 'iI1loO0'

export interface PasswordFlagsProps {
  lengthOfPassword: number
  uppercase: false
  numbers: false
  excludeSimilar: false
  specialCharacters: false
}

export const passwordLengthBounds = {
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

export const filterCharacters = (characterSet: string) => {
  return [...characterSet]
    .filter((character: string) => !similarCharacters.includes(character))
    .join('')
}

const passwordStrength = (password: string) => {
  let score = 0
  for (const char of password) {
    if (lowercaseLetters.includes(char)) {
      score += passwordStrengthCharacterValues.lowercaseLetters
    } else if (uppercaseLetters.includes(char)) {
      score += passwordStrengthCharacterValues.uppercaseLetters
    } else if (numbers.includes(char)) {
      score += passwordStrengthCharacterValues.numbers
    } else if (specialCharacters.includes(char)) {
      score += passwordStrengthCharacterValues.specialCharacters
    } else {
      score += passwordStrengthCharacterValues.zero
    }
  }
  return score
}

// use for calculating scaling per password length - not implemented
// const minStrength = () => {
//   return (
//     passwordLengthBounds.min *
//     Object.values(passwordStrengthCharacterValues).reduce((prev, curr) => {
//       if (curr !== passwordStrengthCharacterValues.zero) {
//         prev = prev < curr ? prev : curr
//       }
//       return prev
//     }, Infinity)
//   )
// }

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

export const getBarValues = (password: string) => {
  const strength = strengthAsPercentageOfMax(password)
  return getStrengthBarValues(strength)
}

export const generatePassword = (passwordFlags: PasswordFlagsProps) => {
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
