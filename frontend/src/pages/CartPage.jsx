import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { getCart, removeCartItem, updateCartItem } from '../api'
import Loader from '../components/Loader'

const formatPrice = (price) =>
  new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(price)

const CartPage = () => {
  const navigate = useNavigate()
  const [cart, setCart] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const loadCart = async () => {
    try {
      setLoading(true)
      const response = await getCart()
      setCart(response.data)
      setError('')
    } catch (err) {
      setError(err.response?.data?.message || 'Could not load cart')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadCart()
  }, [])

  const handleQuantityChange = async (productId, quantity) => {
    try {
      const response = await updateCartItem(productId, Number(quantity))
      setCart(response.data)
    } catch (err) {
      setError(err.response?.data?.message || 'Could not update cart item')
    }
  }

  const handleRemove = async (productId) => {
    try {
      const response = await removeCartItem(productId)
      setCart(response.data)
    } catch (err) {
      setError(err.response?.data?.message || 'Could not remove cart item')
    }
  }

  if (loading) {
    return <Loader text="Loading your cart..." />
  }

  const items = cart?.items || []

  return (
    <div className="grid gap-4 py-4 lg:grid-cols-[1fr,340px]">
      <section className="bg-white p-6 shadow-sm">
        <h1 className="border-b border-slate-200 pb-4 text-[28px] font-normal text-slate-900">Shopping Cart</h1>

        {error ? (
          <div className="mt-4 border border-red-200 bg-red-50 px-4 py-3 text-red-700">{error}</div>
        ) : null}

        {items.length === 0 ? (
          <div className="py-10 text-center">
            <p className="text-slate-600">Your cart is empty.</p>
            <Link to="/" className="mt-4 inline-flex rounded-full bg-[#ffd814] px-5 py-2.5 font-medium">
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="divide-y divide-slate-200">
            {items.map((item) => (
              <div key={item.product} className="grid gap-4 py-6 sm:grid-cols-[180px,1fr]">
                <img src={item.image} alt={item.name} className="h-40 w-40 object-cover" />

                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <h2 className="text-lg leading-6 text-slate-900">{item.name}</h2>
                    <p className="mt-1 text-sm text-[#007600]">In stock</p>
                    <p className="mt-1 text-sm text-slate-600">{formatPrice(item.price)} each</p>
                    <button
                      onClick={() => handleRemove(item.product)}
                      className="mt-3 text-sm text-[#007185] hover:text-[#c7511f] hover:underline"
                    >
                      Remove
                    </button>
                  </div>

                  <div className="flex items-center gap-3">
                    <select
                      value={item.quantity}
                      onChange={(event) => handleQuantityChange(item.product, event.target.value)}
                      className="rounded-full border border-slate-300 bg-[#f0f2f2] px-3 py-2"
                    >
                      {Array.from({ length: 10 }, (_, index) => index + 1).map((value) => (
                        <option key={value} value={value}>
                          Qty: {value}
                        </option>
                      ))}
                    </select>
                    <p className="min-w-24 text-right text-lg font-bold text-slate-900">
                      {formatPrice(item.price * item.quantity)}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      <aside className="h-fit bg-white p-6 shadow-sm">
        <h2 className="text-lg text-slate-900">
          Subtotal ({cart?.itemsCount || 0} items): <span className="font-bold">{formatPrice(cart?.subtotal || 0)}</span>
        </h2>
        <div className="mt-4 space-y-3 text-sm text-slate-700">
          <div className="flex justify-between">
            <span>Shipping</span>
            <span>{(cart?.subtotal || 0) >= 1000 ? 'Free' : formatPrice(40)}</span>
          </div>
        </div>

        <button
          disabled={items.length === 0}
          onClick={() => navigate('/checkout')}
          className="mt-6 w-full rounded-full bg-[#ffd814] px-5 py-3 text-sm transition hover:bg-[#f7ca00] disabled:cursor-not-allowed disabled:bg-slate-200"
        >
          Proceed to Checkout
        </button>
      </aside>
    </div>
  )
}

export default CartPage
