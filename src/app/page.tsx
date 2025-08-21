'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  BookOpen, 
  Star, 
  CheckCircle, 
  Download, 
  MessageCircle, 
  Phone,
  ArrowRight,
  Users,
  TrendingUp,
  Shield,
  Zap
} from 'lucide-react';
import { 
  trackAddToCart, 
  trackLead, 
  trackCompleteRegistration,
  trackCustomEvent 
} from '@/lib/meta-pixel';

export default function Home() {
  const [timeLeft, setTimeLeft] = useState({
    hours: 23,
    minutes: 59,
    seconds: 59
  });

  const [formData, setFormData] = useState({
    email: '',
    name: '',
    whatsapp: '',
    transactionId: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarType, setSnackbarType] = useState<'success' | 'error'>('success');

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleWhatsAppOrder = () => {
    // Meta Pixel Tracking - WhatsApp Contact
    trackCustomEvent('WhatsAppContact', {
      content_name: 'WhatsApp Order',
      content_category: 'Contact',
      value: 50,
      currency: 'BDT'
    });
    
    window.open('https://wa.me/01983139720?text=আমি বইগুলো কিনতে চাই', '_blank');
  };

  const handleDownload = () => {
    // Scroll to order form
    document.getElementById('order-form')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage('');
    
    // Meta Pixel Tracking - Add to Cart
    trackAddToCart(50, 'BDT');

    try {
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        const successMsg = 'অর্ডার সফলভাবে সাবমিট হয়েছে! আমরা শীঘ্রই আপনার সাথে যোগাযোগ করব।';
        setSubmitMessage(successMsg);
        setSnackbarMessage(successMsg);
        setSnackbarType('success');
        setShowSnackbar(true);
        setFormData({
          email: '',
          name: '',
          whatsapp: '',
          transactionId: ''
        });
        
        // Meta Pixel Tracking
        trackCompleteRegistration();
        trackLead();
        trackCustomEvent('OrderSubmitted', {
          value: 50,
          currency: 'BDT',
          content_name: '3000+ Bangla PDF Books',
          content_category: 'Digital Books'
        });
        
        // Auto-hide snackbar after 5 seconds
        setTimeout(() => {
          setShowSnackbar(false);
        }, 5000);
      } else {
        const errorMsg = data.error || 'অর্ডার সাবমিট করতে সমস্যা হয়েছে। আবার চেষ্টা করুন।';
        setSubmitMessage(errorMsg);
        setSnackbarMessage(errorMsg);
        setSnackbarType('error');
        setShowSnackbar(true);
        
        // Auto-hide snackbar after 5 seconds
        setTimeout(() => {
          setShowSnackbar(false);
        }, 5000);
      }
    } catch (error) {
      console.error('Order submission error:', error);
      const errorMsg = 'নেটওয়ার্ক সমস্যা। আবার চেষ্টা করুন।';
      setSubmitMessage(errorMsg);
      setSnackbarMessage(errorMsg);
      setSnackbarType('error');
      setShowSnackbar(true);
      
      // Auto-hide snackbar after 5 seconds
      setTimeout(() => {
        setShowSnackbar(false);
      }, 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Snackbar Notification */}
      {showSnackbar && (
        <motion.div
          initial={{ opacity: 0, y: -100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -100 }}
          className={`fixed top-20 left-1/2 transform -translate-x-1/2 z-[9999] px-6 py-4 rounded-lg shadow-xl max-w-md w-full mx-4 ${
            snackbarType === 'success' 
              ? 'bg-green-600 text-white border border-green-500' 
              : 'bg-red-600 text-white border border-red-500'
          }`}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3 flex-1">
              {snackbarType === 'success' ? (
                <CheckCircle className="h-5 w-5 flex-shrink-0" />
              ) : (
                <div className="h-5 w-5 rounded-full border-2 border-white flex items-center justify-center flex-shrink-0">
                  <span className="text-xs font-bold">!</span>
                </div>
              )}
              <p className="font-medium text-sm leading-relaxed">{snackbarMessage}</p>
            </div>
            <button
              onClick={() => setShowSnackbar(false)}
              className="ml-4 text-white hover:text-gray-200 transition-colors flex-shrink-0"
            >
              <span className="text-lg">&times;</span>
            </button>
          </div>
        </motion.div>
      )}
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-2">
              <BookOpen className="h-8 w-8 text-blue-600" />
              <span className="text-xl font-bold text-gray-900">Boi Lagbe</span>
            </div>
            <div className="flex items-center space-x-4">
              <a href="https://wa.me/01983139720?text=i want 3000+ books" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2 text-gray-600 hover:text-blue-600">
                <Phone className="h-4 w-4" />
                <span>01983139720</span>
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-purple-50">
        {/* Background decorative elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-32 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-40 -left-32 w-80 h-80 bg-gradient-to-tr from-green-400/20 to-blue-400/20 rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full text-sm font-medium text-blue-800 border border-blue-200"
              >
                <Star className="h-4 w-4 mr-2 text-yellow-500" />
                3000+ বেস্ট সেলিং বই
              </motion.div>

              <h1 className="text-5xl lg:text-7xl font-bold text-gray-900 leading-tight">
                নিজের ইনকাম যদি{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 animate-pulse">
                  কোটি টাকার উপরে
                </span>{' '}
                নিয়ে যেতে চান
              </h1>
              
              <p className="text-xl lg:text-2xl text-gray-600 leading-relaxed font-medium">
                তাহলে নিজের ব্রেইনের উপর খরচ করুন। আর ব্রেইন ডেভলপ হয় বই পড়েই। 
                <span className="text-blue-700 font-semibold"> নির্বাচিত বেস্ট সেলিং</span> এই বইগুলো আপনার জীবনে সম্ভাবনার নতুন দিগন্ত উন্মোচিত করবে।
              </p>

              {/* Stats */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="flex items-center space-x-8 py-4"
              >
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600">3000+</div>
                  <div className="text-sm text-gray-600">বই</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600">৳50</div>
                  <div className="text-sm text-gray-600">মাত্র</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-600">∞</div>
                  <div className="text-sm text-gray-600">সারাজীবন</div>
                </div>
              </motion.div>
              
              {/* CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="flex flex-col sm:flex-row gap-4"
              >
                <motion.button
                  whileHover={{ scale: 1.05, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)" }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleWhatsAppOrder}
                  className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-8 py-4 rounded-xl font-bold text-lg flex items-center justify-center space-x-3 shadow-lg transition-all duration-300"
                >
                  <MessageCircle className="h-6 w-6" />
                  <span>WhatsApp এ অর্ডার করুন</span>
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)" }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleDownload}
                  className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-8 py-4 rounded-xl font-bold text-lg flex items-center justify-center space-x-3 shadow-lg transition-all duration-300"
                >
                  <Download className="h-6 w-6" />
                  <span>ডাউনলোড করতে চাই</span>
                </motion.button>
              </motion.div>

              {/* Trust indicators */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                className="flex items-center space-x-6 text-sm text-gray-600"
              >
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span>তাৎক্ষণিক ডাউনলোড</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Shield className="h-5 w-5 text-blue-500" />
                  <span>১০০% নিরাপদ</span>
                </div>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              {/* Floating elements */}
              <div className="absolute -top-4 -right-4 w-20 h-20 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full blur-xl opacity-70 animate-pulse"></div>
              <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-gradient-to-br from-pink-400 to-red-500 rounded-full blur-xl opacity-60 animate-pulse delay-1000"></div>
              
              <div className="relative bg-white rounded-3xl shadow-2xl p-8 border border-gray-100 overflow-hidden">
                {/* Background pattern */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-purple-50/50 rounded-3xl"></div>
                
                <div className="relative text-center space-y-6">
                  {/* Offer badge */}
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-full font-bold text-lg shadow-lg"
                  >
                    <Zap className="h-5 w-5 mr-2 animate-bounce" />
                    আজকের বিশেষ অফার
                  </motion.div>

                  {/* Price comparison */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                    className="space-y-4"
                  >
                    <div className="flex justify-center items-center space-x-6">
                      <div className="relative">
                        <div className="text-3xl lg:text-4xl font-bold text-gray-400 line-through">৳999</div>
                        <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full transform rotate-12">
                          পুরাতন দাম
                        </div>
                      </div>
                      <ArrowRight className="h-8 w-8 text-gray-400 animate-pulse" />
                      <div className="relative">
                        <div className="text-5xl lg:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-blue-600 animate-pulse">
                          ৳50
                        </div>
                        <div className="absolute -top-2 -right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full animate-bounce">
                          95% ছাড়
                        </div>
                      </div>
                    </div>
                    <p className="text-gray-600 font-medium">সারাজীবনের জন্য মাত্র ৳50!</p>
                  </motion.div>
                  
                  {/* Countdown Timer */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, delay: 0.8 }}
                    className="bg-gradient-to-r from-red-500 via-pink-500 to-purple-600 rounded-2xl p-6 shadow-lg"
                  >
                    <p className="text-white font-bold text-lg mb-4 flex items-center justify-center">
                      <TrendingUp className="h-5 w-5 mr-2 animate-bounce" />
                      অফার শেষ হতে বাকি
                    </p>
                    <div className="flex justify-center space-x-3">
                      <div className="bg-white/20 backdrop-blur-sm rounded-xl p-3 min-w-[70px] border border-white/30">
                        <div className="text-3xl font-bold text-white">{String(timeLeft.hours).padStart(2, '0')}</div>
                        <div className="text-xs text-white/80 font-medium">ঘণ্টা</div>
                      </div>
                      <div className="flex items-center">
                        <div className="text-white text-2xl animate-pulse">:</div>
                      </div>
                      <div className="bg-white/20 backdrop-blur-sm rounded-xl p-3 min-w-[70px] border border-white/30">
                        <div className="text-3xl font-bold text-white">{String(timeLeft.minutes).padStart(2, '0')}</div>
                        <div className="text-xs text-white/80 font-medium">মিনিট</div>
                      </div>
                      <div className="flex items-center">
                        <div className="text-white text-2xl animate-pulse">:</div>
                      </div>
                      <div className="bg-white/20 backdrop-blur-sm rounded-xl p-3 min-w-[70px] border border-white/30">
                        <div className="text-3xl font-bold text-white">{String(timeLeft.seconds).padStart(2, '0')}</div>
                        <div className="text-xs text-white/80 font-medium">সেকেন্ড</div>
                      </div>
                    </div>
                  </motion.div>
                  
                  {/* CTA Button */}
                  <motion.button
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 1.0 }}
                    whileHover={{ 
                      scale: 1.05, 
                      boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
                      y: -2
                    }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleDownload}
                    className="w-full bg-gradient-to-r from-green-500 via-blue-600 to-purple-600 hover:from-green-600 hover:via-blue-700 hover:to-purple-700 text-white py-5 rounded-2xl font-bold text-xl shadow-2xl transition-all duration-300 relative overflow-hidden group"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="relative flex items-center justify-center space-x-3">
                      <Download className="h-6 w-6 animate-bounce" />
                      <span>এখনই কিনুন - মাত্র ৳50</span>
                      <Zap className="h-5 w-5 animate-pulse" />
                    </div>
                  </motion.button>

                  {/* Guarantee badge */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 1.2 }}
                    className="flex items-center justify-center space-x-2 text-sm text-gray-600"
                  >
                    <Shield className="h-4 w-4 text-green-500" />
                    <span>১০০% মানি-ব্যাক গ্যারান্টি</span>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              এই বইগুলো কিভাবে আপনাকে হেল্প করে?
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: TrendingUp,
                title: "আত্মবিশ্বাস বাড়ায়",
                description: "বই পড়লে নিজের সামর্থ্য সম্পর্কে ইতিবাচক দৃষ্টিভঙ্গি তৈরি হয়, যা আত্মবিশ্বাস বাড়াতে সাহায্য করে।"
              },
              {
                icon: Shield,
                title: "মানসিক শক্তি বৃদ্ধি করে",
                description: "বই জীবনের কঠিন সময়গুলো মোকাবিলা করার জন্য মানসিক শক্তি ও ধৈর্য গড়ে তোলে।"
              },
              {
                icon: Zap,
                title: "নেতিবাচক চিন্তা দূর করে",
                description: "বই পড়লে আশাবাদী মনোভাব গড়ে ওঠে এবং নেতিবাচক চিন্তা দূর হয়।"
              },
              {
                icon: Users,
                title: "নিজের লক্ষ্য ঠিক করতে সাহায্য করে",
                description: "সঠিক লক্ষ্য নির্ধারণ এবং প্রোডাক্টিভিটি বাড়াতে সাহায্য করে।"
              },
              {
                icon: Star,
                title: "সৃজনশীলতা বাড়ায়",
                description: "বই নতুন নতুন চিন্তা-ভাবনার দুয়ার খুলে দেয়, যা সৃজনশীল চিন্তাভাবনার বিকাশ ঘটায়।"
              },
              {
                icon: CheckCircle,
                title: "স্ট্রেস ও দুশ্চিন্তা কমায়",
                description: "মানসিক চাপ কমিয়ে সাফল্যের পথ দেখায়।"
              }
            ].map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-6 hover:shadow-lg transition-shadow"
              >
                <benefit.icon className="h-12 w-12 text-blue-600 mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{benefit.title}</h3>
                <p className="text-gray-600 leading-relaxed">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Book List Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              3000+ পিডিএফ বইয়ের কালেকশন
            </h2>
            <p className="text-xl text-gray-600">
              বেস্ট সেলিং বইগুলো যা আপনার জীবন বদলে দেবে
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              "ডোপামিন ডিটক্স",
              "রিচ ড্যাড পুওর ড্যাড",
              "জিরো টু ওয়ান",
              "দ্য সাইকোলজি অফ মানি",
              "টাইম ম্যানেজমেন্ট",
              "মাইন্ডসেট",
              "দ্য রিচেস্ট ম্যান ইন ব্যাবিলন",
              "দ্য পাওয়ার অব ইউর সাবকনশাস মাইন্ড",
              "দ্য আলকেমিস্ট",
              "এজ এ ম্যান থিংকেথ",
              "ইট দ্যাট ফ্রগ",
              "অ্যাটমিক হ্যাবিটস",
              "ইকিগাই",
              "থিঙ্ক অ্যান্ড গ্রো রিচ",
              "দ্য ল অব সাকসেস",
              "হু মুভড মাই চীজ",
              "দ্য মিরাকল মর্নিং",
              "তুমিও জিতবে",
              "ওয়ারেন বাফেটস ম্যানেজমেন্ট সিক্রেটস",
              "ম্যানেজমেন্ট: দ্য আর্ট অফ থিংকিং ক্লিয়ারলি",
              "দ্য সিক্রেট",
              "দ্য পার্সোনাল এমবিএ",
              "বিজনেস স্কুল",
              "দ্য ফোর আওয়ার ওয়ার্ক উইক",
              "হাউ টু টক টু এ্যানিওয়ান",
              "পাওয়ারফুল ফোকাস",
              "দ্য সাবটল আর্ট অফ নট গিভিং এ ফ*ক",
              "হ্যাবিটস অফ হাইলি ইফেক্টিভ পিপল",
              "দ্য ম্যাজিক অফ থিংকিং বিগ",
              "দ্য মঙ্ক হু সোল্ড হিজ ফেরারি",
              "দ্য পাওয়ার অব হ্যাবিট",
              "রোড টু সাকসেস",
              "দ্য পাওয়ার অব পজিটিভ থিংকিং",
              "দ্য ওয়ান মিনিট ম্যানেজার",
              "ইউ ক্যান ইফ ইউ থিংক ইউ ক্যান",
              "মেক দ্য মোস্ট অফ ইওর মাইন্ড",
              "দ্য সিক্রেট, দ্য হিরো",
              "দ্য ওয়ে টু ওয়েলথ",
              "দ্য পজিটিভ ওয়ে টু চেঞ্জ ইওর লাইফ",
              "স্ট্র্যাটেজিস ফর ওয়েলথ অ্যান্ড হ্যাপিনেস",
              "দ্য ফাইভ সেকেন্ড রুল",
              "দ্য বুক অফ ফ্যাক্টস – ১",
              "দ্য বুক অফ ফ্যাক্টস – ২",
              "সফল টাইম ম্যানেজমেন্ট",
              "এক্সাক্টলি হাউ টু সেল",
              "এক্সাক্টলি হোয়ার টু স্টার্ট",
              "না বলতে শিখুন",
              "দ্য মিরাকল অফ ইওর মাইন্ড",
              "আনকনশাস মাইন্ড",
              "বিটকয়েন",
              "মাইন্ড রিডার",
              "কমিউনিকেশন: নো টেনশন",
              "দ্য আলমানাক অফ নাভাল রাভিকান্ত",
              "দ্য আর্ট অফ পাবলিক স্পিকিং",
              "ওয়ারেন বাফেটস সাকসেস সিক্রেটস",
              "আউট ফ্রম দ্য হার্ট",
              "বরণীয় যারা সরণীয়",
              "হাউ টু স্টপ ওয়ারিং অ্যান্ড স্টার্ট লিভিং",
              "লিডারশিপ ১০১",
              "ম্যান'স সার্চ ফর মিনিং",
              "হাউ টু উইন ফ্রেন্ডস অ্যান্ড ইনফ্লুয়েন্স পিপল",
              "চেঞ্জ ইওর থিংকিং, চেঞ্জ ইওর লাইফ",
              "দ্য সেভেন হ্যাবিটস অফ হাইলি ইফেক্টিভ পিপল",
              "স্ত্রী যখন বান্ধবী",
              "স্টিল লাইক এন আর্টিস্ট",
              "সুখী জীবন এবং কাজের সন্ধানে",
              "অ্যামাজোনিয়া",
              "আমি একজন সেলসম্যান",
              "আমি পিলগ্রিম",
              "উইংস অফ ফায়ার",
              "ওয়ান নাইট",
              "কর্মব্যস্ত সুখী জীবন",
              "টাইম মেশিন",
              "থ্রি মিসটেকস অফ মাই লাইফ",
              "দ্য রিভার্স ফিরে আসার গল্প",
              "ফাইভ পয়েন্ট সামওয়ান",
              "বডি ল্যাঙ্গুয়েজ",
              "বিশ্ব শ্রেষ্ঠ ১০০ মানুষের জীবনী",
              "বিশ্বাস ও আত্মউন্নয়ন",
              "যারা বড় হতে চাও",
              "মন নিয়ন্ত্রণ",
              "রেভুলেশন",
              "লা তাহযান (হতাশ হবেন না।)",
              "সফলতার জন্য চাই উত্তম পরিকল্পনা।",
              "মার্কেটিং স্ট্র্যাটাজি ২০২৫",
              "ফেসবুক মার্কেটিং",
              "বিলিয়ন ডলার মুসলিম",
              "ই-কমার্স উদ্যোক্ত গাইড",
              "ধৈর্য হারাবেন না",
              "হতাশা শব্দটি আপনার জন্য নয়",
              "ডিপ্রেশন কারণ ও প্রতিকার"
            ].map((book, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                viewport={{ once: true }}
                className="bg-white rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow"
              >
                <div className="flex items-center space-x-3">
                  <BookOpen className="h-5 w-5 text-blue-600 flex-shrink-0" />
                  <span className="text-gray-800 font-medium">{book}</span>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <p className="text-lg text-gray-600 mb-6">
              বাকি বইগুলোর নাম জানতে অর্ডার করে ফেলুন এখনই।
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleDownload}
              className="bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 text-white px-8 py-4 rounded-lg font-bold text-lg transition-all"
            >
              সব বই দেখুন
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Order Form Section */}
      <section id="order-form" className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              কীভাবে অর্ডার করবেন?
            </h2>
            <p className="text-xl text-gray-600">
              অর্ডার করতে প্রথমে বিকাশ/নগদ নাম্বারে সেন্ড মানি করে ট্রাঞ্জেকশন আইডি কপি করে নিচের ফর্মটি পূরণ করে পরবর্তী ধাপে ট্রাঞ্জেকশন আইডি দিয়ে অর্ডার কনফার্ম করে আপনার ইবুক বুঝে নিন।
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Payment Methods */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-bold text-gray-900 mb-6">পেমেন্ট মেথড</h3>
              
              {/* Payment Instructions */}
              <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border-l-4 border-yellow-400 p-4 mb-6 rounded-lg">
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0">
                    <TrendingUp className="h-6 w-6 text-yellow-600 mt-0.5" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-yellow-800 mb-2">গুরুত্বপূর্ণ নির্দেশনা:</h4>
                    <p className="text-yellow-700 font-medium">
                      নিচের যেকোনো নাম্বারে <span className="font-bold text-red-600">&quot;Send Money&quot;</span> করুন। 
                      Cash Out বা অন্য কোনো অপশন ব্যবহার করবেন না।
                    </p>
                  </div>
                </div>
              </div>

              {/* Payment Methods */}
              <div className="space-y-4">
                <div className="bg-green-50 border-2 border-green-200 rounded-xl p-5 hover:shadow-lg transition-shadow">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <img 
                        src="/bkash-logo.png" 
                        alt="bKash Logo" 
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <span className="font-bold text-green-800 text-lg">Bkash</span>
                    </div>
                    <span className="text-green-600 font-mono text-lg font-bold">01983139720</span>
                  </div>
                  <div className="bg-green-100 rounded-lg p-3">
                    <p className="text-green-700 text-sm font-medium">
                      ✅ Bkash অ্যাপে গিয়ে &quot;Send Money&quot; সিলেক্ট করুন → ৳50 পাঠান
                    </p>
                  </div>
                </div>


              </div>

              {/* Step by step guide */}
              <div className="mt-6 bg-gray-50 rounded-xl p-5">
                <h4 className="font-bold text-gray-900 mb-3 flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                  পেমেন্ট সম্পন্ন করার পর:
                </h4>
                <div className="space-y-2 text-sm text-gray-700">
                  <p>১. ট্রাঞ্জেকশন আইডি কপি করুন</p>
                  <p>২. নিচের ফর্মে আপনার তথ্য দিন</p>
                  <p>৩. ট্রাঞ্জেকশন আইডি পেস্ট করুন</p>
                  <p>৪. অর্ডার সাবমিট করুন</p>
                </div>
              </div>

              <div className="mt-8">
                <h4 className="text-lg font-semibold text-gray-900 mb-4">কোন সমস্যা হলে যোগাযোগ করুন:</h4>
                <div className="space-y-3">
                  <a 
                    href="https://wa.me/01983139720" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center space-x-3 bg-green-600 hover:bg-green-700 text-white px-4 py-3 rounded-lg transition-colors"
                  >
                    <MessageCircle className="h-5 w-5" />
                    <span>WhatsApp</span>
                  </a>
                  <a 
                    href="tel:01983139720" 
                    className="flex items-center space-x-3 bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-lg transition-colors"
                  >
                    <Phone className="h-5 w-5" />
                    <span>ফোন: 01983139720</span>
                  </a>
                </div>
              </div>
            </motion.div>

            {/* Order Form */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="bg-gray-50 rounded-xl p-8"
            >
              <h3 className="text-2xl font-bold text-gray-900 mb-6">অর্ডার ফর্ম</h3>
              
              {/* Success/Error Message */}
              {submitMessage && (
                <div className={`p-4 rounded-lg mb-6 ${
                  submitMessage.includes('সফলভাবে') 
                    ? 'bg-green-50 border border-green-200 text-green-800' 
                    : 'bg-red-50 border border-red-200 text-red-800'
                }`}>
                  <p className="font-medium">{submitMessage}</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    আপনার ইমেইল লিখুন *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="example@email.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    আপনার নাম লিখুন *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="আপনার নাম"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    আপনার WhatsApp নাম্বারঃ *
                  </label>
                  <input
                    type="tel"
                    name="whatsapp"
                    value={formData.whatsapp}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="01XXXXXXXXX"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    ট্রাঞ্জেকশন আইডি *
                  </label>
                  <input
                    type="text"
                    name="transactionId"
                    value={formData.transactionId}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="ট্রাঞ্জেকশন আইডি দিন"
                  />
                </div>
                
                <div className="bg-white rounded-lg p-4 border">
                  <h4 className="font-semibold text-gray-900 mb-3">Your order</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>3000+ Bangla PDF Books</span>
                      <span>৳50.00</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Shipping</span>
                      <span className="text-green-600">ফ্রি</span>
                    </div>
                    <hr className="my-2" />
                    <div className="flex justify-between font-bold text-lg">
                      <span>Total</span>
                      <span>৳50.00</span>
                    </div>
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 text-white py-4 rounded-lg font-bold text-lg transition-all ${
                    isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                  {isSubmitting ? (
                    <div className="flex items-center justify-center space-x-2">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>অর্ডার প্রসেসিং...</span>
                    </div>
                  ) : (
                    'অর্ডার করুন ৳50.00'
                  )}
                </motion.button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <BookOpen className="h-6 w-6 text-blue-400" />
                <span className="text-xl font-bold">Boi Lagbe</span>
              </div>
              <p className="text-gray-400">
                আপনার সাফল্যের পথে সহায়ক বইয়ের সংগ্রহ
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">যোগাযোগ</h4>
              <div className="space-y-2 text-gray-400">
                <p>ফোন: 01983139720</p>
                <p>WhatsApp: 01983139720</p>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4">পেমেন্ট</h4>
              <div className="space-y-2 text-gray-400">
                <p>Bkash: 01983139720</p>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4">গুরুত্বপূর্ণ</h4>
              <div className="space-y-2 text-gray-400">
                <p>একবার কিনুন, সারাজীবন পড়ুন</p>
                <p>অর্ডার করার পর বইগুলো সাথে সাথে গুগল ড্রাইভে পেয়ে যাবেন</p>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>Copyright © 2025 Boi Lagbe</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
