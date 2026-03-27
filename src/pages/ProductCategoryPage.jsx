import { useEffect, useMemo, useState } from 'react'
import { HiOutlineArrowRight, HiOutlineCheckBadge, HiOutlineSparkles } from 'react-icons/hi2'
import { useNavigate } from 'react-router-dom'
import { addCartItemByProductId } from '../utils/cart'
import { getCurrentUser } from '../utils/userStore'
import { api } from '../utils/api'

const iconBadgeClass = {
  Leaf: 'from-emerald-500 to-lime-400',
  Tree: 'from-emerald-700 to-green-500',
  Tools: 'from-amber-500 to-orange-400',
  Pot: 'from-stone-500 to-orange-300',
  Seed: 'from-lime-500 to-emerald-400',
  Care: 'from-teal-500 to-emerald-400',
}

function ProductCategoryPage({ category }) {
  const navigate = useNavigate()
  const [apiProducts, setApiProducts] = useState([])
  const [catData, setCatData] = useState(null)
  const [selectedSubcategoryName, setSelectedSubcategoryName] = useState('')

  useEffect(() => {
    let cancelled = false
    setCatData(null)
    setSelectedSubcategoryName('')
    setApiProducts([])

    ;(async () => {
      try {
        const cat = await api(`/categories/slug/${encodeURIComponent(category.slug)}`)
        if (cancelled) return

        setCatData(cat)
      } catch {
        if (!cancelled) {
          setCatData(null)
          setApiProducts([])
        }
      }
    })()
    return () => {
      cancelled = true
    }
  }, [category.slug])

  useEffect(() => {
    let cancelled = false
    if (!catData?._id) return

    ;(async () => {
      try {
        const q = new URLSearchParams({
          limit: '24',
          active: 'true',
          categoryId: String(catData._id),
        })
        const data = await api(`/products?${q}`)
        if (!cancelled) setApiProducts(data.items || [])
      } catch {
        if (!cancelled) setApiProducts([])
      }
    })()

    return () => {
      cancelled = true
    }
  }, [catData?._id])

  const subcategories = useMemo(() => {
    const list = catData?.subcategories || []
    return Array.isArray(list) ? list : []
  }, [catData])

  const filteredProducts = useMemo(() => {
    if (!selectedSubcategoryName) return apiProducts
    const target = String(selectedSubcategoryName).toLowerCase().trim()
    if (!target) return apiProducts

    return apiProducts.filter((p) => {
      const raw = p?.subcategoriesText
      if (!raw) return false
      const list = Array.isArray(raw)
        ? raw
        : typeof raw === 'string'
          ? raw.split(/\r?\n|,/g)
          : []
      const normalized = list.map((n) => String(n).trim().toLowerCase())
      return normalized.includes(target)
    })
  }, [apiProducts, selectedSubcategoryName])

  const heroImage = catData?.coverImages?.[0] || catData?.coverImage || category?.heroImage

  const iconKey = catData?.iconKey || category?.icon
  const iconKeyNormalized = typeof iconKey === 'string' ? iconKey.trim() : ''
  const iconBadge = iconKeyNormalized
    ? iconBadgeClass[iconKeyNormalized.charAt(0).toUpperCase() + iconKeyNormalized.slice(1)] ||
      iconBadgeClass[iconKeyNormalized]
    : null

  const stats = useMemo(() => {
    const subCount = subcategories.length
    const prodCount = filteredProducts.length
    return [
      { label: 'Subcategories', value: String(subCount) },
      { label: 'Products', value: String(prodCount) },
      {
        label: 'Segment',
        value: catData?.plantSegment ? String(catData.plantSegment) : 'All',
      },
    ]
  }, [filteredProducts.length, subcategories.length, catData?.plantSegment])

  const featuredList = useMemo(() => {
    // Backend-driven: show actual products. (If none, list empty.)
    return filteredProducts.map((p) => {
      const price = Number(p.price || 0)
      const disc = Number(p.discount || 0)
      const unit =
        p.discountType === 'percent'
          ? Math.max(0, price - (price * disc) / 100)
          : Math.max(0, price - disc)
      const mrp = Number(p.mrp || 0)
      return {
        _id: p._id,
        name: p.name,
        subtitle: p.shortDescription ? String(p.shortDescription).slice(0, 100) : '',
        price: `₹${unit}`,
        mrpLabel: mrp > unit ? `₹${mrp}` : '',
        image: p.mainImage || p.image?.[0] || '',
      }
    })
  }, [filteredProducts])

  const handleAddToCart = async (item) => {
    if (!getCurrentUser()) {
      navigate('/login')
      return
    }

    if (item._id) {
      const result = await addCartItemByProductId(item._id, 1)
      if (!result.ok) {
        window.alert(result.message)
        return
      }
      navigate('/cart')
      return
    }

    window.alert('Connect the catalogue: add products for this category in the admin panel.')
  }

  return (
    <div className="min-h-screen bg-white">
      <section className="relative overflow-hidden px-6 py-28 text-white">
        <div className="absolute inset-0">
          {heroImage ? (
            <img src={heroImage} alt={catData?.name || category?.name} className="h-full w-full object-cover" />
          ) : null}
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-950/90 via-emerald-900/82 to-emerald-700/45" />
        <div className="absolute inset-0 opacity-60" style={{ backgroundImage: 'linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0) 44%)' }} />

        <div className="relative mx-auto grid max-w-[1400px] gap-10 py-16 lg:grid-cols-[1fr_320px] lg:items-end">
          <div className="max-w-4xl">
            <p className="mb-5 text-sm font-bold uppercase tracking-[0.28em] text-emerald-100/85">
              {catData?.kind
                ? `${catData.kind}${catData?.plantSegment ? ` · ${catData.plantSegment}` : ''}`
                : category?.eyebrow}
            </p>
            <h1 className="text-5xl font-bold leading-tight md:text-6xl xl:text-7xl">{catData?.name || category?.name}</h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-white/82 sm:text-lg">
              {catData?.description || category?.description}
            </p>
          </div>

          <div className="grid gap-4 rounded-[2rem] border border-white/15 bg-white/10 p-5 backdrop-blur-md">
            {stats.map((stat) => (
              <div key={stat.label} className="rounded-[1.5rem] border border-white/10 bg-black/10 px-5 py-4">
                <p className="text-xs font-bold uppercase tracking-[0.24em] text-emerald-100/80">{stat.label}</p>
                <p className="mt-2 text-3xl font-bold text-white">{stat.value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white px-6 py-24">
        <div className="mx-auto grid max-w-[1400px] gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div>
            <div className="mb-4 flex items-center gap-3">
              <span className="h-[2px] w-12 bg-emerald-600" />
              <span className="text-sm font-bold uppercase tracking-[0.2em] text-emerald-700">Overview</span>
            </div>
            <h2 className="text-5xl font-bold leading-[1.1] text-emerald-950 md:text-6xl">
              Built For Better <span className="text-emerald-600">{catData?.name || category?.name}</span>
            </h2>
            <p className="mt-6 text-lg leading-8 text-slate-600">{catData?.description || category?.intro}</p>
          </div>

          <div className="rounded-[2.5rem] border border-emerald-100 bg-[#f8faf7] p-8 shadow-sm">
            <div
              className={`inline-flex h-16 w-16 items-center justify-center rounded-[1.4rem] bg-gradient-to-br ${
                iconBadge || 'from-emerald-500 to-lime-400'
              } text-2xl font-bold text-white shadow-lg`}
            >
              {(catData?.name || category?.name || 'C').charAt(0)}
            </div>
            <h3 className="mt-6 text-3xl font-bold text-emerald-950">What You Will Find</h3>
            <div className="mt-6 space-y-3">
              {subcategories.map((item, idx) => (
                <a
                  key={item._id || item.Id || item.name || idx}
                  href={`#${item.Id || item.name || idx}`}
                  className="flex items-center justify-between rounded-[1.25rem] border border-emerald-100 bg-white px-5 py-4 text-sm font-semibold text-slate-700 transition hover:border-emerald-300 hover:text-emerald-700"
                  onClick={(e) => {
                    if (!item?.name) return
                    e.preventDefault()
                    setSelectedSubcategoryName(String(item.name))
                    const elId = `${item.Id || item.name || idx}`
                    window.requestAnimationFrame(() =>
                      document.getElementById(elId)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
                    )
                  }}
                >
                  <span>{item.name}</span>
                  <HiOutlineArrowRight className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#f8faf7] px-6 py-24">
        <div className="mx-auto max-w-[1400px]">
          <div className="mb-14 max-w-2xl">
            <div className="mb-4 flex items-center gap-3">
              <span className="h-[2px] w-12 bg-emerald-600" />
              <span className="text-sm font-bold uppercase tracking-[0.2em] text-emerald-700">Explore Sections</span>
            </div>
            <h2 className="text-5xl font-bold leading-[1.1] text-emerald-950 md:text-6xl">
              Everything Inside <span className="text-emerald-600">{catData?.name || category?.name}</span>
            </h2>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            {subcategories.map((item, index) => (
              <article
                key={item._id || item.Id || item.name || index}
                id={`${item.Id || item.name || index}`}
                className="rounded-[2rem] border border-emerald-100 bg-white p-8 shadow-sm"
              >
                <div className="flex items-center gap-4">
                  <div className="grid h-14 w-14 place-items-center rounded-[1.2rem] bg-emerald-100 text-lg font-bold text-emerald-900">
                    {String(index + 1).padStart(2, '0')}
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.24em] text-emerald-700">Category Detail</p>
                    <h3 className="mt-2 text-2xl font-bold text-emerald-950">{item.name}</h3>
                  </div>
                </div>
                <p className="mt-5 text-sm leading-7 text-slate-600">
                  Premium nursery stock and curated picks for {item.name.toLowerCase()}, selected to match plant quality, styling, and everyday use.
                </p>
                <div className="mt-6 flex items-center gap-3 text-sm font-semibold text-emerald-700">
                  <HiOutlineCheckBadge className="h-5 w-5" />
                  Healthy stock and practical guidance available
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white px-6 py-24">
        <div className="mx-auto max-w-[1400px]">
          <div className="mb-14 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl">
              <div className="mb-4 flex items-center gap-3">
                <span className="h-[2px] w-12 bg-emerald-600" />
                <span className="text-sm font-bold uppercase tracking-[0.2em] text-emerald-700">Featured Picks</span>
              </div>
              <h2 className="text-5xl font-bold leading-[1.1] text-emerald-950 md:text-6xl">
                Best Picks In <span className="text-emerald-600">{catData?.name || category?.name}</span>
              </h2>
            </div>
            <a href="/products" className="inline-flex items-center gap-2 rounded-full border border-emerald-200 px-6 py-3 text-sm font-bold text-emerald-900 transition hover:border-emerald-600 hover:bg-emerald-50">
              Explore More Categories
              <HiOutlineArrowRight className="h-5 w-5" />
            </a>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 xl:grid-cols-4">
            {featuredList.map((item) => (
              <article
                key={item._id || item.name}
                className="overflow-hidden rounded-[2rem] border border-emerald-100 bg-[#f8faf7] shadow-sm transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_24px_60px_rgba(15,23,42,0.12)]"
              >
                <div className="aspect-[4/4.5] overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.name}
                    onClick={() => (item._id ? navigate(`/product/${item._id}`) : handleAddToCart(item))}
                    className="h-full w-full cursor-pointer object-cover transition-transform duration-700 hover:scale-105"
                  />
                </div>
                <div className="p-6">
                  <div className="mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.22em] text-emerald-700">
                    <HiOutlineSparkles className="h-4 w-4" />
                    In stock
                  </div>
                  <h3 className="cursor-pointer text-2xl font-bold text-emerald-950" onClick={() => (item._id ? navigate(`/product/${item._id}`) : handleAddToCart(item))}>{item.name}</h3>
                  {item.subtitle ? (
                    <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-slate-500">{item.subtitle}</p>
                  ) : null}
                  <div className="mt-2 flex flex-wrap items-baseline gap-2">
                    {item.mrpLabel ? (
                      <span className="text-sm font-semibold text-slate-400 line-through">{item.mrpLabel}</span>
                    ) : null}
                    <span className="text-sm font-bold text-emerald-800">{item.price}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => (item._id ? navigate(`/product/${item._id}`) : handleAddToCart(item))}
                    className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-emerald-950 px-5 py-3 text-sm font-bold text-white transition hover:bg-emerald-800"
                  >
                    View Product
                    <HiOutlineArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default ProductCategoryPage
