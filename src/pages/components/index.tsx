import { Link } from 'react-router-dom'
import { componentData } from '../../data/components'
import { styler } from '@stylx'
export default function ComponentsPage() {
  styler()
  return (
    <div className="p-2rem">
      <h1 className="text-xl">Component Categories</h1>

      <div className="mt-2rem flex gap-1rem flex-wrap">
        {Object.entries(componentData).map(([key, category]) => (
          <Link
            key={key}
            to={`/components/${key}`}
            className="p-1rem bg-neutral-100 hover:bg-neutral-200 tr-time-300ms br-8px td-none block [flex]-[1_1_200px] text-neutral-900"
          >
            <h2 className="text-xl">{category.title}</h2>
            <p className="text-gray-600">{category.description}</p>
          </Link>
        ))}
      </div>
    </div>
  )
}
