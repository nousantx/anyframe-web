import { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { componentData } from '@/data/components'
import { createSlug } from '@/utils/slugs'
import { styler } from '@stylx'
import { useTheme } from '@/contexts/ThemeContext'
import { generateInlineStyles } from '@/utils/tenoxui'
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
  const [styles, setStyles] = useState('')
  const [copySuccess, setCopySuccess] = useState(false)
  const [html, setHtml] = useState('')

  useEffect(() => {
    setStyles(generateInlineStyles(code))
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

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(styles)
      setCopySuccess(true)
      setTimeout(() => setCopySuccess(false), 2000)
    } catch (err) {
      console.error('Failed to copy text:', err)
    }
  }

  const slug = createSlug(name)
  styler([activeTab, darkMode])

  return (
    <article className="mt-3rem">
      <header className="tw-balance">
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
          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className={`[border,outline,background]-none center gap-4px box-35px br-6px px-8px td-none  fs-14px tr-time-300ms [cursor]-pointer ${
                copySuccess
                  ? 'text-green-500 hover:text-green-500'
                  : 'text-neutral-950 hover:text-neutral-600'
              }`}
              title={copySuccess ? 'Copied!' : 'Copy styles'}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24">
                {copySuccess ? (
                  <path
                    fill="none"
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="1.5"
                    d="m5 13l4 4L19 7"
                  />
                ) : (
                  <g
                    fill="none"
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="1.5"
                  >
                    <path d="M19.4 20H9.6a.6.6 0 0 1-.6-.6V9.6a.6.6 0 0 1 .6-.6h9.8a.6.6 0 0 1 .6.6v9.8a.6.6 0 0 1-.6.6" />
                    <path d="M15 9V4.6a.6.6 0 0 0-.6-.6H4.6a.6.6 0 0 0-.6.6v9.8a.6.6 0 0 0 .6.6H9" />
                  </g>
                )}
              </svg>
            </button>
            <Link
              to={`/components/${categoryId}/${slug}/edit`}
              className="center gap-4px box-35px br-6px px-8px td-none text-neutral-950 hover:text-neutral-600 fs-14px tr-time-300ms [cursor]-pointer"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24">
                <path
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  d="M3 21h18M12.222 5.828L15.05 3L20 7.95l-2.828 2.828m-4.95-4.95l-5.607 5.607a1 1 0 0 0-.293.707v4.536h4.536a1 1 0 0 0 .707-.293l5.607-5.607m-4.95-4.95l4.95 4.95"
                />
              </svg>
            </Link>
          </div>
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
      <article className="pt-6rem h-100dvh center">
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
    <article className="p-2rem pt-6rem">
      <header className="">
        <div className="mb-2rem flex ai-center gap-8px text-neutral-700">
          <Link
            to="/components"
            className="text-neutral-600 hover:text-neutral-950 tr-time-300ms td-none text-sm fw-400 center box-24px"
          >
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
          <Link
            to="/components"
            className="text-neutral-600 hover:text-neutral-950 tr-time-300ms td-none text-sm fw-400"
          >
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

          <span className="text-neutral-950 td-none fw-500 text-sm tn-capitalize">{category}</span>
        </div>
        <h1 className="text-lg">{categoryData.title}</h1>
        <p className="mt-8px text-neutral-800 text-sm fw-500 ls--0.015em">
          {categoryData.description}
        </p>
      </header>

      <section className="mt-2rem">
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
      </section>
    </article>
  )
}
