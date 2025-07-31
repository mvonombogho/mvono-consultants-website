# 🔧 NEXT.JS DYNAMIC ROUTE CONFLICT - SOLUTION

## ❌ PROBLEM
You have conflicting dynamic routes in your Next.js app:

**Conflicting Dashboard Routes:**
- `app\(dashboard)\(routes)\cross-sell\[id]\page.tsx` ✅ (keep)
- `app\(dashboard)\(routes)\cross-sell\[opportunityId]\page.tsx` ❌ (remove)

**Conflicting API Routes:**
- `app\api\marketing\cross-sell\[id]\route.ts` ✅ (keep)  
- `app\api\marketing\cross-sell\[opportunityId]\route.ts` ❌ (remove)

## 🎯 ROOT CAUSE
Next.js doesn't allow different dynamic parameter names (`id` vs `opportunityId`) in the same route path. This creates routing ambiguity.

## ✅ SOLUTION
Remove the duplicate `[opportunityId]` directories. Both versions are functionally identical - they just use different parameter names.

## 🚀 QUICK FIX

**Option 1: Run the fix script**
```bash
fix-route-conflict.bat
```

**Option 2: Manual deletion**
1. Delete: `app\(dashboard)\(routes)\cross-sell\[opportunityId]\`
2. Delete: `app\api\marketing\cross-sell\[opportunityId]\`

## 📋 VERIFICATION
After removal, you should only have:
- ✅ `app\(dashboard)\(routes)\cross-sell\[id]\page.tsx`
- ✅ `app\api\marketing\cross-sell\[id]\route.ts`

## 🎉 RESULT
- ✅ Next.js will start without route conflicts
- ✅ All cross-sell functionality remains intact
- ✅ Uses standard `id` parameter convention
- ✅ No website functionality is changed

## 🔍 WHY THIS HAPPENED
This often occurs when:
- Routes are created with different naming conventions
- Code is merged from different branches
- Templates are copied and not properly renamed

The fix ensures consistent parameter naming across your app.
