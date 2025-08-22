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

    // Load after page is fully loaded with additional delay
    setTimeout(() => {
      if (document.readyState === 'complete') {
        loadMetaPixel();
      } else {
        window.addEventListener('load', loadMetaPixel);
      }
    }, 2500); // 2.5 second delay
  }, []);

  return null; // This component doesn't render anything
}
