import { defineField, defineType } from 'sanity'

export default defineType({
  name:'doctor', title:'Doctor / Faculty', type:'document',
  fields:[
    defineField({name:'name',title:'Name',type:'string',validation:r=>r.required()}),
    defineField({name:'role',title:'Role',type:'string'}),
    defineField({name:'initials',title:'Initials',type:'string'}),
    defineField({name:'active',title:'Show on website',type:'boolean',initialValue:true}),
    defineField({name:'order',title:'Display order',type:'number',initialValue:10}),
    defineField({
      name: 'image',
      title: 'Photo',
      type: 'image',
      options: { hotspot: true },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alt text',
          description: 'Describe the image for screen readers and SEO',
          validation: (Rule) => Rule.required(),
        },
      ],
    }),
  ],
})
