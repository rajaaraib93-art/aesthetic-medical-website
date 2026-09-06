import { defineQuery } from 'next-sanity'

export const SERVICES_QUERY = defineQuery(`
  *[_type == "service" && defined(slug.current)] | order(order asc) {
    _id, title, slug, short, body, category
  }
`)

export const SERVICE_QUERY = defineQuery(`
  *[_type == "service" && slug.current == $slug][0] {
    _id, title, slug, short, body, category
  }
`)

export const COURSES_QUERY = defineQuery(`
  *[_type == "course" && defined(slug.current)] | order(date asc) {
    _id, title, slug, date, location, tag, price, desc
  }
`)

export const FACULTY_QUERY = defineQuery(`
  *[_type == "doctor" && active == true] | order(order asc) { _id, name, role, initials }
`)

export const TESTIMONIALS_QUERY = defineQuery(`
  *[_type == "testimonial"] | order(order asc) { _id, quote, name, role }
`)
