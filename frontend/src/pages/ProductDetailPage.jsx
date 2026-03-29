import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { addToCart, getProductById } from '../api'
import Loader from '../components/Loader'
import StarRating from '../components/StarRating'

const formatPrice = (price) =>
  new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(price)

const ProductDetailPage = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [product, setProduct] = useState(null)
  const [selectedImage, setSelectedImage] = useState('')
  const [quantity, setQuantity] = useState(1)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')

  useEffect(() => {
    const loadProduct = async () => {
      try {
        setLoading(true)
        const response = await getProductById(id)
        setProduct(response.data)
        setSelectedImage(response.data.images?.[0] || response.data.image)
      } catch (err) {
        setError(err.response?.data?.message || 'Could not load product')
      } finally {
        setLoading(false)
      }
    }

    loadProduct()
  }, [id])

  const handleAddToCart = async () => {
    try {
      await addToCart(product._id, Number(quantity))
      setMessage('Product added to cart')
    } catch (err) {
      setMessage(err.response?.data?.message || 'Could not add product to cart')
    }
  }

  const handleBuyNow = async () => {
    await handleAddToCart()
    navigate('/cart')
  }

  if (loading) {
    return <Loader text="Loading product details..." />
  }

  if (error) {
    return <div className="border border-red-200 bg-red-50 px-4 py-3 text-red-700">{error}</div>
  }

  if (!product) {
    return null
  }

  const productImages = product.images?.length ? product.images : [product.image]
  const specifications = product.specifications?.length ? product.specifications : []

  return (
    <div className="space-y-4 py-4">
      <Link to="/" className="inline-flex text-sm text-[#007185] hover:text-[#c7511f] hover:underline">
        {'<-'} Back to products
      </Link>

      <section className="grid gap-6 bg-white p-6 shadow-sm lg:grid-cols-[1.1fr,1fr,320px]">
        <div className="grid gap-4 md:grid-cols-[84px,1fr]">
          <div className="flex gap-3 md:flex-col">
            {productImages.map((image) => (
              <button
                key={image}
                onClick={() => setSelectedImage(image)}
                className={`overflow-hidden rounded border p-1 ${
                  selectedImage === image ? 'border-[#f3a847]' : 'border-slate-200'
                }`}
              >
                <img src={image} alt={product.name} className="h-16 w-16 object-cover" />
              </button>
            ))}
          </div>

          <div className="flex min-h-[420px] items-center justify-center border border-slate-200 bg-white p-4">
            <img src={selectedImage} alt={product.name} className="max-h-[420px] w-full object-cover" />
          </div>
        </div>

        <div className="space-y-4 border-b border-slate-200 pb-6 lg:border-b-0 lg:border-r lg:pr-6">
          <div>
            <h1 className="text-[28px] leading-8 text-slate-900">{product.name}</h1>
            <p className="mt-1 text-sm text-[#007185]">Visit the {product.brand} Store</p>
          </div>

          <StarRating rating={product.rating} reviews={product.numReviews} />

          <div className="border-y border-slate-200 py-4">
            <p className="text-[28px] text-slate-900">{formatPrice(product.price)}</p>
            <p className="mt-1 text-sm text-slate-600">Inclusive of all taxes</p>
            <p className="mt-1 text-sm text-[#007600]">FREE delivery available</p>
          </div>

          <div className="space-y-2 text-sm">
            <div className="grid grid-cols-[120px,1fr] gap-2">
              <span className="font-semibold">Category</span>
              <span>{product.category}</span>
            </div>
            <div className="grid grid-cols-[120px,1fr] gap-2">
              <span className="font-semibold">Brand</span>
              <span>{product.brand}</span>
            </div>
            <div className="grid grid-cols-[120px,1fr] gap-2">
              <span className="font-semibold">Availability</span>
              <span className="text-[#007600]">{product.stock} in stock</span>
            </div>
          </div>

          <div>
            <h2 className="mb-2 text-lg font-bold text-slate-900">About this item</h2>
            <p className="leading-7 text-slate-700">{product.description}</p>
          </div>

          {specifications.length > 0 ? (
            <div>
              <h2 className="mb-3 text-lg font-bold text-slate-900">Specifications</h2>
              <div className="overflow-hidden rounded border border-slate-200">
                {specifications.map((item) => (
                  <div
                    key={item.label}
                    className="grid grid-cols-[140px,1fr] border-b border-slate-200 last:border-b-0"
                  >
                    <div className="bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-800">
                      {item.label}
                    </div>
                    <div className="px-4 py-3 text-sm text-slate-700">{item.value}</div>
                  </div>
                ))}
              </div>
            </div>
          ) : null}
        </div>

        <aside className="h-fit rounded-lg border border-slate-300 p-4">
          <p className="text-[28px] text-slate-900">{formatPrice(product.price)}</p>
          <p className="mt-2 text-sm text-slate-600">FREE delivery</p>
          <p className="mt-2 text-lg text-[#007600]">In stock</p>

          <select
            value={quantity}
            onChange={(event) => setQuantity(event.target.value)}
            className="mt-4 w-full rounded-full border border-slate-300 bg-[#f0f2f2] px-4 py-2"
          >
            {Array.from({ length: product.stock }, (_, index) => index + 1).map((value) => (
              <option key={value} value={value}>
                Qty: {value}
              </option>
            ))}
          </select>

          <button
            onClick={handleAddToCart}
            className="mt-4 w-full rounded-full bg-[#ffd814] px-5 py-2.5 text-sm transition hover:bg-[#f7ca00]"
          >
            Add to Cart
          </button>

          <button
            onClick={handleBuyNow}
            className="mt-3 w-full rounded-full bg-[#ffa41c] px-5 py-2.5 text-sm transition hover:bg-[#fa8900]"
          >
            Buy Now
          </button>

          {message ? (
            <div className="mt-4 border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800">
              {message}
            </div>
          ) : null}
        </aside>
      </section>
    </div>
  )
}

export default ProductDetailPage
