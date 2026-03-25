import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { HiOutlineMinus, HiOutlinePlus, HiOutlineShoppingBag, HiOutlineTicket } from 'react-icons/hi2'
import { getCurrentUser } from '../utils/userStore'
import { fetchCart, updateCartItemQuantity, placeOrder } from '../utils/cart'

const emptyShipping = {
  address: '',
  city: '',
  state: '',
  country: 'India',
  pincode: '',
  phoneNo: '',
}

function Cart() {
  const navigate = useNavigate()
  const [items, setItems] = useState([])
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(true)
  const [orderMsg, setOrderMsg] = useState('')
  const [shipping, setShipping] = useState(emptyShipping)
  const [checkoutOpen, setCheckoutOpen] = useState(false)
  const [ordering, setOrdering] = useState(false)
  const currentUser = getCurrentUser()

  const load = async () => {
    if (!getCurrentUser()) return
    setLoading(true)
    try {
      const { lines, total: t } = await fetchCart()
      setItems(lines)
      setTotal(t)
    } catch {
      setItems([])
      setTotal(0)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    load()
    const onChange = () => load()
    window.addEventListener('cartchange', onChange)
    window.addEventListener('authchange', onChange)
    return () => {
      window.removeEventListener('cartchange', onChange)
      window.removeEventListener('authchange', onChange)
    }
  }, [])

  const onQty = async (productId, quantity) => {
    await updateCartItemQuantity(productId, quantity)
    await load()
  }

  const submitOrder = async (e) => {
    e.preventDefault()
    setOrderMsg('')
    setOrdering(true)
    try {
      await placeOrder({
        address: shipping.address.trim(),
        city: shipping.city.trim(),
        state: shipping.state.trim(),
        country: shipping.country.trim(),
        pincode: Number(shipping.pincode),
        phoneNo: Number(String(shipping.phoneNo).replace(/\D/g, '').slice(0, 15)),
      })
      setShipping(emptyShipping)
      setCheckoutOpen(false)
      setOrderMsg('Order placed successfully. Thank you!')
      await load()
    } catch (err) {
      setOrderMsg(err.message || 'Could not place order.')
    } finally {
      setOrdering(false)
    }
  }

  if (!currentUser) {
    return (
      <div className="min-h-screen bg-white px-6 py-24">
        <div className="mx-auto max-w-[900px] rounded-[2.5rem] bg-[#f8faf7] p-10 text-center shadow-sm">
          <p className="text-sm font-bold uppercase tracking-[0.24em] text-emerald-700">Cart</p>
          <h1 className="mt-4 text-4xl font-bold text-emerald-950 sm:text-5xl">Please login to view your cart</h1>
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
        <div className="absolute inset-0 opacity-80" style={{ backgroundImage: 'linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0) 46%)' }} />

        <div className="relative mx-auto max-w-[1400px]">
          <p className="text-sm font-bold uppercase tracking-[0.28em] text-emerald-100/85">My Cart</p>
          <h1 className="mt-5 max-w-4xl text-5xl font-bold leading-tight md:text-6xl">
            Plants You Want To Buy
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-8 text-white/82 sm:text-lg">
            Review selected plants, update quantity, and place your order securely.
          </p>
        </div>
      </section>

      <section className="bg-[#f8faf7] px-6 py-24">
        <div className="mx-auto grid max-w-[1400px] gap-10 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="space-y-6">
            {loading ? (
              <p className="text-center text-slate-600">Loading cart…</p>
            ) : items.length === 0 ? (
              <div className="rounded-[2.5rem] bg-white p-10 text-center shadow-sm">
                <HiOutlineShoppingBag className="mx-auto h-14 w-14 text-emerald-700" />
                <h2 className="mt-5 text-3xl font-bold text-emerald-950">Your cart is empty</h2>
                <button
                  type="button"
                  onClick={() => navigate('/')}
                  className="mt-8 inline-flex h-14 items-center justify-center rounded-full bg-emerald-950 px-8 text-sm font-bold text-white transition hover:bg-emerald-800"
                >
                  Continue Shopping
                </button>
              </div>
            ) : (
              items.map((item) => (
                <article key={item.id} className="rounded-[2.25rem] bg-white p-6 shadow-sm sm:p-8">
                  <div className="flex flex-col gap-6 sm:flex-row">
                    <img src={item.image} alt={item.name} className="h-40 w-full rounded-[1.5rem] object-cover sm:w-40" />
                    <div className="flex-1">
                      <div className="flex flex-wrap items-start justify-between gap-4">
                        <div>
                          <p className="text-sm font-bold uppercase tracking-[0.22em] text-emerald-700">
                            {item.category || 'Plant'}
                          </p>
                          <h2 className="mt-2 text-2xl font-bold text-emerald-950">{item.name}</h2>
                        </div>
                        <p className="text-2xl font-bold text-emerald-900">₹{item.price}</p>
                      </div>
                      <div className="mt-6 flex items-center gap-3">
                        <button
                          type="button"
                          onClick={() => onQty(item.id, item.quantity - 1)}
                          className="flex h-11 w-11 items-center justify-center rounded-full bg-emerald-50 text-emerald-900 transition hover:bg-emerald-100"
                        >
                          <HiOutlineMinus className="h-5 w-5" />
                        </button>
                        <span className="min-w-[48px] text-center text-lg font-bold text-emerald-950">{item.quantity}</span>
                        <button
                          type="button"
                          onClick={() => onQty(item.id, item.quantity + 1)}
                          className="flex h-11 w-11 items-center justify-center rounded-full bg-emerald-50 text-emerald-900 transition hover:bg-emerald-100"
                        >
                          <HiOutlinePlus className="h-5 w-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </article>
              ))
            )}
          </div>

          <div className="rounded-[2.5rem] bg-emerald-950 p-8 text-white shadow-[0_24px_80px_rgba(15,23,42,0.16)] sm:p-10">
            <p className="text-sm font-bold uppercase tracking-[0.24em] text-emerald-100/80">Order Summary</p>
            <h2 className="mt-4 text-4xl font-bold">Ready To Buy</h2>

            <div className="mt-8 space-y-4 rounded-[2rem] bg-white/10 p-6 backdrop-blur-md">
              <div className="flex items-center justify-between text-sm text-emerald-100/80">
                <span>Total Items</span>
                <span>{items.reduce((sum, item) => sum + item.quantity, 0)}</span>
              </div>
              <div className="flex items-center justify-between text-sm text-emerald-100/80">
                <span>Reward Points</span>
                <span>{items.reduce((sum, item) => sum + item.quantity * 25, 0)}</span>
              </div>
              <div className="flex items-center justify-between border-t border-white/10 pt-4 text-lg font-bold text-white">
                <span>Total</span>
                <span>₹{total}</span>
              </div>
            </div>

            {orderMsg ? (
              <p className="mt-4 rounded-2xl bg-white/10 px-4 py-3 text-sm font-medium text-emerald-100">{orderMsg}</p>
            ) : null}

            {checkoutOpen ? (
              <form className="mt-6 space-y-3 rounded-[2rem] bg-white/10 p-6 backdrop-blur-md" onSubmit={submitOrder}>
                <p className="text-sm font-bold text-emerald-100/90">Shipping details</p>
                <input
                  required
                  className="w-full rounded-xl border-0 bg-white/90 px-4 py-3 text-emerald-950 placeholder:text-slate-400"
                  placeholder="Address"
                  value={shipping.address}
                  onChange={(e) => setShipping((s) => ({ ...s, address: e.target.value }))}
                />
                <div className="grid gap-3 sm:grid-cols-2">
                  <input
                    required
                    className="w-full rounded-xl border-0 bg-white/90 px-4 py-3 text-emerald-950"
                    placeholder="City"
                    value={shipping.city}
                    onChange={(e) => setShipping((s) => ({ ...s, city: e.target.value }))}
                  />
                  <input
                    required
                    className="w-full rounded-xl border-0 bg-white/90 px-4 py-3 text-emerald-950"
                    placeholder="State"
                    value={shipping.state}
                    onChange={(e) => setShipping((s) => ({ ...s, state: e.target.value }))}
                  />
                </div>
                <div className="grid gap-3 sm:grid-cols-2">
                  <input
                    required
                    className="w-full rounded-xl border-0 bg-white/90 px-4 py-3 text-emerald-950"
                    placeholder="Country"
                    value={shipping.country}
                    onChange={(e) => setShipping((s) => ({ ...s, country: e.target.value }))}
                  />
                  <input
                    required
                    className="w-full rounded-xl border-0 bg-white/90 px-4 py-3 text-emerald-950"
                    placeholder="Pincode"
                    value={shipping.pincode}
                    onChange={(e) => setShipping((s) => ({ ...s, pincode: e.target.value }))}
                  />
                </div>
                <input
                  required
                  className="w-full rounded-xl border-0 bg-white/90 px-4 py-3 text-emerald-950"
                  placeholder="Phone"
                  value={shipping.phoneNo}
                  onChange={(e) => setShipping((s) => ({ ...s, phoneNo: e.target.value }))}
                />
                <div className="flex flex-wrap gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setCheckoutOpen(false)}
                    className="inline-flex h-12 flex-1 items-center justify-center rounded-full border border-white/20 px-6 text-sm font-bold text-white"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={ordering || items.length === 0}
                    className="inline-flex h-12 flex-1 items-center justify-center rounded-full bg-white px-6 text-sm font-bold text-emerald-950 disabled:opacity-50"
                  >
                    {ordering ? 'Placing…' : 'Confirm order'}
                  </button>
                </div>
              </form>
            ) : (
              <div className="mt-8 flex flex-col gap-4">
                <button
                  type="button"
                  disabled={items.length === 0}
                  onClick={() => setCheckoutOpen(true)}
                  className="inline-flex h-14 items-center justify-center rounded-full bg-white px-8 text-sm font-bold text-emerald-950 transition hover:bg-lime-100 disabled:opacity-50"
                >
                  Checkout
                </button>
                <button
                  type="button"
                  onClick={() => navigate('/contact')}
                  className="inline-flex h-14 items-center justify-center rounded-full border border-white/15 bg-white/10 px-8 text-sm font-bold text-white transition hover:bg-white/14"
                >
                  Contact support
                </button>
              </div>
            )}

            <div className="mt-8 rounded-[2rem] bg-white/10 p-6 backdrop-blur-md">
              <div className="flex items-start gap-4">
                <HiOutlineTicket className="mt-1 h-6 w-6 text-emerald-100" />
                <div>
                  <p className="text-lg font-bold">Orders & delivery</p>
                  <p className="mt-2 text-sm leading-7 text-emerald-100/80">
                    After checkout your order appears as Processing. Our team will update status when it ships.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Cart
