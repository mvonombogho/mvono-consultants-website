import Link from 'next/link';

export const revalidate = 60;

export default async function BlogPage({ searchParams }) {
  return (
    <main className="pt-16">
      {/* Header */}
      <section className="bg-gradient-to-br from-blue-900 to-slate-900 text-white py-16 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Safety & Energy Management Insights
          </h1>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto">
            Stay informed with expert analysis, industry trends, and professional best practices from 
            Mvono Consultants' team of seasoned safety and energy management specialists.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20 px-4 sm:px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center py-20">
            <div className="max-w-md mx-auto">
              <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
                <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Blog Coming Soon</h3>
              <p className="text-gray-600 mb-8">Check back soon for expert insights and industry updates!</p>
              <Link 
                href="/"
                className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                ← Back to Home
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
