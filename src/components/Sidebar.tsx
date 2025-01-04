import { NavLink } from 'react-router-dom'
import { styler } from '@stylx'
import { componentData } from '@/data/components'

export function Sidebar() {
  styler()
  const mainNavClass = ({ isActive }: { isActive: boolean }): string =>
    `fs-1rem td-none tr-time-300ms flex ai-center gap-8px h-30px ${
      isActive ? 'text-neutral-950 fw-500' : 'text-neutral-600 hover:text-primary-950 fw-400'
    }`

  const componentClass = ({ isActive }: { isActive: boolean }): string =>
    `fw-1rem td-none tr-time-300ms flex ai-center gap-8px h-30px space ${
      isActive ? 'text-neutral-950 fw-500' : 'text-neutral-600 hover:text-primary-950 fw-400'
    }`

  return (
    <>
      <div className="w-full flex flex-col gap-1rem">
        <NavLink to="/" className={mainNavClass}>
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
            <path
              fill="none"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="1.5"
              d="M9 21H7a4 4 0 0 1-4-4v-6.292a4 4 0 0 1 1.927-3.421l5-3.03a4 4 0 0 1 4.146 0l5 3.03A4 4 0 0 1 21 10.707V17a4 4 0 0 1-4 4h-2m-6 0v-4a3 3 0 0 1 3-3v0a3 3 0 0 1 3 3v4m-6 0h6"
            />
          </svg>
          Home
        </NavLink>
        <NavLink to="/get-started" className={mainNavClass}>
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
            <path
              fill="none"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="1.5"
              d="M8 21v-5m0 0V3.577a.6.6 0 0 1 .916-.51l8.79 5.442a.6.6 0 0 1 .017 1.009z"
            />
          </svg>
          Get Started
        </NavLink>
        <NavLink to="/docs" className={mainNavClass}>
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
            <g fill="none" stroke="currentColor" stroke-linecap="round" stroke-width="1.5">
              <path d="M4 19V5a2 2 0 0 1 2-2h13.4a.6.6 0 0 1 .6.6v13.114" />
              <path stroke-linejoin="round" d="M8 3v8l2.5-1.6L13 11V3" />
              <path d="M6 17h14M6 21h14" />
              <path stroke-linejoin="round" d="M6 21a2 2 0 1 1 0-4" />
            </g>
          </svg>
          Documentation
        </NavLink>
        <NavLink end to="/components" className={mainNavClass}>
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
            <g
              fill="none"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="1.5"
            >
              <path d="M6 3H3v3m15-3h3v3M6 21H3v-3m15 3h3v-3m-8.485-.309l4-2.4a1 1 0 0 0 .485-.857v-3.868a1 1 0 0 0-.485-.857l-4-2.4a1 1 0 0 0-1.03 0l-4 2.4a1 1 0 0 0-.485.857v3.868a1 1 0 0 0 .486.857l4 2.4a1 1 0 0 0 1.028 0" />
              <path d="M7.5 10.5L12 13m0 0s3.764-2.05 4.5-2.5M12 13v4.5" />
            </g>
          </svg>
          Components
        </NavLink>
        <NavLink end to="/components/other/playground/edit" className={mainNavClass}>
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
            <g fill="none" stroke="currentColor" stroke-width="1.5">
              <path
                stroke-linecap="round"
                d="M14 21H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v10"
              />
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M2 7h20M5 5.01l.01-.011M8 5.01l.01-.011M11 5.01l.01-.011"
              />
              <path
                d="M22.082 18.365c.494.304.464 1.043-.045 1.1l-2.566.292l-1.152 2.312c-.228.458-.933.234-1.05-.334l-1.255-6.116c-.098-.48.333-.782.75-.525z"
                clip-rule="evenodd"
              />
            </g>
          </svg>
          Playground
        </NavLink>
      </div>

      <div className="mt-2rem w-full flex flex-col gap-1rem">
        <span className="block text-md">Components</span>
        <div className="mt-8px flex flex-col gap-1rem">
          {Object.entries(componentData).map(([key, category]) => (
            <NavLink key={key} to={`/components/${key}`} className={componentClass}>
              <span className="tn-capitalize">{category.title}</span>
              <span className="text-xs block box-18px br-999px bg-neutral-100 center text-neutral-800">
                {category.components.length}
              </span>
            </NavLink>
          ))}
        </div>
      </div>
    </>
  )
}
