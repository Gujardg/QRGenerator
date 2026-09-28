# 🔳 QR Generator

A simple browser-based QR code generator with UPI payment support, live preview, and optional background image. No backend, no build step.

## ✨ Features

- UPI payment QR (enter a UPI ID, get a `upi://pay` link in INR)
- Link / text QR
- Live preview, custom size (150–1000 px) and dot color
- Background image (default or upload) with adjustable fade
- One-click high-quality PNG download
- Runs fully in your browser, so nothing is uploaded

## 🚀 Usage

```bash
git clone https://github.com/<Gujardg>/QRGenerator.git
cd QRGenerator
# open index.html in your browser
```

An internet connection is needed for the Tailwind CSS and QRCode.js CDNs.

## 🗂️ Structure

```
├── index.html   # UI
├── style.css    # Custom styles
└── script.js    # QR generation and PNG export
```

## 🛠️ Built With

HTML5, CSS3, JavaScript, [Tailwind CSS](https://tailwindcss.com/), [QRCode.js](https://github.com/davidshimjs/qrcodejs)
