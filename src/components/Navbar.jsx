import { useState, useRef, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { getCurrentUser, logoutUser } from '../utils/userStore'
import { getCartCount } from '../utils/cart'
import { productCategories } from '../data/productCategories'

const defaultOpenCategories = [0, 1, 2]

const badgeLetters = {
  Leaf: 'I',
  Tree: 'O',
  Tools: 'G',
  Pot: 'P',
  Seed: 'S',
  Care: 'C',
}

function Navbar() {
  const navigate = useNavigate()
  const location = useLocation()
  const [currentUser, setCurrentUser] = useState(() => getCurrentUser())
  const [cartCount, setCartCount] = useState(0)
  const [isOpen, setIsOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [isProductsOpen, setIsProductsOpen] = useState(false)
  const [openCategories, setOpenCategories] = useState(defaultOpenCategories)

  const productsRef = useRef(null)
  const productsButtonRef = useRef(null)
  const searchButtonRef = useRef(null)
  const closeTimeoutRef = useRef(null)

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        productsRef.current &&
        !productsRef.current.contains(event.target) &&
        productsButtonRef.current &&
        !productsButtonRef.current.contains(event.target)
      ) {
        setIsProductsOpen(false)
        setOpenCategories(defaultOpenCategories)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  useEffect(() => {
    return () => {
      if (closeTimeoutRef.current) {
        clearTimeout(closeTimeoutRef.current)
      }
    }
  }, [])

  useEffect(() => {
    const syncCurrentUser = () => {
      setCurrentUser(getCurrentUser())
    }

    const refreshCart = async () => {
      if (!getCurrentUser()) {
        setCartCount(0)
        return
      }
      const n = await getCartCount()
      setCartCount(n)
    }

    syncCurrentUser()
    refreshCart()
    window.addEventListener('authchange', syncCurrentUser)
    window.addEventListener('authchange', refreshCart)
    window.addEventListener('cartchange', refreshCart)
    window.addEventListener('storage', syncCurrentUser)

    return () => {
      window.removeEventListener('authchange', syncCurrentUser)
      window.removeEventListener('authchange', refreshCart)
      window.removeEventListener('cartchange', refreshCart)
      window.removeEventListener('storage', syncCurrentUser)
    }
  }, [location.pathname])

  const routeTo = (path) => {
    setIsOpen(false)
    setIsSearchOpen(false)
    setIsProductsOpen(false)
    setOpenCategories(defaultOpenCategories)

    if (window.location.pathname !== path) {
      navigate(path)
    } else {
      window.scrollTo({ top: 0, behavior: 'auto' })
    }
  }

  const toggleProductsMenu = () => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current)
    }
    setIsSearchOpen(false)
    setIsProductsOpen((current) => !current)
    setOpenCategories(defaultOpenCategories)
  }

  const openProductsMenu = () => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current)
    }
    setIsSearchOpen(false)
    setIsProductsOpen(true)
  }

  const closeProductsMenu = () => {
    closeTimeoutRef.current = setTimeout(() => {
      setIsProductsOpen(false)
      setOpenCategories(defaultOpenCategories)
    }, 140)
  }

  const toggleSearch = () => {
    setIsProductsOpen(false)
    setOpenCategories(defaultOpenCategories)
    setIsSearchOpen((current) => !current)
  }

  const closeSearch = () => {
    setIsSearchOpen(false)
  }

  const handleLogout = async () => {
    await logoutUser()
    routeTo('/')
  }

  const toggleCategory = (index) => {
    setOpenCategories((current) =>
      current.includes(index) ? current.filter((item) => item !== index) : [...current, index]
    )
  }

  const openCategoryOnHover = (index) => {
    setOpenCategories((current) => (current.includes(index) ? current : [...current, index]))
  }

  const currentPage =
    location.pathname === '/about'
      ? 'about'
      : location.pathname === '/gallery'
        ? 'gallery'
        : location.pathname === '/testimonials'
          ? 'testimonials'
          : location.pathname === '/contact'
            ? 'contact'
            : location.pathname === '/login'
              ? 'login'
              : location.pathname === '/register'
                ? 'register'
                : 'home'

  const navItems = [
    { label: 'Gallery', path: '/gallery' },
    { label: 'Testimonials', path: '/testimonials' },
    { label: 'Contact', path: '/contact' },
  ]

  return (
    <header className="fixed left-0 top-0 z-50 w-full border-b border-gray-100 bg-white/80 backdrop-blur-md">
      <nav className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <button type="button" onClick={() => routeTo('/')} className="group flex items-center gap-2 border-0 bg-transparent p-0">
          <span className="grid size-9 place-items-center rounded-lg bg-gradient-to-br from-green-600 to-emerald-600 text-white shadow-md transition-all duration-300 group-hover:scale-105 group-hover:shadow-lg">
            <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="2.2">
              <path d="M4 14c0-5 4-9 9-9 0 5-4 9-9 9Z" />
              <path d="M9 20c.5-4 3-7 7-9" />
            </svg>
          </span>
          <span className="text-xl font-bold text-gray-900 transition-colors group-hover:text-green-600">Nurser</span>
        </button>

        <div className="hidden items-center gap-8 md:flex">
          <button type="button" onClick={() => routeTo('/')} className={`group relative border-0 bg-transparent px-1 py-2 text-sm font-medium transition-all duration-300 ${currentPage === 'home' ? 'text-green-600' : 'text-gray-700 hover:text-green-600'}`}>
            Home
            <span className={`absolute bottom-0 left-0 h-0.5 bg-green-600 transition-all duration-300 ${currentPage === 'home' ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
          </button>

          <button type="button" onClick={() => routeTo('/about')} className={`group relative border-0 bg-transparent px-1 py-2 text-sm font-medium transition-all duration-300 ${currentPage === 'about' ? 'text-green-600' : 'text-gray-700 hover:text-green-600'}`}>
            About
            <span className={`absolute bottom-0 left-0 h-0.5 bg-green-600 transition-all duration-300 ${currentPage === 'about' ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
          </button>

          <div className="static" onMouseEnter={openProductsMenu} onMouseLeave={closeProductsMenu}>
            <button
              ref={productsButtonRef}
              type="button"
              onClick={toggleProductsMenu}
              className={`group relative flex items-center gap-1.5 px-1 py-2 text-sm font-medium transition-all duration-300 ${isProductsOpen ? 'text-green-600' : 'text-gray-700 hover:text-green-600'}`}
            >
              <span>Products</span>
              <svg className={`h-4 w-4 transition-transform duration-200 ${isProductsOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
              <span className={`absolute bottom-0 left-0 h-0.5 bg-green-600 transition-all duration-300 ${isProductsOpen ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
            </button>

            {isProductsOpen && (
              <div
                ref={productsRef}
                className="absolute left-0 right-0 top-full z-50 mx-auto mt-0 w-[calc(100%-2rem)] max-w-[1100px] overflow-x-hidden rounded-b-2xl border-x border-b border-gray-50 bg-white p-8 shadow-[0_20px_40px_rgba(0,0,0,0.08)]"
                style={{
                  maxHeight: '600px',
                  overflowY: 'auto',
                  animation: 'slideDownCentered 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                }}
              >
                <div className="grid grid-cols-3 gap-x-12 gap-y-10">
                  {productCategories.map((category, idx) => (
                    <div key={category.slug} className="space-y-2" onMouseEnter={() => openCategoryOnHover(idx)}>
                      <button
                        type="button"
                        onClick={() => toggleCategory(idx)}
                        className="mb-2 flex w-full items-center gap-3 border-0 border-b border-gray-50 bg-transparent pb-3 text-left text-[15px] font-bold uppercase tracking-wider text-green-700 transition-colors hover:text-green-600"
                      >
                        <span className="flex min-w-0 items-center gap-3">
                          <span className="grid h-7 w-7 place-items-center rounded-full bg-emerald-100 text-xs font-bold text-emerald-900">
                            {badgeLetters[category.icon]}
                          </span>
                          <span>{category.name}</span>
                        </span>
                        <svg className={`ml-auto h-4 w-4 shrink-0 transition-transform duration-200 ${openCategories.includes(idx) ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>

                      {openCategories.includes(idx) && (
                        <div className="space-y-1">
                          <a href={category.path} className="block rounded-md bg-emerald-50 px-2 py-2 text-sm font-semibold text-emerald-700 transition-all duration-200 hover:bg-emerald-100">
                            View all {category.name}
                          </a>
                          {category.submenu.map((subItem) => (
                            <a
                              key={subItem.id}
                              href={`${category.path}#${subItem.id}`}
                              className="block rounded-md px-2 py-1.5 text-sm text-gray-600 transition-all duration-200 hover:bg-green-50 hover:text-green-600"
                            >
                              {subItem.name}
                            </a>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {navItems.map((item) => (
            <button
              key={item.label}
              type="button"
              onClick={() => routeTo(item.path)}
              className={`group relative border-0 bg-transparent px-1 py-2 text-sm font-medium transition-all duration-300 ${currentPage === item.label.toLowerCase() ? 'text-green-600' : 'text-gray-700 hover:text-green-600'}`}
            >
              {item.label}
              <span className={`absolute bottom-0 left-0 h-0.5 bg-green-600 transition-all duration-300 ${currentPage === item.label.toLowerCase() ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
            </button>
          ))}
        </div>

        <div className="hidden items-center gap-5 md:flex">
          <button
            ref={searchButtonRef}
            onClick={toggleSearch}
            className="rounded-full p-2 text-gray-600 transition-all duration-200 hover:bg-green-50 hover:text-green-600"
            aria-label="Search"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <circle cx="11" cy="11" r="7" />
              <path d="m20 20-3.5-3.5" />
            </svg>
          </button>

          <button type="button" onClick={() => routeTo('/cart')} className="relative rounded-full p-2 text-gray-600 transition-all duration-200 hover:bg-green-50 hover:text-green-600">
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path d="M3 4h2l2.2 10.2a2 2 0 0 0 2 1.6h7.6a2 2 0 0 0 2-1.6L21 7H7" />
              <circle cx="10" cy="20" r="1.3" />
              <circle cx="18" cy="20" r="1.3" />
            </svg>
            <span className="absolute -right-1 -top-1 flex h-4 min-w-[1rem] items-center justify-center rounded-full bg-green-600 px-1 text-[10px] font-bold text-white">
              {cartCount}
            </span>
          </button>

          <div className="ml-2 flex items-center gap-3">
            {currentUser ? (
              <>
                <button
                  type="button"
                  onClick={() => routeTo('/profile')}
                  className="inline-flex items-center gap-3 rounded-full border border-emerald-100 bg-emerald-50 px-4 py-2 text-sm font-semibold text-emerald-950 transition hover:bg-emerald-100"
                >
                  <span className="grid h-8 w-8 place-items-center rounded-full bg-emerald-950 text-xs font-bold text-white">
                    {(currentUser.fullName || 'U').slice(0, 1).toUpperCase()}
                  </span>
                  {currentUser.fullName}
                </button>
                <button type="button" onClick={handleLogout} className="border-0 bg-transparent px-4 py-2 text-sm font-semibold text-gray-700 transition-all hover:text-green-600">
                  Logout
                </button>
              </>
            ) : (
              <>
                <button type="button" onClick={() => routeTo('/login')} className="border-0 bg-transparent px-5 py-2 text-sm font-semibold text-gray-700 transition-all hover:text-green-600">
                  Login
                </button>
                <button type="button" onClick={() => routeTo('/register')} className="rounded-lg bg-green-600 px-6 py-2.5 text-sm font-bold text-white shadow-md transition-all hover:bg-green-700 hover:shadow-lg active:scale-95">
                  Register
                </button>
              </>
            )}
          </div>
        </div>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="rounded-lg p-2.5 text-gray-600 transition-all duration-200 hover:bg-green-50 hover:text-green-600 md:hidden"
          aria-label="Toggle menu"
        >
          <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {isOpen ? <path d="M6 18L18 6M6 6l12 12" /> : <path d="M4 6h16M4 12h16M4 18h16" />}
          </svg>
        </button>
      </nav>

      <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isSearchOpen ? 'max-h-28 border-t border-gray-100 bg-white shadow-inner' : 'max-h-0'}`}>
        <div className="bg-gradient-to-b from-gray-50 to-white py-5">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-4">
              <div className="relative flex-1">
                <svg className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <circle cx="11" cy="11" r="7" />
                  <path d="m20 20-3.5-3.5" />
                </svg>
                <input
                  type="text"
                  placeholder="Search products, category, or plants..."
                  className="w-full rounded-xl border border-gray-200 bg-white py-3.5 pl-12 pr-4 text-base shadow-sm transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-green-100"
                  autoFocus={isSearchOpen}
                />
              </div>
              <button onClick={closeSearch} className="rounded-xl border border-gray-200 px-6 py-3.5 text-sm font-semibold text-gray-600 transition-all duration-200 hover:border-green-200 hover:bg-green-50 hover:text-green-600">
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className={`overflow-hidden transition-all duration-300 ease-in-out md:hidden ${isOpen ? 'max-h-[900px] border-t border-gray-100' : 'max-h-0'}`}>
        <div className="bg-white py-3">
          <div className="space-y-2 px-4">
            <button type="button" onClick={() => routeTo('/')} className="block w-full rounded-lg border-0 bg-transparent px-3 py-2.5 text-left text-gray-700 transition-all duration-200 hover:bg-green-50 hover:text-green-600">
              Home
            </button>
            <button type="button" onClick={() => routeTo('/about')} className="block w-full rounded-lg border-0 bg-transparent px-3 py-2.5 text-left text-gray-700 transition-all duration-200 hover:bg-green-50 hover:text-green-600">
              About
            </button>

            <div className="space-y-1">
              <button
                onClick={toggleProductsMenu}
                className="flex w-full items-center justify-between rounded-lg bg-green-50 px-3 py-2.5 text-green-600 transition-all duration-200"
              >
                <span>Products</span>
                <svg className={`h-4 w-4 transition-transform duration-200 ${isProductsOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {isProductsOpen && (
                <div className="mt-2 space-y-3 pl-4">
                  {productCategories.map((category, idx) => (
                    <div key={category.slug} className="space-y-1">
                      <button
                        type="button"
                        onClick={() => toggleCategory(idx)}
                        className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-sm font-medium transition-all duration-200 ${
                          openCategories.includes(idx) ? 'bg-green-100 text-green-700' : 'text-gray-800 hover:bg-green-50 hover:text-green-600'
                        }`}
                      >
                        <span>{category.name}</span>
                        <svg className={`h-4 w-4 transition-transform duration-200 ${openCategories.includes(idx) ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>

                      {openCategories.includes(idx) && (
                        <div className="space-y-1 pl-6">
                          <a href={category.path} className="block px-3 py-1.5 text-sm font-semibold text-green-700 hover:text-green-800">
                            View all {category.name}
                          </a>
                          {category.submenu.map((subItem) => (
                            <a key={subItem.id} href={`${category.path}#${subItem.id}`} className="block px-3 py-1.5 text-sm text-gray-600 hover:text-green-600">
                              {subItem.name}
                            </a>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {navItems.map((item) => (
              <button key={item.label} type="button" onClick={() => routeTo(item.path)} className="block w-full rounded-lg border-0 bg-transparent px-3 py-2.5 text-left text-gray-700 transition-all duration-200 hover:bg-green-50 hover:text-green-600">
                {item.label}
              </button>
            ))}

            <div className="mt-3 space-y-2 border-t border-gray-100 pt-3">
              {currentUser ? (
                <>
                  <button type="button" onClick={() => routeTo('/profile')} className="w-full rounded-lg border-0 bg-emerald-50 px-3 py-2.5 text-center font-semibold text-emerald-900 transition-all duration-200 hover:bg-emerald-100">
                    {currentUser.fullName}
                  </button>
                  <button type="button" onClick={handleLogout} className="w-full rounded-lg border-0 bg-transparent px-3 py-2.5 text-center text-gray-700 transition-all duration-200 hover:bg-green-50 hover:text-green-600">
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <button type="button" onClick={() => routeTo('/login')} className="w-full rounded-lg border-0 bg-transparent px-3 py-2.5 text-center text-gray-700 transition-all duration-200 hover:bg-green-50 hover:text-green-600">
                    Login
                  </button>
                  <button type="button" onClick={() => routeTo('/register')} className="w-full rounded-lg bg-gradient-to-br from-green-600 to-emerald-600 px-3 py-2.5 text-center text-white transition-all duration-200 hover:from-green-700 hover:to-emerald-700">
                    Register
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes slideDownCentered {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </header>
  )
}

export default Navbar
