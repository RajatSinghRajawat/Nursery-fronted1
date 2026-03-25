import { useState } from 'react'
import { HiOutlineBolt, HiOutlineLockClosed, HiOutlineShieldCheck } from 'react-icons/hi2'
import { useNavigate } from 'react-router-dom'

const securityItems = [
  {
    id: 1,
    title: 'Secure Login',
    description: 'Protected sign-in flow designed to keep your nursery account access safe and smooth.',
    icon: HiOutlineLockClosed,
  },
  {
    id: 2,
    title: 'Data Protection',
    description: 'Your account details and activity stay handled with privacy-focused access controls.',
    icon: HiOutlineShieldCheck,
  },
  {
    id: 3,
    title: 'Fast Access',
    description: 'Quick login experience so returning customers can continue shopping without friction.',
    icon: HiOutlineBolt,
  },
]

function Login() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({ email: '', password: '' })
  const [statusMessage, setStatusMessage] = useState('')

  // ✅ FIXED LOGIN FUNCTION
  const login = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        setStatusMessage(data.message || "Login failed")
        return { ok: false }
      }

      // ✅ Save token
      if (data.token) {
        localStorage.setItem("token", data.token)
      }

      return { ok: true }

    } catch (error) {
      console.error(error)
      setStatusMessage("Something went wrong")
      return { ok: false }
    }
  }

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormData((current) => ({ ...current, [name]: value }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setStatusMessage('')

    const result = await login()

    if (!result.ok) return

    navigate('/profile')
  }

  return (
    <div className="min-h-screen bg-white">
      <section className="relative overflow-hidden px-6 py-20 lg:min-h-[calc(100vh-5rem)] lg:py-24">
        <div className="absolute inset-0 bg-[#f8faf7]" />
        <div className="absolute right-0 top-0 h-80 w-80 rounded-full bg-emerald-100/70 blur-[120px]" />
        <div className="absolute bottom-0 left-0 h-80 w-80 rounded-full bg-lime-100/70 blur-[120px]" />

        <div className="relative mx-auto grid max-w-[1400px] gap-10 lg:grid-cols-[1.02fr_0.98fr] lg:items-stretch">
          {/* LEFT SIDE */}
          <div className="relative overflow-hidden rounded-[2.75rem] bg-emerald-950 text-white shadow-[0_24px_80px_rgba(15,23,42,0.18)]">
            <img
              src="https://images.unsplash.com/photo-1459156212016-c812468e2115?q=80&w=1400&auto=format&fit=crop"
              alt="Welcome back nursery"
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-950/92 via-emerald-900/80 to-lime-600/45" />
            <div className="absolute inset-0 opacity-60" style={{ backgroundImage: 'linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0) 46%)' }} />

            <div className="relative flex h-full flex-col justify-between p-8 sm:p-12">
              <div>
                <p className="mb-5 text-sm font-bold uppercase tracking-[0.28em] text-emerald-100/85">Welcome Back</p>
                <h1 className="max-w-xl text-5xl font-bold leading-tight md:text-6xl">
                  Login To Your Nursery Account
                </h1>
                <p className="mt-6 max-w-xl text-base leading-8 text-white/82 sm:text-lg">
                  Access your orders, saved plants, wishlist, and account details from one clean, secure place.
                </p>
              </div>

              <div className="mt-10 grid gap-5 sm:grid-cols-3">
                {securityItems.map((item) => {
                  const Icon = item.icon

                  return (
                    <article key={item.id} className="rounded-[1.75rem] border border-white/15 bg-white/10 p-5 backdrop-blur-md">
                      <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-[1rem] bg-white/12 text-white">
                        <Icon className="h-6 w-6" />
                      </div>
                      <h2 className="text-lg font-bold">{item.title}</h2>
                      <p className="mt-3 text-sm leading-7 text-emerald-100/80">{item.description}</p>
                    </article>
                  )
                })}
              </div>
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="rounded-[2.75rem] bg-white p-8 shadow-[0_20px_60px_rgba(15,23,42,0.08)] sm:p-10">
            <div className="mb-8">
              <p className="text-sm font-bold uppercase tracking-[0.24em] text-emerald-700">Login</p>
              <h2 className="mt-4 text-4xl font-bold leading-tight text-emerald-950 sm:text-5xl">
                Continue Your Green Journey
              </h2>
            </div>

            <form className="space-y-5" onSubmit={handleSubmit}>
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-600">Email Address</label>
                <input
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                  className="h-14 w-full rounded-2xl border border-emerald-100 bg-[#f8faf7] px-5 text-base text-slate-700 outline-none transition focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-600">Password</label>
                <input
                  name="password"
                  type="password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                  className="h-14 w-full rounded-2xl border border-emerald-100 bg-[#f8faf7] px-5 text-base text-slate-700 outline-none transition focus:border-emerald-500"
                />
              </div>

              {statusMessage && (
                <p className="rounded-2xl bg-rose-50 px-4 py-3 text-sm font-medium text-rose-600">
                  {statusMessage}
                </p>
              )}

              <div className="flex flex-wrap items-center justify-between gap-4">
                <label className="flex items-center gap-3 text-sm font-medium text-slate-600">
                  <input type="checkbox" className="h-4 w-4 rounded border-emerald-200 text-emerald-700" />
                  Remember me
                </label>
                <button
                  type="button"
                  onClick={() => navigate('/forgot-password')}
                  className="border-0 bg-transparent text-sm font-bold text-emerald-700 hover:text-emerald-900"
                >
                  Forgot Password?
                </button>
              </div>

              <button
                type="submit"
                className="inline-flex h-14 w-full items-center justify-center rounded-full bg-emerald-950 px-8 text-sm font-bold text-white hover:bg-emerald-800"
              >
                Login
              </button>
            </form>

            <div className="mt-8 rounded-[2rem] bg-emerald-50 px-6 py-5 text-center">
              <p className="text-sm text-slate-600">
                Don&apos;t have an account?
                <button
                  type="button"
                  onClick={() => navigate('/register')}
                  className="ml-2 font-bold text-emerald-700 hover:text-emerald-900"
                >
                  Create Account
                </button>
              </p>
            </div>
          </div>

        </div>
      </section>
    </div>
  )
}

export default Login