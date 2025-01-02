import { Link } from 'react-router-dom'
import { componentData } from '../../data/components'
import { styler } from '@stylx'
export default function ComponentsPage() {
  styler()
  return (
    <article className="p-2rem pt-6rem">
      <h1 className="text-xl">Component Categories</h1>

      <div className="mt-2rem flex gap-1rem flex-wrap">
        {Object.entries(componentData).map(([key, category]) => (
          <Link
            key={key}
            to={`/components/${key}`}
            className="p-1rem [background]-[rgb({neutral-100}_/_var(--this-opa))] tr-time-300ms br-8px td-none block [flex]-[1_1_200px] text-neutral-900 [--this-opa]-0.4 hover:[--this-opa]-0.9"
          >
            <h2 className="text-lg fs-1.4rem">{category.title}</h2>
            <p className="pa mt-4px text-gray-600">{category.description}</p>
          </Link>
        ))}
      </div>
    </article>
  )
}
