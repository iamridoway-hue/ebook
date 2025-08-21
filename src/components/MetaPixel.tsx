'use client';

import { useEffect } from 'react';
import { initMetaPixel, trackPageView, trackViewContent } from '@/lib/meta-pixel';

export default function MetaPixel() {
  useEffect(() => {
    // Initialize Meta Pixel
    initMetaPixel();
    
    // Track page view and content view
    trackPageView();
    trackViewContent();
  }, []);

  return null; // This component doesn't render anything
}
