import { styler } from '@stylx'

export default function Installation() {
  styler()
  return (
    <article
      data-child="
      (span.light): fw-500 text-neutral-950; (span.code): family-code text-neutral-950 fs-80% bg-neutral-800 bg-opacity-0.1 br-4px px-4px py-2px fw-500;
      (p): fw-400 mt-1.6rem lh-1.5;"
    >
      <header>
        <h1 className="text-xl">Installation</h1>
        <p>
          You need to follow these steps sequentially and carefully to make sure its working
          normally!!!!
        </p>
      </header>

      <section className="mt-2.5rem">
        <h2 className="text-lg">Step by step</h2>

        <p>1. Copy it</p>
        <p>2. Paste it</p>
        <p>3. Enjoy it 🤓👍</p>
        <h2 className="mt-2rem text-lg">Explanation</h2>
        <p>
          As i said earlier, all the styles is generated in your browser into{' '}
          <span className="code">inline-style</span>, so you're not restricted to specific framework
          and use it anywhere.
        </p>
      </section>
    </article>
  )
}
