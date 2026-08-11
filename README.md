# The Internet Photobooth 📸

A customizable, browser-based photobooth that lets you capture memories, create personalized photostrips, apply filters, add stickers, and download your final creation as an image.

## ✨ Features

- 📷 Capture photos directly from your webcam
- 🔢 Choose the number of photos
- 🖼️ Multiple photostrip layouts
- 🎨 Apply different photo filters
- 🎀 Add and customize stickers
- ✏️ Customize text and photostrip styling
- 🎨 Choose from different paper/background colors
- 🖱️ Drag and position stickers on the strip
- 💾 Download the finished photostrip as a JPEG
- ⚡ Runs entirely in the browser
- 🔒 No account or backend required

## 🛠️ Built With

- **Next.js** — React framework
- **TypeScript** — Type-safe development
- **Tailwind CSS** — Styling
- **Framer Motion** — Animations and transitions
- **Web Camera API** — Webcam photo capture
- **HTML Canvas** — Photostrip rendering and image generation

## 🚀 Getting Started

### Prerequisites

Make sure you have **Node.js** and **npm** installed.

### Installation

Clone the repository:

```bash
git clone https://github.com/sayantani-aiml/internet-photobooth.git
```

Navigate into the project:

```bash
cd internet-photobooth
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Then open:

```text
http://localhost:3000
```

Allow camera access when prompted. 📷

## 🌐 Live Demo

Try the photobooth here:

**https://sayantani-aiml.github.io/internet-photobooth/**

> Camera access may require a secure connection such as HTTPS.

## 📸 How It Works

1. Choose how many photos you want to take.
2. Select your preferred photostrip layout.
3. Allow access to your webcam.
4. Capture your photos.
5. Choose a filter and customize your strip.
6. Add stickers and personalize your design.
7. Download your finished photostrip as a JPEG.
8. Keep the memory. 💗

## 📁 Project Structure

```text
internet-photobooth/
│
├── app/
│   └── page.tsx
│
├── components/
│   ├── BoothSetup.tsx
│   ├── CameraBooth.tsx
│   ├── Developing.tsx
│   ├── Landing.tsx
│   ├── PhotoCountSelector.tsx
│   ├── PhotoStrip.tsx
│   ├── StickerEditor.tsx
│   └── StripCustomizer.tsx
│
├── lib/
│   └── filters.ts
│
├── public/
│   └── textures/
│
├── package.json
├── next.config.ts
└── README.md
```

## 🔐 Privacy

The photobooth is designed to work directly in the browser.

- 📷 Photos are captured using the user's camera.
- 💻 Photos are processed locally in the browser.
- ☁️ No backend or account is required.
- 💾 The final photostrip is generated and downloaded locally.

## 🔮 Future Improvements

Some ideas for future versions:

- 🎵 Optional sound effects
- ✨ More filters and visual effects
- 🎀 More sticker packs
- 🖼️ More photostrip templates
- 📱 Better mobile experience
- 🎞️ GIF/photo animation support
- 💗 More customization options
- 📤 Easy sharing to social media

## 🤝 Contributing

This project is open for improvements and experimentation.

If you have an idea for a new feature or improvement:

1. Fork the repository.
2. Create a new branch.
3. Make your changes.
4. Commit your changes.
5. Open a pull request.

## 👩‍💻 Author

**Sayantani Das**

GitHub:  
https://github.com/sayantani-aiml

## 📄 License

This project is created for learning, experimentation, and personal use.