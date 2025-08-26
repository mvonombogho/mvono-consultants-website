#!/bin/bash
echo "================================="
echo "FIXING ADMIN PAGES STATIC GENERATION ERROR"
echo "================================="

echo
echo "Step 1: Making admin pages dynamic..."

# Add dynamic export to admin pages
find app/admin -name "page.js" -o -name "page.tsx" | while read file; do
    if ! grep -q "export const dynamic" "$file"; then
        echo "export const dynamic = 'force-dynamic';" | cat - "$file" > temp && mv temp "$file"
        echo "Fixed: $file"
    fi
done

echo
echo "Step 2: Creating SessionProvider wrapper for admin..."

cat > app/admin/layout.js << 'EOF'
'use client';
import { SessionProvider } from 'next-auth/react';

export default function AdminLayout({ children }) {
  return (
    <SessionProvider>
      {children}
    </SessionProvider>
  );
}
EOF

echo
echo "Step 3: Deploying fix..."
git add .
git commit -m "Fix: Make admin pages dynamic and wrap with SessionProvider"
git push origin main

echo
echo "================================="
echo "ADMIN PAGES FIX DEPLOYED"
echo "================================="
