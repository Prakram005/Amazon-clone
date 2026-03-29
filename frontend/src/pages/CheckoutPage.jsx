import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { createOrder, getCart } from '../api'
import Loader from '../components/Loader'

const formatPrice = (price) =>
  new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(price)

const initialForm = {
  fullName: '',
  phone: '',
  street: '',
  city: '',
  state: '',
  postalCode: '',
  country: 'India',
}

const CheckoutPage = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState(initialForm)
  const [cart, setCart] = useState(null)
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    const loadCart = async () => {
      try {
        const response = await getCart()
        setCart(response.data)
      } catch (err) {
        setError(err.response?.data?.message || 'Could not load checkout data')
      } finally {
        setLoading(false)
      }
    }

    loadCart()
  }, [])

  const handleChange = (event) => {
    setFormData((current) => ({
      ...current,
      [event.target.name]: event.target.value,
    }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setError('')

    const emptyField = Object.values(formData).some((value) => !String(value).trim())
    if (emptyField) {
      setError('Please fill all address fields')
      return
    }

    try {
      setSubmitting(true)
      const response = await createOrder(formData)
      navigate(`/order-confirmation/${response.data._id}`)
    } catch (err) {
      setError(err.response?.data?.message || 'Could not place order')
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) {
    return <Loader text="Preparing checkout..." />
  }

  if (!cart?.items?.length) {
    return (
      <div className="bg-white p-10 text-center shadow-sm">
        <p className="text-slate-600">Your cart is empty. Add products before checkout.</p>
      </div>
    )
  }

  const shippingPrice = cart.subtotal >= 1000 ? 0 : 40
  const taxPrice = Number((cart.subtotal * 0.18).toFixed(2))
  const totalPrice = cart.subtotal + shippingPrice + taxPrice

  return (
    <div className="grid gap-4 py-4 lg:grid-cols-[1fr,340px]">
      <section className="bg-white p-6 shadow-sm">
        <h1 className="text-[28px] font-normal text-slate-900">Checkout</h1>
        <p className="mt-2 text-sm text-slate-600">Enter your shipping address to place the order.</p>

        {error ? (
          <div className="mt-4 border border-red-200 bg-red-50 px-4 py-3 text-red-700">{error}</div>
        ) : null}

        <form onSubmit={handleSubmit} className="mt-6 grid gap-4 md:grid-cols-2">
          <input
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            placeholder="Full name"
            className="rounded-sm border border-slate-400 px-4 py-3"
          />
          <input
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Phone number"
            className="rounded-sm border border-slate-400 px-4 py-3"
          />
          <input
            name="street"
            value={formData.street}
            onChange={handleChange}
            placeholder="Street address"
            className="rounded-sm border border-slate-400 px-4 py-3 md:col-span-2"
          />
          <input
            name="city"
            value={formData.city}
            onChange={handleChange}
            placeholder="City"
            className="rounded-sm border border-slate-400 px-4 py-3"
          />
          <input
            name="state"
            value={formData.state}
            onChange={handleChange}
            placeholder="State"
            className="rounded-sm border border-slate-400 px-4 py-3"
          />
          <input
            name="postalCode"
            value={formData.postalCode}
            onChange={handleChange}
            placeholder="Postal code"
            className="rounded-sm border border-slate-400 px-4 py-3"
          />
          <input
            name="country"
            value={formData.country}
            onChange={handleChange}
            placeholder="Country"
            className="rounded-sm border border-slate-400 px-4 py-3"
          />

          <button
            type="submit"
            disabled={submitting}
            className="rounded-full bg-[#ffd814] px-5 py-3 text-sm transition hover:bg-[#f7ca00] disabled:cursor-not-allowed disabled:bg-slate-200 md:col-span-2"
          >
            {submitting ? 'Placing order...' : 'Place Order'}
          </button>
        </form>
      </section>

      <aside className="h-fit bg-white p-6 shadow-sm">
        <h2 className="text-lg font-bold text-slate-900">Order Summary</h2>
        <div className="mt-4 space-y-3 text-sm text-slate-700">
          <div className="flex justify-between">
            <span>Items</span>
            <span>{formatPrice(cart.subtotal)}</span>
          </div>
          <div className="flex justify-between">
            <span>Shipping</span>
            <span>{formatPrice(shippingPrice)}</span>
          </div>
          <div className="flex justify-between">
            <span>Tax</span>
            <span>{formatPrice(taxPrice)}</span>
          </div>
          <div className="flex justify-between border-t border-slate-200 pt-3 text-base font-bold text-slate-900">
            <span>Total</span>
            <span>{formatPrice(totalPrice)}</span>
          </div>
        </div>
      </aside>
    </div>
  )
}

export default CheckoutPage
