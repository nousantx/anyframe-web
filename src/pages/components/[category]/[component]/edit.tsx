import { useState, useRef, useEffect, useLayoutEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { componentData } from '@/data/components'
import { getComponentBySlug } from '@/utils/slugs'
import { sanitizeHtml } from '@/utils/dompurify'
import { styler } from '@stylx'
import { useTheme } from '@/contexts/ThemeContext'
import { generateInlineStyles } from '@/utils/tenoxui'
import { highlightCode } from '@/utils/shiki'
import { MakeTenoxUI, createConfig } from '@nousantx/tenoxui-styler'
import config from '@app/tenoxui.config'
import { ArrowRight } from '@/components/ArrowRight'

export default function EditComponentPage() {
  const { category, component } = useParams()
  const [code, setCode] = useState('')
  const [componentName, setComponentName] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [styles, setStyles] = useState('')
  const { darkMode } = useTheme()
  const debounceRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
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

  /**?
   * You can remove the debounce if you want `real-time` style computation, -
   * but it will sacrifice the performance, because it will run the tenoxui -
   * over and over again the code changed, even just single word.
   *
   * So, debounce is needed frfr 💀
   */

  useLayoutEffect(() => {
    // will apply syntax highlighting to the output styles that generated from tenoxui
    const updateHighlightedCode = async () => {
      try {
        const highlighted = await highlightCode(generateInlineStyles(code, darkMode), darkMode)
        setStyles(highlighted)
      } catch (error) {
        console.error('Error highlighting code:', error)
      }
    }

    // only applt tenoxui on the preview, not all UIs
    function applyStyles() {
      const temp = document.querySelector('#code-preview')

      if (temp) {
        temp.querySelectorAll('*').forEach((element) => {
          new MakeTenoxUI({ element, ...createConfig({ ...config, isDark: darkMode }) }).useDOM()
        })
      }
    }

    if (debounceRef.current) {
      clearTimeout(debounceRef.current)
    }

    debounceRef.current = setTimeout(() => {
      applyStyles()
      updateHighlightedCode()
    }, 200)

    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current)
      }
    }
  }, [code, darkMode])

  styler([styles])

  if (error) {
    return (
      <article>
        <header className="text-red-500 fw-600">{error}</header>
        <Link to="/components" className="text-blue-500 td-none hover:td-underline">
          Back to components
        </Link>
      </article>
    )
  }

  return (
    <article>
      <header className="mb-6">
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

          <ArrowRight />

          <Link to={`/components/${category}`} className="second tn-capitalize">
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

          <span className="active">{componentName}</span>
        </div>
        <h1 className="text-xl">{componentName}</h1>
      </header>

      <section
        className="mt-2rem flex gap-2rem flex-wrap w-full"
        data-child="(article): [flex]-[1_1_350px] w-full mt-2rem; (h2): text-md;"
      >
        {/* Preview */}
        <article>
          <h2>Preview</h2>
          <div
            className="mt-8px p-2rem br-8px h-mn-150px center [background]-[rgb({neutral-100}_/_0.3)]"
            id="livePreview"
          >
            <div id="code-preview" dangerouslySetInnerHTML={{ __html: sanitizeHtml(code) }} />
          </div>
        </article>
        {/* Editor */}
        <article>
          <h2>Editor</h2>
          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="mt-1rem br-8px family-code w-full p-1rem text-rose-600 lh-1.5 [border,outline]-none [background]-[rgb({neutral-100}_/_0.3)] h-mn-250px tw-nowrap [resize]-vertical"
          />
        </article>

        <article>
          <h2>Style Output</h2>
          <div
            className="mt-1rem [background]-[rgb({neutral-100}_/_0.3)] br-8px over-x-scroll"
            data-child="(pre): fs-12px lh-1.6 p-1rem br-8px bg-neutral-50;"
          >
            {styles && (
              <div className="w-max-content" dangerouslySetInnerHTML={{ __html: styles }} />
            )}
          </div>
        </article>
      </section>
    </article>
  )
}
