// lib/sanity.auth.js
import { defineCliConfig } from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'k6oxvo7b',
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  },
  auth: {
    token: process.env.SANITY_API_TOKEN,
  }
})
