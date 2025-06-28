import Container from './Container'
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
    <Container>
      <div className="p-3 text-left">
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
    </Container>
  )
}
