import { Link } from 'react-router-dom'
import { styler } from '@stylx'
import { ArrowRight } from '@/components/ArrowRight'
export default function Start() {
  styler()
  return (
    <article
      className="p-2rem pt-nav-top w-mx-768px mx-auto"
      data-child="
      (span.light): fw-500 text-neutral-950; (span.code): family-code text-neutral-950 fs-80% bg-neutral-800 bg-opacity-0.1 br-4px px-4px py-2px fw-500;
      (p): fw-400 mt-1.6rem lh-1.5;"
    >
      <header>
        <div className="breadcrumbs">
          <Link to="/" className="first">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24">
              <path
                fill="none"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="1.5"
                d="M9 21H7a4 4 0 0 1-4-4v-6.292a4 4 0 0 1 1.927-3.421l5-3.03a4 4 0 0 1 4.146 0l5 3.03A4 4 0 0 1 21 10.707V17a4 4 0 0 1-4 4h-2m-6 0v-4a3 3 0 0 1 3-3v0a3 3 0 0 1 3 3v4m-6 0h6"
              />
            </svg>
          </Link>

          <ArrowRight />
          <span className="active">Get Started</span>
        </div>

        <h1 className="text-xl">What's this?</h1>
        <p>
          This project is just a components library. But, the key differences from another libraries
          are, you are not restricted to any JavaScript or CSS frameworks or libraries you uses,
          because all the <span className="light">styles are inlined to the end component</span>.
        </p>
        <p>
          Furthermore, if you don't like how the component looks, you can just edit them as you want
          by clicking the <span className="light">edit</span> button to match your tastes directly
          in your browser.
        </p>
      </header>

      <section className="mt-3rem">
        <h2 className="text-lg">How it works?</h2>

        <p>
          Let's say you pick one of button components here. If you see the code, you may notice the
          class names is just <span className="light">utility-first</span> like convention, right?
          Those classes later will converted to the element's{' '}
          <span className="light">style attribute (inline-style)</span>. For example, something like{' '}
          <span className="code">[background]-red</span> into{' '}
          <span className="code">background: red;</span>.
        </p>
        <p>
          But of course you won't stick with the CSS properties directly. You can use properties
          shorthand, such as <span className="code">bg-</span> for{' '}
          <span className="code">background</span> property, and so on. For example, instead of
          using <span className="code">class="[background]-red [color]-blue [font-size]-2rem"</span>
          , you can use <span className="code">class="bg-red text-blue fs-2rem"</span>.
        </p>
        <p>
          If the component doesn't matching your tastes, you can edit them by clicking edit button.
          And finally, you can copy the final components and just paste it into your project.
        </p>

        <h2 className="text-lg mt-2.5rem">⚠️ Limitations</h2>

        <p>
          Since the styles are <span className="light">inlined</span>, something like{' '}
          <span className="code">hover</span> and <span className="code">focus</span> won't
          generated, and it will also disabled all <span className="code">shorthands</span> that
          include <span className="code">transition</span> and{' '}
          <span className="code">transition-time</span> properties (will set to{' '}
          <span className="code">none</span>).
        </p>
      </section>
    </article>
  )
}
