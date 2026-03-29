import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
})

export const DEFAULT_USER_ID = 'default-user'

export const getProducts = (params = {}) => api.get('/products', { params })
export const getCategories = () => api.get('/products/categories')
export const getProductById = (id) => api.get(`/products/${id}`)

export const getCart = () => api.get('/cart', { params: { userId: DEFAULT_USER_ID } })
export const addToCart = (productId, quantity = 1) =>
  api.post('/cart', { userId: DEFAULT_USER_ID, productId, quantity })
export const updateCartItem = (productId, quantity) =>
  api.put(`/cart/${productId}`, { userId: DEFAULT_USER_ID, quantity })
export const removeCartItem = (productId) =>
  api.delete(`/cart/${productId}`, { params: { userId: DEFAULT_USER_ID } })
export const clearCart = () => api.delete('/cart', { params: { userId: DEFAULT_USER_ID } })

export const createOrder = (shippingAddress) =>
  api.post('/orders', { userId: DEFAULT_USER_ID, shippingAddress })
export const getOrders = () => api.get('/orders', { params: { userId: DEFAULT_USER_ID } })
export const getOrderById = (id) => api.get(`/orders/${id}`)

export default api
