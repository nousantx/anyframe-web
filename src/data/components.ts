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

export const componentData: ComponentLibrary = {
  alert: {
    title: 'Alert',
    description: 'Component that needs caught user attention',
    components: [
      {
        name: 'Simple',
        description: 'Text only  alert',
        code: `<div class="w-mx-350px border bdr-c-neutral-300 br-8px p-1rem" data-child="(*): [m,p]-0;">
  <p class="text-md text-neutral-950 fw-500">Need Attention!</p>
  <p class="mt-8px text-neutral-700 fw-400">Your account exceeded the limit of 2000 messages a day. Consider <a href="#" class="text-blue-500">upgrading your plan</a>.</p>
</div>`
      },
      {
        name: 'With Icon',
        description: 'Simple alert with icon',
        code: `<div class="w-mx-450px border bdr-c-neutral-300 br-8px p-1rem flex gap-1rem" data-child="(*): [m,p]-0;">
  <div class="box-40px center">
    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M18 2v3m0 4.01l.01-.011M13 2.05Q12.507 2 12 2C6.477 2 2 6.477 2 12c0 1.821.487 3.53 1.338 5L2.5 21.5l4.5-.838A9.96 9.96 0 0 0 12 22c5.523 0 10-4.477 10-10q0-.507-.05-1"/></svg>
   </div>
  <header>
    <p class="text-md text-neutral-950 fw-500">Need Attention!</p>
    <p class="mt-8px text-neutral-700 fw-400">Your account exceeded the limit of 2000 messages a day. Consider <a href="#" class="text-blue-500">upgrading your plan</a>.</p>
  </header>
</div>`
      },
      {
        name: 'Single Color',
        description: 'Just edit single color and it will works just fine',
        code: `<div class="w-mx-450px [bg,text]-red-600 bg-opacity-0.1  br-8px h-45px px-18px flex ai-center space gap-1rem" data-child="(*): [m,p]-0;">
  <div class="center gap-8px">
    <div class="box-20px center">
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 7v6m0 4.01l.01-.011M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2S2 6.477 2 12s4.477 10 10 10"/></svg>
    </div>
    <p class="fw-500">Something went wrong!</p>
  </div>
</div>`
      },
      {
        name: 'Batch Color',
        description: 'Just edit single color and it will works just fine',
        code: `
<div 
  class="center flex-col  gap-1rem family-sans" 
  data-child="
    (*): [m,p]-0;
    (.alert): w-mx-450px [bg,text]-$color bg-opacity-0.1 br-8px h-45px px-18px flex ai-center space gap-1rem;
    (.alert > div): center gap-8px;
    (.alert > div > div): center box-20px;
    (.alert > div > p): fw-400;
  ">
  <div class="alert [--color]-green-500">
    <div>
      <div>
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-width="1.5"><path d="M8.5 4H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h6m3.5-18H18a2 2 0 0 1 2 2v9"/><path d="M8 6.4V4.5a.5.5 0 0 1 .5-.5c.276 0 .504-.224.552-.496C9.2 2.652 9.774 1 12 1s2.8 1.652 2.948 2.504c.048.272.276.496.552.496a.5.5 0 0 1 .5.5v1.9a.6.6 0 0 1-.6.6H8.6a.6.6 0 0 1-.6-.6Z"/><path stroke-linejoin="round" d="m15.5 20.5l2 2l5-5"/></g></svg>
      </div>
      <p>Copied!</p>
    </div>
  </div>
  <div class="alert border [--color]-blue-500">
    <div>
      <div>
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 7v6m0 4.01l.01-.011M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2S2 6.477 2 12s4.477 10 10 10"/></svg>
      </div>
      <p>Something went wrong!</p>
    </div>
  </div>
</div>`
      }
    ]
  },
  button: {
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
      },
      {
        name: 'Small Button',
        description: 'Small button size variant ',
        code: `<button class="[border,outline]-none h-30px px-10px br-6px center bg-blue-500 hover:bg-blue-400 fs-14px ls--0.015em text-fc-neutral-50 tr-time-300ms">
  Small
</button>`
      },
      {
        name: 'Large Button',
        description: 'Larger button size variant ',
        code: `<button class="[border,outline]-none h-40px px-14px br-8px center bg-blue-500 hover:bg-blue-400 fs-18px ls--0.015em text-fc-neutral-50 tr-time-300ms">
  Large
</button>`
      },
      {
        name: 'Outline Button',
        description: 'Button with border',
        code: `<button class="[border,outline]-none h-35px px-12px br-8px center bg-opacity-0 hover:bg-opacity-1 text-neutral-950 border [bg,bdr-c]-neutral-100 tr-time-300ms">
  Outline
</button>`
      },
      {
        name: 'Ghost Button',
        description: 'Transparent background button',
        code: `<button class="[border,outline]-none h-35px px-12px br-8px center bg-opacity-0 hover:bg-opacity-1 text-neutral-950 bg-neutral-100 tr-time-300ms">
  Ghost
</button>`
      },
      {
        name: 'Link',
        description: 'Button as link',
        code: `<button class="[border,outline,background]-none h-35px px-12px br-8px center text-neutral-950 td-none hover:td-underline tr-time-300ms">
  Link
</button>`
      }
    ]
  },
  card: {
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
  accordion: {
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
        name: 'Gradient Box',
        description: 'Simple gradient box',
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
</div>`
      }
    ]
  }
}
