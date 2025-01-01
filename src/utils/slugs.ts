export function createSlug(text: string): string {
  return text
    .toLowerCase()
    .replace(/\s+/g, '-') // Replace spaces with -
    .replace(/[^\w\-]+/g, '') // Remove all non-word chars
    .replace(/\-\-+/g, '-') // Replace multiple - with single -
    .trim() // Trim - from start and end
}

export function getComponentBySlug(components: any[], slug: string) {
  return components.find((component) => createSlug(component.name) === slug)
}
