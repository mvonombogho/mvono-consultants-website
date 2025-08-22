@echo off
echo =================================
echo FIXING AUTHENTICATION DEPLOYMENT ERRORS
echo =================================

echo.
echo 1. Updating lib/auth.ts with proper exports...

echo import { NextAuthOptions, getServerSession } from 'next-auth'; > lib\auth.ts
echo import CredentialsProvider from 'next-auth/providers/credentials'; >> lib\auth.ts
echo import { PrismaClient } from '@prisma/client'; >> lib\auth.ts
echo import { compare } from 'bcrypt'; >> lib\auth.ts
echo. >> lib\auth.ts
echo const prisma = new PrismaClient(); >> lib\auth.ts
echo. >> lib\auth.ts
echo export const authOptions: NextAuthOptions = { >> lib\auth.ts
echo   providers: [ >> lib\auth.ts
echo     CredentialsProvider({ >> lib\auth.ts
echo       name: 'Credentials', >> lib\auth.ts
echo       credentials: { >> lib\auth.ts
echo         email: { label: 'Email', type: 'email' }, >> lib\auth.ts
echo         password: { label: 'Password', type: 'password' } >> lib\auth.ts
echo       }, >> lib\auth.ts
echo       async authorize(credentials) { >> lib\auth.ts
echo         if (!credentials?.email ^|^| !credentials?.password) { >> lib\auth.ts
echo           return null; >> lib\auth.ts
echo         } >> lib\auth.ts
echo. >> lib\auth.ts
echo         const user = await prisma.user.findUnique({ >> lib\auth.ts
echo           where: { email: credentials.email } >> lib\auth.ts
echo         }); >> lib\auth.ts
echo. >> lib\auth.ts
echo         if (!user) return null; >> lib\auth.ts
echo. >> lib\auth.ts
echo         const isPasswordValid = await compare(credentials.password, user.password); >> lib\auth.ts
echo         if (!isPasswordValid) return null; >> lib\auth.ts
echo. >> lib\auth.ts
echo         return { >> lib\auth.ts
echo           id: user.id, >> lib\auth.ts
echo           name: user.name, >> lib\auth.ts
echo           email: user.email, >> lib\auth.ts
echo           role: user.role >> lib\auth.ts
echo         }; >> lib\auth.ts
echo       } >> lib\auth.ts
echo     }) >> lib\auth.ts
echo   ], >> lib\auth.ts
echo   session: { strategy: 'jwt', maxAge: 30 * 24 * 60 * 60 }, >> lib\auth.ts
echo   callbacks: { >> lib\auth.ts
echo     async jwt({ token, user }) { >> lib\auth.ts
echo       if (user) { >> lib\auth.ts
echo         token.id = user.id; >> lib\auth.ts
echo         token.role = user.role; >> lib\auth.ts
echo       } >> lib\auth.ts
echo       return token; >> lib\auth.ts
echo     }, >> lib\auth.ts
echo     async session({ session, token }) { >> lib\auth.ts
echo       if (session.user) { >> lib\auth.ts
echo         session.user.id = token.id as string; >> lib\auth.ts
echo         session.user.role = token.role as string; >> lib\auth.ts
echo       } >> lib\auth.ts
echo       return session; >> lib\auth.ts
echo     } >> lib\auth.ts
echo   }, >> lib\auth.ts
echo   pages: { signIn: '/login', error: '/login' }, >> lib\auth.ts
echo   secret: process.env.NEXTAUTH_SECRET, >> lib\auth.ts
echo }; >> lib\auth.ts
echo. >> lib\auth.ts
echo export const auth = () =^> getServerSession(authOptions); >> lib\auth.ts

echo.
echo 2. Updating NextAuth route...

echo import NextAuth from 'next-auth'; > app\api\auth\[...nextauth]\route.ts
echo import { authOptions } from '../../../../lib/auth'; >> app\api\auth\[...nextauth]\route.ts
echo. >> app\api\auth\[...nextauth]\route.ts
echo const handler = NextAuth(authOptions); >> app\api\auth\[...nextauth]\route.ts
echo. >> app\api\auth\[...nextauth]\route.ts
echo export { handler as GET, handler as POST, authOptions }; >> app\api\auth\[...nextauth]\route.ts

echo.
echo 3. Fixing email route imports...

powershell -Command "Get-ChildItem -Path 'app\api\email' -Recurse -Name '*.ts' | ForEach-Object { $file = 'app\api\email\' + $_; $content = Get-Content $file -Raw; if ($content -match 'auth\(\)' -and $content -notmatch 'authOptions') { $content = $content -replace 'import \{ auth \} from ''../../../../lib/auth'';', 'import { auth, authOptions } from ''''../../../../lib/auth'''';'; $content = $content -replace 'auth\(\)', 'getServerSession(authOptions)'; if ($content -notmatch 'getServerSession') { $content = 'import { getServerSession } from ''''next-auth/next'''';`n' + $content; } Set-Content -Path $file -Value $content; Write-Host 'Fixed: ' $file; } }"

echo.
echo 4. Fixing marketing route imports...

powershell -Command "Get-ChildItem -Path 'app\api\marketing' -Recurse -Name '*.ts' | ForEach-Object { $file = 'app\api\marketing\' + $_; $content = Get-Content $file -Raw; if ($content -match 'auth\(\)' -and $content -notmatch 'authOptions') { $content = $content -replace 'import \{ auth \} from ''[^'']*lib/auth'';', 'import { authOptions } from ''''../../../../lib/auth''''; import { getServerSession } from ''''next-auth/next'''';'; $content = $content -replace 'auth\(\)', 'getServerSession(authOptions)'; Set-Content -Path $file -Value $content; Write-Host 'Fixed: ' $file; } }"

echo.
echo 5. Fixing JavaScript route files...

powershell -Command "Get-ChildItem -Path 'app\api' -Recurse -Name '*.js' | ForEach-Object { $file = 'app\api\' + $_; $content = Get-Content $file -Raw; if ($content -match 'authOptions' -and $content -notmatch 'import.*authOptions') { $levels = ($file -split '\\').Count - 3; $upPath = '../' * $levels + 'auth/[...nextauth]/route'; $content = 'import { authOptions } from '''' + $upPath + ''''';`n' + $content; Set-Content -Path $file -Value $content; Write-Host 'Fixed JS: ' $file; } }"

echo.
echo 6. Testing build...
npm run build

echo.
echo =================================
echo AUTH DEPLOYMENT FIX COMPLETE!
echo =================================
pause
