import { FiFacebook, FiInstagram, FiYoutube } from 'react-icons/fi'
import { FaWhatsapp } from 'react-icons/fa'
import { HiOutlineEnvelope, HiOutlineMapPin, HiOutlinePhone } from 'react-icons/hi2'
import { useNavigate } from 'react-router-dom'

function Footer() {
  const navigate = useNavigate()
  const year = new Date().getFullYear()

  const quickLinks = [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about' },
    { label: 'Products', href: '/products' },
    { label: 'Testimonials', href: '/testimonials' },
    { label: 'Contact', href: '/contact' },
    { label: 'Login', href: '/login' },
    { label: 'Register', href: '/register' },
  ]

  const socials = [
    { label: 'Instagram', icon: FiInstagram },
    { label: 'Facebook', icon: FiFacebook },
    { label: 'WhatsApp', icon: FaWhatsapp },
    { label: 'YouTube', icon: FiYoutube },
  ]

  const goTo = (path) => {
    const [pathname, hash] = path.split('#')
    const targetPath = pathname || '/'

    if (window.location.pathname !== targetPath) {
      navigate(hash ? `${targetPath}#${hash}` : targetPath)
    } else if (!hash) {
      window.scrollTo({ top: 0, behavior: 'auto' })
    }

    if (hash) {
      window.setTimeout(() => {
        document.getElementById(hash)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }, 80)
    }
  }

  return (
    <footer className="relative overflow-hidden bg-emerald-950 text-white">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-72 bg-[radial-gradient(circle_at_top,_rgba(185,255,214,0.16),_transparent_55%)]" />
      <section className="relative z-10 px-6 py-16">
        <div className="mx-auto max-w-[1400px]">
          <div className="grid grid-cols-1 gap-10 border-b border-white/10 pb-12 lg:grid-cols-[1.2fr_0.8fr_1fr]">
            <div className="max-w-md">
              <div className="flex items-center gap-3">
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-white text-emerald-900 shadow-sm">
                  <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M4 14c0-5 4-9 9-9 0 5-4 9-9 9Z" />
                    <path d="M9 20c.5-4 3-7 7-9" />
                  </svg>
                </span>
                <div>
                  <p className="text-2xl font-bold">Green Garden Nursery</p>
                  <p className="text-sm text-emerald-100/65">Premium plants for homes and gardens</p>
                </div>
              </div>

              <p className="mt-6 text-sm leading-8 text-emerald-100/75">
                We grow and curate healthy indoor and outdoor plants with careful packing, honest support, and a premium nursery feel for every customer.
              </p>
            </div>

            <div>
              <p className="text-lg font-bold">Quick Links</p>
              <div className="mt-6 grid grid-cols-2 gap-x-6 gap-y-3">
                {quickLinks.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    onClick={(event) => {
                      event.preventDefault()
                      goTo(item.href)
                    }}
                    className="text-left text-sm text-emerald-100/75 transition hover:text-white"
                  >
                    {item.label}
                  </a>
                ))}
              </div>
            </div>

            <div>
              <p className="text-lg font-bold">Contact Info</p>
              <div className="mt-6 space-y-5">
                <div className="flex items-start gap-3 text-sm text-emerald-100/75">
                  <span className="mt-0.5 grid h-10 w-10 place-items-center rounded-xl bg-white/8 text-emerald-200">
                    <HiOutlineMapPin className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="font-semibold text-white">Address</p>
                    <p className="mt-1">Jaipur, Rajasthan</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 text-sm text-emerald-100/75">
                  <span className="mt-0.5 grid h-10 w-10 place-items-center rounded-xl bg-white/8 text-emerald-200">
                    <HiOutlinePhone className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="font-semibold text-white">Phone</p>
                    <p className="mt-1">+91 98765 43210</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 text-sm text-emerald-100/75">
                  <span className="mt-0.5 grid h-10 w-10 place-items-center rounded-xl bg-white/8 text-emerald-200">
                    <HiOutlineEnvelope className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="font-semibold text-white">Email</p>
                    <p className="mt-1">info@nursery.com</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-4 pt-6 text-sm text-emerald-100/65 md:flex-row md:items-center md:justify-between">
            <p>© {year} Green Garden Nursery. All Rights Reserved.</p>
            <div className="flex items-center gap-3">
              {socials.map((item) => {
                const Icon = item.icon

                return (
                  <a
                    key={item.label}
                    href="#"
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white transition hover:bg-white/12"
                    aria-label={item.label}
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                )
              })}
            </div>
          </div>
        </div>
      </section>
    </footer>
  )
}

export default Footer
