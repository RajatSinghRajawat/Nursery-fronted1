import { HiOutlineArrowRight } from 'react-icons/hi2'
import { productCategories } from '../data/productCategories'

const badgeLetters = {
  Leaf: 'I',
  Tree: 'O',
  Tools: 'G',
  Pot: 'P',
  Seed: 'S',
  Care: 'C',
}

function Products() {
  return (
    <div className="min-h-screen bg-white">
      <section className="relative overflow-hidden px-6 py-28 text-white">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1512428813834-c702c7702b78?q=80&w=1600&auto=format&fit=crop"
            alt="Products hero"
            className="h-full w-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-950/92 via-emerald-900/80 to-emerald-700/45" />
        <div className="absolute inset-0 opacity-60" style={{ backgroundImage: 'linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0) 44%)' }} />

        <div className="relative mx-auto max-w-[1400px] py-16">
          <p className="mb-5 text-sm font-bold uppercase tracking-[0.28em] text-emerald-100/85">Our Collections</p>
          <h1 className="max-w-4xl text-5xl font-bold leading-tight md:text-6xl xl:text-7xl">
            Explore All Product Categories In One Place
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-8 text-white/82 sm:text-lg">
            Browse indoor plants, outdoor plants, gardening tools, planters, seeds, and plant care collections from a single category page.
          </p>
        </div>
      </section>

      <section className="bg-white px-6 py-24">
        <div className="mx-auto max-w-[1400px]">
          <div className="mb-14 max-w-2xl">
            <div className="mb-4 flex items-center gap-3">
              <span className="h-[2px] w-12 bg-emerald-600" />
              <span className="text-sm font-bold uppercase tracking-[0.2em] text-emerald-700">Browse Categories</span>
            </div>
            <h2 className="text-5xl font-bold leading-[1.1] text-emerald-950 md:text-6xl">
              Choose A <span className="text-emerald-600">Collection</span>
            </h2>
          </div>

          <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
            {productCategories.map((category) => (
              <a
                key={category.slug}
                href={category.path}
                className="group overflow-hidden rounded-[2.25rem] border border-emerald-100 bg-[#f8faf7] shadow-sm transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_28px_60px_rgba(15,23,42,0.12)]"
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={category.heroImage}
                    alt={category.name}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="p-7">
                  <div className="mb-5 flex items-center gap-3">
                    <span className="grid h-11 w-11 place-items-center rounded-full bg-emerald-100 text-sm font-bold text-emerald-900">
                      {badgeLetters[category.icon]}
                    </span>
                    <p className="text-xs font-bold uppercase tracking-[0.24em] text-emerald-700">{category.eyebrow}</p>
                  </div>
                  <h3 className="text-3xl font-bold text-emerald-950">{category.name}</h3>
                  <p className="mt-4 text-sm leading-7 text-slate-600">{category.description}</p>
                  <div className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-emerald-700">
                    Open category
                    <HiOutlineArrowRight className="h-4 w-4" />
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default Products
