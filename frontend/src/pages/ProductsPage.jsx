import { useEffect, useMemo, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { getCategories, getProducts } from '../api'
import Loader from '../components/Loader'
import ProductCard from '../components/ProductCard'

const reviewOptions = ['5 stars', '4 stars & up', '3 stars & up']

const promoCards = [
  {
    title: 'Appliances for your home',
    items: ['Air conditioners', 'Refrigerators', 'Microwaves', 'Washing machines'],
    category: 'Home',
  },
  {
    title: 'Revamp your home in style',
    items: ['Cushion covers', 'Figurines', 'Storage', 'Lighting'],
    category: 'Home',
  },
  {
    title: 'Starting Rs 199 | Fashion picks',
    items: ['T-shirts', 'Shoes', 'Bags', 'Watches'],
    category: 'Fashion',
  },
  {
    title: 'Shop top electronics',
    items: ['Mobiles', 'Headphones', 'Watches', 'Laptops'],
    category: 'Electronics',
  },
]

const ProductsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')

  const search = searchParams.get('search') || ''
  const category = searchParams.get('category') || 'All'

  useEffect(() => {
    const loadInitialData = async () => {
      try {
        const categoriesResponse = await getCategories()
        setCategories(['All', ...categoriesResponse.data])
      } catch {
        setCategories(['All'])
      }
    }

    loadInitialData()
  }, [])

  useEffect(() => {
    const timeout = setTimeout(() => {
      const loadProducts = async () => {
        try {
          setLoading(true)
          setError('')
          const response = await getProducts({ search, category })
          setProducts(response.data)
        } catch (err) {
          setError(err.response?.data?.message || 'Could not load products')
        } finally {
          setLoading(false)
        }
      }

      loadProducts()
    }, 250)

    return () => clearTimeout(timeout)
  }, [search, category])

  const featuredProducts = useMemo(() => products.slice(0, 4), [products])

  const updateFilters = (nextSearch = search, nextCategory = category) => {
    const params = new URLSearchParams()

    if (nextSearch.trim()) {
      params.set('search', nextSearch.trim())
    }

    if (nextCategory !== 'All') {
      params.set('category', nextCategory)
    }

    setSearchParams(params)
  }

  return (
    <div className="space-y-4 pb-8">
      <section className="relative overflow-hidden bg-gradient-to-b from-[#c9e8f6] via-[#dfeff5] to-[#e3e6e6] px-4 pb-32 pt-10 sm:px-6 lg:px-8">
        <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#e3e6e6] to-transparent"></div>
        <div className="relative max-w-3xl">
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-5xl">
            Great Freedom Festival | Deals on electronics, fashion, and home essentials
          </h1>
          <p className="mt-3 max-w-2xl text-sm text-slate-700 sm:text-base">
            Explore Amazon-inspired product sections, search quickly, filter by category, and shop with a familiar marketplace-style experience.
          </p>
        </div>
      </section>

      <section className="-mt-28 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {promoCards.map((card) => (
          <button
            key={card.title}
            onClick={() => updateFilters('', card.category)}
            className="bg-white p-5 text-left shadow-sm"
          >
            <h2 className="text-[21px] font-bold leading-7 text-slate-900">{card.title}</h2>
            <div className="mt-4 grid grid-cols-2 gap-3 text-xs text-slate-700">
              {card.items.map((item) => (
                <div key={item} className="min-h-[90px] bg-[#f7f8f8] p-3">
                  {item}
                </div>
              ))}
            </div>
          </button>
        ))}
      </section>

      {featuredProducts.length > 0 ? (
        <section className="bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between gap-4">
            <h2 className="text-[21px] font-bold text-slate-900">Featured picks for you</h2>
            <button onClick={() => updateFilters('', 'All')} className="text-sm text-[#007185]">
              See all deals
            </button>
          </div>
          <div className="mt-4 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {featuredProducts.map((product) => (
              <Link key={`featured-${product._id}`} to={`/product/${product._id}`} className="border border-slate-200 p-3">
                <img
                  src={product.images?.[0] || product.image}
                  alt={product.name}
                  className="h-40 w-full object-cover"
                />
                <p className="mt-3 line-clamp-2 text-sm text-slate-800">{product.name}</p>
              </Link>
            ))}
          </div>
        </section>
      ) : null}

      <div className="grid gap-4 lg:grid-cols-[260px,1fr]">
        <aside className="h-fit bg-white p-4 shadow-sm">
          <h2 className="text-lg font-bold text-slate-900">Filters</h2>

          <div className="mt-5">
            <h3 className="text-sm font-bold text-slate-900">Search</h3>
            <input
              type="text"
              placeholder="Search products"
              value={search}
              onChange={(event) => updateFilters(event.target.value, category)}
              className="mt-2 w-full rounded-sm border border-slate-400 px-3 py-2 outline-none focus:border-[#f3a847]"
            />
          </div>

          <div className="mt-6">
            <h3 className="text-sm font-bold text-slate-900">Departments</h3>
            <div className="mt-3 space-y-2 text-sm">
              {categories.map((item) => (
                <label key={item} className="flex cursor-pointer items-center gap-2">
                  <input
                    type="radio"
                    checked={category === item}
                    onChange={() => updateFilters(search, item)}
                    className="h-4 w-4 accent-[#ff9900]"
                  />
                  <span>{item}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="mt-6 border-t border-slate-200 pt-6">
            <h3 className="text-sm font-bold text-slate-900">Customer Review</h3>
            <div className="mt-3 space-y-2 text-sm text-slate-700">
              {reviewOptions.map((item) => (
                <p key={item}>{item}</p>
              ))}
            </div>
          </div>

          <div className="mt-6 border-t border-slate-200 pt-6">
            <h3 className="text-sm font-bold text-slate-900">Delivery</h3>
            <div className="mt-3 space-y-2 text-sm text-slate-700">
              <p>Free Delivery</p>
              <p>Prime Eligible</p>
            </div>
          </div>
        </aside>

        <section className="space-y-4">
          {message ? (
            <div className="border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800">
              {message}
            </div>
          ) : null}

          {loading ? <Loader text="Loading products..." /> : null}

          {!loading && error ? (
            <div className="border border-red-200 bg-red-50 px-4 py-3 text-red-700">{error}</div>
          ) : null}

          {!loading && !error ? (
            <>
              <div className="bg-white px-5 py-4 shadow-sm">
                <h2 className="text-[28px] font-normal text-slate-900">Results</h2>
                <p className="mt-1 text-sm text-slate-600">
                  1-{products.length} of over {products.length} results
                </p>
              </div>

              {products.length === 0 ? (
                <div className="bg-white px-6 py-10 text-center text-slate-600 shadow-sm">
                  No products matched your search.
                </div>
              ) : (
                <div className="grid gap-px bg-[#d5d9d9] sm:grid-cols-2 xl:grid-cols-3">
                  {products.map((product) => (
                    <ProductCard
                      key={product._id}
                      product={product}
                      onAddedToCart={(text) => setMessage(text)}
                    />
                  ))}
                </div>
              )}
            </>
          ) : null}
        </section>
      </div>
    </div>
  )
}

export default ProductsPage
