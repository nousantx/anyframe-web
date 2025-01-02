import { useState, useLayoutEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { componentData } from '@/data/components'
import { getComponentBySlug } from '@/utils/slugs'
import DOMPurify from 'dompurify'
import { styler } from '@stylx'
import { generateInlineStyles } from '@/utils/tenoxui'

export default function EditComponentPage() {
  const { category, component } = useParams()
  const [code, setCode] = useState('')
  const [newCode, setNewCode] = useState('')
  const [componentName, setComponentName] = useState('')
  const [error, setError] = useState<string | null>(null)

  useLayoutEffect(() => {
    if (category && component) {
      const categoryData = componentData[category]
      if (categoryData) {
        const componentData = getComponentBySlug(categoryData.components, component)
        if (componentData) {
          setCode(componentData.code)
          setComponentName(componentData.name)
          setError(null)
        } else {
          setError('Component not found')
        }
      } else {
        setError('Category not found')
      }
    }
  }, [category, component])

  styler([code])

  useLayoutEffect(() => {
    setNewCode(generateInlineStyles(code))
  }, [code])

  const sanitizeHtml = (html: string) => {
    const config = {
      ADD_TAGS: ['*'], // Allow all tags
      ADD_ATTR: ['*'], // Allow all attributes
      FORBID_TAGS: ['script'], // Forbid script tags
      FORBID_ATTR: [
        'on*', // Forbid all event handler attributes (onclick, onload, etc.)
        'javascript:*' // Forbid javascript: protocol in attributes
      ]
    }

    return DOMPurify.sanitize(html, config)
  }

  if (error) {
    return (
      <article className="p-2rem pt-6rem">
        <header className="text-red-500 fw-600">{error}</header>
        <Link to="/components" className="text-blue-500 td-none hover:td-underline">
          Back to components
        </Link>
      </article>
    )
  }

  return (
    <main className="p-2rem pt-6rem">
      <header className="mb-6">
        <div className="mb-2rem flex ai-center gap-8px text-neutral-700 flex-wrap">
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

          <Link
            to={`/components/${category}`}
            className="text-neutral-600 hover:text-neutral-950 tr-time-300ms td-none text-sm fw-400 tn-capitalize"
          >
            {category}
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

          <span className="text-neutral-950 td-none fw-500 text-sm">{componentName}</span>
        </div>
        <h1 className="text-xl font-bold mb-2">{componentName}</h1>
      </header>

      <section
        className="mt-2rem flex gap-2rem flex-wrap w-full"
        data-child="(article): [flex]-[1_1_350px];"
      >
        {/* Preview */}
        <article>
          <h2 className="text-md">Preview</h2>
          <div
            className="mt-8px p-1rem br-8px h-mn-150px center [background]-[rgb({neutral-100}_/_0.3)]"
            id="livePreview"
          >
            <div dangerouslySetInnerHTML={{ __html: sanitizeHtml(code) }} />
          </div>
        </article>
        {/* Editor */}
        <article className="w-full mt-2rem">
          <h2 className="text-md">Editor</h2>
          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="mt-1rem br-8px family-code w-full p-1rem text-rose-600 lh-1.5 [border,outline]-none [background]-[rgb({neutral-100}_/_0.3)] h-mn-150px"
          />
        </article>

        <article className="w-full mt-2rem">
          <h2 className="text-md">Style Output</h2>
          <div className="mt-1rem [background]-[rgb({neutral-100}_/_0.3)] br-8px">
            <p className="family-code p-1rem fs-80%">{newCode}</p>
          </div>
        </article>
      </section>
    </main>
  )
}
