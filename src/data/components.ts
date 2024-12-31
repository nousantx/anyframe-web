// src/data/components.ts
export const componentLibraryData: ComponentLibrary = {
  buttons: {
    title: 'Buttons',
    description: 'Collection of button components',
    components: [
      {
        name: 'Primary Button',
        code: '<button class="bg-blue-500 text-white px-4 py-2 rounded">Click me</button>',
        description: 'Main call-to-action button'
      },
      {
        name: 'Secondary Button',
        code: '<button class="border-2 border-gray-500 px-4 py-2 rounded">Click me</button>',
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
