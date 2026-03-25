import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function ForgotPassword() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [statusMessage, setStatusMessage] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()

    if (!email.trim()) {
      setStatusMessage('Please enter your email address.')
      return
    }

    setStatusMessage('Reset link request saved. This frontend demo does not send real emails yet.')
  }

  return (
    <div className="min-h-screen bg-white">
      <section className="relative overflow-hidden px-6 py-20 lg:min-h-[calc(100vh-5rem)] lg:py-24">
        <div className="absolute inset-0 bg-[#f8faf7]" />
        <div className="absolute right-0 top-0 h-80 w-80 rounded-full bg-emerald-100/70 blur-[120px]" />
        <div className="absolute bottom-0 left-0 h-80 w-80 rounded-full bg-lime-100/70 blur-[120px]" />

        <div className="relative mx-auto grid max-w-[1200px] gap-10 lg:grid-cols-[1fr_0.9fr] lg:items-stretch">
          <div className="relative overflow-hidden rounded-[2.75rem] bg-emerald-950 text-white shadow-[0_24px_80px_rgba(15,23,42,0.18)]">
            <img
              src="https://images.unsplash.com/photo-1459156212016-c812468e2115?q=80&w=1400&auto=format&fit=crop"
              alt="Forgot password nursery"
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-950/92 via-emerald-900/80 to-lime-600/45" />
            <div className="absolute inset-0 opacity-60" style={{ backgroundImage: 'linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0) 46%)' }} />

            <div className="relative flex h-full flex-col justify-end p-8 sm:p-12">
              <p className="mb-5 text-sm font-bold uppercase tracking-[0.28em] text-emerald-100/85">Forgot Password</p>
              <h1 className="max-w-xl text-5xl font-bold leading-tight md:text-6xl">
                Reset Your Nursery Account Access
              </h1>
              <p className="mt-6 max-w-xl text-base leading-8 text-white/82 sm:text-lg">
                Enter your email and continue the password reset flow from one clean page.
              </p>
            </div>
          </div>

          <div className="rounded-[2.75rem] bg-white p-8 shadow-[0_20px_60px_rgba(15,23,42,0.08)] sm:p-10">
            <div className="mb-8">
              <p className="text-sm font-bold uppercase tracking-[0.24em] text-emerald-700">Reset Password</p>
              <h2 className="mt-4 text-4xl font-bold leading-tight text-emerald-950 sm:text-5xl">
                Get Your Reset Link
              </h2>
            </div>

            <form className="space-y-5" onSubmit={handleSubmit}>
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-600">Email Address</label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  className="h-14 w-full rounded-2xl border border-emerald-100 bg-[#f8faf7] px-5 text-base text-slate-700 outline-none transition focus:border-emerald-500"
                />
              </div>

              {statusMessage ? (
                <p className="rounded-2xl bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700">
                  {statusMessage}
                </p>
              ) : null}

              <button
                type="submit"
                className="inline-flex h-14 w-full items-center justify-center rounded-full bg-emerald-950 px-8 text-sm font-bold text-white transition hover:bg-emerald-800"
              >
                Send Reset Link
              </button>
            </form>

            <div className="mt-8 rounded-[2rem] bg-emerald-50 px-6 py-5 text-center">
              <p className="text-sm text-slate-600">
                Remember your password?
                <button type="button" onClick={() => navigate('/login')} className="ml-2 border-0 bg-transparent font-bold text-emerald-700 transition hover:text-emerald-900">
                  Back To Login
                </button>
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default ForgotPassword
