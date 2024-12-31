import React from 'react'
import { useParams, Link } from 'react-router-dom'
import { componentLibraryData } from '../../data/components'

function ComponentPreview({
  code,
  name,
  description
}: {
  code: string
  name: string
  description: string
}) {
  return (
    <div className="mb-8 border rounded-lg p-6">
      <h3 className="text-xl font-bold mb-2">{name}</h3>
      <p className="text-gray-600 mb-4">{description}</p>

      {/* Preview */}
      <div className="mb-4 p-4 border rounded bg-white">
        <div dangerouslySetInnerHTML={{ __html: code }} />
      </div>

      {/* Code */}
      <div className="bg-gray-100 p-4 rounded">
        <pre className="whitespace-pre-wrap">{code}</pre>
      </div>
    </div>
  )
}

export default function CategoryPage() {
  const { category } = useParams()
  const categoryData = category ? componentLibraryData[category] : null

  if (!categoryData) {
    return (
      <div className="p-8">
        <h1 className="text-2xl font-bold text-red-500">Category not found</h1>
        <Link to="/components" className="text-blue-500 hover:underline">
          Back to components
        </Link>
      </div>
    )
  }
  return (
    <div className="p-8">
      <div className="mb-8">
        <Link to="/components" className="text-blue-500 hover:underline mb-4 block">
          ← Back to categories
        </Link>
        <h1 className="text-3xl font-bold mb-2">{categoryData.title}</h1>
        <p className="text-gray-600">{categoryData.description}</p>
      </div>

      <div>
        {categoryData.components.map((component, index) => (
          <ComponentPreview
            key={index}
            name={component.name}
            code={component.code}
            description={component.description}
          />
        ))}
      </div>
    </div>
  )
}
