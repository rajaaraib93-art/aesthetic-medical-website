import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { schemaTypes } from './sanity/schemaTypes'
import { projectId, dataset } from './sanity/env'

// Documents that exist exactly once. They get a fixed entry in the sidebar and
// cannot be duplicated or deleted from the Studio.
const SINGLETONS = ['homePage']

export default defineConfig({
  basePath: '/studio',
  name: 'aesthera-medical',
  title: 'IARM CMS',
  projectId,
  dataset,
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Content')
          .items([
            S.listItem()
              .title('Homepage')
              .id('homePage')
              .child(S.document().schemaType('homePage').documentId('homePage').title('Homepage')),
            S.divider(),
            ...S.documentTypeListItems().filter((item) => !SINGLETONS.includes(item.getId() ?? '')),
          ]),
    }),
  ],
  schema: {
    types: schemaTypes,
    templates: (templates) => templates.filter(({ schemaType }) => !SINGLETONS.includes(schemaType)),
  },
  document: {
    actions: (input, context) =>
      SINGLETONS.includes(context.schemaType)
        ? input.filter(({ action }) => !!action && ['publish', 'discardChanges', 'restore'].includes(action))
        : input,
  },
})
