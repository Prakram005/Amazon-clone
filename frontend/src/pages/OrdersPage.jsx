import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getOrders } from '../api'
import Loader from '../components/Loader'

const formatPrice = (price) =>
  new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(price)

const OrdersPage = () => {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const loadOrders = async () => {
      try {
        const response = await getOrders()
        setOrders(response.data)
      } catch (err) {
        setError(err.response?.data?.message || 'Could not load orders')
      } finally {
        setLoading(false)
      }
    }

    loadOrders()
  }, [])

  if (loading) {
    return <Loader text="Loading your orders..." />
  }

  return (
    <div className="space-y-4 py-4">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Your Orders</h1>
        <p className="mt-2 text-sm text-slate-600">Review all placed orders for the default shopper.</p>
      </div>

      {error ? (
        <div className="border border-red-200 bg-red-50 px-4 py-3 text-red-700">{error}</div>
      ) : null}

      {orders.length === 0 ? (
        <div className="bg-white p-10 text-center shadow-sm">
          <p className="text-slate-600">No orders placed yet.</p>
          <Link to="/" className="mt-4 inline-flex rounded-full bg-[#ffd814] px-5 py-2.5 font-medium">
            Browse Products
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div key={order._id} className="bg-white p-6 shadow-sm">
              <div className="flex flex-col gap-3 border-b border-slate-200 pb-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm text-slate-500">Order ID</p>
                  <p className="font-semibold text-slate-900">{order._id}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-500">Status</p>
                  <p className="font-semibold text-emerald-700">{order.status}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-500">Total</p>
                  <p className="font-semibold text-slate-900">{formatPrice(order.totalPrice)}</p>
                </div>
                <Link to={`/order-confirmation/${order._id}`} className="text-sm font-medium text-[#007185] hover:text-[#c7511f] hover:underline">
                  View details
                </Link>
              </div>

              <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {order.items.map((item) => (
                  <div key={`${order._id}-${item.product}`} className="flex items-center gap-3 bg-slate-50 p-3">
                    <img src={item.image} alt={item.name} className="h-14 w-14 object-cover" />
                    <div>
                      <p className="line-clamp-1 font-medium text-slate-900">{item.name}</p>
                      <p className="text-sm text-slate-500">Qty: {item.quantity}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default OrdersPage
