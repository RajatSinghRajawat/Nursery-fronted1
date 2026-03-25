import { useMemo, useState } from 'react'
import { FiArrowRight, FiPlay } from 'react-icons/fi'
import { HiOutlineArrowLeft, HiOutlineArrowRight, HiOutlineSparkles, HiOutlineXMark } from 'react-icons/hi2'

const galleryItems = [
  {
    id: 1,
    title: 'Monstera Display',
    category: 'Indoor Plants',
    image: 'https://images.unsplash.com/photo-1545241047-6083a3684587?q=80&w=1200&auto=format&fit=crop',
  },
  {
    id: 2,
    title: 'Terrace Greenery',
    category: 'Outdoor Plants',
    image: 'https://images.unsplash.com/photo-1512428813834-c702c7702b78?q=80&w=1200&auto=format&fit=crop',
  },
  {
    id: 3,
    title: 'Blooming Pots',
    category: 'Flower Plants',
    image: 'https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?q=80&w=1200&auto=format&fit=crop',
  },
  {
    id: 4,
    title: 'Succulent Shelf',
    category: 'Succulents',
    image: 'https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?q=80&w=1200&auto=format&fit=crop',
  },
  {
    id: 5,
    title: 'Nursery Walkway',
    category: 'Nursery Garden',
    image: 'https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?q=80&w=1200&auto=format&fit=crop',
  },
  {
    id: 6,
    title: 'Air Purifying Corner',
    category: 'Indoor Plants',
    image: 'https://images.unsplash.com/photo-1614594975525-e45190c55d0b?q=80&w=1200&auto=format&fit=crop',
  },
  {
    id: 7,
    title: 'Garden Path Plants',
    category: 'Outdoor Plants',
    image: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?q=80&w=1200&auto=format&fit=crop',
  },
  {
    id: 8,
    title: 'Fresh Rose Pots',
    category: 'Flower Plants',
    image: 'https://images.unsplash.com/photo-1592150621744-aca64f48394a?q=80&w=1200&auto=format&fit=crop',
  },
  {
    id: 9,
    title: 'Mini Desert Collection',
    category: 'Succulents',
    image: 'https://images.unsplash.com/photo-1501004318641-b39e6451bec6?q=80&w=1200&auto=format&fit=crop',
  },
  {
    id: 10,
    title: 'Greenhouse Tables',
    category: 'Nursery Garden',
    image: 'https://images.unsplash.com/photo-1459156212016-c812468e2115?q=80&w=1200&auto=format&fit=crop',
  },
  {
    id: 11,
    title: 'Window Plant Styling',
    category: 'Indoor Plants',
    image: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?q=80&w=1200&auto=format&fit=crop',
  },
  {
    id: 12,
    title: 'Colorful Flower Rack',
    category: 'Flower Plants',
    image: 'https://images.unsplash.com/photo-1490750967868-88aa4486c946?q=80&w=1200&auto=format&fit=crop',
  },
]

const filterItems = ['All', 'Indoor Plants', 'Outdoor Plants', 'Flower Plants', 'Succulents', 'Nursery Garden']

const videoItems = [
  {
    id: 1,
    title: 'Nursery Tour',
    description: 'Walk through our greenhouse rows, curated displays, and premium plant setups.',
    image: 'https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?q=80&w=1200&auto=format&fit=crop',
  },
  {
    id: 2,
    title: 'Plant Care Tips',
    description: 'Simple watering, placement, and maintenance advice for healthy daily growth.',
    image: 'https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?q=80&w=1200&auto=format&fit=crop',
  },
  {
    id: 3,
    title: 'Greenhouse Highlights',
    description: 'A closer look at flowering sections, succulents, and indoor favorites in stock.',
    image: 'https://images.unsplash.com/photo-1459156212016-c812468e2115?q=80&w=1200&auto=format&fit=crop',
  },
]

const instagramItems = [
  {
    id: 1,
    title: '@nursergreens',
    image: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?q=80&w=900&auto=format&fit=crop',
  },
  {
    id: 2,
    title: '#GreenNursery',
    image: 'https://images.unsplash.com/photo-1614594975525-e45190c55d0b?q=80&w=900&auto=format&fit=crop',
  },
  {
    id: 3,
    title: '@plantcorners',
    image: 'https://images.unsplash.com/photo-1545241047-6083a3684587?q=80&w=900&auto=format&fit=crop',
  },
  {
    id: 4,
    title: '#NurseryStyle',
    image: 'https://images.unsplash.com/photo-1592150621744-aca64f48394a?q=80&w=900&auto=format&fit=crop',
  },
]

function Gallery() {
  const [activeFilter, setActiveFilter] = useState('All')
  const [lightboxIndex, setLightboxIndex] = useState(null)

  const filteredItems = useMemo(() => {
    if (activeFilter === 'All') {
      return galleryItems
    }

    return galleryItems.filter((item) => item.category === activeFilter)
  }, [activeFilter])

  const activeLightboxItem = lightboxIndex === null ? null : filteredItems[lightboxIndex]

  const openLightbox = (index) => {
    setLightboxIndex(index)
  }

  const closeLightbox = () => {
    setLightboxIndex(null)
  }

  const showPrevious = () => {
    setLightboxIndex((current) => (current === null ? current : (current - 1 + filteredItems.length) % filteredItems.length))
  }

  const showNext = () => {
    setLightboxIndex((current) => (current === null ? current : (current + 1) % filteredItems.length))
  }

  return (
    <div className="min-h-screen bg-white">
      <section className="relative overflow-hidden px-6 py-28 text-white">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1512428813834-c702c7702b78?q=80&w=1600&auto=format&fit=crop"
            alt="Nursery gallery hero"
            className="h-full w-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-950/90 via-emerald-900/75 to-emerald-700/45" />
        <div className="absolute inset-0 opacity-60" style={{ backgroundImage: 'linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0) 44%)' }} />

        <div className="relative mx-auto max-w-[1400px] py-20 text-center">
          <p className="mb-5 text-sm font-bold uppercase tracking-[0.28em] text-emerald-100/85">Our Plant Gallery</p>
          <h1 className="mx-auto max-w-4xl text-5xl font-bold leading-tight md:text-6xl xl:text-7xl">
            Explore Beautiful Plants, Green Corners, And Nursery Spaces
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-white/82 sm:text-lg">
            Browse premium plant styling, flowering displays, greenhouse scenes, and curated nursery moments designed to make the gallery feel alive, not flat.
          </p>
        </div>
      </section>

      <section className="bg-white px-6 py-20">
        <div className="mx-auto max-w-[1400px]">
          <div className="mb-10 flex flex-wrap justify-center gap-4">
            {filterItems.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => {
                  setActiveFilter(item)
                  setLightboxIndex(null)
                }}
                className={`rounded-full px-6 py-3 text-sm font-bold transition-all ${activeFilter === item ? 'bg-emerald-950 text-white shadow-lg' : 'border border-emerald-100 bg-[#f8faf7] text-emerald-900 hover:border-emerald-300 hover:bg-emerald-50'}`}
              >
                {item}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredItems.map((item, index) => (
              <button
                key={item.id}
                type="button"
                onClick={() => openLightbox(index)}
                className="group relative overflow-hidden rounded-[2rem] border-0 bg-[#f7fbf4] p-0 text-left shadow-sm transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_28px_60px_rgba(15,23,42,0.14)]"
              >
                <div className="aspect-[4/4.7] overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/88 via-emerald-950/18 to-transparent opacity-90" />
                <div className="absolute inset-0 flex flex-col justify-between p-6 text-white">
                  <div className="flex justify-end">
                    <span className="flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-white/10 backdrop-blur-sm transition-transform duration-500 group-hover:scale-110">
                      <HiOutlineSparkles className="h-5 w-5" />
                    </span>
                  </div>
                  <div>
                    <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.26em] text-emerald-100/85">{item.category}</p>
                    <div className="flex items-center justify-between gap-4">
                      <h2 className="text-2xl font-bold">{item.title}</h2>
                      <span className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-white/10 backdrop-blur-sm">
                        <FiArrowRight className="h-4 w-4" />
                      </span>
                    </div>
                  </div>
                </div>
              </button>
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
                <span className="text-sm font-bold uppercase tracking-[0.2em] text-emerald-700">Video Gallery</span>
              </div>
              <h2 className="text-5xl font-bold leading-[1.1] text-emerald-950 md:text-6xl">
                More Than Photos, <span className="text-emerald-600">A Full Nursery Feel</span>
              </h2>
            </div>
            <p className="max-w-md text-lg leading-8 text-slate-600">
              This optional section makes the gallery page feel more premium and gives space for tours, care clips, and greenhouse highlights.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            {videoItems.map((item) => (
              <article key={item.id} className="group overflow-hidden rounded-[2.25rem] bg-white shadow-sm transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_28px_60px_rgba(15,23,42,0.12)]">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-emerald-950/30" />
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
        <div className="mx-auto max-w-[1400px] overflow-hidden rounded-[2.75rem] bg-emerald-950 px-8 py-14 text-white shadow-[0_24px_80px_rgba(15,23,42,0.18)] sm:px-12">
          <div className="mb-12 max-w-3xl">
            <p className="text-sm font-bold uppercase tracking-[0.28em] text-emerald-100/80">Instagram Style Gallery</p>
            <h2 className="mt-4 text-4xl font-bold leading-tight sm:text-5xl">
              Follow Our Daily Green Stories
            </h2>
            <p className="mt-5 text-base leading-8 text-emerald-100/80 sm:text-lg">
              Styled like a social feed so the page feels active, fresh, and visually rich instead of static.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-5 md:grid-cols-4">
            {instagramItems.map((item) => (
              <a
                key={item.id}
                href={item.image}
                target="_blank"
                rel="noreferrer"
                className="group overflow-hidden rounded-[1.75rem] border border-white/10 bg-white/5"
              >
                <div className="aspect-square overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
                <div className="p-4">
                  <p className="text-sm font-bold text-white">{item.title}</p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {activeLightboxItem && (
        <div className="fixed inset-0 z-[70] bg-slate-950/92 px-4 py-6 backdrop-blur-md sm:px-8">
          <div className="mx-auto flex h-full max-w-[1400px] flex-col justify-center">
            <div className="mb-5 flex items-center justify-between text-white">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.28em] text-emerald-100/80">{activeLightboxItem.category}</p>
                <h3 className="mt-2 text-3xl font-bold">{activeLightboxItem.title}</h3>
              </div>
              <button
                type="button"
                onClick={closeLightbox}
                className="flex h-12 w-12 items-center justify-center rounded-full border border-white/15 bg-white/10 text-white transition hover:bg-white/16"
              >
                <HiOutlineXMark className="h-6 w-6" />
              </button>
            </div>

            <div className="grid flex-1 gap-6 lg:grid-cols-[auto_1fr_auto] lg:items-center">
              <button
                type="button"
                onClick={showPrevious}
                className="order-2 mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-white/15 bg-white/10 text-white transition hover:bg-white/16 lg:order-1"
              >
                <HiOutlineArrowLeft className="h-6 w-6" />
              </button>

              <div className="order-1 overflow-hidden rounded-[2rem] bg-white/5 lg:order-2">
                <img
                  src={activeLightboxItem.image}
                  alt={activeLightboxItem.title}
                  className="max-h-[72vh] w-full object-cover"
                />
              </div>

              <button
                type="button"
                onClick={showNext}
                className="order-3 mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-white/15 bg-white/10 text-white transition hover:bg-white/16"
              >
                <HiOutlineArrowRight className="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Gallery
