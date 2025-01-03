import { styler } from '@stylx'
import { Outlet } from 'react-router-dom'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'

export default function App() {
  styler()

  return (
    <div className="w-100vw h-mn-100dvh bg-neutral-50 text-neutral-950">
      <Navbar />
      <main className="w-mx-768px h-mn-100dvh mx-auto">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
