// lib/sanity.js
import { createClient } from 'next-sanity'
import imageUrlBuilder from '@sanity/image-url'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'k6xvho7h'
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2025-05-19'

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false, // set to true for production
})

// Used to fetch data in the getStaticProps page functions
export const sanityClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
})

// Used to fetch data in the client-side components with the token
export const writeClient = createClient({
  projectId,
  dataset,
  apiVersion,
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
})

// Helper function for image URLs
const builder = imageUrlBuilder(client)
export const urlFor = (source) => builder.image(source)

// Helper function to use GROQ to query Sanity
export async function fetchSanityData(query, params = {}) {
  try {
    return await client.fetch(query, params)
  } catch (error) {
    console.error('Sanity fetch error:', error)
    return null
  }
}
