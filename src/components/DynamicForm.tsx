import { useState } from 'react'
import Container from './Container'

export default function DynamicForm() {
  const [textInput, setTextInput] = useState('')
  const [listItems, setListItems] = useState<string[]>([])
  const [isInvalid, setIsInvalid] = useState(true)

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const newTextInput = e.target.value
    setTextInput(newTextInput)
    if (newTextInput.length >= 8) {
      setIsInvalid(false)
    } else {
      setIsInvalid(true)
    }
  }

  function handleReset() {
    setTextInput('')
    setIsInvalid(true)
  }

  function handleAddItem() {
    if (textInput.trim() !== '') {
      setListItems((prevItems) => [...prevItems, textInput.trim()])
      setTextInput('')
      setIsInvalid(true)
    }
  }

  return (
    <Container>
      <div className="p-4">
        <div>{!textInput ? 'nothing input' : textInput}</div>
        <div>character count: {textInput.length}</div>
        <div>
          {listItems.length > 0 ? <div>Items Added:</div> : null}
          <ul>
            {listItems.map((entry, index) => (
              <li key={index}>{entry}</li>
            ))}
          </ul>
        </div>
        <div>
          <input
            type="text"
            value={textInput}
            onChange={handleChange}
            className="m-2 rounded-2xl border-2 border-orange-400 bg-stone-300 p-2 text-xl outline-0"
            placeholder="enter text..."
          />
          <div className="text-sm font-bold text-red-600" hidden={!isInvalid}>
            Input must be 8 characters or more.
          </div>
        </div>
        <div>
          <button
            type="button"
            onClick={handleReset}
            className="m-2 rounded-2xl border-2 border-black bg-orange-500 px-8 py-2 text-2xl font-bold text-white text-shadow-md text-shadow-stone-800 hover:shadow-sm hover:shadow-stone-800"
          >
            Reset Input
          </button>
          <button
            type="button"
            onClick={handleAddItem}
            disabled={isInvalid}
            className="rounded-2xl border-2 border-black bg-orange-500 px-8 py-2 text-2xl font-bold text-white text-shadow-md text-shadow-stone-800 hover:shadow-sm hover:shadow-stone-800"
          >
            Add Item
          </button>
        </div>
      </div>
    </Container>
  )
}
