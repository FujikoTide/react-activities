import { useState } from 'react'

// works for primitive types only, not for objects
export default function useMultiSelect<T>(initialSelectedItems: T[] = []) {
  const [selectedItems, setSelectedItems] = useState<T[]>(initialSelectedItems)

  const toggleItem = (item: T) => {
    setSelectedItems((prevItems) => {
      if (prevItems.includes(item)) {
        return prevItems.filter((itemInState) => itemInState !== item)
      } else {
        return [...prevItems, item]
      }
    })
  }
  const isSelected = (item: T) => selectedItems.includes(item)

  const clearSelection = () => {
    setSelectedItems([])
  }

  const setSelection = (newSelection: T[]) => {
    setSelectedItems(newSelection)
  }

  const areNoItemsSelected = selectedItems.length === 0

  return {
    selectedItems,
    toggleItem,
    isSelected,
    clearSelection,
    setSelection,
    areNoItemsSelected,
  }
}
