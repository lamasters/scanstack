# ScanStack

ScanStack is a web-based document scanner application built with React and TypeScript. It allows users to capture document pages via a web camera or by uploading images, automatically or manually crop the edges, and compile the processed images into a downloadable PDF.

## ✨ Features

- **📷 Camera & File Support**: Take live photos using your device's camera or upload existing images.
- **✂️ Real-time Cropping**: Intelligent edge cropping with manual adjustment points to isolate documents perfectly.
- **🔄 Image Management**: Rotate, preview, and remove captured pages easily before finalizing.
- **📄 PDF Generation**: Compile all scanned pages into a single, high-quality PDF document.
- **🎨 Modern UI**: Features a sleek glassmorphic design and intuitive user interface.

## 🛠️ Tech Stack

- **Frontend**: [React 19](https://react.dev/), [TypeScript](https://www.typescriptlang.org/), [Vite](https://vitejs.dev/)
- **Image Processing**: [OpenCV.js](https://docs.opencv.org/master/d5/d10/tutorial_js_root.html) (loaded via CDN)
- **PDF Generation**: [jsPDF](https://github.com/parallax/jsPDF)
- **Icons**: [Lucide React](https://lucide.dev/)

## 🚀 Getting Started

### Prerequisites

Make sure you have Node.js and npm installed on your machine.

### Installation

1. Clone the repository and navigate into the project directory:
   ```bash
   cd scanstack
   ```

2. Install the dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and visit `http://localhost:5173` to view the app!

## 📦 Build for Production

To create a production-ready build, run:
```bash
npm run build
```
This will generate optimized files in the `dist` directory.

## 📄 License
This project is open-source and available under the MIT License.
