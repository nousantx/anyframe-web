import { createHighlighterCore } from 'shiki/core'
import { createOnigurumaEngine } from 'shiki/engine/oniguruma'

let highlighter: Awaited<ReturnType<typeof createHighlighterCore>> | null = null

export async function initializeHighlighter() {
  if (!highlighter) {
    highlighter = await createHighlighterCore({
      themes: [import('shiki/themes/github-dark.mjs'), import('shiki/themes/github-light.mjs')],
      langs: [import('shiki/langs/html.mjs')],
      engine: createOnigurumaEngine(import('shiki/wasm'))
    })
  }
  return highlighter
}

export async function highlightCode(code: string, isDark: boolean) {
  const h = await initializeHighlighter()
  return h.codeToHtml(code, {
    lang: 'html',
    theme: isDark ? 'github-dark' : 'github-light'
  })
}
