// Meta Pixel Configuration for Facebook Ads
declare global {
  interface Window {
    fbq: (...args: unknown[]) => void;
    _fbq: any;
  }
}

// Your Meta Pixel ID
export const META_PIXEL_ID = '470082779525987';

// Initialize Meta Pixel
export const initMetaPixel = () => {
  if (typeof window === 'undefined') return;

  // Facebook Pixel Code
  const fbq = function() {
    (fbq as any).callMethod ? (fbq as any).callMethod.apply(fbq, arguments) : (fbq as any).queue.push(arguments);
  };
  (fbq as any).queue = [];
  (fbq as any).version = '2.0';
  (fbq as any).loaded = true;
  (window as any).fbq = fbq;
  
  const script = document.createElement('script');
  script.async = true;
  script.src = 'https://connect.facebook.net/en_US/fbevents.js';
  document.head.appendChild(script);
  
  // Initialize pixel
  (window as any).fbq('init', META_PIXEL_ID);
  (window as any).fbq('track', 'PageView');
};

// Track Page View
export const trackPageView = () => {
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('track', 'PageView');
  }
};

// Track Purchase
export const trackPurchase = (value: number, currency: string = 'BDT') => {
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('track', 'Purchase', {
      value: value,
      currency: currency,
      content_name: '3000+ Bangla PDF Books',
      content_category: 'Digital Books',
      content_type: 'product'
    });
  }
};

// Track Add to Cart
export const trackAddToCart = (value: number, currency: string = 'BDT') => {
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('track', 'AddToCart', {
      value: value,
      currency: currency,
      content_name: '3000+ Bangla PDF Books',
      content_category: 'Digital Books',
      content_type: 'product'
    });
  }
};

// Track Lead
export const trackLead = () => {
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('track', 'Lead', {
      content_name: '3000+ Bangla PDF Books',
      content_category: 'Digital Books',
      value: 50,
      currency: 'BDT'
    });
  }
};

// Track Complete Registration
export const trackCompleteRegistration = () => {
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('track', 'CompleteRegistration', {
      content_name: 'Order Form Submission',
      content_category: 'Digital Books',
      value: 50,
      currency: 'BDT'
    });
  }
};

// Track View Content
export const trackViewContent = () => {
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('track', 'ViewContent', {
      content_name: '3000+ Bangla PDF Books Landing Page',
      content_category: 'Digital Books',
      content_type: 'product',
      value: 50,
      currency: 'BDT'
    });
  }
};

// Track Custom Event
export const trackCustomEvent = (eventName: string, parameters: any = {}) => {
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('track', eventName, parameters);
  }
};
