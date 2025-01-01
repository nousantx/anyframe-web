import { Outlet, Link } from 'react-router-dom'
import { useTheme } from '@/contexts/ThemeContext'
import { styler } from '@stylx'

export default function App() {
  styler()

  const { darkMode, toggleDarkMode } = useTheme()
  const handleThemeToggle = () => {
    toggleDarkMode()
  }
  return (
    <div className="w-100vw h-mn-100dvh bg-neutral-50 text-neutral-950">
      <header className="h-62px px-2rem center space-between">
        <Link to="/" className="lh-1 fs-1.2rem fw-600 ls--0.015em td-none text-neutral-950">
          getUI
        </Link>

        <button
          className="[border,outline]-none center box-35px br-6px [background]-transparent hover:bg-neutral-200 text-neutral-950 bg-opacity-0.5 tr-300ms"
          onClick={handleThemeToggle}
        >
          {darkMode ? (
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24">
              <path
                fill="none"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="1.5"
                d="M3 11.507a9.493 9.493 0 0 0 18 4.219c-8.507 0-12.726-4.22-12.726-12.726A9.49 9.49 0 0 0 3 11.507"
              />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24">
              <path
                fill="none"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="1.5"
                d="M12 18a6 6 0 1 0 0-12a6 6 0 0 0 0 12m10-6h1M12 2V1m0 22v-1m8-2l-1-1m1-15l-1 1M4 20l1-1M4 4l1 1m-4 7h1"
              />
            </svg>
          )}
        </button>
      </header>
      <main className="w-mx-768px mx-auto">
        <Outlet />
      </main>
      <footer className="p-2rem center">
        <p className="ta-center pa text-neutral-600 fs-12px">
          <span>
            Built with{' '}
            <a href="https://tenoxui.web.app" className="text-neutral-950">
              tenoxui
            </a>
          </span>
          <br />
          <span>
            &copy; 2024{' '}
            <a href="https://github.com/nousantx" className="text-neutral-950">
              NOuSantx
            </a>
            . All rights reserved.
          </span>
        </p>
      </footer>
    </div>
  )
}
