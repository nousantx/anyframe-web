import { Link } from 'react-router-dom'

export default function HomePage() {
  return (
    <div className="p-8">
      <h1>hello Kontol</h1>
      <h1 className="text-3xl font-bold mb-6">Welcome to Component Library</h1>
      <Link to="/components" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
        View Components
      </Link>
    </div>
  )
}
