import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { HiOutlineShoppingBag, HiOutlineSparkles, HiOutlineStar, HiOutlineUser } from 'react-icons/hi2'
import { getCurrentUser, logoutUser } from '../utils/userStore'
import { getActivitySummary } from '../utils/cart'

function Profile() {
  const navigate = useNavigate()
  const [summary, setSummary] = useState({
    currentUser: getCurrentUser(),
    items: [],
    totalPlants: 0,
    totalSpent: 0,
    rewardPoints: 0,
  })

  useEffect(() => {
    let cancelled = false
    ;(async () => {
      const s = await getActivitySummary()
      if (!cancelled) setSummary(s)
    })()
    const onCart = async () => {
      const s = await getActivitySummary()
      if (!cancelled) setSummary(s)
    }
    window.addEventListener('cartchange', onCart)
    window.addEventListener('authchange', onCart)
    return () => {
      cancelled = true
      window.removeEventListener('cartchange', onCart)
      window.removeEventListener('authchange', onCart)
    }
  }, [])

  const currentUser = summary.currentUser || getCurrentUser()

  const handleLogout = async () => {
    await logoutUser()
    navigate('/')
  }

  if (!currentUser) {
    return (
      <div className="min-h-screen bg-white px-6 py-24">
        <div className="mx-auto max-w-[900px] rounded-[2.5rem] bg-[#f8faf7] p-10 text-center shadow-sm">
          <p className="text-sm font-bold uppercase tracking-[0.24em] text-emerald-700">Profile</p>
          <h1 className="mt-4 text-4xl font-bold text-emerald-950 sm:text-5xl">Please login first</h1>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-slate-600 sm:text-lg">
            Login or create an account to view your nursery activity, selected plants, and reward points.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <button
              type="button"
              onClick={() => navigate('/login')}
              className="inline-flex h-14 items-center justify-center rounded-full bg-emerald-950 px-8 text-sm font-bold text-white transition hover:bg-emerald-800"
            >
              Login
            </button>
            <button
              type="button"
              onClick={() => navigate('/register')}
              className="inline-flex h-14 items-center justify-center rounded-full border border-emerald-200 px-8 text-sm font-bold text-emerald-900 transition hover:bg-emerald-50"
            >
              Create Account
            </button>
          </div>
        </div>
      </div>
    )
  }

  const firstName = currentUser.fullName?.split(' ')[0] || 'Profile'

  return (
    <div className="min-h-screen bg-white">
      <section className="relative overflow-hidden px-6 py-24 text-white">
        <div className="absolute inset-0 bg-gradient-to-br from-[#103d2a] via-[#1f6a47] to-[#b7d66d]" />
        <div className="absolute inset-0 opacity-80" style={{ backgroundImage: 'linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0) 46%)' }} />

        <div className="relative mx-auto max-w-[1400px] text-center">
          <p className="text-sm font-bold uppercase tracking-[0.28em] text-emerald-100/85">My Profile</p>
          <h1 className="mx-auto mt-5 max-w-4xl text-5xl font-bold leading-tight md:text-6xl">
            Welcome back, {firstName}
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-white/82 sm:text-lg">
            Track what you selected, how many plants you want to buy, and the points you have earned from your nursery activity.
          </p>
        </div>
      </section>

      <section className="bg-[#f8faf7] px-6 py-24">
        <div className="mx-auto grid max-w-[1400px] gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="rounded-[2.5rem] bg-emerald-950 p-8 text-white shadow-[0_24px_80px_rgba(15,23,42,0.16)] sm:p-10">
            <div className="flex items-center gap-4">
              <div className="grid h-20 w-20 place-items-center rounded-[1.75rem] bg-white/12 text-3xl font-bold">
                {firstName.slice(0, 1).toUpperCase()}
              </div>
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.22em] text-emerald-100/75">Account Holder</p>
                <h2 className="mt-2 text-3xl font-bold">{currentUser.fullName}</h2>
              </div>
            </div>

            <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3">
              <div className="rounded-[1.5rem] bg-white/10 p-5 backdrop-blur-md">
                <p className="text-sm font-semibold text-emerald-100/75">Plants Added</p>
                <p className="mt-3 text-3xl font-bold">{summary.totalPlants}</p>
              </div>
              <div className="rounded-[1.5rem] bg-white/10 p-5 backdrop-blur-md">
                <p className="text-sm font-semibold text-emerald-100/75">Reward Points</p>
                <p className="mt-3 text-3xl font-bold">{summary.rewardPoints}</p>
              </div>
              <div className="rounded-[1.5rem] bg-white/10 p-5 backdrop-blur-md">
                <p className="text-sm font-semibold text-emerald-100/75">Cart Value</p>
                <p className="mt-3 text-3xl font-bold">₹{summary.totalSpent}</p>
              </div>
            </div>

            <button
              type="button"
              onClick={handleLogout}
              className="mt-10 inline-flex h-12 items-center justify-center rounded-full bg-white px-6 text-sm font-bold text-emerald-950 transition hover:bg-lime-100"
            >
              Logout
            </button>
          </div>

          <div className="rounded-[2.5rem] bg-white p-8 shadow-sm sm:p-10">
            <div className="mb-8">
              <p className="text-sm font-bold uppercase tracking-[0.24em] text-emerald-700">Profile Activity</p>
              <h2 className="mt-4 text-4xl font-bold leading-tight text-emerald-950 sm:text-5xl">
                What You Have Done Here
              </h2>
            </div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div className="rounded-[1.75rem] bg-[#f8faf7] p-6">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-[1rem] bg-white text-emerald-900 shadow-sm">
                  <HiOutlineUser className="h-6 w-6" />
                </div>
                <p className="text-sm font-bold uppercase tracking-[0.2em] text-emerald-700">User Name</p>
                <p className="mt-3 text-xl font-bold text-emerald-950">{currentUser.fullName}</p>
              </div>
              <div className="rounded-[1.75rem] bg-[#f8faf7] p-6">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-[1rem] bg-white text-emerald-900 shadow-sm">
                  <HiOutlineShoppingBag className="h-6 w-6" />
                </div>
                <p className="text-sm font-bold uppercase tracking-[0.2em] text-emerald-700">Items In Cart</p>
                <p className="mt-3 text-xl font-bold text-emerald-950">{summary.items.length}</p>
              </div>
              <div className="rounded-[1.75rem] bg-[#f8faf7] p-6">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-[1rem] bg-white text-emerald-900 shadow-sm">
                  <HiOutlineSparkles className="h-6 w-6" />
                </div>
                <p className="text-sm font-bold uppercase tracking-[0.2em] text-emerald-700">Reward Points</p>
                <p className="mt-3 text-xl font-bold text-emerald-950">{summary.rewardPoints}</p>
              </div>
              <div className="rounded-[1.75rem] bg-[#f8faf7] p-6">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-[1rem] bg-white text-emerald-900 shadow-sm">
                  <HiOutlineStar className="h-6 w-6" />
                </div>
                <p className="text-sm font-bold uppercase tracking-[0.2em] text-emerald-700">Cart Value</p>
                <p className="mt-3 text-xl font-bold text-emerald-950">₹{summary.totalSpent}</p>
              </div>
            </div>

            <div className="mt-8 rounded-[2rem] bg-[#f8faf7] p-6">
              <p className="text-sm font-bold uppercase tracking-[0.22em] text-emerald-700">Selected Plants</p>
              {summary.items.length ? (
                <div className="mt-5 space-y-4">
                  {summary.items.map((item) => (
                    <div key={item.id} className="flex items-center justify-between gap-4 rounded-[1.5rem] bg-white p-4 shadow-sm">
                      <div className="flex items-center gap-4">
                        <img src={item.image} alt={item.name} className="h-14 w-14 rounded-2xl object-cover" />
                        <div>
                          <p className="font-bold text-emerald-950">{item.name}</p>
                          <p className="text-sm text-slate-500">Quantity: {item.quantity}</p>
                        </div>
                      </div>
                      <p className="font-bold text-emerald-900">₹{item.price * item.quantity}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="mt-5 text-base leading-8 text-slate-600">
                  You have not added any plants yet. Use Add to Cart and your activity will appear here.
                </p>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Profile
