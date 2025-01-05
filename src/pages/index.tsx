import { Link } from 'react-router-dom'
import { styler } from '@stylx'

export default function HomePage() {
  styler()
  return (
    <article className="center">
      <header className="tw-balance ta-center">
        <h1 className="fs-2.4rem lh-1 fw-600 ls--0.015em mt-1rem">
          Create Your Own UI Components with{' '}
          <span className="fw-700 gradient-text">Unlimited Possibilities</span>
        </h1>

        <p className="mt-1rem">
          Generate any UI components, fully editable directly in your browser!
        </p>
        <div className="center gap-8px">
          <Link to="/get-started" className="pa mt-2rem btn btn-primary">
            Get Started
          </Link>
          <Link to="/components" className="pa mt-2rem td-none btn">
            View Component
          </Link>
        </div>
      </header>
    </article>
  )
}
