import { Link, useParams } from 'react-router-dom'
import { componentData } from '@/data/components'
import { styler } from '@stylx'
import { ComponentPreview } from '@/components/ComponentPreview'
import { ArrowRight } from '@/components/ArrowRight'
import { useCallback, useMemo } from 'react'

export default function CategoryPage() {
  const { category } = useParams()

  // Memoize category data
  const categoryData = useMemo(() => (category ? componentData[category] : null), [category])

  // Memoize render function for components
  const renderComponents = useCallback(() => {
    if (!categoryData?.components) return null

    return categoryData.components.map((component, index) => (
      <ComponentPreview
        key={`${category}-${component.name}-${index}`}
        name={component.name}
        code={component.code}
        categoryId={category}
      />
    ))
  }, [category, categoryData?.components])

  styler()

  if (!categoryData) {
    return (
      <article className="center">
        <header className="tw-balance ta-center">
          <div className="text-red-500">
            <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24">
              <path
                fill="none"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="1.5"
                d="M12 7v6m0 4.01l.01-.011M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2S2 6.477 2 12s4.477 10 10 10"
              />
            </svg>
          </div>
          <h1 className="mt-1rem text-lg">Category Not Found</h1>
          <Link
            to="/components"
            className="center td-none mt-8px text-neutral-700 hover:text-neutral-950 tr-time-300ms gap-6px fw-400"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="18" viewBox="0 0 24 24">
              <path
                fill="none"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="1.5"
                d="M21 12H3m0 0l8.5-8.5M3 12l8.5 8.5"
              />
            </svg>
            Back to components
          </Link>
        </header>
      </article>
    )
  }

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
          <Link to="/components" className="second">
            Components
          </Link>

          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24">
            <path
              fill="none"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="1.5"
              d="m9 6l6 6l-6 6"
            />
          </svg>

          <span className="active tn-capitalize">{category}</span>
        </div>
        <h1 className="text-xl">{categoryData.title}</h1>
        <p className="mt-8px text-sm">{categoryData.description}</p>
      </header>

      <section className="mt-2rem">{renderComponents()}</section>
    </article>
  )
}
