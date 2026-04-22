import {
  HiOutlineArrowRight,
  HiOutlineShieldCheck,
  HiOutlineSparkles,
  HiOutlineTruck,
  HiOutlineUsers,
} from 'react-icons/hi2'
import { GiPlantSeed, GiFlowerPot, GiCactus, GiTreeBranch, GiGardeningShears } from 'react-icons/gi'

const offerItems = [
  {
    id: 1,
    title: 'Indoor Plants',
    description: 'Air-purifying and low-maintenance greens for homes, offices, and calm everyday corners.',
    icon: GiPlantSeed,
  },
  {
    id: 2,
    title: 'Flower Plants',
    description: 'Color-rich flowering varieties curated for balconies, entrances, and gift-ready arrangements.',
    icon: GiFlowerPot,
  },
  {
    id: 3,
    title: 'Succulents',
    description: 'Compact, modern favorites that bring texture and style without demanding heavy upkeep.',
    icon: GiCactus,
  },
  {
    id: 4,
    title: 'Outdoor Plants',
    description: 'Hardy foliage, shrubs, and statement greens for terraces, gardens, and landscape projects.',
    icon: GiTreeBranch,
  },
  {
    id: 5,
    title: 'Pots & Tools',
    description: 'Planters, soil mixes, and essential gardening tools to support healthy growth from day one.',
    icon: GiGardeningShears,
  },
]

const chooseUsItems = [
  {
    id: 1,
    title: 'Healthy Plants',
    description: 'Every plant is nurtured with attention to root strength, leaf condition, and long-term growth.',
    icon: HiOutlineSparkles,
  },
  {
    id: 2,
    title: 'Safe Delivery',
    description: 'Protective packaging and dispatch checks help plants arrive fresh, stable, and shop-ready.',
    icon: HiOutlineTruck,
  },
  {
    id: 3,
    title: 'Organic Growing',
    description: 'We focus on responsible growing methods, natural nutrition, and balanced soil health.',
    icon: GiPlantSeed,
  },
  {
    id: 4,
    title: 'Customer Support',
    description: 'Simple care advice, pre-purchase guidance, and after-order help keep buying decisions easy.',
    icon: HiOutlineShieldCheck,
  },
]

const teamMembers = [
  {
    id: 1,
    name: 'Arjun Mehta',
    role: 'Founder',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=700&auto=format&fit=crop',
  },
  {
    id: 2,
    name: 'Neha Kapoor',
    role: 'Plant Expert',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=700&auto=format&fit=crop',
  },
  {
    id: 3,
    name: 'Raghav Singh',
    role: 'Garden Specialist',
    image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=700&auto=format&fit=crop',
  },
]

const galleryItems = [
  {
    id: 1,
    title: 'Greenhouse Rows',
    image: 'https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?q=80&w=900&auto=format&fit=crop',
  },
  {
    id: 2,
    title: 'Indoor Display',
    image: 'https://images.unsplash.com/photo-1545241047-6083a3684587?q=80&w=900&auto=format&fit=crop',
  },
  {
    id: 3,
    title: 'Flower Corner',
    image: 'https://images.unsplash.com/photo-1592150621744-aca64f48394a?q=80&w=900&auto=format&fit=crop',
  },
  {
    id: 4,
    title: 'Nursery Walkway',
    image: 'https://images.unsplash.com/photo-1512428813834-c702c7702b78?q=80&w=900&auto=format&fit=crop',
  },
]

function About() {
  return (
    <div className="min-h-screen bg-white">
      <section className="relative overflow-hidden bg-emerald-950 px-6 py-28 text-white">
        <div className="absolute inset-0 bg-gradient-to-br from-[#103d2a] via-[#1f6a47] to-[#b7d66d]" />
        <div className="absolute inset-0 opacity-90" style={{ backgroundImage: 'radial-gradient(circle at 16% 18%, rgba(255,255,255,0.22), transparent 18%), radial-gradient(circle at 82% 20%, rgba(217,239,216,0.24), transparent 20%), linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0) 46%)' }} />
        <div className="absolute -left-20 top-12 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute right-0 top-1/3 h-80 w-80 rounded-full bg-lime-100/10 blur-3xl" />

        <div className="relative mx-auto grid max-w-[1400px] gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div className="max-w-3xl">
            <p className="mb-5 text-sm font-bold uppercase tracking-[0.28em] text-emerald-100/85">About Our Nursery</p>
            <h1 className="text-5xl font-bold leading-tight md:text-6xl xl:text-7xl">
              Growing Healthy Plants And Long-Term Green Trust
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-white/85 sm:text-lg">
              Our nursery brings together healthy plants, organic care methods, and practical gardening support so homes and gardens feel greener, calmer, and more alive.
            </p>
             <p className="mt-6 max-w-2xl text-base leading-8 text-white/85 sm:text-lg">
              Our nursery brings together healthy plants, organic care methods, and practical gardening support so homes and gardens feel greener, calmer, and more alive.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <span className="rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium">100+ plant varieties</span>
              <span className="rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium">Trusted growing methods</span>
              <span className="rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium">Pan-India delivery support</span>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -left-4 top-10 h-36 w-36 rounded-full bg-white/12 blur-3xl" />
            <div className="overflow-hidden rounded-[2.5rem] border border-white/15 bg-white/10 p-4 backdrop-blur-md shadow-[0_24px_80px_rgba(15,23,42,0.3)]">
              <img
                src="https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?q=80&w=1200&auto=format&fit=crop"
                alt="Nursery plants"
                className="h-[520px] w-full rounded-[2rem] object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="overflow-hidden bg-white px-6 py-28">
        <div className="mx-auto grid max-w-[1400px] gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <div className="overflow-hidden rounded-[2.5rem] bg-[#f7fbf4] p-4 shadow-sm">
            <img
              src="https://images.unsplash.com/photo-1459156212016-c812468e2115?q=80&w=1200&auto=format&fit=crop"
              alt="Plants in nursery"
              className="h-[520px] w-full rounded-[2rem] object-cover"
            />
          </div>

          <div className="max-w-2xl">
            <div className="mb-4 flex items-center gap-3">
              <span className="h-[2px] w-12 bg-emerald-600" />
              <span className="text-sm font-bold uppercase tracking-[0.2em] text-emerald-700">Introduction</span>
            </div>
            <h2 className="text-5xl font-bold leading-[1.1] text-emerald-950 md:text-6xl">
              About <span className="text-emerald-600">Our Nursery</span>
            </h2>
            <p className="mt-6 text-lg leading-8 text-slate-600">
              We provide healthy and beautiful plants for homes, workspaces, balconies, and gardens. Our collection includes indoor plants, outdoor varieties, flowering options, succulents, pots, and everyday gardening essentials.
            </p>
            <p className="mt-5 text-lg leading-8 text-slate-600">
              Every plant is selected and maintained with proper care, thoughtful watering routines, and soil practices designed to keep growth strong from nursery to customer doorstep.
            </p>

            <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div className="rounded-[1.75rem] border border-emerald-100 bg-[#f8faf7] p-6">
                <p className="text-sm font-bold uppercase tracking-[0.22em] text-emerald-700">Healthy stock</p>
                <p className="mt-2 text-3xl font-bold text-emerald-950">4k+</p>
                <p className="mt-2 text-sm leading-6 text-slate-600">Actively nurtured plants across indoor, flowering, and outdoor categories.</p>
              </div>
              <div className="rounded-[1.75rem] border border-emerald-100 bg-[#f8faf7] p-6">
                <p className="text-sm font-bold uppercase tracking-[0.22em] text-emerald-700">Happy customers</p>
                <p className="mt-2 text-3xl font-bold text-emerald-950">12k</p>
                <p className="mt-2 text-sm leading-6 text-slate-600">Plant lovers trusting us for fresh delivery, styling advice, and repeat orders.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#f8faf7] px-6 py-28">
        <div className="mx-auto max-w-[1400px]">
          <div className="mb-16 max-w-2xl">
            <div className="mb-4 flex items-center gap-3">
              <span className="h-[2px] w-12 bg-emerald-600" />
              <span className="text-sm font-bold uppercase tracking-[0.2em] text-emerald-700">Mission & Vision</span>
            </div>
            <h2 className="text-5xl font-bold leading-[1.1] text-emerald-950 md:text-6xl">
              Built Around <span className="text-emerald-600">Greener Living</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            <article className="rounded-[2.25rem] border border-emerald-100 bg-white p-8 shadow-sm">
              <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-[1.5rem] bg-emerald-100 text-emerald-900">
                <GiPlantSeed className="h-8 w-8" />
              </div>
              <h3 className="text-3xl font-bold text-emerald-950">Our Mission</h3>
              <p className="mt-4 text-base leading-8 text-slate-600">
                To provide healthy plants, reliable care guidance, and accessible greenery that helps every home and garden feel more natural and alive.
              </p>
            </article>

            <article className="rounded-[2.25rem] border border-emerald-100 bg-white p-8 shadow-sm">
              <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-[1.5rem] bg-lime-100 text-emerald-900">
                <HiOutlineUsers className="h-8 w-8" />
              </div>
              <h3 className="text-3xl font-bold text-emerald-950">Our Vision</h3>
              <p className="mt-4 text-base leading-8 text-slate-600">
                To make cities greener, encourage more people to grow plants, and build a nursery experience that feels premium, practical, and trustworthy.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className="bg-white px-6 py-28">
        <div className="mx-auto grid max-w-[1400px] gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <div className="max-w-2xl">
            <div className="mb-4 flex items-center gap-3">
              <span className="h-[2px] w-12 bg-emerald-600" />
              <span className="text-sm font-bold uppercase tracking-[0.2em] text-emerald-700">Our Journey</span>
            </div>
            <h2 className="text-5xl font-bold leading-[1.1] text-emerald-950 md:text-6xl">
              From Small Start To <span className="text-emerald-600">Trusted Nursery</span>
            </h2>
            <p className="mt-6 text-lg leading-8 text-slate-600">
              Our nursery began in 2018 with a simple focus on healthy indoor plants and honest plant care. What started as a compact local setup gradually expanded through repeat customers, word of mouth, and a growing demand for better-quality nursery products.
            </p>
            <p className="mt-5 text-lg leading-8 text-slate-600">
              Today we manage 100+ plant varieties, curated pots, and practical gardening essentials while continuing to keep product quality and customer confidence at the center of everything.
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-3">
            <div className="rounded-[2rem] bg-[#f7fbf4] p-6 shadow-sm">
              <p className="text-sm font-bold uppercase tracking-[0.22em] text-emerald-700">2018</p>
              <p className="mt-3 text-2xl font-bold text-emerald-950">Founded</p>
              <p className="mt-3 text-sm leading-7 text-slate-600">Started with a compact indoor plant collection and local customer base.</p>
            </div>
            <div className="rounded-[2rem] bg-emerald-950 p-6 text-white shadow-sm">
              <p className="text-sm font-bold uppercase tracking-[0.22em] text-emerald-100/80">2022</p>
              <p className="mt-3 text-2xl font-bold">Expanded</p>
              <p className="mt-3 text-sm leading-7 text-emerald-100/80">Added outdoor plants, decor planters, and guided plant care support.</p>
            </div>
            <div className="rounded-[2rem] bg-[#f7fbf4] p-6 shadow-sm">
              <p className="text-sm font-bold uppercase tracking-[0.22em] text-emerald-700">Today</p>
              <p className="mt-3 text-2xl font-bold text-emerald-950">Growing</p>
              <p className="mt-3 text-sm leading-7 text-slate-600">Serving plant lovers across India with curated, healthy, and premium stock.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#f8faf7] px-6 py-28">
        <div className="mx-auto max-w-[1400px]">
          <div className="mb-16 max-w-2xl">
            <div className="mb-4 flex items-center gap-3">
              <span className="h-[2px] w-12 bg-emerald-600" />
              <span className="text-sm font-bold uppercase tracking-[0.2em] text-emerald-700">What We Offer</span>
            </div>
            <h2 className="text-5xl font-bold leading-[1.1] text-emerald-950 md:text-6xl">
              Plants And Essentials <span className="text-emerald-600">We Offer</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-5">
            {offerItems.map((item) => {
              const Icon = item.icon

              return (
                <article key={item.id} className="rounded-[2rem] border border-emerald-100 bg-white p-7 shadow-sm transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_24px_60px_rgba(15,23,42,0.12)]">
                  <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-[1.25rem] bg-emerald-100 text-emerald-900">
                    <Icon className="h-7 w-7" />
                  </div>
                  <h3 className="text-2xl font-bold text-emerald-950">{item.title}</h3>
                  <p className="mt-4 text-sm leading-7 text-slate-600">{item.description}</p>
                </article>
              )
            })}
          </div>
        </div>
      </section>

      <section className="bg-white px-6 py-28">
        <div className="mx-auto max-w-[1400px]">
          <div className="mb-16 max-w-2xl">
            <div className="mb-4 flex items-center gap-3">
              <span className="h-[2px] w-12 bg-emerald-600" />
              <span className="text-sm font-bold uppercase tracking-[0.2em] text-emerald-700">Why Choose Us</span>
            </div>
            <h2 className="text-5xl font-bold leading-[1.1] text-emerald-950 md:text-6xl">
              Why Choose <span className="text-emerald-600">Our Nursery</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-4">
            {chooseUsItems.map((item) => {
              const Icon = item.icon

              return (
                <article key={item.id} className="rounded-[2rem] border border-emerald-100 bg-[#f8faf7] p-8 shadow-sm">
                  <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-[1.5rem] bg-white text-emerald-900 shadow-sm">
                    <Icon className="h-8 w-8" />
                  </div>
                  <h3 className="text-2xl font-bold text-emerald-950">{item.title}</h3>
                  <p className="mt-4 text-sm leading-7 text-slate-600">{item.description}</p>
                </article>
              )
            })}
          </div>
        </div>
      </section>

      <section className="bg-[#f8faf7] px-6 py-28">
        <div className="mx-auto max-w-[1400px]">
          <div className="mb-16 max-w-2xl">
            <div className="mb-4 flex items-center gap-3">
              <span className="h-[2px] w-12 bg-emerald-600" />
              <span className="text-sm font-bold uppercase tracking-[0.2em] text-emerald-700">Meet Our Team</span>
            </div>
            <h2 className="text-5xl font-bold leading-[1.1] text-emerald-950 md:text-6xl">
              The People Behind <span className="text-emerald-600">Our Nursery</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {teamMembers.map((member) => (
              <article key={member.id} className="group overflow-hidden rounded-[2.25rem] bg-white shadow-sm transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_28px_60px_rgba(15,23,42,0.12)]">
                <div className="aspect-[4/4.3] overflow-hidden">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="p-7">
                  <h3 className="text-2xl font-bold text-emerald-950">{member.name}</h3>
                  <p className="mt-2 text-sm font-bold uppercase tracking-[0.22em] text-emerald-700">{member.role}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white px-6 py-28">
        <div className="mx-auto max-w-[1400px]">
          <div className="mb-16 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl">
              <div className="mb-4 flex items-center gap-3">
                <span className="h-[2px] w-12 bg-emerald-600" />
                <span className="text-sm font-bold uppercase tracking-[0.2em] text-emerald-700">Nursery Gallery</span>
              </div>
              <h2 className="text-5xl font-bold leading-[1.1] text-emerald-950 md:text-6xl">
                A Look Inside <span className="text-emerald-600">Our Green Space</span>
              </h2>
            </div>
            <a
              href="/#gallery"
              className="inline-flex items-center gap-2 self-start rounded-full border border-emerald-200 px-6 py-3 text-sm font-bold text-emerald-900 transition hover:border-emerald-600 hover:bg-emerald-50"
            >
              Visit Home Gallery
              <HiOutlineArrowRight className="h-5 w-5" />
            </a>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
            {galleryItems.map((item) => (
              <a key={item.id} href={item.image} target="_blank" rel="noreferrer" className="group relative overflow-hidden rounded-[2rem] bg-emerald-50">
                <div className="aspect-[4/4.5] overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/80 via-transparent to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-6 text-white">
                  <p className="text-xl font-bold">{item.title}</p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-28">
        <div className="mx-auto max-w-[1400px] overflow-hidden rounded-[2.75rem] bg-emerald-950 px-8 py-14 text-white shadow-[0_24px_80px_rgba(15,23,42,0.18)] sm:px-12">
          <div className="grid gap-10 lg:grid-cols-[1fr_auto] lg:items-center">
            <div className="max-w-3xl">
              <p className="text-sm font-bold uppercase tracking-[0.28em] text-emerald-100/80">Call To Action</p>
              <h2 className="mt-4 text-4xl font-bold leading-tight sm:text-5xl">
                Ready To Bring More Green Into Your Space?
              </h2>
              <p className="mt-5 text-base leading-8 text-emerald-100/80 sm:text-lg">
                Explore our curated collection of healthy plants, planters, and nursery essentials designed for homes, offices, and gardens.
              </p>
            </div>

            <a
              href="/#products"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-8 py-4 text-sm font-bold text-emerald-950 transition hover:bg-lime-100"
            >
              Shop Plants
              <HiOutlineArrowRight className="h-5 w-5" />
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}

export default About
