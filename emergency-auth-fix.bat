@echo off
echo =================================
echo EMERGENCY AUTH FIXES FOR VERCEL
echo =================================

echo.
echo Step 1: Fixing core auth files...

REM Fix lib/auth.ts
echo import { NextAuthOptions, getServerSession } from 'next-auth'; > lib\auth.ts
echo import CredentialsProvider from 'next-auth/providers/credentials'; >> lib\auth.ts
echo import { PrismaClient } from '@prisma/client'; >> lib\auth.ts
echo import { compare } from 'bcrypt'; >> lib\auth.ts
echo. >> lib\auth.ts
echo const prisma = new PrismaClient(); >> lib\auth.ts
echo. >> lib\auth.ts
echo export const authOptions: NextAuthOptions = { >> lib\auth.ts
echo   providers: [CredentialsProvider({ >> lib\auth.ts
echo     name: 'Credentials', >> lib\auth.ts
echo     credentials: { >> lib\auth.ts
echo       email: { label: 'Email', type: 'email' }, >> lib\auth.ts
echo       password: { label: 'Password', type: 'password' } >> lib\auth.ts
echo     }, >> lib\auth.ts
echo     async authorize(credentials) { >> lib\auth.ts
echo       if (!credentials?.email ^|^| !credentials?.password) return null; >> lib\auth.ts
echo       const user = await prisma.user.findUnique({ where: { email: credentials.email } }); >> lib\auth.ts
echo       if (!user) return null; >> lib\auth.ts
echo       const isPasswordValid = await compare(credentials.password, user.password); >> lib\auth.ts
echo       if (!isPasswordValid) return null; >> lib\auth.ts
echo       return { id: user.id, name: user.name, email: user.email, role: user.role }; >> lib\auth.ts
echo     } >> lib\auth.ts
echo   })], >> lib\auth.ts
echo   session: { strategy: 'jwt', maxAge: 30 * 24 * 60 * 60 }, >> lib\auth.ts
echo   callbacks: { >> lib\auth.ts
echo     async jwt({ token, user }) { if (user) { token.id = user.id; token.role = user.role; } return token; }, >> lib\auth.ts
echo     async session({ session, token }) { if (session.user) { session.user.id = token.id as string; session.user.role = token.role as string; } return session; } >> lib\auth.ts
echo   }, >> lib\auth.ts
echo   pages: { signIn: '/login', error: '/login' }, >> lib\auth.ts
echo   secret: process.env.NEXTAUTH_SECRET >> lib\auth.ts
echo }; >> lib\auth.ts
echo. >> lib\auth.ts
echo export const auth = () =^> getServerSession(authOptions); >> lib\auth.ts

REM Fix NextAuth route
echo import NextAuth from 'next-auth'; > app\api\auth\[...nextauth]\route.ts
echo import { authOptions } from '../../../../lib/auth'; >> app\api\auth\[...nextauth]\route.ts
echo const handler = NextAuth(authOptions); >> app\api\auth\[...nextauth]\route.ts
echo export { handler as GET, handler as POST, authOptions }; >> app\api\auth\[...nextauth]\route.ts

echo.
echo Step 2: Quick fix for problematic routes...

REM Fix the specific file causing the error
echo import { NextRequest, NextResponse } from "next/server"; > app\api\certifications\[id]\route.ts
echo import { getServerSession } from "next-auth/next"; >> app\api\certifications\[id]\route.ts
echo import { authOptions } from "../../../../lib/auth"; >> app\api\certifications\[id]\route.ts
echo import prisma from "../../../../lib/prisma"; >> app\api\certifications\[id]\route.ts
echo. >> app\api\certifications\[id]\route.ts
echo export async function GET(req: NextRequest, { params }: { params: { id: string } }) { >> app\api\certifications\[id]\route.ts
echo   try { >> app\api\certifications\[id]\route.ts
echo     const session = await getServerSession(authOptions); >> app\api\certifications\[id]\route.ts
echo     if (!session ^|^| !session.user) return NextResponse.json({ success: false, message: "Unauthenticated" }, { status: 401 }); >> app\api\certifications\[id]\route.ts
echo     const certification = await prisma.certification.findUnique({ where: { id: params.id } }); >> app\api\certifications\[id]\route.ts
echo     if (!certification) return NextResponse.json({ success: false, message: "Not found" }, { status: 404 }); >> app\api\certifications\[id]\route.ts
echo     return NextResponse.json({ success: true, certification }); >> app\api\certifications\[id]\route.ts
echo   } catch (error) { >> app\api\certifications\[id]\route.ts
echo     return NextResponse.json({ success: false, message: "Server error" }, { status: 500 }); >> app\api\certifications\[id]\route.ts
echo   } >> app\api\certifications\[id]\route.ts
echo } >> app\api\certifications\[id]\route.ts

echo.
echo Step 3: Testing build immediately...
npm run build

if %ERRORLEVEL% EQU 0 (
    echo.
    echo ✅ BUILD SUCCESS! Deploying to Vercel...
    echo.
    git add .
    git commit -m "EMERGENCY: Fix authentication deployment errors"
    git push origin main
    echo.
    echo 🚀 Pushed to GitHub - Vercel will auto-deploy
) else (
    echo.
    echo ❌ Build still failing - check errors above
)

echo.
echo =================================
echo EMERGENCY FIX COMPLETE
echo =================================
pause
