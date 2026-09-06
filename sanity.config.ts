import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { schemaTypes } from './sanity/schemaTypes'
import { projectId, dataset } from './sanity/env'

export default defineConfig({
  basePath: '/studio',
  name: 'aesthera-medical',
  title: 'Aesthera Medical CMS',
  projectId,
  dataset,
  plugins: [structureTool()],
  schema: { types: schemaTypes },
})
