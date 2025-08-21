# 🚀 cPanel Deployment Guide for Boi Lagbe

## 📋 Prerequisites
- cPanel hosting account
- Node.js support (Node.js 18+ recommended)
- SSH access (optional but recommended)

## 🎯 Your Project Details
- **Domain**: boilagbe.codelagbe.store
- **Meta Pixel ID**: 470082779525987
- **GA4 ID**: G-6NWT9S70WG
- **Clarity ID**: syhbqvmyvm

## 📁 Files to Upload

### **Option 1: Upload via cPanel File Manager**
1. **Upload these folders/files:**
   - `.next/` (entire folder)
   - `public/` (entire folder)
   - `package.json`
   - `package-lock.json`
   - `next.config.js`
   - `tailwind.config.ts`
   - `tsconfig.json`
   - `eslint.config.mjs`
   - `postcss.config.mjs`

### **Option 2: Upload via Git (Recommended)**
1. **Push to GitHub:**
   ```bash
   git add .
   git commit -m "Ready for production deployment"
   git push origin main
   ```

2. **In cPanel:**
   - Go to **Git Version Control**
   - Clone your repository
   - Set up auto-deploy

## 🔧 cPanel Setup Steps

### **Step 1: Node.js Setup**
1. Go to **Node.js** in cPanel
2. **Create Application:**
   - **Node.js version**: 18.x or higher
   - **Application mode**: Production
   - **Application root**: `/home/username/boilagbe.codelagbe.store`
   - **Application URL**: `https://boilagbe.codelagbe.store`
   - **Application startup file**: `server.js`

### **Step 2: Create server.js**
Create this file in your project root:
```javascript
const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');

const dev = process.env.NODE_ENV !== 'production';
const hostname = 'localhost';
const port = process.env.PORT || 3000;

const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  createServer(async (req, res) => {
    try {
      const parsedUrl = parse(req.url, true);
      await handle(req, res, parsedUrl);
    } catch (err) {
      console.error('Error occurred handling', req.url, err);
      res.statusCode = 500;
      res.end('internal server error');
    }
  })
    .once('error', (err) => {
      console.error(err);
      process.exit(1);
    })
    .listen(port, () => {
      console.log(`> Ready on http://${hostname}:${port}`);
    });
});
```

### **Step 3: Install Dependencies**
1. Go to **Terminal** in cPanel
2. Navigate to your project directory:
   ```bash
   cd /home/username/boilagbe.codelagbe.store
   npm install --production
   ```

### **Step 4: Start Application**
1. In **Node.js** section:
2. Click **Restart** on your application
3. Check **Application Status** - should show "Running"

## 🌐 Domain Configuration

### **Step 1: Point Domain**
1. Go to **Domains** in cPanel
2. Add domain: `boilagbe.codelagbe.store`
3. Point to your project directory

### **Step 2: SSL Certificate**
1. Go to **SSL/TLS** in cPanel
2. Install SSL certificate for `boilagbe.codelagbe.store`
3. Enable **Force HTTPS Redirect**

## 🔍 Post-Deployment Checklist

### **✅ Test Your Site:**
- [ ] Homepage loads: `https://boilagbe.codelagbe.store`
- [ ] Admin panel works: `https://boilagbe.codelagbe.store/admin`
- [ ] Order form submits successfully
- [ ] Meta Pixel tracking works
- [ ] Google Analytics tracking works
- [ ] Mobile responsive design

### **✅ Update Tracking:**
- [ ] Update Meta Pixel domain in Facebook Business Manager
- [ ] Update Google Analytics domain
- [ ] Test all tracking events

### **✅ SEO Setup:**
- [ ] Submit sitemap to Google Search Console
- [ ] Submit sitemap to Bing Webmaster Tools
- [ ] Test social media sharing

## 🚨 Troubleshooting

### **If site doesn't load:**
1. Check Node.js application status
2. Check error logs in cPanel
3. Verify domain DNS settings
4. Check SSL certificate

### **If admin panel doesn't work:**
1. Check Firebase configuration
2. Verify API routes are working
3. Check browser console for errors

### **If tracking doesn't work:**
1. Verify Meta Pixel ID is correct
2. Check Facebook Pixel Helper
3. Test Google Analytics in real-time

## 📞 Support
If you encounter issues:
1. Check cPanel error logs
2. Contact your hosting provider
3. Verify all configuration files are uploaded correctly

## 🎉 Success!
Your Boi Lagbe landing page is now live at:
**https://boilagbe.codelagbe.store**

---

**Last Updated**: January 2025
**Version**: 1.0
