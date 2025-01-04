import { Link } from 'react-router-dom'
import { ArrowRight } from '@/components/ArrowRight'
import { styler } from '@stylx'

export default function Docs() {
  styler()
  return (
    <article>
      <header>
        <div className="breadcrumbs">
          <Link to="/" className="first">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24">
              <path
                fill="none"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="1.5"
                d="M9 21H7a4 4 0 0 1-4-4v-6.292a4 4 0 0 1 1.927-3.421l5-3.03a4 4 0 0 1 4.146 0l5 3.03A4 4 0 0 1 21 10.707V17a4 4 0 0 1-4 4h-2m-6 0v-4a3 3 0 0 1 3-3v0a3 3 0 0 1 3 3v4m-6 0h6"
              />
            </svg>
          </Link>

          <ArrowRight />
          <span className="active">Get Started</span>
        </div>

        <h1 className="text-xl">Documentation</h1>
      </header>
    </article>
  )
}
