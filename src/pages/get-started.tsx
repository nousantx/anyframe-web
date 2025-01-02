import { styler } from '@stylx'

export default function Start() {
  styler()
  return (
    <article
      className="p-2rem pt-6rem w-mx-768px mx-auto"
      data-child="(span.light): fw-500 text-neutral-950; (span.code): family-code text-neutral-950 fs-80% bg-neutral-800 bg-opacity-0.1 br-4px px-4px py-2px fw-500;"
    >
      <header>
        <h1 className="text-2xl">What's this?</h1>
        <p className="pa fw-400 mt-1rem text-neutral-800 lh-1.5">
          This project is just a components library. But, the key differences from another libraries
          are, you are not restricted to any JavaScript or CSS frameworks or libraries you uses,
          because all the <span className="light">styles are inlined to the end component</span>.
        </p>
        <p className="pa fw-400 mt-1.6rem text-neutral-800 lh-1.5">
          Furthermore, if you don't like how the component looks, you can just edit them as you want
          by clicking the <span className="light">edit</span> button to match your tastes directly
          in your browser.
        </p>
      </header>

      <section className="mt-3rem">
        <h2 className="text-xl">How it works?</h2>

        <p className="pa fw-400 mt-1.6rem text-neutral-800 lh-1.5">
          Let's say you pick one of button components here. If you see the code, you may notice the
          class names is just <span className="light">utility-first</span> like convention, right?
          Those classes later will converted to the element's{' '}
          <span className="light">style attribute (inline-style)</span>. For example, something like{' '}
          <span className="code">[background]-red</span> into{' '}
          <span className="code">background: red;</span>.
        </p>
        <p className="pa fw-400 mt-1.6rem text-neutral-800 lh-1.5">
          But of course you won't stick with the CSS properties directly. You can use properties
          shorthand, such as <span className="code">bg-</span> for{' '}
          <span className="code">background</span> property, and so on.
        </p>
      </section>
    </article>
  )
}
