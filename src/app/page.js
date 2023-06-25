import Image from 'next/image'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import HeroBanner from './components/HeroBanner'
import AboutSection from './components/AboutSection'

export default function Home() {
  return (
    <div className="flex justify-center items-center flex-col w-full">
       <Navbar />
       <HeroBanner />
       <AboutSection />
       <Footer />
    </div>
  )
}
