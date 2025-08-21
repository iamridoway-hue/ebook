'use client';

import { useEffect } from 'react';
import { trackCustomEvent } from '@/lib/meta-pixel';

export default function TestPixelPage() {
  useEffect(() => {
    // Test custom event
    trackCustomEvent('TestEvent', {
      test_parameter: 'test_value',
      page_name: 'test_pixel_page'
    });
  }, []);

  const handleTestClick = () => {
    trackCustomEvent('TestButtonClick', {
      button_name: 'test_button',
      page_name: 'test_pixel_page'
    });
    alert('Test event fired! Check Facebook Pixel Helper.');
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Meta Pixel Test Page</h1>
        <p className="text-gray-600 mb-6">
          This page is used to test Meta Pixel functionality. 
          Open Facebook Pixel Helper to see if events are firing.
        </p>
        
        <button
          onClick={handleTestClick}
          className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Test Pixel Event
        </button>
        
        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <h2 className="font-semibold text-gray-900 mb-2">Instructions:</h2>
          <ol className="text-sm text-gray-600 space-y-1">
            <li>1. Install Facebook Pixel Helper extension</li>
            <li>2. Open this page</li>
            <li>3. Click the test button</li>
            <li>4. Check Pixel Helper for events</li>
          </ol>
        </div>
      </div>
    </div>
  );
}
