export const componentData: ComponentLibrary = {
  buttons: {
    title: 'Buttons',
    description: 'Just button, what did you expect?',
    components: [
      {
        name: 'Primary Button',
        code: `<button class="[border,outline]-none h-35px px-12px br-8px center bg-blue-500 hover:bg-blue-400 text-fc-neutral-50 tr-time-300ms">
  Button
</button>`,
        description: 'Main call-to-action button'
      },
      {
        name: 'Secondary Button',
        code: '<button class="[border,outline]-none h-35px px-12px br-8px center bg-neutral-100 hover:bg-neutral-200 text-neutral-950 tr-time-300ms">Button</button>',
        description: 'Secondary action button'
      }
    ]
  },
  cards: {
    title: 'Cards',
    description: 'Various card layouts',
    components: [
      {
        name: 'Basic Card',
        code: '<div class="bw-1px bs-solid bdr-c-neutral-900 shadow-lg"><h3>Card Title</h3><p>Content</p></div>',
        description: 'Simple card with title and content'
      }
    ]
  },
  accordions: {
    title: 'Accordions',
    description: 'Expandable accordion components',
    components: [
      {
        name: 'Simple Accordion',
        code: '<div class="border rounded"><button class="w-full p-2">Toggle</button><div class="p-4px">Content</div></div>',
        description: 'Basic accordion implementation'
      }
    ]
  },
  other: {
    title: 'Other',
    description: 'Some components you may want to ',
    components: [
      {
        name: 'Playground',
        code: '<div class="box-200px center bg-lime-200 br-1rem">Content</div>',
        description: 'Basic accordion implementation'
      },
      {
        name: 'UI Gradient',
        code: `<div
  class="family-sans [--gradient]-[conic-gradient(from_45deg,_rgb({amber-500}),_rgb({fuchsia-500}),_rgb({amber-500}))]"
  data-child="(*): [m,p]-0 [box-sizing]-border-box;"
>
  <div class="[--box-size]-250px box-$box-size br-8px center relative [isolation]-isolate [background]-$gradient">
    <div class="box-$box-size br-8px absolute z--1 [filter]-[blur(30px)] [background]-$gradient"></div>
    <div
      class="box-[calc(var(--box-size)_-_10px)] [background]-[linear-gradient(45deg,_rgb({neutral-50}),_rgb({neutral-100}))] text-neutral-900 br-4px p-1.5rem flex flex-col"
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24">
        <path
          fill="currentColor"
          d="M6 3a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3h12a3 3 0 0 0 3-3V6a3 3 0 0 0-3-3zm10 8l-5 7v-5H8l5-7v5z"
        />
      </svg>
      <header class="mt-auto">
        <h1 class="text-md ls--0.020em">Hello World!</h1>
        <p class="text-xs fw-500 text-neutral-400">Hello Lorem ipsum dolor sit.</p>
      </header>
    </div>
  </div>
</div>`,
        description: 'Basic accordion implementation'
      }
    ]
  }
}

interface Component {
  name: string
  code: string
  description: string
}

interface CategoryData {
  title: string
  description: string
  components: Component[]
}

interface ComponentLibrary {
  [key: string]: CategoryData
}
