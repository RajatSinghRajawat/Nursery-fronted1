import { useEffect, useMemo, useState } from 'react'
import {
  HiOutlineArrowLeft,
  HiOutlineCheckBadge,
  HiOutlineChevronRight,
  HiOutlineMagnifyingGlassPlus,
  HiOutlineShieldCheck,
  HiOutlineShoppingBag,
  HiOutlineSparkles,
  HiOutlineStar,
  HiOutlineTruck,
} from 'react-icons/hi2'
import { useNavigate, useParams } from 'react-router-dom'
import { addCartItemByProductId } from '../utils/cart'
import { api } from '../utils/api'
import { getCurrentUser } from '../utils/userStore'

const keySpecs = [
  ['Plant Type', 'plantType'],
  ['Botanical Name', 'botanicalName'],
  ['Common Name', 'commonName'],
  ['Sunlight', 'sunlightRequirement'],
  ['Watering', 'wateringSchedule'],
  ['Soil Type', 'soilType'],
  ['Maintenance', 'maintenanceLevel'],
  ['Season', 'seasonalAvailability'],
]

const priceOf = (p) => {
  const price = Number(p?.price || 0)
  const discount = Number(p?.discount || 0)
  if (p?.discountType === 'percent') return Math.max(0, price - (price * discount) / 100)
  return Math.max(0, price - discount)
}

export default function SingleProduct() {
  const { productId } = useParams()
  const navigate = useNavigate()

  const [product, setProduct] = useState(null)
  const [related, setRelated] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [adding, setAdding] = useState(false)
  const [reviewSubmitting, setReviewSubmitting] = useState(false)
  const [reviewMessage, setReviewMessage] = useState('')
  const [quantity, setQuantity] = useState(1)
  const [selectedImage, setSelectedImage] = useState('')
  const [zooming, setZooming] = useState(false)
  const [zoomPos, setZoomPos] = useState({ x: 50, y: 50 })
  const [reviewForm, setReviewForm] = useState({ name: '', rating: '5', comment: '' })

  useEffect(() => {
    let cancelled = false
    setLoading(true)
    setError('')
    ;(async () => {
      try {
        const data = await api(`/products/${productId}`)
        if (cancelled) return
        setProduct(data)
        setQuantity(Math.max(1, Number(data?.minOrderQty || 1)))
        setSelectedImage(data?.mainImage || data?.image?.[0] || data?.additionalImages?.[0] || '')
      } catch (e) {
        if (!cancelled) setError(e.message || 'Unable to load product')
      } finally {
        if (!cancelled) setLoading(false)
      }
    })()
    return () => {
      cancelled = true
    }
  }, [productId])

  useEffect(() => {
    let cancelled = false
    if (!product?.categoryId?._id) {
      setRelated([])
      return
    }
    ;(async () => {
      try {
        const query = new URLSearchParams({
          categoryId: String(product.categoryId._id),
          active: 'true',
          limit: '12',
        })
        const data = await api(`/products?${query}`)
        if (cancelled) return
        setRelated((data.items || []).filter((x) => String(x._id) !== String(product._id)))
      } catch {
        if (!cancelled) setRelated([])
      }
    })()
    return () => {
      cancelled = true
    }
  }, [product?._id, product?.categoryId?._id])

  const images = useMemo(() => {
    const out = []
    const add = (url) => {
      const value = typeof url === 'string' ? url.trim() : ''
      if (value && !out.includes(value)) out.push(value)
    }
    add(product?.mainImage)
    ;(product?.additionalImages || []).forEach(add)
    ;(product?.lifestyleImages || []).forEach(add)
    ;(product?.image || []).forEach(add)
    return out
  }, [product])

  const unitPrice = useMemo(() => priceOf(product), [product])
  const mrp = Number(product?.mrp || 0)
  const discountPercent = mrp > unitPrice && mrp > 0 ? Math.round(((mrp - unitPrice) / mrp) * 100) : 0
  const rating = Number(product?.averageRating || 0)
  const reviews = Array.isArray(product?.reviews) ? product.reviews.slice().reverse().slice(0, 6) : []
  const reviewCount = Number(product?.reviewCount || reviews.length)
  const currentUser = getCurrentUser()

  useEffect(() => {
    const userId = String(currentUser?.id || '')
    const existing = (Array.isArray(product?.reviews) ? product.reviews : []).find(
      (r) => r?.userId && String(r.userId) === userId
    )
    if (existing) {
      setReviewForm({
        name: existing.name || currentUser?.fullName || '',
        rating: String(Math.max(1, Math.min(5, Number(existing.rating || 5)))),
        comment: existing.comment || '',
      })
      return
    }
    setReviewForm({
      name: currentUser?.fullName || '',
      rating: '5',
      comment: '',
    })
  }, [product?.reviews, currentUser?.id, currentUser?.fullName])

  const specs = useMemo(() => {
    if (!product) return []
    return keySpecs.map(([label, key]) => ({ label, value: String(product?.[key] || '').trim() })).filter((x) => x.value)
  }, [product])

  const highlights = useMemo(() => (Array.isArray(product?.highlights) ? product.highlights : []).filter(Boolean), [product?.highlights])

  const reviewDistribution = useMemo(() => {
    const source = Array.isArray(product?.reviews) ? product.reviews : []
    const total = source.length || 1
    return [5, 4, 3, 2, 1].map((star) => {
      const count = source.filter((r) => Number(r.rating || 0) === star).length
      return { star, count, width: `${Math.round((count / total) * 100)}%` }
    })
  }, [product?.reviews])

  const doAddToCart = async (qty, goToCart = true) => {
    if (!product?._id) return
    if (!getCurrentUser()) {
      navigate('/login')
      return
    }
    if (qty > Number(product.stock || 0)) {
      window.alert('Quantity is higher than current stock.')
      return
    }
    setAdding(true)
    const result = await addCartItemByProductId(product._id, qty)
    setAdding(false)
    if (!result.ok) {
      window.alert(result.message || 'Failed to add item')
      return
    }
    if (goToCart) navigate('/cart')
  }

  const submitReview = async (e) => {
    e.preventDefault()
    setReviewMessage('')
    if (!currentUser) {
      navigate('/login')
      return
    }
    const payload = {
      name: String(reviewForm.name || '').trim(),
      rating: Number(reviewForm.rating),
      comment: String(reviewForm.comment || '').trim(),
    }
    if (!payload.name || !payload.comment || !payload.rating) {
      setReviewMessage('Please fill name, rating and comment.')
      return
    }
    setReviewSubmitting(true)
    try {
      const updated = await api(`/products/${product._id}/reviews`, {
        method: 'POST',
        body: JSON.stringify(payload),
      })
      setProduct(updated)
      setReviewMessage('Review saved successfully.')
    } catch (err) {
      setReviewMessage(err.message || 'Unable to save review')
    } finally {
      setReviewSubmitting(false)
    }
  }

  if (loading) {
    return <div className="mx-auto max-w-[1400px] px-6 py-20 text-slate-600">Loading product...</div>
  }

  if (!product || error) {
    return (
      <div className="mx-auto max-w-[1400px] px-6 py-20">
        <button type="button" onClick={() => navigate('/products')} className="mb-4 inline-flex items-center gap-2 text-sm font-bold text-emerald-700">
          <HiOutlineArrowLeft className="h-4 w-4" />
          Back to products
        </button>
        <p className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
          {error || 'Product not found'}
        </p>
      </div>
    )
  }

  return (
    <div className="bg-[#f6f8f7] px-4 py-8 sm:px-6">
      <div className="mx-auto max-w-[1500px]">
        <div className="mb-5 flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
          <button type="button" onClick={() => navigate('/')} className="text-emerald-700">Home</button>
          <HiOutlineChevronRight className="h-3.5 w-3.5" />
          <button type="button" onClick={() => navigate('/products')} className="text-emerald-700">Products</button>
          <HiOutlineChevronRight className="h-3.5 w-3.5" />
          <span className="text-slate-700">{product.name}</span>
        </div>

        <section className="grid gap-6 rounded-[2rem] bg-white p-4 shadow-[0_22px_70px_rgba(15,23,42,0.08)] lg:grid-cols-[0.95fr_1.05fr] xl:grid-cols-[0.84fr_0.9fr_0.56fr] lg:p-6">
          <div className="min-w-0 grid gap-4 sm:grid-cols-[86px_1fr]">
            <div className="order-2 flex gap-2 overflow-x-auto pb-1 sm:order-1 sm:block sm:space-y-2">
              {images.map((img) => (
                <button
                  key={img}
                  type="button"
                  className={`h-20 w-20 shrink-0 overflow-hidden rounded-xl border ${selectedImage === img ? 'border-emerald-600' : 'border-emerald-100'}`}
                  onClick={() => setSelectedImage(img)}
                >
                  <img src={img} alt={product.name} className="h-full w-full object-cover" />
                </button>
              ))}
            </div>

            <div
              className="order-1 relative overflow-hidden rounded-2xl border border-emerald-100 bg-[#f8faf7] sm:order-2"
              onMouseEnter={() => setZooming(true)}
              onMouseLeave={() => setZooming(false)}
              onMouseMove={(e) => {
                const r = e.currentTarget.getBoundingClientRect()
                const x = ((e.clientX - r.left) / r.width) * 100
                const y = ((e.clientY - r.top) / r.height) * 100
                setZoomPos({ x: Math.max(0, Math.min(100, x)), y: Math.max(0, Math.min(100, y)) })
              }}
            >
              {selectedImage ? <img src={selectedImage} alt={product.name} className="h-[420px] w-full object-cover md:h-[520px]" /> : null}
              <div className="pointer-events-none absolute right-3 top-3 flex items-center gap-1 rounded-full border border-white/35 bg-black/35 px-2.5 py-1 text-[11px] font-semibold text-white">
                <HiOutlineMagnifyingGlassPlus className="h-3.5 w-3.5" />
                Magnifier
              </div>
            </div>
          </div>

          <div className="min-w-0">
            <button type="button" onClick={() => navigate(-1)} className="mb-3 inline-flex items-center gap-2 text-sm font-bold text-emerald-700">
              <HiOutlineArrowLeft className="h-4 w-4" />
              Back
            </button>
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-emerald-700">{product?.categoryId?.name || 'Nursery Product'}</p>
            <h1 className="mt-2 break-words text-3xl font-bold leading-tight text-slate-900 sm:text-4xl">{product.name}</h1>

            <div className="mt-3 flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <HiOutlineStar key={i} className={`h-5 w-5 ${i < Math.round(rating || 0) ? 'text-amber-400' : 'text-slate-300'}`} />
                ))}
              </div>
              <span className="text-sm font-bold text-slate-700">{rating ? rating.toFixed(1) : 'New'}</span>
              <span className="text-sm text-slate-500">{reviewCount} reviews</span>
            </div>

            <div className="mt-5 rounded-2xl border border-emerald-100 bg-[#f8faf7] p-4">
              <div className="flex flex-wrap items-end gap-2">
                {mrp > unitPrice ? <span className="text-lg text-slate-400 line-through">₹{mrp.toFixed(0)}</span> : null}
                <span className="text-4xl font-bold text-emerald-900">₹{unitPrice.toFixed(0)}</span>
                {discountPercent > 0 ? <span className="rounded-full bg-emerald-100 px-2.5 py-1 text-xs font-bold text-emerald-800">{discountPercent}% OFF</span> : null}
              </div>
              <div className="mt-2 flex flex-wrap gap-3 text-xs font-semibold uppercase tracking-[0.15em] text-slate-500">
                <span>Stock: {Number(product.stock || 0)}</span>
                <span>SKU: {product.sku || 'N/A'}</span>
                <span>GST: {Number(product.gstPercent || 0)}%</span>
              </div>
            </div>

            <p className="mt-5 break-words text-sm leading-7 text-slate-600">
              {product.shortDescription || product.description || 'Healthy nursery product with premium quality.'}
            </p>

            {highlights.length ? (
              <div className="mt-5 space-y-2">
                <p className="text-xs font-bold uppercase tracking-[0.22em] text-emerald-700">Highlights</p>
                {highlights.slice(0, 6).map((h, i) => (
                  <div key={`${h}-${i}`} className="flex items-start gap-2 text-sm text-slate-700">
                    <HiOutlineCheckBadge className="mt-0.5 h-4.5 w-4.5 text-emerald-600" />
                    <span className="break-words">{h}</span>
                  </div>
                ))}
              </div>
            ) : null}

            <div className="mt-6 grid gap-2 rounded-xl border border-emerald-100 bg-[#f8faf7] p-3 sm:grid-cols-3">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.12em] text-slate-600">
                <HiOutlineTruck className="h-4 w-4 text-emerald-700" />
                Fast dispatch
              </div>
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.12em] text-slate-600">
                <HiOutlineShieldCheck className="h-4 w-4 text-emerald-700" />
                Secure payment
              </div>
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.12em] text-slate-600">
                <HiOutlineSparkles className="h-4 w-4 text-emerald-700" />
                Healthy stock
              </div>
            </div>
          </div>

          <aside className="h-fit rounded-2xl border border-emerald-100 bg-[#f8faf7] p-4 lg:col-span-2 xl:col-span-1 lg:sticky lg:top-24">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-emerald-700">Buy Box</p>
            <p className="mt-3 text-3xl font-bold text-emerald-900">₹{unitPrice.toFixed(0)}</p>
            {mrp > unitPrice ? <p className="mt-1 text-sm text-slate-400 line-through">M.R.P ₹{mrp.toFixed(0)}</p> : null}
            <p className="mt-3 break-words text-sm text-slate-600">Free delivery for selected locations. Dispatch in 1-2 days.</p>

            <div className="mt-4 inline-flex items-center rounded-full border border-emerald-200 bg-white">
              <button type="button" className="px-4 py-2 text-lg font-bold text-emerald-900" onClick={() => setQuantity((q) => Math.max(1, q - 1))}>-</button>
              <span className="min-w-[48px] text-center text-sm font-bold text-emerald-950">{quantity}</span>
              <button type="button" className="px-4 py-2 text-lg font-bold text-emerald-900" onClick={() => setQuantity((q) => Math.min(Number(product.stock || 1), q + 1))}>+</button>
            </div>

            <button
              type="button"
              onClick={() => doAddToCart(quantity, false)}
              disabled={adding || Number(product.stock || 0) <= 0}
              className="mt-4 inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-emerald-950 px-5 text-sm font-bold text-white disabled:cursor-not-allowed disabled:bg-slate-300"
            >
              <HiOutlineShoppingBag className="h-4 w-4" />
              {adding ? 'Adding...' : 'Add to cart'}
            </button>
            <button
              type="button"
              onClick={() => doAddToCart(quantity, true)}
              disabled={adding || Number(product.stock || 0) <= 0}
              className="mt-2 inline-flex h-12 w-full items-center justify-center rounded-full border border-emerald-300 bg-white px-5 text-sm font-bold text-emerald-900 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Buy now
            </button>
            <button type="button" onClick={() => navigate('/products')} className="mt-2 inline-flex h-12 w-full items-center justify-center rounded-full border border-emerald-200 px-5 text-sm font-bold text-emerald-900">
              Continue shopping
            </button>
          </aside>
        </section>

        <section className="mt-8 grid gap-6 lg:grid-cols-2">
          <article className="rounded-2xl border border-emerald-100 bg-white p-5 shadow-sm">
            <h2 className="text-lg font-bold text-slate-900">Product Description</h2>
            <p className="mt-3 break-words text-sm leading-7 text-slate-600">
              {product.detailedDescription || product.description || product.shortDescription || 'No description available.'}
            </p>
          </article>
          <article className="rounded-2xl border border-emerald-100 bg-white p-5 shadow-sm">
            <h2 className="text-lg font-bold text-slate-900">Specifications</h2>
            <div className="mt-3 grid gap-2">
              {specs.length ? (
                specs.map((s) => (
                  <div key={s.label} className="flex items-start justify-between gap-3 rounded-lg bg-[#f8faf7] px-3 py-2 text-sm">
                    <span className="font-semibold text-slate-500">{s.label}</span>
                    <span className="break-words text-right font-semibold text-slate-800">{s.value}</span>
                  </div>
                ))
              ) : (
                <p className="text-sm text-slate-500">Specifications not available.</p>
              )}
            </div>
          </article>
        </section>

        <section className="mt-8 grid gap-6 lg:grid-cols-[0.42fr_0.58fr]">
          <article className="rounded-2xl border border-emerald-100 bg-white p-5 shadow-sm">
            <h2 className="text-lg font-bold text-slate-900">Ratings Breakdown</h2>
            <div className="mt-4 flex items-end gap-2">
              <span className="text-4xl font-bold text-emerald-950">{rating ? rating.toFixed(1) : '0.0'}</span>
              <span className="pb-1 text-sm font-semibold text-slate-500">out of 5</span>
            </div>
            <div className="mt-4 space-y-2.5">
              {reviewDistribution.map((r) => (
                <div key={r.star} className="grid grid-cols-[34px_1fr_28px] items-center gap-2 text-sm">
                  <span className="font-semibold text-slate-600">{r.star}★</span>
                  <div className="h-2 rounded-full bg-slate-100">
                    <div className="h-full rounded-full bg-emerald-600" style={{ width: r.width }} />
                  </div>
                  <span className="text-right text-slate-500">{r.count}</span>
                </div>
              ))}
            </div>
          </article>
          <article className="rounded-2xl border border-emerald-100 bg-white p-5 shadow-sm">
            <h2 className="text-lg font-bold text-slate-900">Customer Reviews</h2>
            <form className="mt-4 grid gap-2 rounded-xl border border-emerald-100 bg-[#f8faf7] p-3" onSubmit={submitReview}>
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-emerald-700">Add / Update Your Review</p>
              <div className="grid gap-2 sm:grid-cols-2">
                <input
                  className="rounded-lg border border-emerald-200 bg-white px-3 py-2 text-sm text-slate-700"
                  placeholder="Your name"
                  value={reviewForm.name}
                  onChange={(e) => setReviewForm((s) => ({ ...s, name: e.target.value }))}
                />
                <select
                  className="rounded-lg border border-emerald-200 bg-white px-3 py-2 text-sm text-slate-700"
                  value={reviewForm.rating}
                  onChange={(e) => setReviewForm((s) => ({ ...s, rating: e.target.value }))}
                >
                  <option value="5">5 Stars</option>
                  <option value="4">4 Stars</option>
                  <option value="3">3 Stars</option>
                  <option value="2">2 Stars</option>
                  <option value="1">1 Star</option>
                </select>
              </div>
              <textarea
                className="min-h-[88px] rounded-lg border border-emerald-200 bg-white px-3 py-2 text-sm text-slate-700"
                placeholder="Write your review"
                value={reviewForm.comment}
                onChange={(e) => setReviewForm((s) => ({ ...s, comment: e.target.value }))}
              />
              {reviewMessage ? <p className="text-xs font-semibold text-emerald-700">{reviewMessage}</p> : null}
              <button
                type="submit"
                disabled={reviewSubmitting}
                className="inline-flex h-10 w-fit items-center justify-center rounded-full bg-emerald-950 px-5 text-xs font-bold text-white disabled:opacity-60"
              >
                {reviewSubmitting ? 'Saving...' : 'Save Review'}
              </button>
            </form>
            <div className="mt-4 space-y-3">
              {reviews.length ? (
                reviews.map((review) => (
                  <div key={review._id || `${review.name}-${review.createdAt}`} className="rounded-xl border border-emerald-100 bg-[#f8faf7] p-3">
                    <div className="flex items-center justify-between gap-2">
                      <p className="text-sm font-bold text-slate-800">{review.name || 'Customer'}</p>
                      <div className="flex items-center gap-1">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <HiOutlineStar key={i} className={`h-4 w-4 ${i < Number(review.rating || 0) ? 'text-amber-400' : 'text-slate-300'}`} />
                        ))}
                      </div>
                    </div>
                    <p className="mt-1.5 break-words text-sm leading-6 text-slate-600">{review.comment || review.review || ''}</p>
                  </div>
                ))
              ) : (
                <p className="text-sm text-slate-500">No reviews yet.</p>
              )}
            </div>
          </article>
        </section>

        <section className="mt-8 rounded-2xl border border-emerald-100 bg-white p-5 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-xl font-bold text-slate-900">Related Products</h2>
            <button type="button" onClick={() => navigate('/products')} className="text-sm font-bold text-emerald-700">View all</button>
          </div>
          <div className="flex gap-4 overflow-x-auto pb-2">
            {related.slice(0, 10).map((item) => {
              const p = priceOf(item)
              const m = Number(item?.mrp || 0)
              return (
                <article key={item._id} className="w-[240px] shrink-0 overflow-hidden rounded-xl border border-emerald-100 bg-[#f8faf7]">
                  <img src={item.mainImage || item.image?.[0] || ''} alt={item.name} className="h-40 w-full cursor-pointer object-cover" onClick={() => navigate(`/product/${item._id}`)} />
                  <div className="p-3">
                    <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-emerald-700">{item.categoryId?.name || 'Plant'}</p>
                    <h3 className="mt-1 line-clamp-2 cursor-pointer text-sm font-bold text-slate-900" onClick={() => navigate(`/product/${item._id}`)}>{item.name}</h3>
                    <div className="mt-1 flex items-baseline gap-2">
                      {m > p ? <span className="text-xs text-slate-400 line-through">₹{m}</span> : null}
                      <span className="text-base font-bold text-emerald-900">₹{p}</span>
                    </div>
                    <button
                      type="button"
                      onClick={async () => {
                        if (!getCurrentUser()) {
                          navigate('/login')
                          return
                        }
                        const result = await addCartItemByProductId(item._id, 1)
                        if (!result.ok) {
                          window.alert(result.message || 'Failed to add to cart')
                          return
                        }
                        navigate('/cart')
                      }}
                      className="mt-2 inline-flex h-9 w-full items-center justify-center rounded-full bg-emerald-950 px-3 text-xs font-bold text-white"
                    >
                      Add to cart
                    </button>
                  </div>
                </article>
              )
            })}
          </div>
          {!related.length ? <p className="text-sm text-slate-500">No related products found.</p> : null}
        </section>

        {selectedImage && zooming ? (
          <div className="pointer-events-none fixed bottom-4 right-4 z-40 hidden h-64 w-64 overflow-hidden rounded-2xl border border-emerald-200 bg-white shadow-xl xl:block">
            <img
              src={selectedImage}
              alt={product.name}
              className="h-full w-full object-cover"
              style={{
                transform: `scale(2.2)`,
                transformOrigin: `${zoomPos.x}% ${zoomPos.y}%`,
              }}
            />
          </div>
        ) : null}
      </div>
    </div>
  )
}
