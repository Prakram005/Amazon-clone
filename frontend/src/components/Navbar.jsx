import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getCart } from '../api'

const topLinks = [
  'Fresh',
  'MX Player',
  'Sell',
  'Best Sellers',
  'Mobiles',
  "Today's Deals",
  'Prime',
  'Customer Service',
  'Fashion',
  'Electronics',
  'Home & Kitchen',
  'New Releases',
]

const Navbar = () => {
  const [cartCount, setCartCount] = useState(0)

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

          <div className="min-w-[110px] border border-transparent px-2 py-1 text-xs leading-tight hover:border-white">
            <p className="text-[11px] text-slate-300">Deliver to Prakram</p>
            <p className="font-bold">India</p>
          </div>

          <div className="flex min-w-0 items-stretch overflow-hidden rounded-md border-2 border-transparent bg-white focus-within:border-[#f3a847]">
            <button className="hidden items-center border-r border-slate-200 bg-[#f3f3f3] px-3 text-xs text-slate-700 sm:flex">
              All
            </button>
            <input
              type="text"
              placeholder="Search Amazon"
              className="min-w-0 flex-1 px-3 py-2 text-sm text-slate-900 outline-none"
            />
            <button className="flex min-w-[52px] items-center justify-center bg-[#febd69] px-4 text-sm font-medium text-slate-900">
              Search
            </button>
          </div>

          <div className="flex items-center gap-1">
            <div className="hidden border border-transparent px-2 py-1 text-xs leading-tight hover:border-white lg:block">
              <p className="text-[11px]">EN</p>
              <p className="font-bold">Language</p>
            </div>

            <div className="hidden border border-transparent px-2 py-1 text-xs leading-tight hover:border-white lg:block">
              <p className="text-[11px]">Hello, sign in</p>
              <p className="font-bold">Account & Lists</p>
            </div>

            <div className="hidden border border-transparent px-2 py-1 text-xs leading-tight hover:border-white lg:block">
              <p className="text-[11px]">Returns</p>
              <p className="font-bold">& Orders</p>
            </div>

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
            <button className="flex items-center border-r border-slate-200 bg-[#f3f3f3] px-3 text-xs text-slate-700">
              All
            </button>
            <input
              type="text"
              placeholder="Search Amazon"
              className="min-w-0 flex-1 px-3 py-2 text-sm text-slate-900 outline-none"
            />
            <button className="flex min-w-[52px] items-center justify-center bg-[#febd69] px-4 text-sm font-medium text-slate-900">
              Search
            </button>
          </div>

          <div className="mt-2 border border-transparent px-2 py-1 text-xs leading-tight hover:border-white">
            <p className="text-[11px] text-slate-300">Deliver to Prakram</p>
            <p className="font-bold">India</p>
          </div>
        </div>
      </div>

      <div className="bg-[#232f3e] text-sm text-slate-100">
        <div className="mx-auto flex max-w-[1500px] items-center gap-1 overflow-x-auto px-2 py-1.5">
          <button className="shrink-0 rounded-sm border border-transparent px-2 py-1 hover:border-white">
            Menu
          </button>
          {topLinks.map((item) => (
            <button
              key={item}
              className="shrink-0 rounded-sm border border-transparent px-2 py-1 hover:border-white"
            >
              {item}
            </button>
          ))}
        </div>
      </div>
    </header>
  )
}

export default Navbar
