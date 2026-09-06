import { defineField, defineType } from 'sanity'

export default defineType({
  name:'inquiry', title:'Patient Inquiry', type:'document',
  fields:[
    defineField({name:'name',title:'Name',type:'string'}),
    defineField({name:'phone',title:'Phone',type:'string'}),
    defineField({name:'email',title:'Email',type:'string'}),
    defineField({name:'interest',title:'Interest',type:'string'}),
    defineField({name:'message',title:'Message',type:'text',rows:6}),
    defineField({name:'submittedAt',title:'Submitted at',type:'datetime'}),
  ],
})
