import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'https://server-eco.onrender.com';

// Fetch cart
export const fetchCart = createAsyncThunk('cart/fetchCart', async (userId) => {
  const response = await axios.get(`${API_URL}/cart/${userId}`);
  return response.data;
});

// Add item to cart
export const addItemToCart = createAsyncThunk('cart/addItemToCart', async ({ userId, product, quantity }) => {
  const response = await axios.post(`${API_URL}/cart`, {
    userId,
    productId: product._id,
    quantity,
  });
  return response.data;
});

// Update item quantity
export const updateItemInCart = createAsyncThunk('cart/updateItemInCart', async ({ userId, productId, quantity }) => {
  const response = await axios.put(`${API_URL}/cart`, {
    userId,
    productId,
    quantity,
  });
  return response.data;
});

// Remove item from cart
export const removeItemFromCart = createAsyncThunk('cart/removeItemFromCart', async ({ userId, productId }) => {
  const response = await axios.delete(`${API_URL}/cart`, {
    data: { userId, productId },
  });
  return response.data;
});

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
    status: null,
  },
  reducers: {
    clearCart: (state) => {
      state.items = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.items = action.payload.items;
        state.status = 'succeeded';
      })
      .addCase(fetchCart.rejected, (state) => {
        state.status = 'failed';
      })
      .addCase(addItemToCart.fulfilled, (state, action) => {
        state.items = action.payload.items;
      })
      .addCase(updateItemInCart.fulfilled, (state, action) => {
        state.items = action.payload.items;
      })
      .addCase(removeItemFromCart.fulfilled, (state, action) => {
        state.items = action.payload.items;
      });
  },
});

export const { clearCart } = cartSlice.actions;

export default cartSlice.reducer;
