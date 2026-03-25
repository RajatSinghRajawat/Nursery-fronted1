import { useState } from 'react'
import { HiOutlineHeart, HiOutlineShoppingBag, HiOutlineTicket, HiOutlineTruck } from 'react-icons/hi2'
import { useNavigate } from 'react-router-dom'
// import { registerUser } from '../utils/userStore'

const benefitItems = [
  {
    id: 1,
    title: 'Track your plant orders',
    icon: HiOutlineShoppingBag,
  },
  {
    id: 2,
    title: 'Faster checkout',
    icon: HiOutlineTruck,
  },
  {
    id: 3,
    title: 'Save favorite plants',
    icon: HiOutlineHeart,
  },
  {
    id: 4,
    title: 'Get special offers',
    icon: HiOutlineTicket,
  },
]

function Register() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    address: '',
    city: '',
    agreed: false,
  })
  const [statusMessage, setStatusMessage] = useState('')

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target
    setFormData((current) => ({
      ...current,
      [name]: type === 'checkbox' ? checked : value,
    }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    if (formData.password !== formData.confirmPassword) {
      setStatusMessage('Password and confirm password must match.')
      return
    }

    if (!formData.agreed) {
      setStatusMessage('Please accept the Terms & Conditions to continue.')
      return
    }

    // const result = await registerUser({
    //   fullName: formData.fullName,
    //   email: formData.email,
    //   phone: formData.phone,
    //   password: formData.password,
    //   address: formData.address,
    //   city: formData.city,
    // })

    if (!result.ok) {
      setStatusMessage(result.message)
      return
    }

    setStatusMessage('')
    navigate('/profile')
  }

  return (
    <div className="min-h-screen bg-white">
      <section className="relative overflow-hidden px-6 py-20 lg:min-h-[calc(100vh-5rem)] lg:py-24">
        <div className="absolute inset-0 bg-[#f8faf7]" />
        <div className="absolute right-0 top-0 h-80 w-80 rounded-full bg-emerald-100/70 blur-[120px]" />
        <div className="absolute bottom-0 left-0 h-80 w-80 rounded-full bg-lime-100/70 blur-[120px]" />

        <div className="relative mx-auto grid max-w-[1400px] gap-10 lg:grid-cols-[1.02fr_0.98fr] lg:items-stretch">
          <div className="relative overflow-hidden rounded-[2.75rem] bg-emerald-950 text-white shadow-[0_24px_80px_rgba(15,23,42,0.18)]">
            <img
              src="https://images.unsplash.com/photo-1545241047-6083a3684587?q=80&w=1400&auto=format&fit=crop"
              alt="Create nursery account"
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-950/92 via-emerald-900/80 to-lime-600/45" />
            <div className="absolute inset-0 opacity-60" style={{ backgroundImage: 'linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0) 46%)' }} />

            <div className="relative flex h-full flex-col justify-between p-8 sm:p-12">
              <div>
                <p className="mb-5 text-sm font-bold uppercase tracking-[0.28em] text-emerald-100/85">Create Account</p>
                <h1 className="max-w-xl text-5xl font-bold leading-tight md:text-6xl">
                  Join Our Green Nursery Family
                </h1>
                <p className="mt-6 max-w-xl text-base leading-8 text-white/82 sm:text-lg">
                  Create your account to save favorite plants, track orders, and enjoy a smoother nursery shopping experience.
                </p>
              </div>

              <div className="mt-10 grid gap-5 sm:grid-cols-2">
                {benefitItems.map((item) => {
                  const Icon = item.icon

                  return (
                    <article key={item.id} className="rounded-[1.75rem] border border-white/15 bg-white/10 p-5 backdrop-blur-md">
                      <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-[1rem] bg-white/12 text-white">
                        <Icon className="h-6 w-6" />
                      </div>
                      <h2 className="text-lg font-bold">{item.title}</h2>
                    </article>
                  )
                })}
              </div>
            </div>
          </div>

          <div className="rounded-[2.75rem] bg-white p-8 shadow-[0_20px_60px_rgba(15,23,42,0.08)] sm:p-10">
            <div className="mb-8">
              <p className="text-sm font-bold uppercase tracking-[0.24em] text-emerald-700">Register</p>
              <h2 className="mt-4 text-4xl font-bold leading-tight text-emerald-950 sm:text-5xl">
                Create Your Account
              </h2>
            </div>

            <form className="grid grid-cols-1 gap-5 md:grid-cols-2" onSubmit={handleSubmit}>
              <input
                name="fullName"
                type="text"
                placeholder="Full Name"
                value={formData.fullName}
                onChange={handleChange}
                className="h-14 rounded-2xl border border-emerald-100 bg-[#f8faf7] px-5 text-base text-slate-700 outline-none transition focus:border-emerald-500 md:col-span-2"
              />
              <input
                name="email"
                type="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleChange}
                className="h-14 rounded-2xl border border-emerald-100 bg-[#f8faf7] px-5 text-base text-slate-700 outline-none transition focus:border-emerald-500"
              />
              <input
                name="phone"
                type="tel"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={handleChange}
                className="h-14 rounded-2xl border border-emerald-100 bg-[#f8faf7] px-5 text-base text-slate-700 outline-none transition focus:border-emerald-500"
              />
              <input
                name="password"
                type="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className="h-14 rounded-2xl border border-emerald-100 bg-[#f8faf7] px-5 text-base text-slate-700 outline-none transition focus:border-emerald-500"
              />
              <input
                name="confirmPassword"
                type="password"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="h-14 rounded-2xl border border-emerald-100 bg-[#f8faf7] px-5 text-base text-slate-700 outline-none transition focus:border-emerald-500"
              />
              <input
                name="address"
                type="text"
                placeholder="Address"
                value={formData.address}
                onChange={handleChange}
                className="h-14 rounded-2xl border border-emerald-100 bg-[#f8faf7] px-5 text-base text-slate-700 outline-none transition focus:border-emerald-500"
              />
              <input
                name="city"
                type="text"
                placeholder="City"
                value={formData.city}
                onChange={handleChange}
                className="h-14 rounded-2xl border border-emerald-100 bg-[#f8faf7] px-5 text-base text-slate-700 outline-none transition focus:border-emerald-500"
              />

              <label className="flex items-start gap-3 rounded-[1.5rem] border border-emerald-100 bg-[#f8faf7] px-5 py-4 text-sm leading-7 text-slate-600 md:col-span-2">
                <input name="agreed" type="checkbox" checked={formData.agreed} onChange={handleChange} className="mt-1 h-4 w-4 rounded border-emerald-200 text-emerald-700" />
                <span>I agree to the Terms &amp; Conditions and confirm that my account details are correct.</span>
              </label>

              {statusMessage ? (
                <p className="rounded-2xl bg-rose-50 px-4 py-3 text-sm font-medium text-rose-600 md:col-span-2">
                  {statusMessage}
                </p>
              ) : null}

              <div className="md:col-span-2">
                <button
                  type="submit"
                  className="inline-flex h-14 w-full items-center justify-center rounded-full bg-emerald-950 px-8 text-sm font-bold text-white transition hover:bg-emerald-800"
                >
                  Create Account
                </button>
              </div>
            </form>

            <div className="mt-8 rounded-[2rem] bg-emerald-50 px-6 py-5 text-center">
              <p className="text-sm text-slate-600">
                Already have an account?
                <button type="button" onClick={() => navigate('/login')} className="ml-2 border-0 bg-transparent font-bold text-emerald-700 transition hover:text-emerald-900">
                  Login Here
                </button>
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Register
