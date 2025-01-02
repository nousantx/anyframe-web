import { Link } from 'react-router-dom'
import { styler } from '@stylx'

export default function HomePage() {
  styler()
  return (
    <article className="p-2rem pt-6rem h-mn-100dvh center">
      <header className="tw-balance ta-center">
        <span className="pa fs-12px bg-neutral-700 br-55px px-8px py-4px bg-opacity-0.1">
          Released V1
        </span>
        <h1 className="fs-2.4rem lh-1 fw-600 ls--0.015em mt-1rem">
          Get Your Own UI Components with{' '}
          <span
            className="
              fw-700
              [background]-[-webkit-linear-gradient(-45deg,_rgb({blue-600}),_rgb({sky-400}))]
              [-webkit-background-clip]-text
              [-webkit-text-fill-color]-transparent"
          >
            Unlimited Possibilities
          </span>
        </h1>

        <p className="mt-1rem text-neutral-800 pa lh-1.4">
          Generate any UI components in your browser. Fully editable directly in your browser!
        </p>
        <div className="center gap-8px">
          <Link
            to="/get-started"
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
