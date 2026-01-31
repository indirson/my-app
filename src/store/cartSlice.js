import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  items: JSON.parse(localStorage.getItem('cart')) || []
}

const persist = (items) => {
  try {
    localStorage.setItem('cart', JSON.stringify(items))
  } catch (e) {
    // ignore
  }
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem(state, action) {
      const item = action.payload
      const existing = state.items.find((i) => i.id === item.id)
      if (existing) {
        existing.quantity += item.quantity || 1
      } else {
        state.items.push(item)
      }
      persist(state.items)
    },
    removeItem(state, action) {
      state.items = state.items.filter((i) => i.id !== action.payload)
      persist(state.items)
    },
    increaseQuantity(state, action) {
      const id = action.payload
      const item = state.items.find((i) => i.id === id)
      if (item) item.quantity += 1
      persist(state.items)
    },
    decreaseQuantity(state, action) {
      const id = action.payload
      const item = state.items.find((i) => i.id === id)
      if (item) {
        item.quantity -= 1
        if (item.quantity <= 0) {
          state.items = state.items.filter((i) => i.id !== id)
        }
      }
      persist(state.items)
    },
    clearCart(state) {
      state.items = []
      persist(state.items)
    }
  }
})

export const { addItem, removeItem, increaseQuantity, decreaseQuantity, clearCart } = cartSlice.actions
export default cartSlice.reducer
