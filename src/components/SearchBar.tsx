import { useState } from 'react'
import { Link } from 'react-router-dom'
import { styler } from '@stylx'
import { componentData } from '@/data/components'

interface SearchResult {
  type: 'category' | 'component'
  key?: string
  title?: string
  description: string
  category?: string
  categoryTitle?: string
  name?: string
}

const ChevronIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24">
    <path
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
      d="m9 6l6 6l-6 6"
    />
  </svg>
)

export const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [showResults, setShowResults] = useState(false)
  const [results, setResults] = useState<SearchResult[]>([])

  const handleSearch = (query: string) => {
    if (!query.trim()) {
      setResults([])
      return
    }
    const searchResults: SearchResult[] = []

    Object.entries(componentData).forEach(([categoryKey, categoryData]) => {
      if (
        categoryData.title.toLowerCase().includes(query.toLowerCase()) ||
        categoryData.description.toLowerCase().includes(query.toLowerCase())
      ) {
        searchResults.push({
          type: 'category',
          key: categoryKey,
          title: categoryData.title,
          description: categoryData.description
        })
      }
      categoryData.components.forEach((component) => {
        if (
          component.name.toLowerCase().includes(query.toLowerCase()) ||
          component.description.toLowerCase().includes(query.toLowerCase())
        ) {
          searchResults.push({
            type: 'component',
            category: categoryKey,
            categoryTitle: categoryData.title,
            name: component.name,
            description: component.description
          })
        }
      })
    })

    setResults(searchResults)
  }

  const getResultLink = (result: SearchResult): string => {
    if (result.type === 'category' && result.key) {
      return `/components/${result.key}`
    } else if (result.type === 'component' && result.category && result.name) {
      return `/components/${result.category}/${result.name.toLowerCase().replace(/\s+/g, '-')}/edit`
    }
    return '/'
  }

  styler([searchQuery])

  return (
    <div className="">
      <div className="relative flex ai-center">
        <input
          type="text"
          placeholder="Search components..."
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value)
            handleSearch(e.target.value)
            setShowResults(true)
          }}
          onFocus={() => setShowResults(true)}
          className="h-35px px-12px w-200px br-6px bw-1px bs-solid bg-neutral-100 bdr-c-neutral-200 [outline]-none focus:bdr-c-blue-500 tr-300ms text-neutral-800"
        />
        {searchQuery && (
          <button
            onClick={() => {
              setSearchQuery('')
              setResults([])
              setShowResults(false)
            }}
            className="absolute r-8px box-24px center [border,outline,background]-none text-neutral-950"
          >
            <div className="center [transform]-[rotate(45deg)]">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24">
                <path
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  d="M6 12h6m6 0h-6m0 0V6m0 6v6"
                />
              </svg>
            </div>
          </button>
        )}
      </div>

      {showResults && results.length > 0 && (
        <div
          className="absolute z-999 t-62px bg-neutral-50 p-1rem br-8px shadow-md flex flex-col gap-2rem bg-opacity-1 r-1rem"
          onMouseLeave={() => setShowResults(false)}
        >
          {results.map((result, index) => (
            <Link
              key={index}
              to={getResultLink(result)}
              className="td-none flex jc-center flex-col"
              onClick={() => {
                setSearchQuery('')
                setShowResults(false)
              }}
            >
              {result.type === 'category' ? (
                <>
                  <div className="center flex-wrap jc-flex-start text-neutral-800 ls--0.015em fw-400 fs-14px gap-6px">
                    <span className="text-neutral-600">Components</span>
                    <ChevronIcon />
                    <span className="text-neutral-950 fw-500">{result.title}</span>
                  </div>
                  <div className="mt-4px fs-12px text-neutral-600">{result.description}</div>
                </>
              ) : (
                <>
                  <div className="center jc-flex-start text-neutral-800 ls--0.015em fw-400 fs-14px gap-6px">
                    <span className="text-neutral-600">Components</span>
                    <ChevronIcon />
                    <span className="text-neutral-600">{result.categoryTitle}</span>
                    <ChevronIcon />
                    <span className="text-neutral-950 fw-500 tw-nowrap">{result.name}</span>
                  </div>
                  <div className="mt-4px fs-12px text-neutral-600">{result.description}</div>
                </>
              )}
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
