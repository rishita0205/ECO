import axios from 'axios'
const API_URL = 'https://server-eco.onrender.com';

export const fetchProducts = async () => {
  try {
    const response = await axios.get(`${API_URL}/products`);
    return response.data;
  } catch (error) {
    console.error("There was an error fetching the products!", error);
    return [];
  }
};

export const filterProducts = async () => {
  try {
    const response = await axios.get(`${API_URL}/products`);
    const filteredProducts = response.data.filter(product => product.rating > 4);
    return filteredProducts;
  } catch (error) {
    console.error("There was an error fetching the products!", error);
    return [];
  }
};

export const fetchProductById = async (id) => {
    try {
      const response = await axios.get(`${API_URL}/products/${id}`);
      return response.data;
    } catch (error) {
      console.error(`There was an error fetching the product with ID ${id}!`, error);
      return null;
    }
  };
