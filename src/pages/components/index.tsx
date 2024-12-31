import React from 'react'
import { Link } from 'react-router-dom'
import { componentLibraryData } from '../../data/components'

export default function ComponentsPage() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8">Component Categories</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Object.entries(componentLibraryData).map(([key, category]) => (
          <Link
            key={key}
            to={`/components/${key}`}
            className="block p-6 border rounded-lg hover:shadow-lg transition-shadow"
          >
            <h2 className="text-xl font-bold mb-2">{category.title}</h2>
            <p className="text-gray-600">{category.description}</p>
          </Link>
        ))}
      </div>
    </div>
  )
}
