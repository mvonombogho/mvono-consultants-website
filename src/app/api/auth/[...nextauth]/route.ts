import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import bcrypt from 'bcryptjs'

// Demo admin user (replace with actual database lookup)
const demoUser = {
  id: '1',
  name: 'Admin User',
  email: 'admin@mvonoconsultants.com',
  // This is a hashed version of "password123" - in a real app, never hardcode passwords
  password: '$2a$10$QhzGN6PhQYsUTerZjDCGhuMnRBf0y6D2j8xt3IiF9JHg.ZS5d2xL2', 
  role: 'admin',
}

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null
        }
        
        // In a real app, you would look this up from a database
        if (credentials.email !== demoUser.email) {
          return null
        }
        
        // Check if password matches
        const isValid = await bcrypt.compare(credentials.password, demoUser.password)
        
        if (!isValid) {
          return null
        }
        
        // Return user object without the password
        return {
          id: demoUser.id,
          name: demoUser.name,
          email: demoUser.email,
          role: demoUser.role,
        }
      }
    })
  ],
  pages: {
    signIn: '/login',
    error: '/login', // Error code passed in query string as ?error=
  },
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  callbacks: {
    async jwt({ token, user }) {
      // Add role to the token if the user has just signed in
      if (user) {
        token.role = user.role
      }
      return token
    },
    async session({ session, token }) {
      // Add role to the session from the token
      if (session.user) {
        session.user.role = token.role as string
      }
      return session
    },
  },
  secret: process.env.NEXTAUTH_SECRET || 'my-super-secret-key-that-should-be-in-env',
})

export { handler as GET, handler as POST }
