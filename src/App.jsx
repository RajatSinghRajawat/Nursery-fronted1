import { Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ScrollToTopButton from './components/ScrollToTopButton'
import Home from './pages/Home'
import About from './pages/About'
import Cart from './pages/Cart'
import Gallery from './pages/Gallery'
import Testimonials from './pages/Testimonials'
import Contact from './pages/Contact'
import Login from './pages/Login'
import Profile from './pages/Profile'
import Register from './pages/Register'
import ForgotPassword from './pages/ForgotPassword'
import Products from './pages/Products'
import IndoorPlants from './pages/IndoorPlants'
import OutdoorPlants from './pages/OutdoorPlants'
import GardeningTools from './pages/GardeningTools'
import PotsPlanters from './pages/PotsPlanters'
import SeedsBulbs from './pages/SeedsBulbs'
import PlantCare from './pages/PlantCare'
import ProtectedRoute from './components/ProtectedRoute'

const appRoutes = [
  { path: '/', element: <Home /> },
  { path: '/about', element: <About /> },
  { path: '/cart', element: <ProtectedRoute><Cart /></ProtectedRoute> },
  { path: '/gallery', element: <Gallery /> },
  { path: '/products', element: <Products /> },
  { path: '/testimonials', element: <Testimonials /> },
  { path: '/contact', element: <Contact /> },
  { path: '/login', element: <Login /> },
  { path: '/profile', element: <ProtectedRoute><Profile /></ProtectedRoute> },
  { path: '/register', element: <Register /> },
  { path: '/forgot-password', element: <ForgotPassword /> },
  { path: '/products/indoor-plants', element: <IndoorPlants /> },
  { path: '/products/outdoor-plants', element: <OutdoorPlants /> },
  { path: '/products/gardening-tools', element: <GardeningTools /> },
  { path: '/products/pots-planters', element: <PotsPlanters /> },
  { path: '/products/seeds-bulbs', element: <SeedsBulbs /> },
  { path: '/products/plant-care', element: <PlantCare /> },
]

function App() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main className="pt-20">
        <Routes>
          {appRoutes.map((route) => (
            <Route key={route.path} path={route.path} element={route.element} />
          ))}
        </Routes>
      </main>
      <ScrollToTopButton />
      <Footer />
    </div>
  )
}

export default App
