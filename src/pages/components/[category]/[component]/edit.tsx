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

interface ComponentState {
  code: string
  name: string
  description: string
  styles: string
  error: string | null
  originalData: any | null
}

const initialState: ComponentState = {
  code: '',
  name: '',
  description: '',
  styles: '',
  error: null,
  originalData: null
}

export default function EditComponentPage() {
  const { category, component } = useParams()
  const [componentState, setComponentState] = useState<ComponentState>(initialState)
  const { darkMode } = useTheme()
  const debounceRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    if (category && component) {
      const categoryData = componentData[category]
      if (!categoryData) {
        setComponentState((prev) => ({ ...prev, error: 'Category not found' }))
        return
      }

      const foundComponent = getComponentBySlug(categoryData.components, component)
      if (!foundComponent) {
        setComponentState((prev) => ({ ...prev, error: 'Component not found' }))
        return
      }

      setComponentState({
        code: foundComponent.code,
        name: foundComponent.name,
        description: foundComponent.description,
        styles: '',
        error: null,
        originalData: foundComponent
      })
    }
  }, [category, component])

  useLayoutEffect(() => {
    const updateHighlightedCode = async () => {
      try {
        const highlighted = await highlightCode(
          generateInlineStyles(componentState.code, darkMode),
          darkMode
        )
        setComponentState((prev) => ({ ...prev, styles: highlighted }))
      } catch (error) {
        console.error('Error highlighting code:', error)
      }
    }

    const applyStyles = () => {
      const temp = document.querySelector('#code-preview')
      if (temp) {
        temp.querySelectorAll('*').forEach((element) => {
          new MakeTenoxUI({
            element,
            ...createConfig({ ...config, isDark: darkMode })
          }).useDOM()
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
  }, [componentState.code, darkMode])

  styler([componentState.styles])

  const handleCodeChange = (newCode: string) => {
    setComponentState((prev) => ({ ...prev, code: newCode }))
  }

  if (componentState.error) {
    return (
      <article>
        <header className="text-red-500 fw-600">{componentState.error}</header>
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

          <span className="active">{componentState.name}</span>
        </div>
        <h1 className="text-xl">{componentState.name}</h1>
        <p className="mt-1rem">{componentState.description}</p>
      </header>

      <section
        className="mt-2rem flex gap-2rem flex-wrap w-full"
        data-child="(article): [flex]-[1_1_350px] w-full mt-2rem; (h2): text-md;"
      >
        <article>
          <h2>Preview</h2>
          <div
            className="mt-8px p-2rem br-8px h-mn-150px center [background]-[rgb({neutral-100}_/_0.3)]"
            id="livePreview"
          >
            <div
              id="code-preview"
              dangerouslySetInnerHTML={{ __html: sanitizeHtml(componentState.code) }}
            />
          </div>
        </article>

        <article>
          <h2>Editor</h2>
          <textarea
            value={componentState.code}
            onChange={(e) => handleCodeChange(e.target.value)}
            className="mt-1rem br-8px family-code w-full p-1rem text-rose-600 lh-1.5 [border,outline]-none [background]-[rgb({neutral-100}_/_0.3)] h-mn-250px tw-nowrap [resize]-vertical"
          />
        </article>

        <article>
          <h2>Style Output</h2>
          <div
            className="mt-1rem [background]-[rgb({neutral-100}_/_0.3)] br-8px over-x-scroll"
            data-child="(pre): fs-12px lh-1.6 p-1rem br-8px bg-neutral-50;"
          >
            {componentState.styles && (
              <div
                className="w-max-content"
                dangerouslySetInnerHTML={{ __html: componentState.styles }}
              />
            )}
          </div>
        </article>
      </section>
    </article>
  )
}
