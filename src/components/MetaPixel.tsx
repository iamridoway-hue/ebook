'use client';

import { useEffect } from 'react';
import { initMetaPixel, trackPageView, trackViewContent } from '@/lib/meta-pixel';

export default function MetaPixel() {
  useEffect(() => {
    // Load Meta Pixel after page is fully loaded to prioritize content
    const loadMetaPixel = () => {
      // Initialize Meta Pixel
      initMetaPixel();
      
      // Track page view and content view
      trackPageView();
      trackViewContent();
    };

    // Load immediately but non-blocking
    if (document.readyState === 'complete') {
      loadMetaPixel();
    } else {
      window.addEventListener('load', loadMetaPixel);
    }
  }, []);

  return null; // This component doesn't render anything
}
