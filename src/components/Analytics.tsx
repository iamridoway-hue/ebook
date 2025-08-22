'use client';

/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable prefer-rest-params */
/* eslint-disable prefer-spread */

import { useEffect } from 'react';

declare global {
  interface Window {
    gtag: (...args: unknown[]) => void;
    fbq: (...args: unknown[]) => void;
    clarity: (...args: unknown[]) => void;
    dataLayer: unknown[];
  }
}

interface AnalyticsProps {
  gtagId?: string;
  fbPixelId?: string;
  clarityId?: string;
}

export default function Analytics({ 
  gtagId = 'G-XXXXXXXXXX', 
  fbPixelId = 'XXXXXXXXXX',
  clarityId = 'XXXXXXXXXX'
}: AnalyticsProps) {
  useEffect(() => {
    // Google Analytics 4 - Load with delay to prioritize content
    if (typeof window !== 'undefined' && gtagId) {
      const loadGA = () => {
        const script1 = document.createElement('script');
        script1.async = true;
        script1.defer = true;
        script1.src = `https://www.googletagmanager.com/gtag/js?id=${gtagId}`;
        document.head.appendChild(script1);

        window.dataLayer = window.dataLayer || [];
        window.gtag = function() {
          window.dataLayer.push(arguments);
        };
        window.gtag('js', new Date());
        window.gtag('config', gtagId, {
          page_title: 'Boi Lagbe - 3000+ বাংলা পিডিএফ বই',
          page_location: window.location.href,
          custom_map: {
            'custom_parameter_1': 'book_collection',
            'custom_parameter_2': 'bengali_books'
          }
        });

        // Track page views
        window.gtag('event', 'page_view', {
          page_title: document.title,
          page_location: window.location.href,
          custom_parameter_1: 'landing_page'
        });
      };

      // Load GA after page is fully loaded
      if (document.readyState === 'complete') {
        loadGA();
      } else {
        window.addEventListener('load', loadGA);
      }
    }

    // Facebook Pixel - Removed to avoid conflicts with MetaPixel component

    // Microsoft Clarity - Load with delay
    if (typeof window !== 'undefined' && clarityId) {
      const loadClarity = () => {
        const clarity = function(...args: unknown[]) {
          (clarity as any).q = (clarity as any).q || [];
          (clarity as any).q.push(args);
        };
        (window as any).clarity = clarity;
        
        const script = document.createElement('script');
        script.async = true;
        script.defer = true;
        script.src = `https://www.clarity.ms/tag/${clarityId}`;
        document.head.appendChild(script);
      };

      // Load Clarity after page is fully loaded
      if (document.readyState === 'complete') {
        loadClarity();
      } else {
        window.addEventListener('load', loadClarity);
      }
    }

    // Track button clicks
    const trackButtonClick = (buttonText: string, buttonType: string) => {
      // Google Analytics
      if (window.gtag) {
        window.gtag('event', 'button_click', {
          button_text: buttonText,
          button_type: buttonType,
          page_location: window.location.href
        });
      }

      // Facebook Pixel
      if (window.fbq) {
        window.fbq('track', 'CustomEvent', {
          event_name: 'button_click',
          button_text: buttonText,
          button_type: buttonType
        });
      }
    };

    // Track form submissions
    const trackFormSubmission = () => {
      if (window.gtag) {
        window.gtag('event', 'form_submit', {
          form_name: 'order_form',
          page_location: window.location.href
        });
      }

      if (window.fbq) {
        window.fbq('track', 'Lead', {
          content_name: 'book_order_form',
          content_category: 'books'
        });
      }
    };

    // Track WhatsApp clicks
    const trackWhatsAppClick = () => {
      if (window.gtag) {
        window.gtag('event', 'whatsapp_click', {
          page_location: window.location.href
        });
      }

      if (window.fbq) {
        window.fbq('track', 'Contact', {
          content_name: 'whatsapp_contact',
          content_category: 'contact'
        });
      }
    };

    // Add event listeners
    const buttons = document.querySelectorAll('button, a[href*="wa.me"]');
    buttons.forEach(button => {
      button.addEventListener('click', (e) => {
        const target = e.target as HTMLElement;
        const buttonText = target.textContent?.trim() || '';
        
        if (buttonText.includes('WhatsApp')) {
          trackWhatsAppClick();
        } else if (buttonText.includes('অর্ডার') || buttonText.includes('কিনুন')) {
          trackButtonClick(buttonText, 'order_button');
        } else if (buttonText.includes('ডাউনলোড')) {
          trackButtonClick(buttonText, 'download_button');
        }
      });
    });

    // Track form submissions
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
      form.addEventListener('submit', () => {
        trackFormSubmission();
      });
    });

    // Track scroll depth
    let maxScroll = 0;
    const trackScroll = () => {
      const scrollPercent = Math.round((window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100);
      
      if (scrollPercent > maxScroll) {
        maxScroll = scrollPercent;
        
        if (maxScroll >= 25 && maxScroll < 50) {
          if (window.gtag) {
            window.gtag('event', 'scroll_depth', { depth: '25%' });
          }
        } else if (maxScroll >= 50 && maxScroll < 75) {
          if (window.gtag) {
            window.gtag('event', 'scroll_depth', { depth: '50%' });
          }
        } else if (maxScroll >= 75 && maxScroll < 100) {
          if (window.gtag) {
            window.gtag('event', 'scroll_depth', { depth: '75%' });
          }
        } else if (maxScroll >= 100) {
          if (window.gtag) {
            window.gtag('event', 'scroll_depth', { depth: '100%' });
          }
        }
      }
    };

    window.addEventListener('scroll', trackScroll);

    // Track time on page
    const startTime = Date.now();
    const trackTimeOnPage = () => {
      const timeSpent = Math.round((Date.now() - startTime) / 1000);
      
      if (timeSpent >= 30 && timeSpent < 60) {
        if (window.gtag) {
          window.gtag('event', 'time_on_page', { time_spent: '30_seconds' });
        }
      } else if (timeSpent >= 60 && timeSpent < 120) {
        if (window.gtag) {
          window.gtag('event', 'time_on_page', { time_spent: '1_minute' });
        }
      } else if (timeSpent >= 120) {
        if (window.gtag) {
          window.gtag('event', 'time_on_page', { time_spent: '2_minutes' });
        }
      }
    };

    const timeInterval = setInterval(trackTimeOnPage, 30000); // Check every 30 seconds

    // Cleanup
    return () => {
      clearInterval(timeInterval);
      window.removeEventListener('scroll', trackScroll);
    };
  }, [gtagId, fbPixelId, clarityId]);

  return null;
}
