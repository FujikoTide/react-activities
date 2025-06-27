import List from './List'

export default function VariableDisplay() {
  const stringVariable = 'Hello !'
  let numberVariable = 333333
  const booleanVariable = true
  const arrayOfStrings = ['hello', 'goodbye', 'hello again']
  const objectWithThreeProperties = {
    name: 'Harold',
    age: '30',
    location: 'London',
  }

  if (Math.random() > 0.3) {
    numberVariable = 5
  }

  return (
    <div className="justify-center border-stone-300 bg-stone-800 p-4 text-left text-xl text-stone-400">
      <div>{stringVariable}</div>
      <div>{numberVariable}</div>
      <div>{booleanVariable ? 'true' : 'false'}</div>
      <div>
        <List data={arrayOfStrings} />
      </div>
      <div>
        <div>{`Name: ${objectWithThreeProperties.name}`}</div>
        <div>{`Location: ${objectWithThreeProperties.location}`}</div>
        <div>{`Age: ${objectWithThreeProperties.age}`}</div>
      </div>
    </div>
  )
}
