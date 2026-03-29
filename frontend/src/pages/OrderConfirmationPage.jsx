import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getOrderById } from '../api'
import Loader from '../components/Loader'

const formatPrice = (price) =>
  new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(price)

const OrderConfirmationPage = () => {
  const { id } = useParams()
  const [order, setOrder] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const loadOrder = async () => {
      try {
        const response = await getOrderById(id)
        setOrder(response.data)
      } catch (err) {
        setError(err.response?.data?.message || 'Could not load order')
      } finally {
        setLoading(false)
      }
    }

    loadOrder()
  }, [id])

  if (loading) {
    return <Loader text="Loading order confirmation..." />
  }

  if (error) {
    return <div className="border border-red-200 bg-red-50 px-4 py-3 text-red-700">{error}</div>
  }

  if (!order) {
    return null
  }

  return (
    <div className="mx-auto max-w-4xl space-y-4 py-4">
      <section className="bg-white p-8 text-center shadow-sm">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-lg font-bold text-emerald-700">
          OK
        </div>
        <h1 className="mt-4 text-3xl font-bold text-slate-900">Order placed successfully</h1>
        <p className="mt-2 text-slate-600">Your order has been confirmed and is now being processed.</p>
        <p className="mt-4 text-sm text-slate-500">Order ID: {order._id}</p>
      </section>

      <section className="bg-white p-6 shadow-sm">
        <h2 className="text-xl font-bold text-slate-900">Order Summary</h2>
        <div className="mt-4 space-y-4">
          {order.items.map((item) => (
            <div key={item.product} className="flex items-center justify-between gap-4 border-b border-slate-100 pb-4">
              <div className="flex items-center gap-3">
                <img src={item.image} alt={item.name} className="h-16 w-16 object-cover" />
                <div>
                  <p className="font-medium text-slate-900">{item.name}</p>
                  <p className="text-sm text-slate-500">Quantity: {item.quantity}</p>
                </div>
              </div>
              <p className="font-semibold text-slate-900">{formatPrice(item.price * item.quantity)}</p>
            </div>
          ))}
        </div>

        <div className="mt-6 grid gap-6 md:grid-cols-2">
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-500">Shipping Address</h3>
            <p className="mt-2 text-slate-700">{order.shippingAddress.fullName}</p>
            <p className="text-slate-700">{order.shippingAddress.street}</p>
            <p className="text-slate-700">
              {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.postalCode}
            </p>
            <p className="text-slate-700">{order.shippingAddress.country}</p>
            <p className="text-slate-700">Phone: {order.shippingAddress.phone}</p>
          </div>

          <div className="space-y-2 bg-slate-50 p-4">
            <div className="flex justify-between text-sm text-slate-700">
              <span>Items</span>
              <span>{formatPrice(order.itemsPrice)}</span>
            </div>
            <div className="flex justify-between text-sm text-slate-700">
              <span>Shipping</span>
              <span>{formatPrice(order.shippingPrice)}</span>
            </div>
            <div className="flex justify-between text-sm text-slate-700">
              <span>Tax</span>
              <span>{formatPrice(order.taxPrice)}</span>
            </div>
            <div className="flex justify-between border-t border-slate-200 pt-2 font-bold text-slate-900">
              <span>Total</span>
              <span>{formatPrice(order.totalPrice)}</span>
            </div>
          </div>
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          <Link to="/" className="rounded-full bg-[#ffd814] px-5 py-2.5 text-sm">
            Shop More
          </Link>
          <Link to="/orders" className="rounded-full border border-slate-300 px-5 py-2.5 text-sm">
            View Orders
          </Link>
        </div>
      </section>
    </div>
  )
}

export default OrderConfirmationPage
