import { defineField, defineType } from 'sanity'

export default defineType({
  name:'siteSettings', title:'Site Settings', type:'document',
  fields:[
    defineField({name:'siteName',title:'Site name',type:'string'}),
    defineField({name:'heroTitle',title:'Hero title',type:'string'}),
    defineField({name:'heroText',title:'Hero text',type:'text',rows:4}),
    defineField({name:'phone',title:'Phone',type:'string'}),
    defineField({name:'email',title:'Email',type:'string'}),
    defineField({name:'whatsapp',title:'WhatsApp link',type:'url'}),
    defineField({name:'stats',title:'Trust stats',type:'array',of:[{type:'object',fields:[{name:'value',type:'string'},{name:'label',type:'string'}]}]}),
  ],
})
