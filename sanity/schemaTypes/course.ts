import { defineField, defineType } from 'sanity'

export default defineType({
  name:'course', title:'Course', type:'document',
  fields:[
    defineField({name:'title',title:'Title',type:'string',validation:r=>r.required()}),
    defineField({name:'slug',title:'Slug',type:'slug',options:{source:'title'},validation:r=>r.required()}),
    defineField({name:'date',title:'Date / date range',type:'string',validation:r=>r.required()}),
    defineField({name:'location',title:'Location',type:'string'}),
    defineField({name:'tag',title:'Tag',type:'string',initialValue:'Course'}),
    defineField({name:'price',title:'Price',type:'string'}),
    defineField({name:'desc',title:'Description',type:'text',rows:4}),
    defineField({name:'published',title:'Published',type:'boolean',initialValue:true}),
  ],
})
