import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'https://server-eco.onrender.com';

// Fetch cart items
export const fetchCart = createAsyncThunk('cart/fetchCart', async (userId) => {
  const response = await axios.get(`${API_URL}/cart/${userId}`);
  return response.data;
});

// Add item to cart
export const addItemToCart = createAsyncThunk('cart/addItemToCart', async ({  product, quantity }) => {
  const response = await axios.post(`${API_URL}/cart`, {
    productId: product._id,
    quantity,
  });
  console.log(response.data);
  return response.data;
});

// Update item quantity in cart
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
    status: 'idle',
    error: null,
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
      .addCase(fetchCart.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
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
