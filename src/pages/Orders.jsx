import { useEffect, useMemo, useState } from 'react'
import { HiOutlineShoppingBag } from 'react-icons/hi2'
import { useNavigate } from 'react-router-dom'
import { api } from '../utils/api'
import { getCurrentUser } from '../utils/userStore'

function formatMoney(n) {
  const value = Number(n || 0)
  return value.toFixed(0)
}

function statusStyles(status) {
  const s = String(status || '').toLowerCase()
  if (s.includes('processing')) return 'bg-emerald-50 text-emerald-700 border-emerald-200'
  if (s.includes('shipped')) return 'bg-blue-50 text-blue-700 border-blue-200'
  if (s.includes('delivered')) return 'bg-emerald-100 text-emerald-900 border-emerald-300'
  if (s.includes('cancel')) return 'bg-red-50 text-red-700 border-red-200'
  return 'bg-slate-50 text-slate-700 border-slate-200'
}

function Orders() {
  const navigate = useNavigate()
  const currentUser = getCurrentUser()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [orders, setOrders] = useState([])

  useEffect(() => {
    let cancelled = false
    ;(async () => {
      try {
        const data = await api('/orders')
        if (cancelled) return
        setOrders(data?.items || [])
      } catch (e) {
        if (cancelled) return
        setError(e.message || 'Failed to load orders')
        setOrders([])
      } finally {
        if (!cancelled) setLoading(false)
      }
    })()

    return () => {
      cancelled = true
    }
  }, [])

  const hasOrders = useMemo(() => orders.length > 0, [orders.length])

  if (!currentUser) {
    return (
      <div className="min-h-screen bg-white px-6 py-24">
        <div className="mx-auto max-w-[900px] rounded-[2.5rem] bg-[#f8faf7] p-10 text-center shadow-sm">
          <p className="text-sm font-bold uppercase tracking-[0.24em] text-emerald-700">Orders</p>
          <h1 className="mt-4 text-4xl font-bold text-emerald-950 sm:text-5xl">Please login first</h1>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-slate-600 sm:text-lg">
            Login to view your order history.
          </p>
          <div className="mt-8 flex justify-center">
            <button
              type="button"
              onClick={() => navigate('/login')}
              className="inline-flex h-14 items-center justify-center rounded-full bg-emerald-950 px-8 text-sm font-bold text-white transition hover:bg-emerald-800"
            >
              Login
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      <section className="relative overflow-hidden px-6 py-24 text-white">
        <div className="absolute inset-0 bg-gradient-to-br from-[#103d2a] via-[#1f6a47] to-[#b7d66d]" />
        <div
          className="absolute inset-0 opacity-80"
          style={{ backgroundImage: 'linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0) 46%)' }}
        />

        <div className="relative mx-auto max-w-[1400px]">
          <p className="text-sm font-bold uppercase tracking-[0.28em] text-emerald-100/85">My Orders</p>
          <h1 className="mt-5 max-w-4xl text-5xl font-bold leading-tight md:text-6xl">Your purchases & delivery status</h1>
          <p className="mt-6 max-w-2xl text-base leading-8 text-white/82 sm:text-lg">
            After checkout your order appears as Processing. We update status when it ships.
          </p>
        </div>
      </section>

      <section className="bg-[#f8faf7] px-6 py-12">
        <div className="mx-auto max-w-[1400px]">
          {error ? <p className="mb-5 rounded-xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">{error}</p> : null}
          {loading ? (
            <p className="text-slate-600">Loading orders…</p>
          ) : !hasOrders ? (
            <div className="rounded-[2.5rem] bg-white p-10 text-center shadow-sm">
              <HiOutlineShoppingBag className="mx-auto h-14 w-14 text-emerald-700" />
              <h2 className="mt-5 text-3xl font-bold text-emerald-950">No orders yet</h2>
              <p className="mx-auto mt-3 max-w-2xl text-base leading-8 text-slate-600">
                Add items to your cart and checkout to place an order.
              </p>
              <button
                type="button"
                onClick={() => navigate('/products')}
                className="mt-8 inline-flex h-14 items-center justify-center rounded-full bg-emerald-950 px-8 text-sm font-bold text-white transition hover:bg-emerald-800"
              >
                Browse products
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              {orders.map((order, idx) => {
                const createdAt = order?.createdAt ? new Date(order.createdAt) : null
                const dateLabel = createdAt && !Number.isNaN(createdAt.getTime()) ? createdAt.toLocaleDateString() : ''
                return (
                  <article key={order?._id || idx} className="rounded-[2.5rem] bg-white p-6 shadow-sm sm:p-8">
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                      <div>
                        <div className="flex flex-wrap items-center gap-3">
                          <p className="text-sm font-bold uppercase tracking-[0.22em] text-emerald-700">Order</p>
                          <p className="text-sm font-semibold text-slate-700">{order?._id ? String(order._id).slice(-8) : ''}</p>
                          {dateLabel ? <span className="text-sm text-slate-500">• {dateLabel}</span> : null}
                        </div>
                        <h2 className="mt-2 text-2xl font-bold text-emerald-950">Total: ₹{formatMoney(order?.totalPrice)}</h2>
                      </div>

                      <div className="flex items-center gap-3">
                        <span
                          className={`inline-flex items-center rounded-full border px-4 py-2 text-xs font-bold ${statusStyles(order?.orderStatus)}`}
                        >
                          {order?.orderStatus || 'Processing'}
                        </span>
                      </div>
                    </div>

                    <div className="mt-6 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
                      <div className="space-y-4">
                        {(order?.orderItems || []).map((item, idx) => (
                          <div key={item?.product || `${item?.name || 'item'}-${idx}`} className="flex items-start gap-4 rounded-[1.5rem] bg-[#f8faf7] p-4">
                            {item?.image ? (
                              <img
                                src={item.image}
                                alt={item.name}
                                className="h-16 w-16 flex-none rounded-2xl object-cover"
                              />
                            ) : (
                              <div className="h-16 w-16 flex-none rounded-2xl bg-white border border-emerald-100" />
                            )}
                            <div className="min-w-0 flex-1">
                              <p className="truncate text-sm font-bold text-slate-900">{item?.name || 'Product'}</p>
                              <p className="mt-1 text-sm text-slate-600">
                                Qty: {item?.quantity || 1} • ₹{formatMoney(item?.price)}
                              </p>
                            </div>
                            <p className="text-sm font-bold text-emerald-900">₹{formatMoney((item?.price || 0) * (item?.quantity || 0))}</p>
                          </div>
                        ))}
                      </div>

                      <div className="rounded-[1.5rem] border border-emerald-100 bg-[#f8faf7] p-5">
                        <p className="text-sm font-bold uppercase tracking-[0.22em] text-emerald-700">Shipping</p>
                        <p className="mt-3 text-sm font-semibold text-slate-800">{order?.shippingInfo?.address || '—'}</p>
                        <p className="mt-1 text-sm text-slate-600">
                          {order?.shippingInfo?.city || '—'}, {order?.shippingInfo?.state || '—'} {order?.shippingInfo?.country || ''}
                        </p>
                        {order?.shippingInfo?.pincode != null ? (
                          <p className="mt-1 text-sm text-slate-600">Pincode: {order.shippingInfo.pincode}</p>
                        ) : null}
                        {order?.shippingInfo?.phoneNo != null ? (
                          <p className="mt-1 text-sm text-slate-600">Phone: {order.shippingInfo.phoneNo}</p>
                        ) : null}
                      </div>
                    </div>
                  </article>
                )
              })}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}

export default Orders

