import { Link } from 'react-router-dom'
import { styler } from '@stylx'

export default function HomePage() {
  styler()
  return (
    <article className="p-2rem h-mn-100vh">
      <header className="tw-balance ta-center">
        <h1 className="fs-2.4rem lh-1 fw-600 ls--0.015em">Build Your Own UI Components</h1>

        <p className="mt-1rem text-neutral-800 pa lh-1.4">
          Generate any UI components in your browser. Fully editable directly in your browser!
        </p>
        <div className="center gap-8px">
          <Link
            to="/components"
            className="pa mt-2rem td-none center px-14px bg-neutral-950 h-40px br-6px hover:bg-neutral-900 text-neutral-50 pa"
          >
            Get Started
          </Link>
          <Link
            to="/components"
            className="pa mt-2rem td-none center px-14px h-40px text-neutral-950"
          >
            View Component
          </Link>
        </div>
      </header>
    </article>
  )
}
