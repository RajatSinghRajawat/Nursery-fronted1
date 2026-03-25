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

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

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
        return
      }

      // ✅ Save token (important)
      if (data.token) {
        localStorage.setItem("token", data.token)
      }

      // ✅ Redirect
      navigate("/profile")

    } catch (error) {
      console.error(error)
      setStatusMessage("Something went wrong")
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setStatusMessage('')
    login()
  }

  return (
    <div className="min-h-screen bg-white">
      <section className="relative overflow-hidden px-6 py-20 lg:min-h-[calc(100vh-5rem)] lg:py-24">
        
        <div className="relative mx-auto grid max-w-[1400px] gap-10 lg:grid-cols-[1.02fr_0.98fr] lg:items-stretch">

          {/* LEFT SIDE */}
          <div className="relative overflow-hidden rounded-[2.75rem] bg-emerald-950 text-white">
            <div className="relative flex h-full flex-col justify-between p-8 sm:p-12">
              
              <div>
                <h1 className="text-4xl font-bold">
                  Login To Your Nursery Account
                </h1>
              </div>

              <div className="mt-10 grid gap-5 sm:grid-cols-3">
                {securityItems.map((item) => {
                  const Icon = item.icon
                  return (
                    <div key={item.id} className="p-4 bg-white/10 rounded-xl">
                      <Icon className="h-6 w-6 mb-2" />
                      <h2 className="font-bold">{item.title}</h2>
                      <p className="text-sm">{item.description}</p>
                    </div>
                  )
                })}
              </div>

            </div>
          </div>

          {/* RIGHT SIDE FORM */}
          <div className="rounded-[2.75rem] bg-white p-8 shadow-lg">

            <h2 className="text-3xl font-bold mb-6">Login</h2>

            <form onSubmit={handleSubmit} className="space-y-4">

              <input
                name="email"
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-3 border rounded-xl"
              />

              <input
                name="password"
                type="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className="w-full p-3 border rounded-xl"
              />

              {statusMessage && (
                <p className="text-red-500">{statusMessage}</p>
              )}

              <button
                type="submit"
                className="w-full bg-emerald-900 text-white p-3 rounded-xl"
              >
                Login
              </button>

            </form>

          </div>
        </div>
      </section>
    </div>
  )
}

export default Login