import { useState, useEffect, useCallback, memo, useRef } from 'react'
import { Link } from 'react-router-dom'
import { createSlug } from '@/utils/slugs'
import { styler } from '@stylx'
import { useTheme } from '@/contexts/ThemeContext'
import { generateInlineStyles } from '@/utils/tenoxui'
import { highlightCode } from '@/utils/shiki'
import { MakeTenoxUI, createConfig } from '@nousantx/tenoxui-styler'
import config from '@app/tenoxui.config'

const Preview = memo(({ code, theme }: { code: string; theme: any }) => {
  const previewRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const wrapper = previewRef.current
    if (wrapper) {
      const elements = wrapper.querySelectorAll('*')
      elements.forEach((e) => {
        new MakeTenoxUI({
          element: e as HTMLElement,
          ...theme
        }).useDOM()
      })
    }
  }, [theme])

  return (
    <div ref={previewRef} className="family-sans h-mn-150px center p-2rem" id="code-preview">
      <div dangerouslySetInnerHTML={{ __html: code }} />
    </div>
  )
})

const CodeView = memo(({ html }: { html: string }) => (
  <div className="over-x-scroll shadow-md [--nsx_shadow-color]-neutral-700 br-8px">
    {html && (
      <div
        className="w-max-content"
        data-child="(pre): fs-12px lh-1.6 p-1rem br-8px bg-neutral-50;"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    )}
  </div>
))

export const ComponentPreview = ({
  code,
  name,
  categoryId
}: {
  code: string
  name: string
  categoryId?: string
}) => {
  const { theme, darkMode } = useTheme()
  const [activeTab, setActiveTab] = useState('preview')
  const [styles, setStyles] = useState('')
  const [copySuccess, setCopySuccess] = useState(false)
  const [html, setHtml] = useState('')

  // Memoize style generation
  const generateStyles = useCallback(() => {
    setStyles(generateInlineStyles(code, theme))
  }, [code, darkMode])

  // Memoize code highlighting
  const updateHighlightedCode = useCallback(async () => {
    try {
      const highlighted = await highlightCode(code, darkMode)
      setHtml(highlighted)
    } catch (error) {
      console.error('Error highlighting code:', error)
    }
  }, [code, darkMode])

  useEffect(() => {
    generateStyles()
    updateHighlightedCode()
  }, [generateStyles, updateHighlightedCode])

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
            <Preview code={code} theme={theme} />
          ) : (
            <CodeView html={html} />
          )}
        </div>
      </section>
    </article>
  )
}
