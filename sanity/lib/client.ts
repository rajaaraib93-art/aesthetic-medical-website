import { createClient } from 'next-sanity'
import { apiVersion, dataset, projectId } from '../env'

export const client = projectId
  ? createClient({
      projectId,
      dataset,
      apiVersion,
      useCdn: true,
      perspective: 'published',
    })
  : (null as any)

export const writeClient = process.env.SANITY_WRITE_TOKEN
  ? createClient({
      projectId,
      dataset,
      apiVersion,
      token: process.env.SANITY_WRITE_TOKEN,
      useCdn: false,
      perspective: 'published',
    })
  : null
