# WhatsApp Chat Widget Troubleshooting Guide

## Quick Test Steps

### Step 1: Check if the Widget Appears
1. Visit your website homepage
2. Look for a green floating button in the bottom-right corner
3. If you don't see it, check the browser console for errors (F12 → Console tab)

### Step 2: Test the Direct WhatsApp Link
1. Try this direct link in your browser:
   ```
   https://wa.me/254701868849?text=Test%20message%20from%20website
   ```
2. This should open WhatsApp with a pre-filled message
3. If this doesn't work, the issue might be with your phone number or WhatsApp setup

### Step 3: Test the Chat Widget
1. Click the green chat button
2. A chat window should open
3. Type a test message
4. Click Send
5. It should open WhatsApp with your message

## Common Issues & Solutions

### Issue 1: Widget Not Appearing
**Possible Causes:**
- JavaScript error preventing component from loading
- CSS conflicts hiding the widget
- Component not properly imported

**Solutions:**
1. Check browser console for errors (F12 → Console)
2. Try refreshing the page
3. Clear browser cache
4. Try in incognito/private browsing mode

### Issue 2: WhatsApp Not Opening
**Possible Causes:**
- WhatsApp not installed on mobile device
- Browser blocking pop-ups
- Incorrect phone number format

**Solutions:**
1. **On Mobile**: Make sure WhatsApp is installed
2. **On Desktop**: WhatsApp Web should open automatically
3. **Check Pop-up Blocker**: Allow pop-ups for your website
4. **Phone Number**: Verify +254701868849 is correct

### Issue 3: Message Not Sending
**Possible Causes:**
- Empty message field
- JavaScript error in send function
- URL encoding issues

**Solutions:**
1. Make sure to type a message before clicking Send
2. Check browser console for JavaScript errors
3. Try the direct WhatsApp link test above

### Issue 4: Chat Window Not Opening
**Possible Causes:**
- CSS z-index conflicts
- React state management issues
- Component event handlers not working

**Solutions:**
1. Try clicking multiple times
2. Check if other floating elements are blocking it
3. Test in different browser

## Browser Compatibility

### Tested Browsers
- ✅ Chrome (recommended)
- ✅ Firefox  
- ✅ Safari
- ✅ Edge
- ⚠️ Internet Explorer (not recommended)

### Mobile Compatibility
- ✅ iOS Safari
- ✅ Android Chrome
- ✅ Mobile Firefox

## Testing Commands

### Test in Browser Console
Open browser console (F12) and run:

```javascript
// Test if component is loaded
console.log('Testing WhatsApp widget...');

// Test direct WhatsApp link
window.open('https://wa.me/254701868849?text=Test%20from%20console', '_blank');
```

### Test Phone Number Format
Try these different formats:
- `https://wa.me/254701868849` (current format)
- `https://wa.me/+254701868849` (with plus sign)
- `https://api.whatsapp.com/send?phone=254701868849` (alternative API)

## Manual Testing Steps

### Test 1: Simple Button Test
1. Add this temporary component to test basic functionality
2. Replace the current widget temporarily with a simple button
3. See if the basic WhatsApp link works

### Test 2: Console Error Check
1. Open Developer Tools (F12)
2. Go to Console tab
3. Refresh the page
4. Look for any red error messages
5. Share these errors for debugging

### Test 3: Network Tab Check
1. Open Developer Tools (F12)
2. Go to Network tab
3. Refresh the page
4. Look for any failed requests (red entries)

## Quick Fixes to Try

### Fix 1: Use Direct Button Instead
If the chat widget is not working, use the simple direct button:

```typescript
// Replace the complex widget with simple button
<DirectWhatsAppButton 
  phoneNumber="254701868849"
  message="Hello! I am interested in your consultancy services."
  position="bottom-right"
/>
```

### Fix 2: Clear Cache and Reload
1. Clear browser cache (Ctrl+Shift+Delete)
2. Hard refresh (Ctrl+Shift+R)
3. Try in incognito/private mode

### Fix 3: Check Phone Number
Verify your WhatsApp is working with this number:
- Phone: +254 701 868 849
- International format: 254701868849

## Advanced Debugging

### Check Component State
Add this to see if React components are working:

```javascript
// Add to component for debugging
console.log('WhatsApp widget rendered');
console.log('Phone number:', phoneNumber);
console.log('Button clicked:', isOpen);
```

### Check CSS Conflicts
Look for these potential issues:
- z-index conflicts (widget should be z-50)
- position: fixed conflicts
- overflow: hidden on parent elements

### Check React Hydration
Sometimes SSR/CSR mismatches cause issues:
- Check for hydration warnings in console
- Try wrapping widget in `{typeof window !== 'undefined' && <Widget />}`

## Contact for Help

If none of these solutions work, please provide:

1. **Browser and version** (e.g., Chrome 119)
2. **Device type** (mobile/desktop)
3. **Error messages** from browser console
4. **Which step fails** (button appears? chat opens? send fails?)
5. **Screenshots** if helpful

## Fallback Solution

If all else fails, we can implement a simple contact form that emails you directly, or a basic "Click to WhatsApp" button that just opens WhatsApp with a pre-filled message.

The goal is to get you a working solution quickly while we debug the advanced features.