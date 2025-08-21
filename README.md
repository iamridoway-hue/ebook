# Ready Book - বাংলা পিডিএফ বই ল্যান্ডিং পেজ

এটি একটি সুন্দর এবং অপটিমাইজড Next.js ল্যান্ডিং পেজ যা 3000+ বাংলা পিডিএফ বই বিক্রির জন্য তৈরি করা হয়েছে।

## 🚀 Features

### 🎨 Design & UX
- **Modern Design**: সুন্দর এবং আকর্ষণীয় UI/UX
- **Responsive**: সব ডিভাইসে পারফেক্ট দেখাবে
- **Bengali Font Support**: বাংলা ফন্ট অপটিমাইজেশন
- **Smooth Animations**: Framer Motion দিয়ে সুন্দর অ্যানিমেশন
- **Countdown Timer**: অফার শেষ হওয়ার সময় দেখানো

### 📱 Performance
- **Fast Loading**: Core Web Vitals অপটিমাইজেশন
- **SEO Optimized**: সার্চ ইঞ্জিনে ভালো র‍্যাঙ্ক করবে
- **PWA Ready**: Progressive Web App সাপোর্ট
- **Mobile First**: মোবাইল ডিভাইসে পারফেক্ট

### 📊 Analytics & Tracking
- **Google Analytics 4**: পেজ ভিউ এবং ইভেন্ট ট্র্যাকিং
- **Facebook Pixel**: কনভার্শন ট্র্যাকিং
- **Microsoft Clarity**: ইউজার বিহেভিয়ার অ্যানালিটিক্স
- **Scroll Tracking**: স্ক্রল ডেপথ ট্র্যাকিং
- **Button Click Tracking**: বাটন ক্লিক ট্র্যাকিং

### 💳 Payment Integration
- **UddoktaPay Ready**: বাংলাদেশের লোকাল পেমেন্ট সিস্টেম
- **Multiple Payment Methods**: bKash, Nagad, Rocket
- **Order Form**: সহজ অর্ডার ফর্ম
- **WhatsApp Integration**: WhatsApp এ অর্ডার

## 🛠️ Technology Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Fonts**: Noto Sans Bengali

## 📦 Installation

```bash
# Clone the repository
git clone <repository-url>
cd landing_page

# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## 🔧 Configuration

### Analytics Setup

1. **Google Analytics 4**:
   - Google Analytics এ গিয়ে নতুন প্রপার্টি তৈরি করুন
   - Measurement ID কপি করুন
   - `src/app/layout.tsx` এ `gtagId` আপডেট করুন

2. **Facebook Pixel**:
   - Facebook Business Manager এ Pixel তৈরি করুন
   - Pixel ID কপি করুন
   - `src/app/layout.tsx` এ `fbPixelId` আপডেট করুন

3. **Microsoft Clarity**:
   - Microsoft Clarity এ প্রজেক্ট তৈরি করুন
   - Project ID কপি করুন
   - `src/app/layout.tsx` এ `clarityId` আপডেট করুন

### Payment Setup

1. **UddoktaPay Integration**:
   - UddoktaPay এ অ্যাকাউন্ট তৈরি করুন
   - API credentials সেটআপ করুন
   - Payment endpoints কনফিগার করুন

2. **Payment Numbers**:
   - `src/app/page.tsx` এ পেমেন্ট নাম্বার আপডেট করুন
   - bKash, Nagad, Rocket নাম্বার সেট করুন

### SEO Setup

1. **Meta Tags**:
   - `src/app/layout.tsx` এ title, description আপডেট করুন
   - Open Graph tags কাস্টমাইজ করুন

2. **Sitemap**:
   - `public/sitemap.xml` এ URL আপডেট করুন
   - Google Search Console এ সাবমিট করুন

## 📱 Mobile Optimization

- **Touch Friendly**: বড় বাটন এবং টাচ টার্গেট
- **Fast Loading**: ইমেজ অপটিমাইজেশন
- **Responsive Design**: সব স্ক্রিন সাইজে পারফেক্ট
- **PWA Features**: অফলাইন সাপোর্ট

## 🎯 Conversion Optimization

- **Urgency**: কাউন্টডাউন টাইমার
- **Social Proof**: কাস্টমার রিভিউ
- **Clear CTAs**: স্পষ্ট কল-টু-অ্যাকশন
- **Trust Signals**: সিকিউরিটি ব্যাজ
- **Multiple Contact Options**: WhatsApp, ফোন

## 📊 Performance Metrics

- **LCP**: < 2.5s
- **FID**: < 100ms
- **CLS**: < 0.1
- **Mobile Score**: 90+
- **Desktop Score**: 95+

## 🔒 Security

- **HTTPS**: SSL/TLS এনক্রিপশন
- **Security Headers**: CSP, HSTS
- **Input Validation**: ফর্ম ভ্যালিডেশন
- **XSS Protection**: Cross-site scripting protection

## 📈 Analytics Events

### Tracked Events:
- Page Views
- Button Clicks
- Form Submissions
- WhatsApp Clicks
- Scroll Depth
- Time on Page
- Payment Attempts

### Custom Parameters:
- Button Type
- Form Name
- Scroll Depth
- Time Spent

## 🚀 Deployment

### Vercel (Recommended)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Production deployment
vercel --prod
```

### Netlify
```bash
# Build
npm run build

# Deploy to Netlify
netlify deploy --prod --dir=out
```

## 📞 Support

- **WhatsApp**: 01983139720
- **Email**: support@readybook.com
- **Website**: https://readybook.com

## 📄 License

This project is licensed under the MIT License.

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

---

**Made with ❤️ by Wafadar Technology**
