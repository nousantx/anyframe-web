import { Link } from 'react-router-dom'
import { componentData } from '../../data/components'
import { styler } from '@stylx'
import { ArrowRight } from '@/components/ArrowRight'
export default function ComponentsPage() {
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
          <span className="active">Components</span>
        </div>
        <h1 className="text-xl">Component Categories</h1>
      </header>

      <div className="mt-2rem flex gap-1rem flex-wrap">
        {Object.entries(componentData).map(([key, category]) => (
          <Link
            key={key}
            to={`/components/${key}`}
            className="p-1rem [background]-[rgb({neutral-100}_/_var(--this-opa))] tr-time-300ms br-8px td-none block [flex]-[1_1_200px] text-neutral-900 [--this-opa]-0.4 hover:[--this-opa]-0.9"
          >
            <h2 className="text-lg fs-1.4rem">{category.title}</h2>
            <p className="pa mt-4px text-gray-600">{category.description}</p>
          </Link>
        ))}
      </div>
    </article>
  )
}
