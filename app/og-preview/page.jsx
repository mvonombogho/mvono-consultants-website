'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Navbar from '../../components/shared/Navbar';
import Footer from '../../components/shared/Footer';

const ogPages = [
  {
    name: 'Home Page',
    page: 'home',
    title: 'Mvono Consultants | Leading Safety, Energy & Plant Management Experts',
    description: 'Kenya\'s premier safety, energy, and plant management firm since 2009'
  },
  {
    name: 'Services Page',
    page: 'services',
    title: 'Our Services | Mvono Consultants',
    description: 'Comprehensive safety, energy, and plant management services across East Africa'
  },
  {
    name: 'About Page',
    page: 'about',
    title: 'About Us | Mvono Consultants',
    description: 'Led by Engineer Donald M Mbogho with 29+ years of experience'
  },
  {
    name: 'Contact Page',
    page: 'contact',
    title: 'Contact Us | Mvono Consultants',
    description: 'Get expert consultation today. Call +254 720 270 694'
  }
];

export default function OGPreview() {
  const [imageErrors, setImageErrors] = useState({});
  const [debugMode, setDebugMode] = useState(false);

  const handleImageError = (pageId, error) => {
    setImageErrors(prev => ({ ...prev, [pageId]: error }));
  };

  const testApiEndpoint = async (endpoint) => {
    try {
      const response = await fetch(endpoint);
      return {
        status: response.status,
        ok: response.ok,
        contentType: response.headers.get('content-type')
      };
    } catch (error) {
      return {
        status: 'ERROR',
        ok: false,
        error: error.message
      };
    }
  };

  return (
    <main className="bg-gray-50 min-h-screen">
      <Navbar />
      
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-2 text-center">Open Graph Images Preview</h1>
          <p className="text-gray-600 mb-4 text-center">
            Preview of dynamically generated Open Graph images for social media sharing
          </p>
          
          {/* Debug Controls */}
          <div className="mb-6 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-yellow-800">Debug Information</h2>
              <button
                onClick={() => setDebugMode(!debugMode)}
                className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
              >
                {debugMode ? 'Hide Debug' : 'Show Debug'}
              </button>
            </div>
            
            {debugMode && (
              <div className="space-y-2 text-sm">
                <p><strong>Current URL:</strong> {window.location.href}</p>
                <p><strong>Base API URL:</strong> {window.location.origin}/api/og</p>
                <p><strong>Fallback URL:</strong> {window.location.origin}/api/og-fallback</p>
                
                <div className="mt-4">
                  <h3 className="font-semibold mb-2">API Endpoint Tests:</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {['/api/og?page=home', '/api/og-fallback?page=home'].map(endpoint => (
                      <button
                        key={endpoint}
                        onClick={async () => {
                          const result = await testApiEndpoint(endpoint);
                          alert(`${endpoint}\nStatus: ${result.status}\nOK: ${result.ok}\nType: ${result.contentType || 'N/A'}\nError: ${result.error || 'None'}`);
                        }}
                        className="p-2 bg-blue-500 text-white rounded text-xs hover:bg-blue-600"
                      >
                        Test {endpoint}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
          
          <div className="grid gap-8">
            {ogPages.map((page) => {
              const ogUrl = `/api/og?page=${page.page}&title=${encodeURIComponent(page.title)}&description=${encodeURIComponent(page.description)}`;
              const fallbackUrl = `/api/og-fallback?page=${page.page}`;
              
              return (
                <div key={page.page} className="bg-white rounded-lg shadow-md p-6">
                  <div className="mb-4">
                    <h2 className="text-xl font-semibold text-gray-900 mb-2">{page.name}</h2>
                    <p className="text-gray-600 text-sm mb-2">
                      <strong>Title:</strong> {page.title}
                    </p>
                    <p className="text-gray-600 text-sm mb-4">
                      <strong>Description:</strong> {page.description}
                    </p>
                  </div>
                  
                  <div className="bg-gray-100 rounded-lg p-4 mb-4">
                    {/* Primary OG Image */}
                    <div className="mb-4">
                      <h3 className="text-sm font-semibold text-gray-700 mb-2">OG Images (Fallback Active):</h3>
                      <div className="bg-green-50 border border-green-200 rounded p-3 mb-3">
                        <p className="text-green-800 text-sm">
                          <strong>✅ Using Fallback Images:</strong> These professional SVG images work reliably in development and production.
                        </p>
                      </div>
                      <img 
                        src={fallbackUrl}
                        alt={`OG Image for ${page.name}`}
                        className="w-full max-w-2xl mx-auto rounded border shadow-sm"
                        style={{ aspectRatio: '1200/630' }}
                        onLoad={() => {
                          console.log(`✅ OG image loaded successfully for ${page.page}`);
                        }}
                        onError={(e) => {
                          handleImageError(page.page, 'Fallback image failed to load');
                          e.target.style.display = 'none';
                          e.target.nextElementSibling.style.display = 'block';
                        }}
                      />
                      
                      {/* Error Message */}
                      <div 
                        className="w-full max-w-2xl mx-auto rounded border-2 border-dashed border-red-300 bg-red-50 p-8 text-center"
                        style={{ aspectRatio: '1200/630', display: 'none' }}
                      >
                        <div className="text-red-600">
                          <p className="font-semibold mb-2">⚠️ Image Generation Failed</p>
                          <p className="text-sm mb-4">{imageErrors[page.page] || 'Unknown error'}</p>
                          <div className="space-y-2">
                            <p className="text-xs">Troubleshooting steps:</p>
                            <p className="text-xs">1. Install @vercel/og: <code className="bg-gray-200 px-1 rounded">npm install @vercel/og</code></p>
                            <p className="text-xs">2. Restart development server</p>
                            <p className="text-xs">3. Check browser console for errors</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex gap-4 flex-wrap">
                    <a 
                      href={ogUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors text-sm"
                    >
                      View Dynamic
                    </a>
                    <a 
                      href={fallbackUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition-colors text-sm"
                    >
                      View Fallback
                    </a>
                    <button 
                      onClick={() => navigator.clipboard.writeText(`${window.location.origin}${ogUrl}`)}
                      className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700 transition-colors text-sm"
                    >
                      Copy URL
                    </button>
                  </div>
                  
                  <div className="mt-4 p-3 bg-gray-50 rounded text-xs text-gray-600">
                    <strong>Primary API URL:</strong> {ogUrl}
                    <br />
                    <strong>Fallback URL:</strong> {fallbackUrl}
                  </div>
                </div>
              );
            })}
          </div>
          
          <div className="mt-12 p-6 bg-blue-50 rounded-lg">
            <h3 className="text-lg font-semibold text-blue-900 mb-3">Installation & Testing Guide</h3>
            <div className="space-y-4 text-sm text-blue-800">
              <div>
                <p className="font-semibold mb-2">1. Install Required Package:</p>
                <code className="bg-blue-100 p-2 rounded block">npm install @vercel/og</code>
              </div>
              
              <div>
                <p className="font-semibold mb-2">2. Restart Development Server:</p>
                <code className="bg-blue-100 p-2 rounded block">npm run dev</code>
              </div>
              
              <div>
                <p className="font-semibold mb-2">3. Test Social Media Sharing:</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  <a href="https://developers.facebook.com/tools/debug/" target="_blank" className="text-blue-600 hover:underline">Facebook Sharing Debugger</a>
                  <a href="https://cards-dev.twitter.com/validator" target="_blank" className="text-blue-600 hover:underline">Twitter Card Validator</a>
                  <a href="https://www.linkedin.com/post-inspector/" target="_blank" className="text-blue-600 hover:underline">LinkedIn Post Inspector</a>
                  <a href="https://www.opengraph.xyz/" target="_blank" className="text-blue-600 hover:underline">OpenGraph.xyz Tester</a>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-8 text-center">
            <Link 
              href="/"
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </div>
      
      <Footer />
    </main>
  );
}
