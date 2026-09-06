import { defineField, defineType } from 'sanity'

export default defineType({
  name:'article', title:'Article', type:'document',
  fields:[
    defineField({name:'title',title:'Title',type:'string',validation:r=>r.required()}),
    defineField({name:'slug',title:'Slug',type:'slug',options:{source:'title'},validation:r=>r.required()}),
    defineField({name:'excerpt',title:'Excerpt',type:'text',rows:3}),
    defineField({name:'publishedAt',title:'Published at',type:'datetime'}),
    defineField({name:'body',title:'Body',type:'text',rows:12}),
  ],
})
