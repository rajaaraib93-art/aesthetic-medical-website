import createImageUrlBuilder from '@sanity/image-url'
type SanityImageSource = any
import { dataset, projectId } from '../env'

const builder = createImageUrlBuilder({ projectId, dataset })

export function urlFor(source: SanityImageSource) {
  return builder.image(source)
}
