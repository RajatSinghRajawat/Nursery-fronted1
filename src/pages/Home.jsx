import { useEffect, useMemo, useState } from 'react'
import { HiOutlineShoppingBag, HiOutlineMagnifyingGlass, HiOutlineHomeModern, HiOutlineStar, HiOutlineHeart, HiOutlineTruck, HiOutlineShieldCheck, HiOutlineSparkles, HiOutlinePhone, HiOutlineArrowRight } from 'react-icons/hi2'
import { GiTreehouse, GiCactus, GiSpade, GiPlantSeed, GiFlowerPot, GiLeafSwirl } from 'react-icons/gi'
import { FiArrowRight } from 'react-icons/fi'
import { useNavigate } from 'react-router-dom'
import { getCurrentUser } from '../utils/userStore'
import { addCartItemByProductId } from '../utils/cart'
import { api } from '../utils/api'

function mapApiToTopPick(p) {
  const price = Number(p.price || 0)
  const disc = Number(p.discount || 0)
  const unit =
    p.discountType === 'percent'
      ? Math.max(0, price - (price * disc) / 100)
      : Math.max(0, price - disc)
  const mrp = Number(p.mrp || 0)
  return {
    _id: p._id,
    id: p._id,
    name: p.name,
    subtitle: p.shortDescription ? String(p.shortDescription).slice(0, 90) : '',
    image: p.mainImage || p.image?.[0] || '',
    category: p.categoryId?.name || 'Plant',
    rating:
      p.averageRating > 0
        ? String(p.averageRating)
        : Array.isArray(p.reviews) && p.reviews.length
          ? (p.reviews.reduce((s, r) => s + (Number(r.rating) || 0), 0) / p.reviews.length).toFixed(1)
          : '4.8',
    tag: p.stockStatus === 'out_of_stock' ? 'Restocking' : 'Fresh',
    price: unit,
    mrp: mrp > unit ? mrp : null,
  }
}

function mapApiToBestSeller(p) {
  const base = mapApiToTopPick(p)
  return {
    ...base,
    tag: 'Popular',
    badge: base.category,
    reviews: Array.isArray(p.reviews) ? p.reviews.length : 128,
  }
}

const slidesData = [
  {
    id: 1,
    heading: 'Bring Nature Into Your Home',
    description:
      'Fresh plants, beautiful pots, and everything your garden needs. Start your green journey with our premium nursery collection.',
    buttonLabel: 'Explore Plants',
    badge: 'Fresh arrivals',
    href: '#products',
    stats: ['200+ premium varieties', 'Eco-friendly planters'],
    palette: 'from-[#103d2a] via-[#1f6a47] to-[#b7d66d]',
    texture:
      'radial-gradient(circle at 18% 18%, rgba(255,255,255,0.22), transparent 18%), radial-gradient(circle at 85% 22%, rgba(217,239,216,0.24), transparent 20%), linear-gradient(125deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0) 46%)',
    panel: 'from-white to-[#e9f6e8]',
    glow: 'bg-emerald-200/40',
    featureTitle: 'Indoor Plant Set',
    featureText: 'Sunlit shelf styling for calm, breathable interiors.',
  },
  {
    id: 2,
    heading: 'Grow Happiness Every Day',
    description:
      'Create your own peaceful green corner with healthy plants and expert gardening essentials.',
    buttonLabel: 'Start Gardening',
    badge: 'Garden essentials',
    href: '#about',
    stats: ['Expert care guidance', 'Weekly healthy stock'],
    palette: 'from-[#153828] via-[#2e7d55] to-[#d8e89b]',
    texture:
      'radial-gradient(circle at 78% 18%, rgba(255,255,255,0.2), transparent 16%), radial-gradient(circle at 18% 78%, rgba(222,247,197,0.24), transparent 20%), linear-gradient(145deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0) 42%)',
    panel: 'from-white to-[#eef8df]',
    glow: 'bg-lime-200/40',
    featureTitle: 'Balcony Garden Kit',
    featureText: 'Starter-friendly essentials for daily green routines.',
  },
  {
    id: 3,
    heading: 'Discover Our Plant Collection',
    description:
      'From indoor plants to outdoor greenery, find the perfect plants to refresh your space.',
    buttonLabel: 'Shop Plants',
    badge: 'Curated collection',
    href: '#products',
    stats: ['Indoor and outdoor picks', 'Decor-ready styling'],
    palette: 'from-[#2b2a1f] via-[#5a6a37] to-[#dcc690]',
    texture:
      'radial-gradient(circle at 22% 72%, rgba(255,255,255,0.18), transparent 16%), radial-gradient(circle at 82% 18%, rgba(244,239,226,0.2), transparent 22%), linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0) 45%)',
    panel: 'from-white to-[#f4efe2]',
    glow: 'bg-amber-200/40',
    featureTitle: 'Signature Collection',
    featureText: 'Layered foliage, statement pots, and modern textures.',
  },
  {
    id: 4,
    heading: 'Live the Green Lifestyle',
    description:
      'Plants bring life, beauty, and fresh energy to every home. Make your space greener today.',
    buttonLabel: 'View Collection',
    badge: 'Urban green living',
    href: '#testimonials',
    stats: ['Lifestyle-driven decor', 'Low-maintenance favorites'],
    palette: 'from-[#0e3a35] via-[#1f766b] to-[#b6ead2]',
    texture:
      'radial-gradient(circle at 18% 24%, rgba(255,255,255,0.18), transparent 16%), radial-gradient(circle at 76% 78%, rgba(179,235,221,0.26), transparent 22%), linear-gradient(155deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0) 45%)',
    panel: 'from-white to-[#e3f7ef]',
    glow: 'bg-teal-200/40',
    featureTitle: 'Green Living Edit',
    featureText: 'Fresh styling ideas for shelves, corners, and patios.',
  },
];

const categoriesData = [
  {
    id: 1,
    title: 'Indoor Plants',
    description: 'Breathe life into your space with air-purifying indoor greenery.',
    image: 'https://images.unsplash.com/photo-1545241047-6083a3684587?q=80&w=1000&auto=format&fit=crop',
    iconName: 'Indoor',
    path: '/products/indoor-plants',
  },
  {
    id: 2,
    title: 'Outdoor Garden',
    description: 'Transform your outdoor areas into lush, vibrant garden retreats.',
    image: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?q=80&w=1000&auto=format&fit=crop',
    iconName: 'Outdoor',
    path: '/products/outdoor-plants',
  },
  {
    id: 3,
    title: 'Desert Beauties',
    description: 'Unique succulents and cacti for a minimal, low-maintenance aesthetic.',
    image: 'https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?q=80&w=1000&auto=format&fit=crop',
    iconName: 'Cactus',
    path: '/products/indoor-plants#succulents',
  },
  {
    id: 4,
    title: 'Designer Pots',
    description: 'Handcrafted planters to perfectly complement your botanical collection.',
    image: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?q=80&w=1000&auto=format&fit=crop',
    iconName: 'Pots',
    path: '/products/pots-planters',
  },
  {
    id: 5,
    title: 'Artisan Tools',
    description: 'Professional grade tools designed for the modern plant enthusiast.',
    image: 'https://img.freepik.com/free-photo/carpenter-works-with-tree_1157-18664.jpg?semt=ais_rp_50_assets&w=740&q=80',
    iconName: 'Tools',
    path: '/products/gardening-tools',
  },
  {
    id: 6,
    title: 'Organic Seeds',
    description: 'Start your green legacy with our premium non-GMO seed collection.',
    image: 'https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?q=80&w=1000&auto=format&fit=crop',
    iconName: 'Seeds',
    path: '/products/seeds-bulbs',
  },
];


const whyChooseUsData = [
  {
    id: 1,
    title: 'Fresh & Healthy Plants',
    description: 'Nursery-grown plants with healthy roots, vibrant foliage, and quality checks before dispatch.',
    icon: HiOutlineSparkles,
    accent: 'from-emerald-100 to-lime-50',
  },
  {
    id: 2,
    title: 'Fast Delivery',
    description: 'Careful packaging and quick doorstep delivery so every plant reaches safely and fresh.',
    icon: HiOutlineTruck,
    accent: 'from-teal-100 to-emerald-50',
  },
  {
    id: 3,
    title: 'Secure Payment',
    description: 'Trusted checkout flow with protected payment options for smooth and worry-free orders.',
    icon: HiOutlineShieldCheck,
    accent: 'from-lime-100 to-amber-50',
  },
  {
    id: 4,
    title: 'Expert Support',
    description: 'Plant care guidance, simple maintenance tips, and ongoing help for your green corner.',
    icon: HiOutlinePhone,
    accent: 'from-emerald-100 to-teal-50',
  },
]

const testimonialsData = [
  {
    id: 1,
    name: 'Ravi Sharma',
    city: 'Jaipur',
    rating: 5,
    review: 'Plants arrived fresh and healthy. Packaging was very good and the pots looked premium too.',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=400&auto=format&fit=crop',
  },
  {
    id: 2,
    name: 'Anjali Verma',
    city: 'Delhi',
    rating: 4,
    review: 'Great nursery experience. Indoor plants quality is excellent and delivery was faster than expected.',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=400&auto=format&fit=crop',
  },
  {
    id: 3,
    name: 'Mohit Singh',
    city: 'Udaipur',
    rating: 5,
    review: 'Support team shared simple care tips and every plant reached in clean, secure packaging.',
    image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=400&auto=format&fit=crop',
  },
]

function Home() {
  const navigate = useNavigate()
  const [activeSlide, setActiveSlide] = useState(0)
  const [featuredFromApi, setFeaturedFromApi] = useState([])

  useEffect(() => {
    let cancelled = false
    ;(async () => {
      try {
        const data = await api('/products?limit=12&active=true')
        if (!cancelled) setFeaturedFromApi(data.items || [])
      } catch {
        if (!cancelled) setFeaturedFromApi([])
      }
    })()
    return () => {
      cancelled = true
    }
  }, [])

  const topPicks = useMemo(() => {
    return featuredFromApi.slice(0, 4).map(mapApiToTopPick)
  }, [featuredFromApi])

  const bestSellingList = useMemo(() => {
    return featuredFromApi.slice(4, 8).map(mapApiToBestSeller)
  }, [featuredFromApi])

  const openProduct = (product) => {
    const pid = product?._id || product?.id
    if (pid && typeof pid === 'string' && pid.length === 24) {
      goTo(`/product/${pid}`)
      return
    }
    goTo('/products')
  }

  const goTo = (path) => {
    if (path.startsWith('#')) {
      window.location.hash = path
      return
    }

    if (window.location.pathname !== path) {
      navigate(path)
    } else {
      window.scrollTo({ top: 0, behavior: 'auto' })
    }
  }

  const handleAddToCart = async (product) => {
    if (!getCurrentUser()) {
      navigate('/login')
      return
    }

    const pid = product._id || product.id
    if (pid && typeof pid === 'string' && pid.length === 24) {
      const result = await addCartItemByProductId(pid, 1)
      if (!result.ok) {
        window.alert(result.message)
        return
      }
      navigate('/cart')
      return
    }
    window.alert('Product is unavailable right now.')
  }

  const iconMap = {
    Indoor: HiOutlineHomeModern,
    Outdoor: GiTreehouse,
    Cactus: GiCactus,
    Pots: GiFlowerPot,
    Tools: GiSpade,
    Seeds: GiPlantSeed,
  }

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setActiveSlide((current) => (current + 1) % slidesData.length)
    }, 4000)

    return () => window.clearInterval(intervalId)
  }, [])

  const goToSlide = (index) => setActiveSlide(index)
  const goToPrevious = () => setActiveSlide((current) => (current - 1 + slidesData.length) % slidesData.length)
  const goToNext = () => setActiveSlide((current) => (current + 1) % slidesData.length)

  return (
    <div className="min-h-screen bg-white">
      <section id="home" className="relative h-screen min-h-[750px] w-full overflow-hidden bg-emerald-950">
        <div className="relative h-full w-full">
          {slidesData.map((slide, index) => {
            const isActive = index === activeSlide
            return (
              <article
                key={slide.id}
                className={`absolute inset-0 transition-all duration-700 ${isActive ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
                  }`}
                aria-hidden={!isActive}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${slide.palette}`} />
                <div className="absolute inset-0 opacity-90" style={{ backgroundImage: slide.texture }} />
                <div className="absolute -left-24 top-10 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
                <div className="absolute right-0 top-1/3 h-80 w-80 rounded-full bg-lime-100/10 blur-3xl" />
                <div className="absolute bottom-0 left-1/4 h-52 w-52 rounded-full bg-white/10 blur-3xl" />
                <div className="absolute inset-y-0 right-[8%] hidden w-px bg-white/12 lg:block" />

                <div className="relative z-10 mx-auto grid min-h-[calc(100vh-5rem)] w-full max-w-[1600px] grid-cols-1 gap-10 px-4 pb-24 pt-10 sm:px-6 lg:grid-cols-2 lg:px-10 xl:px-16">
                  <div className="order-1 flex flex-col justify-center gap-6 text-left text-white lg:pr-8">
                    <div className="flex flex-wrap items-center gap-3 justify-start">
                      <span className="inline-flex rounded-full border border-white/25 bg-white/10 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.28em] text-white/90 backdrop-blur-md">
                        {slide.badge}
                      </span>
                      <span className="inline-flex rounded-full border border-white/20 bg-black/10 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.28em] text-white/80 backdrop-blur-md">
                        Premium nursery
                      </span>
                    </div>

                    <div className="space-y-4">
                      <h1 className="max-w-2xl text-4xl font-semibold leading-tight sm:text-5xl lg:text-6xl xl:text-7xl">
                        {slide.heading}
                      </h1>
                      <p className="max-w-xl text-base leading-7 text-white/85 sm:text-lg">
                        {slide.description}
                      </p>
                    </div>

                    <div className="flex flex-wrap justify-start gap-3 text-xs font-medium sm:text-sm">
                      {slide.stats.map((stat) => (
                        <span
                          key={stat}
                          className="rounded-full border border-white/20 bg-white/12 px-4 py-2 text-white/90 backdrop-blur-sm"
                        >
                          {stat}
                        </span>
                      ))}
                    </div>

                    <div className="flex flex-wrap items-center justify-start gap-3">
                      <a
                        href={slide.href}
                        className="inline-flex items-center justify-center rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-emerald-950 transition hover:bg-lime-100"
                      >
                        {slide.buttonLabel}
                      </a>
                      <a
                        href="/contact"
                        className="inline-flex items-center justify-center rounded-full border border-white/35 bg-white/8 px-7 py-3.5 text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-white/12"
                      >
                        Book a Visit
                      </a>
                    </div>

                    <div className="flex flex-wrap justify-start gap-4 pt-2">
                      <div className="min-w-[160px] rounded-[1.5rem] border border-white/18 bg-white/10 px-5 py-4 backdrop-blur-md">
                        <p className="text-[11px] uppercase tracking-[0.28em] text-white/70">Live stock</p>
                        <p className="mt-2 text-2xl font-semibold text-white">4k+</p>
                      </div>
                      <div className="min-w-[160px] rounded-[1.5rem] border border-white/18 bg-white/10 px-5 py-4 backdrop-blur-md">
                        <p className="text-[11px] uppercase tracking-[0.28em] text-white/70">Happy homes</p>
                        <p className="mt-2 text-2xl font-semibold text-white">12k</p>
                      </div>
                    </div>
                  </div>

                  <div className="order-2 flex items-center justify-center">
                    <div className="relative w-full max-w-[560px]">
                      <div className={`absolute -left-6 top-16 h-40 w-40 rounded-full ${slide.glow} blur-3xl`} />
                      <div className={`absolute -right-4 bottom-10 h-32 w-32 rounded-full ${slide.glow} blur-3xl`} />

                      <div className="absolute left-6 right-6 top-6 z-10 flex items-center justify-between rounded-full border border-white/30 bg-white/12 px-4 py-3 text-white backdrop-blur-md">
                        <div className="flex items-center gap-2">
                          <span className="grid h-8 w-8 place-items-center rounded-full bg-white text-emerald-900">
                            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
                              <path d="M4 14c0-5 4-9 9-9 0 5-4 9-9 9Z" />
                              <path d="M9 20c.5-4 3-7 7-9" />
                            </svg>
                          </span>
                          <span className="text-sm font-semibold">Nurser Collection</span>
                        </div>
                        <span className="rounded-full border border-white/20 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em]">
                          24/7 care
                        </span>
                      </div>

                      <div className={`relative overflow-hidden rounded-[2.25rem] border border-white/15 bg-gradient-to-br ${slide.panel} p-5 pt-24 shadow-[0_24px_80px_rgba(15,23,42,0.28)]`}>
                        <div className="rounded-[1.75rem] bg-[#f7fbf4]/95 p-5">
                          <div className="mb-5 flex items-start justify-between gap-4">
                            <div>
                              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-emerald-800/70">
                                Featured setup
                              </p>
                              <h2 className="mt-2 text-2xl font-semibold text-slate-900">{slide.featureTitle}</h2>
                            </div>
                            <div className="rounded-full bg-emerald-950 px-3 py-1 text-xs font-semibold text-white">
                              New
                            </div>
                          </div>

                          <div className="grid gap-4 md:grid-cols-[1.1fr_0.9fr]">
                            <div className="rounded-[1.5rem] bg-gradient-to-br from-[#d9efd8] to-[#8dc18c] p-4">
                              <div className="flex h-64 items-end justify-center rounded-[1.25rem] bg-[radial-gradient(circle_at_top,_#f7ffe8_0%,_#d8f0cb_42%,_#97c58f_100%)]">
                                <div className="relative mb-5">
                                  <div className="mx-auto h-28 w-28 rounded-t-[55%] rounded-b-[45%] bg-[#2f7f4f]" />
                                  <div className="absolute -left-10 top-9 h-16 w-16 rotate-[-30deg] rounded-t-[55%] rounded-b-[45%] bg-[#419a5f]" />
                                  <div className="absolute -right-10 top-9 h-16 w-16 rotate-[30deg] rounded-t-[55%] rounded-b-[45%] bg-[#419a5f]" />
                                  <div className="mx-auto h-20 w-3 rounded-full bg-[#2c5f3f]" />
                                  <div className="mx-auto -mt-1 h-16 w-28 rounded-b-[1.6rem] rounded-t-[0.5rem] bg-[#b77748]" />
                                </div>
                              </div>
                            </div>

                            <div className="flex flex-col gap-4">
                              <div className="rounded-[1.5rem] bg-white p-4 shadow-sm">
                                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-500">Best for</p>
                                <p className="mt-2 text-sm leading-6 text-slate-700">{slide.featureText}</p>
                              </div>

                              <div className="rounded-[1.5rem] bg-emerald-950 p-4 text-white shadow-sm">
                                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-emerald-100/80">Offer</p>
                                <p className="mt-2 text-3xl font-semibold">20%</p>
                                <p className="text-sm text-emerald-100/80">Off on planter combos this week.</p>
                              </div>

                              <div className="rounded-[1.5rem] bg-white p-4 shadow-sm">
                                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-500">Support</p>
                                <p className="mt-2 text-sm text-slate-700">Plant care guidance included with every order.</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            )
          })}

          <div className="pointer-events-none absolute inset-y-0 left-0 right-0 z-20 hidden items-center justify-between px-4 sm:flex sm:px-6 lg:px-8">
            <button
              type="button"
              onClick={goToPrevious}
              className="pointer-events-auto grid h-12 w-12 place-items-center rounded-full border border-white/25 bg-black/15 text-white backdrop-blur-md transition hover:bg-black/30"
              aria-label="Previous slide"
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path strokeLinecap="round" strokeLinejoin="round" d="m15 18-6-6 6-6" />
              </svg>
            </button>
            <button
              type="button"
              onClick={goToNext}
              className="pointer-events-auto grid h-12 w-12 place-items-center rounded-full border border-white/30 bg-white text-emerald-950 shadow-lg transition hover:bg-lime-100"
              aria-label="Next slide"
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path strokeLinecap="round" strokeLinejoin="round" d="m9 6 6 6-6 6" />
              </svg>
            </button>
          </div>

          <div className="pointer-events-none absolute inset-x-0 bottom-6 z-20 mx-auto flex w-[calc(100%-2rem)] max-w-[1600px] items-center justify-center sm:w-[calc(100%-3rem)] lg:bottom-8 lg:w-[calc(100%-5rem)] xl:w-[calc(100%-8rem)]">
            <div className="pointer-events-auto flex items-center gap-3 rounded-full border border-white/20 bg-white/10 px-4 py-3 backdrop-blur-md">
              {slidesData.map((slide, index) => (
                <button
                  key={slide.id}
                  type="button"
                  onClick={() => goToSlide(index)}
                  className={`h-2 rounded-full transition-all duration-500 ${index === activeSlide ? 'w-9 bg-white' : 'w-2 bg-white/45 hover:bg-white/70'
                    }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>

          <div className="pointer-events-none absolute inset-x-0 bottom-20 z-20 flex items-center justify-center sm:hidden">
            <div className="pointer-events-auto flex items-center gap-3 rounded-full border border-white/20 bg-white/10 px-3 py-3 backdrop-blur-md">
              <button
                type="button"
                onClick={goToPrevious}
                className="grid h-11 w-11 place-items-center rounded-full border border-white/25 bg-black/15 text-white backdrop-blur-md transition hover:bg-black/30"
                aria-label="Previous slide"
              >
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m15 18-6-6 6-6" />
                </svg>
              </button>
              <button
                type="button"
                onClick={goToNext}
                className="grid h-11 w-11 place-items-center rounded-full border border-white/30 bg-white text-emerald-950 shadow-lg transition hover:bg-lime-100"
                aria-label="Next slide"
              >
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m9 6 6 6-6 6" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Premium Categories Section */}
      <section id="categories" className="relative py-32 px-6 overflow-hidden bg-[#f8faf7]">
        {/* Abstract background elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-100/50 rounded-full blur-[120px] -mr-48 -mt-24 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-lime-100/50 rounded-full blur-[120px] -ml-48 -mb-24 pointer-events-none"></div>

        <div className="max-w-[1400px] mx-auto relative">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20">
            <div className="max-w-2xl">
              <div className="flex items-center gap-3 mb-4">
                <span className="w-12 h-[2px] bg-emerald-600"></span>
                <span className="text-emerald-700 text-sm font-bold uppercase tracking-[0.2em]">Our Collection</span>
              </div>
              <h2 className="text-5xl md:text-6xl font-bold text-emerald-950 leading-[1.1]">
                Curated <span className="text-emerald-600">Botanical</span> Categories
              </h2>
            </div>
            <p className="text-slate-600 text-lg max-w-sm leading-relaxed">
              Explore our meticulously nurtured selection of plants and essentials designed to transform any space.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categoriesData.map((category) => {
              const Icon = iconMap[category.iconName] || HiOutlineHomeModern;
              return (
                <div
                  key={category.id}
                  className="group relative h-[480px] overflow-hidden rounded-[2.5rem] bg-white shadow-sm hover:shadow-2xl transition-all duration-700"
                >
                  {/* Image background with zoom on hover */}
                  <div className="absolute inset-0 overflow-hidden">
                    <img
                      src={category.image}
                      alt={category.title}
                      className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                    />
                    {/* Subtle overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-emerald-950 via-emerald-900/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-700"></div>
                  </div>

                  {/* Content Overlay */}
                  <div className="absolute inset-0 p-10 flex flex-col justify-end translate-y-8 group-hover:translate-y-0 transition-transform duration-700">
                    <div className={`w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 flex items-center justify-center text-white mb-6 transform -rotate-12 group-hover:rotate-0 transition-all duration-500`}>
                      <Icon className="w-6 h-6" />
                    </div>

                    <div className="overflow-hidden">
                      <h3 className="text-3xl font-bold text-white mb-3 translate-y-4 group-hover:translate-y-0 transition-transform duration-700 delay-100">
                        {category.title}
                      </h3>
                      <p className="text-emerald-50/80 text-sm leading-relaxed mb-8 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-700 delay-200">
                        {category.description}
                      </p>
                    </div>

                    <div className="flex items-center gap-4 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-700 delay-300">
                      <a
                        href={category.path}
                        className="inline-flex items-center gap-2 px-6 py-3 bg-white text-emerald-950 text-sm font-bold rounded-full hover:bg-emerald-500 hover:text-white transition-all transform hover:scale-105"
                      >
                        Browse Collection
                        <FiArrowRight className="w-4 h-4" />
                      </a>
                    </div>
                  </div>

                  {/* Border effect on hover */}
                  <div className="absolute inset-0 border-[16px] border-white/0 group-hover:border-white/10 transition-all duration-700 rounded-[2.5rem] pointer-events-none"></div>
                </div>
              );
            })}
          </div>

          <div className="mt-20 text-center">
            <button type="button" onClick={() => goTo('/products')} className="inline-flex items-center gap-3 text-emerald-900 font-bold hover:text-emerald-600 transition-colors">
              <span className="w-8 h-[1px] bg-emerald-300"></span>
              View All Categories
              <HiOutlineMagnifyingGlass className="w-5 h-5" />
              <span className="w-8 h-[1px] bg-emerald-300"></span>
            </button>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section id="products" className="py-32 px-6 bg-white overflow-hidden">
        <div className="max-w-[1400px] mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="w-12 h-[2px] bg-emerald-600"></span>
                <span className="text-emerald-700 text-sm font-bold uppercase tracking-[0.2em]">Top Picks</span>
              </div>
              <h2 className="text-5xl md:text-6xl font-bold text-emerald-950 leading-[1.1]">
                Featured <span className="text-emerald-600">Products</span>
              </h2>
            </div>
            <div className="flex gap-4">
              <button type="button" onClick={() => goTo('#products')} className="px-8 py-3 bg-emerald-50 text-emerald-900 rounded-full font-bold hover:bg-emerald-100 transition-all">
                All Plants
              </button>
              <button type="button" onClick={() => goTo('/contact')} className="px-8 py-3 bg-white border border-emerald-100 text-slate-600 rounded-full font-bold hover:bg-emerald-50 transition-all">
                Accessories
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {topPicks.map((product) => (
              <div key={product._id || product.id} className="group">
                <div className="relative aspect-[4/5] rounded-[2rem] overflow-hidden bg-emerald-50 mb-6">
                  <img
                    src={product.image}
                    alt={product.name}
                    onClick={() => openProduct(product)}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute top-4 right-4 z-10">
                    <button type="button" onClick={() => goTo('/login')} className="w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-emerald-950 hover:bg-emerald-600 hover:text-white transition-all shadow-sm">
                      <HiOutlineHeart className="w-5 h-5" />
                    </button>
                  </div>
                  {product.tag && (
                    <div className="absolute top-4 left-4 z-10 px-4 py-1.5 bg-emerald-600 text-white text-[10px] font-bold uppercase tracking-widest rounded-full">
                      {product.tag}
                    </div>
                  )}
                  {/* Action Bar on hover */}
                  <div className="absolute bottom-4 left-4 right-4 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                    <button type="button" onClick={() => handleAddToCart(product)} className="w-full py-4 bg-emerald-950 text-white rounded-2xl font-bold text-sm shadow-2xl flex items-center justify-center gap-2 hover:bg-emerald-800">
                      <HiOutlineShoppingBag className="w-5 h-5" />
                      Add to Cart
                    </button>
                  </div>
                </div>

                <div className="px-2">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-emerald-600 uppercase tracking-widest">{product.category}</span>
                    <div className="flex items-center gap-1">
                      <HiOutlineStar className="w-3.5 h-3.5 text-amber-400" />
                      <span className="text-xs font-bold text-slate-900">{product.rating}</span>
                    </div>
                  </div>
                  <h3
                    className="text-xl font-bold text-emerald-950 mb-1 cursor-pointer group-hover:text-emerald-600 transition-colors"
                    onClick={() => openProduct(product)}
                  >
                    {product.name}
                  </h3>
                  {product.subtitle ? (
                    <p className="mb-2 line-clamp-2 text-sm leading-relaxed text-slate-500">{product.subtitle}</p>
                  ) : null}
                  <div className="flex items-center justify-between">
                    <div>
                      {product.mrp ? (
                        <p className="text-xs font-semibold text-slate-400 line-through">₹{product.mrp}</p>
                      ) : null}
                      <p className="text-lg font-bold text-emerald-900">₹{product.price}</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => openProduct(product)}
                      className="text-sm font-bold text-slate-400 hover:text-emerald-600 border-b border-transparent hover:border-emerald-600 transition-all"
                    >
                      Quick View
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="why-choose-us" className="relative overflow-hidden bg-[#f8faf7] px-6 py-32">
        <div className="pointer-events-none absolute inset-y-0 left-0 w-72 bg-[radial-gradient(circle_at_center,_rgba(16,185,129,0.16),_transparent_68%)]" />
        <div className="pointer-events-none absolute right-0 top-0 h-72 w-72 rounded-full bg-lime-100/70 blur-[120px]" />

        <div className="relative mx-auto max-w-[1400px]">
          <div className="mb-20 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <div className="mb-4 flex items-center gap-3">
                <span className="h-[2px] w-12 bg-emerald-600"></span>
                <span className="text-sm font-bold uppercase tracking-[0.2em] text-emerald-700">Why Choose Us</span>
              </div>
              <h2 className="text-5xl font-bold leading-[1.1] text-emerald-950 md:text-6xl">
                Healthy Plants With <span className="text-emerald-600">Best Care</span>
              </h2>
            </div>
            <p className="max-w-md text-lg leading-relaxed text-slate-600">
              Built in the same premium flow as your homepage, this section highlights the trust points customers need before buying.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-4">
            {whyChooseUsData.map((item) => {
              const Icon = item.icon

              return (
                <article
                  key={item.id}
                  className="group relative overflow-hidden rounded-[2.25rem] border border-emerald-100 bg-white p-8 shadow-sm transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_28px_60px_rgba(16,63,42,0.14)]"
                >
                  <div className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${item.accent}`} />
                  <div className={`mb-8 inline-flex h-16 w-16 items-center justify-center rounded-[1.5rem] bg-gradient-to-br ${item.accent} text-emerald-900 shadow-sm transition-transform duration-500 group-hover:scale-110`}>
                    <Icon className="h-7 w-7" />
                  </div>
                  <h3 className="mb-3 text-2xl font-bold text-emerald-950">{item.title}</h3>
                  <p className="mb-8 text-sm leading-7 text-slate-600">{item.description}</p>
                  <div className="flex items-center gap-3 text-sm font-bold text-emerald-700">
                    <span className="h-[1px] w-10 bg-emerald-200 transition-all duration-500 group-hover:w-14" />
                    Trusted nursery service
                  </div>
                </article>
              )
            })}
          </div>
        </div>
      </section>

      <section id="best-selling-plants" className="overflow-hidden bg-white px-6 py-32">
        <div className="mx-auto max-w-[1400px]">
          <div className="mb-20 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <div>
              <div className="mb-4 flex items-center gap-3">
                <span className="h-[2px] w-12 bg-emerald-600"></span>
                <span className="text-sm font-bold uppercase tracking-[0.2em] text-emerald-700">Best Selling Plants</span>
              </div>
              <h2 className="text-5xl font-bold leading-[1.1] text-emerald-950 md:text-6xl">
                Most Loved <span className="text-emerald-600">By Customers</span>
              </h2>
            </div>
            <a
              href="#products"
              className="inline-flex items-center gap-2 self-start rounded-full border border-emerald-200 px-6 py-3 text-sm font-bold text-emerald-900 transition hover:border-emerald-600 hover:bg-emerald-50"
            >
              View all plants
              <HiOutlineArrowRight className="h-5 w-5" />
            </a>
          </div>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 xl:grid-cols-4">
            {bestSellingList.map((plant) => (
              <article key={plant._id || plant.id} className="group">
                <div className="relative overflow-hidden rounded-[2rem] bg-[#f7fbf4] p-3 shadow-sm transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_32px_65px_rgba(15,23,42,0.12)]">
                  <div className="relative aspect-[4/5] overflow-hidden rounded-[1.5rem]">
                    <img
                      src={plant.image}
                      alt={plant.name}
                      onClick={() => openProduct(plant)}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/40 via-transparent to-transparent opacity-70" />
                    <div className="absolute left-4 top-4 rounded-full bg-white/92 px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.24em] text-emerald-900">
                      {plant.tag}
                    </div>
                    <button type="button" onClick={() => goTo('/login')} className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full bg-white/90 text-emerald-950 shadow-sm transition hover:bg-emerald-600 hover:text-white">
                      <HiOutlineHeart className="h-5 w-5" />
                    </button>
                    <div className="absolute inset-x-4 bottom-4 translate-y-5 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                      <button type="button" onClick={() => handleAddToCart(plant)} className="flex w-full items-center justify-center gap-2 rounded-2xl bg-emerald-950 py-4 text-sm font-bold text-white shadow-2xl transition hover:bg-emerald-800">
                        <HiOutlineShoppingBag className="h-5 w-5" />
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>

                <div className="px-2 pt-6">
                  <div className="mb-3 flex items-center justify-between gap-4">
                    <span className="rounded-full bg-emerald-50 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.22em] text-emerald-700">
                      {plant.badge}
                    </span>
                    <div className="flex items-center gap-1.5 text-sm font-bold text-slate-900">
                      <HiOutlineStar className="h-4 w-4 text-amber-400" />
                      {plant.rating}
                      <span className="text-xs font-medium text-slate-400">({plant.reviews})</span>
                    </div>
                  </div>
                  <h3 className="mb-2 cursor-pointer text-2xl font-bold text-emerald-950 transition-colors group-hover:text-emerald-600" onClick={() => openProduct(plant)}>{plant.name}</h3>
                  {plant.subtitle ? (
                    <p className="mb-2 line-clamp-2 text-sm leading-relaxed text-slate-500">{plant.subtitle}</p>
                  ) : null}
                  <div className="flex items-center justify-between">
                    <div>
                      {plant.mrp ? (
                        <p className="text-xs font-semibold text-slate-400 line-through">₹{plant.mrp}</p>
                      ) : null}
                      <p className="text-xl font-bold text-emerald-900">₹{plant.price}</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => openProduct(plant)}
                      className="text-sm font-bold text-slate-400 transition-all hover:text-emerald-600"
                    >
                      Quick View
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
          {!topPicks.length ? <p className="mt-8 text-center text-slate-500">Products are loading. Please refresh once backend products are available.</p> : null}
        </div>
      </section>

      <section id="testimonials" className="relative overflow-hidden bg-[#f8faf7] px-6 py-32">
        <div className="pointer-events-none absolute left-1/2 top-0 h-72 w-72 -translate-x-1/2 rounded-full bg-emerald-100/60 blur-[120px]" />

        <div className="relative mx-auto max-w-[1400px]">
          <div className="mb-20 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl">
              <div className="mb-4 flex items-center gap-3">
                <span className="h-[2px] w-12 bg-emerald-600"></span>
                <span className="text-sm font-bold uppercase tracking-[0.2em] text-emerald-700">Happy Customers</span>
              </div>
              <h2 className="text-5xl font-bold leading-[1.1] text-emerald-950 md:text-6xl">
                What Our <span className="text-emerald-600">Customers Say</span>
              </h2>
            </div>
            <p className="max-w-md text-lg leading-relaxed text-slate-600">
              Real reviews help the store feel trustworthy, so this section mirrors your premium card style with strong social proof.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            {testimonialsData.map((testimonial) => (
              <article
                key={testimonial.id}
                className="rounded-[2.25rem] border border-emerald-100 bg-white p-8 shadow-sm transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_28px_65px_rgba(15,23,42,0.12)]"
              >
                <div className="mb-6 flex items-center gap-1">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <HiOutlineStar
                      key={`${testimonial.id}-${index}`}
                      className={`h-5 w-5 ${index < testimonial.rating ? 'text-amber-400' : 'text-slate-200'}`}
                    />
                  ))}
                </div>
                <p className="mb-8 text-base leading-8 text-slate-600">"{testimonial.review}"</p>
                <div className="flex items-center gap-4">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="h-16 w-16 rounded-2xl object-cover"
                  />
                  <div>
                    <h3 className="text-lg font-bold text-emerald-950">{testimonial.name}</h3>
                    <p className="text-sm font-medium text-slate-500">{testimonial.city}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

    </div>
  )
}

export default Home
