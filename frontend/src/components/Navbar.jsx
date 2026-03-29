import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { getCart } from '../api'

const topLinks = [
  { label: 'Fresh', category: 'Beauty' },
  { label: 'MX Player', category: 'Electronics' },
  { label: 'Sell', category: 'All' },
  { label: 'Best Sellers', category: 'All' },
  { label: 'Mobiles', category: 'Electronics' },
  { label: "Today's Deals", category: 'All' },
  { label: 'Prime', category: 'All' },
  { label: 'Customer Service', category: 'All' },
  { label: 'Fashion', category: 'Fashion' },
  { label: 'Electronics', category: 'Electronics' },
  { label: 'Home & Kitchen', category: 'Home' },
  { label: 'New Releases', category: 'All' },
]

const Navbar = () => {
  const navigate = useNavigate()
  const [cartCount, setCartCount] = useState(0)
  const [searchText, setSearchText] = useState('')

  useEffect(() => {
    const loadCart = async () => {
      try {
        const response = await getCart()
        setCartCount(response.data.itemsCount || 0)
      } catch {
        setCartCount(0)
      }
    }

    loadCart()
  }, [])

  const goToProducts = (nextSearch = '', nextCategory = 'All') => {
    const params = new URLSearchParams()

    if (nextSearch.trim()) {
      params.set('search', nextSearch.trim())
    }

    if (nextCategory && nextCategory !== 'All') {
      params.set('category', nextCategory)
    }

    navigate(`/${params.toString() ? `?${params.toString()}` : ''}`)
  }

  const handleSearch = () => {
    goToProducts(searchText, 'All')
  }

  const handleSearchKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleSearch()
    }
  }

  return (
    <header className="sticky top-0 z-20 shadow-md">
      <div className="bg-[#131921] text-white">
        <div className="mx-auto hidden max-w-[1500px] grid-cols-[auto,auto,1fr,auto] items-center gap-2 px-2 py-2 md:grid">
          <Link to="/" className="min-w-[118px] border border-transparent px-2 py-1 hover:border-white">
            <div className="flex items-end">
              <span className="text-[28px] font-bold leading-none tracking-tight">amazon</span>
              <span className="pb-1 text-xs">.in</span>
            </div>
            <div className="-mt-1 h-[2px] w-[72px] rounded-full bg-[#ff9900]"></div>
          </Link>

          <button
            onClick={() => goToProducts('', 'All')}
            className="min-w-[110px] border border-transparent px-2 py-1 text-left text-xs leading-tight hover:border-white"
          >
            <p className="text-[11px] text-slate-300">Deliver to Prakram</p>
            <p className="font-bold">India</p>
          </button>

          <div className="flex min-w-0 items-stretch overflow-hidden rounded-md border-2 border-transparent bg-white focus-within:border-[#f3a847]">
            <button
              onClick={() => goToProducts('', 'All')}
              className="hidden items-center border-r border-slate-200 bg-[#f3f3f3] px-3 text-xs text-slate-700 sm:flex"
            >
              All
            </button>
            <input
              type="text"
              placeholder="Search Amazon"
              value={searchText}
              onChange={(event) => setSearchText(event.target.value)}
              onKeyDown={handleSearchKeyDown}
              className="min-w-0 flex-1 px-3 py-2 text-sm text-slate-900 outline-none"
            />
            <button
              onClick={handleSearch}
              className="flex min-w-[52px] items-center justify-center bg-[#febd69] px-4 text-sm font-medium text-slate-900"
            >
              Search
            </button>
          </div>

          <div className="flex items-center gap-1">
            <button className="hidden border border-transparent px-2 py-1 text-left text-xs leading-tight hover:border-white lg:block">
              <p className="text-[11px]">EN</p>
              <p className="font-bold">Language</p>
            </button>

            <button className="hidden border border-transparent px-2 py-1 text-left text-xs leading-tight hover:border-white lg:block">
              <p className="text-[11px]">Hello, sign in</p>
              <p className="font-bold">Account & Lists</p>
            </button>

            <Link to="/orders" className="hidden border border-transparent px-2 py-1 text-xs leading-tight hover:border-white lg:block">
              <p className="text-[11px]">Returns</p>
              <p className="font-bold">& Orders</p>
            </Link>

            <Link to="/cart" className="flex items-end gap-1 border border-transparent px-2 py-1 hover:border-white">
              <div className="relative">
                <span className="text-2xl">Cart</span>
                <span className="absolute -right-2 -top-1 text-sm font-bold text-[#f08804]">{cartCount}</span>
              </div>
              <span className="text-sm font-bold">Cart</span>
            </Link>
          </div>
        </div>

        <div className="mx-auto max-w-[1500px] px-2 py-2 md:hidden">
          <div className="flex items-center justify-between gap-2">
            <Link to="/" className="border border-transparent px-2 py-1 hover:border-white">
              <div className="flex items-end">
                <span className="text-[26px] font-bold leading-none tracking-tight">amazon</span>
                <span className="pb-1 text-xs">.in</span>
              </div>
              <div className="-mt-1 h-[2px] w-[68px] rounded-full bg-[#ff9900]"></div>
            </Link>

            <Link to="/cart" className="border border-transparent px-2 py-1 text-sm font-bold hover:border-white">
              Cart ({cartCount})
            </Link>
          </div>

          <div className="mt-2 flex items-stretch overflow-hidden rounded-md border-2 border-transparent bg-white focus-within:border-[#f3a847]">
            <button
              onClick={() => goToProducts('', 'All')}
              className="flex items-center border-r border-slate-200 bg-[#f3f3f3] px-3 text-xs text-slate-700"
            >
              All
            </button>
            <input
              type="text"
              placeholder="Search Amazon"
              value={searchText}
              onChange={(event) => setSearchText(event.target.value)}
              onKeyDown={handleSearchKeyDown}
              className="min-w-0 flex-1 px-3 py-2 text-sm text-slate-900 outline-none"
            />
            <button
              onClick={handleSearch}
              className="flex min-w-[52px] items-center justify-center bg-[#febd69] px-4 text-sm font-medium text-slate-900"
            >
              Search
            </button>
          </div>

          <button
            onClick={() => goToProducts('', 'All')}
            className="mt-2 border border-transparent px-2 py-1 text-left text-xs leading-tight hover:border-white"
          >
            <p className="text-[11px] text-slate-300">Deliver to Prakram</p>
            <p className="font-bold">India</p>
          </button>
        </div>
      </div>

      <div className="bg-[#232f3e] text-sm text-slate-100">
        <div className="mx-auto flex max-w-[1500px] items-center gap-1 overflow-x-auto px-2 py-1.5">
          <button
            onClick={() => goToProducts('', 'All')}
            className="shrink-0 rounded-sm border border-transparent px-2 py-1 hover:border-white"
          >
            Menu
          </button>

          {topLinks.map((item) => (
            <button
              key={item.label}
              onClick={() => goToProducts('', item.category)}
              className="shrink-0 rounded-sm border border-transparent px-2 py-1 hover:border-white"
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>
    </header>
  )
}

export default Navbar
