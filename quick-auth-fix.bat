@echo off
echo =================================
echo FIXING ALL AUTH IMPORT ERRORS
echo =================================

echo.
echo Removing problematic auth imports and replacing with working ones...

REM Create the fixed auth.ts file
(
echo import { NextAuthOptions, getServerSession } from 'next-auth';
echo import CredentialsProvider from 'next-auth/providers/credentials';
echo import { PrismaClient } from '@prisma/client';
echo import { compare } from 'bcrypt';
echo.
echo const prisma = new PrismaClient^(^);
echo.
echo export const authOptions: NextAuthOptions = {
echo   providers: [
echo     CredentialsProvider^({
echo       name: 'Credentials',
echo       credentials: {
echo         email: { label: 'Email', type: 'email' },
echo         password: { label: 'Password', type: 'password' }
echo       },
echo       async authorize^(credentials^) {
echo         if ^(!credentials?.email ^|^| !credentials?.password^) return null;
echo         const user = await prisma.user.findUnique^({ where: { email: credentials.email } }^);
echo         if ^(!user^) return null;
echo         const isPasswordValid = await compare^(credentials.password, user.password^);
echo         if ^(!isPasswordValid^) return null;
echo         return { id: user.id, name: user.name, email: user.email, role: user.role };
echo       }
echo     }^)
echo   ],
echo   session: { strategy: 'jwt', maxAge: 30 * 24 * 60 * 60 },
echo   callbacks: {
echo     async jwt^({ token, user }^) {
echo       if ^(user^) { token.id = user.id; token.role = user.role; }
echo       return token;
echo     },
echo     async session^({ session, token }^) {
echo       if ^(session.user^) {
echo         session.user.id = token.id as string;
echo         session.user.role = token.role as string;
echo       }
echo       return session;
echo     }
echo   },
echo   pages: { signIn: '/login', error: '/login' },
echo   secret: process.env.NEXTAUTH_SECRET
echo };
echo.
echo export const auth = ^(^) =^> getServerSession^(authOptions^);
) > lib\auth.ts

REM Fix NextAuth route
(
echo import NextAuth from 'next-auth';
echo import { authOptions } from '../../../../lib/auth';
echo.
echo const handler = NextAuth^(authOptions^);
echo.
echo export { handler as GET, handler as POST, authOptions };
) > app\api\auth\[...nextauth]\route.ts

echo.
echo Fixed core auth files. Now running build test...
npm run build

if %ERRORLEVEL% EQU 0 (
    echo.
    echo ✅ SUCCESS! Committing and pushing...
    git add .
    git commit -m "Fix: Authentication deployment errors resolved"
    git push origin main
    echo.
    echo 🚀 DEPLOYED! Check Vercel dashboard.
) else (
    echo.
    echo ❌ Still errors. Check output above.
)

pause
