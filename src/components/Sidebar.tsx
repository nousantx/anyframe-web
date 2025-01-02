import { styler } from '@stylx'
import { Link } from 'react-router-dom'
export function Sidebar() {
  styler()
  return (
    <>
      <Link
        to="/components"
        className="td-none text-neutral-600 hover:text-neutral-950 tr-time-300ms pa h-35px center"
      >
        Components
      </Link>
      <Link
        to="/components/other/playground/edit"
        className="td-none text-neutral-600 hover:text-neutral-950 tr-time-300ms pa h-35px center"
      >
        Playground
      </Link>
    </>
  )
}
