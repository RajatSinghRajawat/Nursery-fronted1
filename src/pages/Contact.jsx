import { useState } from 'react'
import { FiFacebook, FiInstagram, FiYoutube } from 'react-icons/fi'
import { HiOutlineClock, HiOutlineEnvelope, HiOutlineMapPin, HiOutlinePhone } from 'react-icons/hi2'
import { FaWhatsapp } from 'react-icons/fa'

const contactCards = [
  {
    id: 1,
    title: 'Address',
    value: 'Green Garden Nursery',
    extra: 'Jaipur, Rajasthan',
    icon: HiOutlineMapPin,
  },
  {
    id: 2,
    title: 'Phone',
    value: '+91 98765 43210',
    extra: 'Mon - Sat for support',
    icon: HiOutlinePhone,
  },
  {
    id: 3,
    title: 'Email',
    value: 'info@nursery.com',
    extra: 'Quick replies for plant queries',
    icon: HiOutlineEnvelope,
  },
  {
    id: 4,
    title: 'Opening Hours',
    value: 'Monday - Saturday',
    extra: '9:00 AM - 6:00 PM',
    icon: HiOutlineClock,
  },
]

const socials = [
  { id: 1, label: 'Facebook', icon: FiFacebook, href: '#' },
  { id: 2, label: 'Instagram', icon: FiInstagram, href: '#' },
  { id: 3, label: 'YouTube', icon: FiYoutube, href: '#' },
  { id: 4, label: 'WhatsApp', icon: FaWhatsapp, href: '#' },
]

const faqItems = [
  {
    id: 1,
    question: 'Do you deliver plants across India?',
    answer: 'Yes, we deliver selected plants safely across India with careful packaging and dispatch checks.',
  },
  {
    id: 2,
    question: 'How long does delivery take?',
    answer: 'Most orders reach within 3 to 5 working days depending on plant type and delivery location.',
  },
  {
    id: 3,
    question: 'Do plants come with pots?',
    answer: 'Many curated plants include pots. Product-specific pot details can be confirmed during inquiry or ordering.',
  },
]

function Contact() {
  const [openFaq, setOpenFaq] = useState(1)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    inquiryType: 'General Question',
    subject: '',
    message: '',
  })
  const [status, setStatus] = useState({ loading: false, success: false, error: '' })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus({ loading: true, success: false, error: '' })

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5008/api'}/leads/submit`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.message || 'Failed to send message')
      
      setStatus({ loading: false, success: true, error: '' })
      setFormData({ name: '', email: '', phone: '', inquiryType: 'General Question', subject: '', message: '' })
    } catch (err) {
      setStatus({ loading: false, success: false, error: err.message })
    }
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="fixed bottom-24 right-6 z-[65] flex flex-col gap-3">
        <a
          href="https://wa.me/919876543210"
          target="_blank"
          rel="noreferrer"
          aria-label="Chat on WhatsApp"
          className="flex h-12 w-12 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_16px_35px_rgba(15,23,42,0.22)] transition hover:scale-105"
        >
          <FaWhatsapp className="h-6 w-6" />
        </a>
        <a
          href="tel:+919876543210"
          aria-label="Call nursery"
          className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-950 text-white shadow-[0_16px_35px_rgba(15,23,42,0.22)] transition hover:scale-105"
        >
          <HiOutlinePhone className="h-6 w-6" />
        </a>
      </div>

      <section className="relative overflow-hidden px-6 py-28 text-white">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1512428813834-c702c7702b78?q=80&w=1600&auto=format&fit=crop"
            alt="Contact nursery hero"
            className="h-full w-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-950/92 via-emerald-900/78 to-emerald-700/42" />
        <div className="absolute inset-0 opacity-60" style={{ backgroundImage: 'linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0) 44%)' }} />

        <div className="relative mx-auto max-w-[1400px] py-20 text-center">
          <p className="mb-5 text-sm font-bold uppercase tracking-[0.28em] text-emerald-100/85">Contact Us</p>
          <h1 className="mx-auto max-w-4xl text-5xl font-bold leading-tight md:text-6xl xl:text-7xl">
            Get In Touch With Our Nursery
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-white/82 sm:text-lg">
            Reach out for plant inquiries, delivery questions, bulk orders, or a visit to our nursery. The page is built to make contact feel easy and complete.
          </p>
        </div>
      </section>

      <section className="bg-white px-6 py-24">
        <div className="mx-auto max-w-[1400px]">
          <div className="mb-16 max-w-2xl">
            <div className="mb-4 flex items-center gap-3">
              <span className="h-[2px] w-12 bg-emerald-600" />
              <span className="text-sm font-bold uppercase tracking-[0.2em] text-emerald-700">Contact Information</span>
            </div>
            <h2 className="text-5xl font-bold leading-[1.1] text-emerald-950 md:text-6xl">
              Direct Ways To <span className="text-emerald-600">Reach Us</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-4">
            {contactCards.map((card) => {
              const Icon = card.icon

              return (
                <article key={card.id} className="rounded-[2.25rem] border border-emerald-100 bg-[#f8faf7] p-8 shadow-sm transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_28px_60px_rgba(15,23,42,0.12)]">
                  <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-[1.5rem] bg-white text-emerald-900 shadow-sm">
                    <Icon className="h-8 w-8" />
                  </div>
                  <p className="text-sm font-bold uppercase tracking-[0.22em] text-emerald-700">{card.title}</p>
                  <h3 className="mt-3 text-2xl font-bold text-emerald-950">{card.value}</h3>
                  <p className="mt-3 text-sm leading-7 text-slate-600">{card.extra}</p>
                </article>
              )
            })}
          </div>
        </div>
      </section>

      <section className="bg-[#f8faf7] px-6 py-24">
        <div className="mx-auto grid max-w-[1400px] gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div className="rounded-[2.75rem] bg-white p-8 shadow-sm sm:p-10">
            <div className="mb-8">
              <div className="mb-4 flex items-center gap-3">
                <span className="h-[2px] w-12 bg-emerald-600" />
                <span className="text-sm font-bold uppercase tracking-[0.2em] text-emerald-700">Send Message</span>
              </div>
              <h2 className="text-4xl font-bold leading-tight text-emerald-950 sm:text-5xl">
                Let Us Know Your Plant Requirement
              </h2>
            </div>

            <form className="grid grid-cols-1 gap-5 md:grid-cols-2" onSubmit={handleSubmit}>
              <input
                name="name"
                type="text"
                required
                placeholder="Name"
                value={formData.name}
                onChange={handleChange}
                className="h-14 rounded-2xl border border-emerald-100 bg-white px-5 text-base text-slate-700 outline-none transition focus:border-emerald-500"
              />
              <input
                name="email"
                type="email"
                required
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                className="h-14 rounded-2xl border border-emerald-100 bg-white px-5 text-base text-slate-700 outline-none transition focus:border-emerald-500"
              />
              <input
                name="phone"
                type="tel"
                required
                placeholder="Phone"
                value={formData.phone}
                onChange={handleChange}
                className="h-14 rounded-2xl border border-emerald-100 bg-white px-5 text-base text-slate-700 outline-none transition focus:border-emerald-500"
              />
              <select 
                name="inquiryType"
                value={formData.inquiryType}
                onChange={handleChange}
                className="h-14 rounded-2xl border border-emerald-100 bg-white px-5 text-base text-slate-700 outline-none transition focus:border-emerald-500"
              >
                <option>General Question</option>
                <option>Plant Inquiry</option>
                <option>Delivery Question</option>
                <option>Bulk Order</option>
              </select>
              <input
                name="subject"
                type="text"
                placeholder="Subject"
                value={formData.subject}
                onChange={handleChange}
                className="h-14 rounded-2xl border border-emerald-100 bg-white px-5 text-base text-slate-700 outline-none transition focus:border-emerald-500 md:col-span-2"
              />
              <textarea
                name="message"
                required
                placeholder="Message"
                rows="6"
                value={formData.message}
                onChange={handleChange}
                className="min-h-[180px] rounded-[1.75rem] border border-emerald-100 bg-white px-5 py-4 text-base text-slate-700 outline-none transition focus:border-emerald-500 md:col-span-2"
              />
              
              {status.error && <p className="text-red-500 text-sm font-bold md:col-span-2">{status.error}</p>}
              {status.success && <p className="text-emerald-600 text-sm font-bold md:col-span-2">Thank you! Your inquiry has been sent.</p>}

              <div className="md:col-span-2">
                <button
                  type="submit"
                  disabled={status.loading}
                  className="inline-flex h-14 items-center justify-center rounded-full bg-emerald-950 px-8 text-sm font-bold text-white transition hover:bg-emerald-800 disabled:opacity-50"
                >
                  {status.loading ? 'Sending...' : 'Send Message'}
                </button>
              </div>
            </form>
          </div>

          <div className="relative overflow-hidden rounded-[2.75rem] bg-emerald-950 p-4 shadow-[0_24px_80px_rgba(15,23,42,0.18)]">
            <img
              src="https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?q=80&w=1200&auto=format&fit=crop"
              alt="Nursery contact visual"
              className="h-[640px] w-full rounded-[2.25rem] object-cover"
            />
            <div className="absolute inset-x-10 bottom-10 rounded-[2rem] border border-white/15 bg-white/10 p-6 text-white backdrop-blur-md">
              <p className="text-sm font-bold uppercase tracking-[0.22em] text-emerald-100/80">Visit Our Nursery</p>
              <p className="mt-3 text-2xl font-bold">Fresh plants, curated corners, and real greenery to explore.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white px-6 py-24">
        <div className="mx-auto max-w-[1400px]">
          <div className="mb-16 max-w-2xl">
            <div className="mb-4 flex items-center gap-3">
              <span className="h-[2px] w-12 bg-emerald-600" />
              <span className="text-sm font-bold uppercase tracking-[0.2em] text-emerald-700">Our Nursery Location</span>
            </div>
            <h2 className="text-5xl font-bold leading-[1.1] text-emerald-950 md:text-6xl">
              Find Us On The <span className="text-emerald-600">Map</span>
            </h2>
          </div>

          <div className="overflow-hidden rounded-[2.75rem] border border-emerald-100 bg-[#f8faf7] p-4 shadow-sm">
            <div className="grid min-h-[420px] place-items-center rounded-[2.25rem] bg-[linear-gradient(135deg,_rgba(16,185,129,0.16),_rgba(255,255,255,0.85))] p-8 text-center">
              <div className="max-w-xl">
                <div className="mx-auto mb-6 inline-flex h-16 w-16 items-center justify-center rounded-[1.5rem] bg-white text-emerald-900 shadow-sm">
                  <HiOutlineMapPin className="h-8 w-8" />
                </div>
                <h3 className="text-3xl font-bold text-emerald-950">Green Garden Nursery, Jaipur</h3>
                <p className="mt-4 text-base leading-8 text-slate-600">
                  Add your embedded Google Map here for live navigation. This block is styled as a premium placeholder so the page still looks complete before map integration.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#f8faf7] px-6 py-24">
        <div className="mx-auto max-w-[1400px]">
          <div className="mb-16 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl">
              <div className="mb-4 flex items-center gap-3">
                <span className="h-[2px] w-12 bg-emerald-600" />
                <span className="text-sm font-bold uppercase tracking-[0.2em] text-emerald-700">Social Media</span>
              </div>
              <h2 className="text-5xl font-bold leading-[1.1] text-emerald-950 md:text-6xl">
                Stay Connected <span className="text-emerald-600">Beyond The Website</span>
              </h2>
            </div>
            <p className="max-w-md text-lg leading-8 text-slate-600">
              Follow us for plant care ideas, new arrivals, nursery updates, and styling inspiration.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
            {socials.map((item) => {
              const Icon = item.icon

              return (
                <a
                  key={item.id}
                  href={item.href}
                  className="group rounded-[2rem] bg-white p-8 text-center shadow-sm transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_28px_60px_rgba(15,23,42,0.12)]"
                >
                  <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-[1.5rem] bg-emerald-100 text-emerald-900 transition-transform duration-500 group-hover:scale-110">
                    <Icon className="h-8 w-8" />
                  </div>
                  <p className="text-lg font-bold text-emerald-950">{item.label}</p>
                </a>
              )
            })}
          </div>
        </div>
      </section>

      <section className="bg-white px-6 py-24">
        <div className="mx-auto max-w-[1100px]">
          <div className="mb-12 text-center">
            <p className="text-sm font-bold uppercase tracking-[0.26em] text-emerald-700">FAQ</p>
            <h2 className="mt-4 text-4xl font-bold leading-tight text-emerald-950 sm:text-5xl">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-5">
            {faqItems.map((item) => {
              const isOpen = openFaq === item.id

              return (
                <article key={item.id} className="overflow-hidden rounded-[2rem] border border-emerald-100 bg-[#f8faf7] shadow-sm">
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : item.id)}
                    className="flex w-full items-center justify-between gap-4 border-0 bg-transparent px-6 py-6 text-left"
                  >
                    <h3 className="text-xl font-bold text-emerald-950">{item.question}</h3>
                    <span className="text-2xl font-bold text-emerald-700">{isOpen ? '-' : '+'}</span>
                  </button>
                  {isOpen && (
                    <div className="px-6 pb-6">
                      <p className="max-w-3xl text-base leading-8 text-slate-600">{item.answer}</p>
                    </div>
                  )}
                </article>
              )
            })}
          </div>
        </div>
      </section>
    </div>
  )
}

export default Contact
