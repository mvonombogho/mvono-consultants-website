'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@sanity/client';

export default function SanityTest() {
  const [status, setStatus] = useState('Checking Sanity connection...');
  const [projectStatus, setProjectStatus] = useState('Checking project status...');
  const [error, setError] = useState(null);
  const [projectError, setProjectError] = useState(null);

  useEffect(() => {
    // Basic connection test without token
    const publicClient = createClient({
      projectId: 'k6xvho7h',
      dataset: 'production',
      apiVersion: '2025-05-19',
      useCdn: false,
    });

    // Connection with token for authenticated operations
    const tokenClient = createClient({
      projectId: 'k6xvho7h',
      dataset: 'production',
      apiVersion: '2025-05-19',
      token: 'skSKI57jxpC7LoVpO9OG0bdJVZhx8RqtzwTaIuFxEO45CP8GL1zC38qSvhglbBi0869cJBXOhIoT0AYEtMR0HCy7j7Z6mOvVh4eKamjacav6jOaoZX2DTKWg5XJYoHyHfgIEYMFpywyAGjvPpCk3slPWPgnc652hqSUkmsydN1iHL1mdLEwJ',
      useCdn: false,
    });

    async function testConnection() {
      try {
        // Try a simple query that should work even on empty projects
        const result = await publicClient.fetch('*[_type == "sanity.imageAsset"][0...1]');
        setStatus('Connection successful! Basic Sanity connection is working.');
        console.log('Basic connection result:', result);
      } catch (err) {
        setStatus('Connection failed');
        setError(err.message);
        console.error('Sanity connection error:', err);
      }
    }

    async function testProjectSetup() {
      try {
        // Try to create a simple test document to verify we can write
        const doc = {
          _type: 'test',
          _id: 'sanity-test-doc',
          title: 'Test Document',
          timestamp: new Date().toISOString()
        };
        
        const result = await tokenClient.createOrReplace(doc);
        setProjectStatus('Project access successful! Full read/write access is working.');
        console.log('Project test result:', result);
      } catch (err) {
        setProjectStatus('Project access failed');
        setProjectError(err.message);
        console.error('Sanity project error:', err);
      }
    }

    testConnection();
    testProjectSetup();
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-xl font-bold mb-4">Sanity Connection Test</h1>
      
      <div className="mb-8 p-4 border rounded-lg">
        <h2 className="text-lg font-semibold mb-2">Basic Connection Test</h2>
        <div className="mb-4">
          <strong>Status:</strong> {status}
        </div>
        
        {error && (
          <div className="p-4 bg-red-100 border border-red-300 rounded">
            <strong>Error:</strong> {error}
          </div>
        )}
      </div>

      <div className="mb-8 p-4 border rounded-lg">
        <h2 className="text-lg font-semibold mb-2">Project Write Access Test</h2>
        <div className="mb-4">
          <strong>Status:</strong> {projectStatus}
        </div>
        
        {projectError && (
          <div className="p-4 bg-red-100 border border-red-300 rounded">
            <strong>Error:</strong> {projectError}
          </div>
        )}
      </div>

      <div className="mt-8">
        <h2 className="text-lg font-semibold mb-2">Environment Variables</h2>
        <pre className="bg-gray-100 p-4 rounded overflow-auto">
          {JSON.stringify(
            {
              NEXT_PUBLIC_SANITY_PROJECT_ID: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
              NEXT_PUBLIC_SANITY_DATASET: process.env.NEXT_PUBLIC_SANITY_DATASET,
              NEXT_PUBLIC_SANITY_API_VERSION: process.env.NEXT_PUBLIC_SANITY_API_VERSION,
            },
            null,
            2
          )}
        </pre>
      </div>

      <div className="mt-8">
        <h2 className="text-lg font-semibold mb-2">Project Details</h2>
        <p>Correct Project ID: <strong>k6xvho7h</strong> (not k6oxvo7b which was previously used)</p>
      </div>

      <div className="mt-8">
        <h2 className="text-lg font-semibold mb-2">Next Steps</h2>
        <ul className="list-disc pl-5 space-y-2">
          <li>If both tests pass: Try accessing <a href="/studio" className="text-blue-500 underline">Sanity Studio</a></li>
          <li>If only the basic test passes: Check your token permissions in the Sanity management console</li>
          <li>If both tests fail: Try accessing <a href="https://www.sanity.io/manage" target="_blank" className="text-blue-500 underline">Sanity Manage</a> to verify your project exists</li>
        </ul>
      </div>
    </div>
  );
}
