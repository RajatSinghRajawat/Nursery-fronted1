import { useEffect, useMemo, useState } from 'react'
import { FiPlay } from 'react-icons/fi'
import { HiOutlineStar } from 'react-icons/hi2'
import { useNavigate } from 'react-router-dom'
import { api } from '../utils/api'
import { getCurrentUser } from '../utils/userStore'

const fallbackReviews = [
  {
    _id: 'f1',
    name: 'Ravi Sharma',
    city: 'Jaipur',
    rating: 5,
    review: 'Very fresh plants and great packaging. The plants looked exactly like the photos and settled quickly at home.',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=500&auto=format&fit=crop',
  },
]

const videoTestimonials = [
  {
    id: 1,
    title: 'Plant Unboxing Review',
    description: 'A quick customer unboxing showing secure packaging and fresh plant condition on arrival.',
    image: 'https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?q=80&w=1200&auto=format&fit=crop',
  },
  {
    id: 2,
    title: 'Balcony Setup Feedback',
    description: 'See how customers used nursery plants to create a clean, vibrant green balcony corner.',
    image: 'https://images.unsplash.com/photo-1592150621744-aca64f48394a?q=80&w=1200&auto=format&fit=crop',
  },
  {
    id: 3,
    title: 'Nursery Visit Experience',
    description: 'A visual look at the nursery space, plant variety, and real customer feedback after visiting.',
    image: 'https://images.unsplash.com/photo-1459156212016-c812468e2115?q=80&w=1200&auto=format&fit=crop',
  },
]

const communityPhotos = [
  {
    id: 1,
    title: 'Balcony Greens',
    image: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?q=80&w=900&auto=format&fit=crop',
  },
  {
    id: 2,
    title: 'Indoor Plant Styling',
    image: 'https://images.unsplash.com/photo-1545241047-6083a3684587?q=80&w=900&auto=format&fit=crop',
  },
  {
    id: 3,
    title: 'Cozy Plant Corner',
    image: 'https://images.unsplash.com/photo-1614594975525-e45190c55d0b?q=80&w=900&auto=format&fit=crop',
  },
  {
    id: 4,
    title: 'Home Garden Setup',
    image: 'https://images.unsplash.com/photo-1512428813834-c702c7702b78?q=80&w=900&auto=format&fit=crop',
  },
]

function Testimonials() {
  const navigate = useNavigate()
  const [items, setItems] = useState([])
  const [statusMessage, setStatusMessage] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [formData, setFormData] = useState({ name: '', email: '', city: '', rating: '5', review: '' })
  const currentUser = getCurrentUser()

  const loadTestimonials = async () => {
    try {
      const data = await api('/testimonials')
      setItems(data.items || [])
    } catch {
      setItems([])
    }
  }

  useEffect(() => {
    loadTestimonials()
  }, [])

  useEffect(() => {
    if (currentUser?.fullName || currentUser?.email) {
      setFormData((prev) => ({
        ...prev,
        name: prev.name || currentUser.fullName || '',
        email: prev.email || currentUser.email || '',
      }))
    }
  }, [currentUser?.email, currentUser?.fullName])

  const reviewsData = items.length ? items : fallbackReviews
  const average = useMemo(() => {
    if (!reviewsData.length) return 0
    return (
      reviewsData.reduce((sum, i) => sum + (Number(i.rating) || 0), 0) / reviewsData.length
    )
  }, [reviewsData])

  const ratingBars = useMemo(() => {
    const total = reviewsData.length || 1
    return [5, 4, 3, 2, 1].map((star) => {
      const count = reviewsData.filter((r) => Number(r.rating) === star).length
      return { label: `${star}★`, width: `${Math.round((count / total) * 100)}%` }
    })
  }, [reviewsData])

  const onChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const onSubmit = async (event) => {
    event.preventDefault()
    setStatusMessage('')
    if (!currentUser) {
      navigate('/login')
      return
    }
    setSubmitting(true)
    try {
      await api('/testimonials', {
        method: 'POST',
        body: JSON.stringify({
          ...formData,
          rating: Number(formData.rating),
        }),
      })
      setStatusMessage('Review submitted. It will be visible after admin approval.')
      setFormData((prev) => ({ ...prev, city: '', rating: '5', review: '' }))
    } catch (e) {
      setStatusMessage(e.message || 'Unable to submit review')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-white">
      <section className="relative overflow-hidden px-6 py-28 text-white">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1459156212016-c812468e2115?q=80&w=1600&auto=format&fit=crop"
            alt="Customer testimonials hero"
            className="h-full w-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-950/92 via-emerald-900/78 to-emerald-700/42" />
        <div className="absolute inset-0 opacity-60" style={{ backgroundImage: 'linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0) 44%)' }} />

        <div className="relative mx-auto max-w-[1400px] py-20 text-center">
          <p className="mb-5 text-sm font-bold uppercase tracking-[0.28em] text-emerald-100/85">Customer Testimonials</p>
          <h1 className="mx-auto max-w-4xl text-5xl font-bold leading-tight md:text-6xl xl:text-7xl">
            What Our Customers Say About Us
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-white/82 sm:text-lg">
            Real customer stories, honest ratings, and home setups that show how our plants look and feel beyond product photos.
          </p>
        </div>
      </section>

      <section className="bg-white px-6 py-24">
        <div className="mx-auto max-w-[1400px]">
          <div className="mb-16 max-w-2xl">
            <div className="mb-4 flex items-center gap-3">
              <span className="h-[2px] w-12 bg-emerald-600" />
              <span className="text-sm font-bold uppercase tracking-[0.2em] text-emerald-700">Customer Reviews</span>
            </div>
            <h2 className="text-5xl font-bold leading-[1.1] text-emerald-950 md:text-6xl">
              Trusted By <span className="text-emerald-600">Plant Lovers</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3">
            {reviewsData.map((review) => (
              <article
                key={review._id || review.id}
                className="rounded-[2.25rem] border border-emerald-100 bg-[#f8faf7] p-8 shadow-sm transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_28px_60px_rgba(15,23,42,0.12)]"
              >
                <div className="mb-6 flex items-center gap-1">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <HiOutlineStar
                      key={`${review._id || review.id}-${index}`}
                      className={`h-5 w-5 ${index < review.rating ? 'text-amber-400' : 'text-slate-200'}`}
                    />
                  ))}
                </div>
                <p className="min-h-[120px] text-base leading-8 text-slate-600">"{review.review}"</p>
                <div className="mt-8 flex items-center gap-4">
                  <img src={review.image} alt={review.name} className="h-16 w-16 rounded-2xl object-cover" />
                  <div>
                    <h3 className="text-lg font-bold text-emerald-950">{review.name}</h3>
                    <p className="text-sm font-medium text-slate-500">{review.city}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#f8faf7] px-6 py-24">
        <div className="mx-auto max-w-[1400px]">
          <div className="mb-16 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl">
              <div className="mb-4 flex items-center gap-3">
                <span className="h-[2px] w-12 bg-emerald-600" />
                <span className="text-sm font-bold uppercase tracking-[0.2em] text-emerald-700">Video Testimonials</span>
              </div>
              <h2 className="text-5xl font-bold leading-[1.1] text-emerald-950 md:text-6xl">
                Customer Stories In <span className="text-emerald-600">Motion</span>
              </h2>
            </div>
            <p className="max-w-md text-lg leading-8 text-slate-600">
              Video blocks make the page feel more real and trustworthy than plain text reviews alone.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            {videoTestimonials.map((item) => (
              <article key={item.id} className="group overflow-hidden rounded-[2.25rem] bg-white shadow-sm transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_28px_60px_rgba(15,23,42,0.12)]">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-emerald-950/35" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <button type="button" className="flex h-16 w-16 items-center justify-center rounded-full border border-white/20 bg-white/12 text-white backdrop-blur-md transition hover:scale-110">
                      <FiPlay className="ml-1 h-6 w-6" />
                    </button>
                  </div>
                </div>
                <div className="p-7">
                  <h3 className="text-2xl font-bold text-emerald-950">{item.title}</h3>
                  <p className="mt-4 text-sm leading-7 text-slate-600">{item.description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white px-6 py-24">
        <div className="mx-auto max-w-[1400px]">
          <div className="mb-16 max-w-2xl">
            <div className="mb-4 flex items-center gap-3">
              <span className="h-[2px] w-12 bg-emerald-600" />
              <span className="text-sm font-bold uppercase tracking-[0.2em] text-emerald-700">Community Gallery</span>
            </div>
            <h2 className="text-5xl font-bold leading-[1.1] text-emerald-950 md:text-6xl">
              Plants In <span className="text-emerald-600">Real Homes</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
            {communityPhotos.map((item) => (
              <a key={item.id} href={item.image} target="_blank" rel="noreferrer" className="group relative overflow-hidden rounded-[2rem] bg-emerald-50">
                <div className="aspect-[4/4.5] overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/78 via-transparent to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-6 text-white">
                  <p className="text-xl font-bold">{item.title}</p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#f8faf7] px-6 py-24">
        <div className="mx-auto grid max-w-[1400px] gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
          <div className="rounded-[2.5rem] bg-emerald-950 p-8 text-white shadow-[0_24px_80px_rgba(15,23,42,0.16)] sm:p-10">
            <p className="text-sm font-bold uppercase tracking-[0.26em] text-emerald-100/80">Overall Rating</p>
            <div className="mt-6 flex items-end gap-4">
              <span className="text-6xl font-bold">{average.toFixed(1)}</span>
              <span className="pb-2 text-lg font-medium text-emerald-100/80">/ 5</span>
            </div>
            <div className="mt-5 flex items-center gap-1">
              {Array.from({ length: 5 }).map((_, index) => (
                <HiOutlineStar key={index} className="h-6 w-6 text-amber-400" />
              ))}
            </div>
            <p className="mt-5 text-sm leading-7 text-emerald-100/80">
              Based on {reviewsData.length} approved customer reviews.
            </p>
          </div>

          <div className="rounded-[2.5rem] border border-emerald-100 bg-white p-8 shadow-sm sm:p-10">
            <div className="mb-8">
              <div className="mb-4 flex items-center gap-3">
                <span className="h-[2px] w-12 bg-emerald-600" />
                <span className="text-sm font-bold uppercase tracking-[0.2em] text-emerald-700">Rating Summary</span>
              </div>
              <h2 className="text-4xl font-bold leading-tight text-emerald-950 sm:text-5xl">
                Breakdown Of Recent Reviews
              </h2>
            </div>

            <div className="space-y-5">
              {ratingBars.map((item) => (
                <div key={item.label} className="grid grid-cols-[52px_1fr] items-center gap-4">
                  <span className="text-sm font-bold text-emerald-950">{item.label}</span>
                  <div className="h-3 overflow-hidden rounded-full bg-emerald-50">
                    <div className="h-full rounded-full bg-gradient-to-r from-emerald-700 to-lime-500" style={{ width: item.width }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white px-6 py-24">
        <div className="mx-auto max-w-[1100px] rounded-[2.75rem] bg-[#f8faf7] p-8 shadow-sm sm:p-12">
          <div className="mb-10 text-center">
            <p className="text-sm font-bold uppercase tracking-[0.26em] text-emerald-700">Submit Review</p>
            <h2 className="mt-4 text-4xl font-bold leading-tight text-emerald-950 sm:text-5xl">
              Share Your Nursery Experience
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-slate-600 sm:text-lg">
              Let other plant lovers know how your order, delivery, and plant quality experience felt.
            </p>
          </div>

          <form className="grid grid-cols-1 gap-5 md:grid-cols-2" onSubmit={onSubmit}>
            <input
              name="name"
              type="text"
              placeholder="Your Name"
              value={formData.name}
              onChange={onChange}
              className="h-14 rounded-2xl border border-emerald-100 bg-white px-5 text-base text-slate-700 outline-none transition focus:border-emerald-500"
            />
            <input
              name="email"
              type="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={onChange}
              className="h-14 rounded-2xl border border-emerald-100 bg-white px-5 text-base text-slate-700 outline-none transition focus:border-emerald-500"
            />
            <select name="rating" value={formData.rating} onChange={onChange} className="h-14 rounded-2xl border border-emerald-100 bg-white px-5 text-base text-slate-700 outline-none transition focus:border-emerald-500">
              <option value="5">5 Stars</option>
              <option value="4">4 Stars</option>
              <option value="3">3 Stars</option>
              <option value="2">2 Stars</option>
              <option value="1">1 Star</option>
            </select>
            <input
              name="city"
              type="text"
              placeholder="City"
              value={formData.city}
              onChange={onChange}
              className="h-14 rounded-2xl border border-emerald-100 bg-white px-5 text-base text-slate-700 outline-none transition focus:border-emerald-500"
            />
            <textarea
              name="review"
              placeholder="Write your review"
              rows="6"
              value={formData.review}
              onChange={onChange}
              className="min-h-[180px] rounded-[1.75rem] border border-emerald-100 bg-white px-5 py-4 text-base text-slate-700 outline-none transition focus:border-emerald-500 md:col-span-2"
            />
            {statusMessage ? <p className="md:col-span-2 rounded-xl bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-800">{statusMessage}</p> : null}
            <div className="md:col-span-2">
              <button
                type="submit"
                disabled={submitting}
                className="inline-flex h-14 items-center justify-center rounded-full bg-emerald-950 px-8 text-sm font-bold text-white transition hover:bg-emerald-800"
              >
                {submitting ? 'Submitting...' : currentUser ? 'Add Your Review' : 'Login & Add Review'}
              </button>
            </div>
          </form>
        </div>
      </section>
    </div>
  )
}

export default Testimonials
