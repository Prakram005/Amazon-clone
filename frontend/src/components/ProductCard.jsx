import { Link } from 'react-router-dom'
import { addToCart } from '../api'
import StarRating from './StarRating'

const formatPrice = (price) =>
  new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(price)

const ProductCard = ({ product, onAddedToCart }) => {
  const productImage = product.images?.[0] || product.image

  const handleAddToCart = async () => {
    try {
      await addToCart(product._id, 1)
      onAddedToCart?.(`${product.name} added to cart`)
    } catch (error) {
      onAddedToCart?.(error.response?.data?.message || 'Could not add product to cart')
    }
  }

  return (
    <div className="flex h-full flex-col bg-white p-4 transition hover:shadow-md">
      <Link to={`/product/${product._id}`} className="mb-3 flex h-56 items-center justify-center overflow-hidden bg-white">
        <img
          src={productImage}
          alt={product.name}
          className="h-full w-full object-cover transition duration-300 hover:scale-105"
        />
      </Link>

      <p className="text-xs text-slate-500">{product.brand}</p>
      <Link to={`/product/${product._id}`} className="mt-1 line-clamp-2 min-h-12 text-base leading-5 text-slate-900 hover:text-[#c7511f]">
        {product.name}
      </Link>
      <div className="mt-2">
        <StarRating rating={product.rating} reviews={product.numReviews} />
      </div>
      <p className="mt-2 text-[28px] leading-none text-slate-900">{formatPrice(product.price)}</p>
      <p className="mt-1 text-sm text-slate-600">FREE delivery by Amazon</p>
      <p className="mt-1 text-sm text-emerald-700">{product.stock > 0 ? 'In stock' : 'Out of stock'}</p>

      <button
        onClick={handleAddToCart}
        className="mt-4 w-fit rounded-full bg-[#ffd814] px-5 py-2 text-sm text-slate-900 transition hover:bg-[#f7ca00]"
      >
        Add to Cart
      </button>
    </div>
  )
}

export default ProductCard
