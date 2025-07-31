// Simple test page to verify imports work
import Link from 'next/link';

// Test import function - let's start simple
async function testImports() {
  try {
    // Try dynamic import to see if the path works
    const apiModule = await import('../../lib/api');
    console.log('✅ API module loaded successfully');
    return { success: true, message: 'API imports working' };
  } catch (error) {
    console.error('❌ Failed to import API:', error);
    return { success: false, message: error.message };
  }
}

export default function TestBlogPage() {
  return (
    <main className="pt-16">
      <section className="bg-gradient-to-br from-blue-900 to-slate-900 text-white py-16 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Blog Test Page
          </h1>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto">
            This is a simplified blog page to test imports
          </p>
          <Link 
            href="/" 
            className="inline-block mt-6 bg-white text-blue-900 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
          >
            Back to Home
          </Link>
        </div>
      </section>
      
      <section className="py-20 px-4 sm:px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-lg text-gray-600">
            If you can see this page, the basic routing is working.
            <br />
            Check the browser console for import test results.
          </p>
        </div>
      </section>
    </main>
  );
}
