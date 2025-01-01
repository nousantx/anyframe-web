import { useState, useLayoutEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { componentData } from '@/data/components'
import { getComponentBySlug } from '@/utils/slugs'
import DOMPurify from 'dompurify'
import { styler } from '@stylx'

export default function EditComponentPage() {
  const { category, component } = useParams()
  const [code, setCode] = useState('')
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
      <div className="p-8">
        <div className="text-red-500 font-bold">{error}</div>
        <Link to="/components" className="text-blue-500 hover:underline">
          Back to components
        </Link>
      </div>
    )
  }

  return (
    <main className="p-2rem">
      <div className="mb-6">
        <Link to={`/components/${category}`} className="text-blue-500 hover:underline mb-4 block">
          ← Back to {category}
        </Link>
        <h1 className="text-xl font-bold mb-2">{componentName}</h1>
      </div>

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
        <article>
          <h2 className="text-md">Editor</h2>
          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="mt-8px br-8px family-code w-full p-1rem text-rose-600 lh-1.5 [border,outline]-none [background]-[rgb({neutral-100}_/_0.3)] h-mn-200px"
            spellCheck={false}
          />
        </article>
      </section>
    </main>
  )
}
