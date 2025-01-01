import { useState,  useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { componentData } from '@/data/components'
import { createSlug } from '@/utils/slugs'
import { styler } from '@stylx'
import { useTheme } from '@/contexts/ThemeContext'
import { highlightCode } from '@/utils/shiki'

const ComponentPreview = ({
  code,
  name,
  description,
  categoryId
}: {
  code: string
  name: string
  description: string
  categoryId?: string
}) => {
  const { darkMode } = useTheme()
  const [activeTab, setActiveTab] = useState('preview')
  const [html, setHtml] = useState('')

  useEffect(() => {
    const updateHighlightedCode = async () => {
      try {
        const highlighted = await highlightCode(code, darkMode)
        setHtml(highlighted)
      } catch (error) {
        console.error('Error highlighting code:', error)
      }
    }

    updateHighlightedCode()
  }, [code, darkMode])

  const slug = createSlug(name)
  styler([activeTab, darkMode])

  return (
    <article className="mt-2rem">
      <header className="">
        <h3 className="text-md">{name}</h3>
        <p className="mt-8px text-sm text-neutral-800">{description}</p>
      </header>
      <section className="mt-1.5rem">
        <nav className="flex space-between bw-0 bw-bottom-1px bs-solid bc-neutral-200">
          <div className="flex">
            <button
              data-tab
              className={`[border,outline,background]-none px-12px h-35px fw-500 ls--0.015em bw-0 bs-solid ${
                activeTab === 'preview'
                  ? 'bw-bottom-1px text-neutral-900'
                  : 'bw-bottom-0 text-neutral-600'
              }`}
              onClick={() => setActiveTab('preview')}
            >
              Preview
            </button>
            <button
              data-tab
              className={`[border,outline,background]-none px-12px h-35px fw-500 ls--0.015em bw-0 bs-solid ${
                activeTab === 'code'
                  ? 'bw-bottom-1px text-neutral-900'
                  : 'bw-bottom-0 text-neutral-600'
              }`}
              onClick={() => setActiveTab('code')}
            >
              Code
            </button>
          </div>
          <Link
            to={`/components/${categoryId}/${slug}/edit`}
            className="center gap-4px h-35px px-8px td-none text-neutral-950 fs-14px"
          >
            Edit
            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24">
              <path
                fill="none"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="1.5"
                d="m9.171 14.828l5.657-5.656m0 0h-4.95m4.95 0v4.95M21 3.6v16.8a.6.6 0 0 1-.6.6H3.6a.6.6 0 0 1-.6-.6V3.6a.6.6 0 0 1 .6-.6h16.8a.6.6 0 0 1 .6.6"
              />
            </svg>
          </Link>
        </nav>
        <div className="mt-1rem [background]-[rgb({neutral-100}_/_0.3)] br-8px" data-styler>
          {activeTab === 'preview' ? (
            <div className="family-sans h-mn-150px center p-2rem" id="livePreview">
              <div dangerouslySetInnerHTML={{ __html: code }} />
            </div>
          ) : (
            <div className="over-x-scroll shadow-md [--nsx_shadow-color]-neutral-700 br-8px">
              {html && (
                <div
                  className="w-max-content"
                  data-child="(pre): fs-12px lh-1.6 p-1rem br-8px bg-neutral-50;"
                  dangerouslySetInnerHTML={{ __html: html }}
                />
              )}
            </div>
          )}
        </div>
      </section>
    </article>
  )
}

export default function CategoryPage() {
  styler()
  const { category } = useParams()
  const categoryData = category ? componentData[category] : null

  if (!categoryData) {
    return (
      <div className="">
        <h1 className="">Category not found</h1>
        <Link to="/components" className="">
          Back to components
        </Link>
      </div>
    )
  }

  return (
    <main className="p-2rem">
      <header className="">
        <Link to="/components" className="text-red-500 td-none text-sm">
          ← Back to categories
        </Link>
        <h1 className="text-lg">{categoryData.title}</h1>
        <p className="mt-8px text-neutral-800 text-sm fw-500 ls--0.015em">
          {categoryData.description}
        </p>
      </header>

      <div className="mt-2rem">
        {categoryData.components.map((component, index) => (
          <>
            <ComponentPreview
              key={index}
              name={component.name}
              code={component.code}
              description={component.description}
              categoryId={category}
            />
          </>
        ))}
      </div>
    </main>
  )
}
