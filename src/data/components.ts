// src/data/components.ts
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
        code: '<div class="p-4 border rounded shadow"><h3>Card Title</h3><p>Content</p></div>',
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
        code: '<div class="border rounded"><button class="w-full p-2">Toggle</button><div class="p-4">Content</div></div>',
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
