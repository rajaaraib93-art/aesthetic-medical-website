import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'service',
  title: 'Service',
  type: 'document',
  fields: [
    defineField({ name:'title', title:'Title', type:'string', validation:r=>r.required() }),
    defineField({ name:'slug', title:'Slug', type:'slug', options:{source:'title'}, validation:r=>r.required() }),
    defineField({ name:'category', title:'Category', type:'string' }),
    defineField({ name:'short', title:'Short description', type:'text', rows:3, validation:r=>r.required() }),
    defineField({ name:'body', title:'Long description', type:'text', rows:8 }),
    defineField({ name:'order', title:'Display order', type:'number', initialValue:10 }),
  ],
})
