# QR Code Generator Chrome Extension

A simple and elegant Chrome extension that generates QR codes for any webpage URL with one click.

## Features

- **Instant QR Code Generation** - Click the extension icon to generate a QR code for the current page
- **Adjustable Size** - Choose between Small, Medium, and Large QR codes
- **Download QR Code** - Save the QR code as a PNG image
- **Copy to Clipboard** - Copy the QR code image directly to your clipboard
- **Beautiful UI** - Clean, modern interface with gradient design
- **Dark Mode Support** - Automatically adapts to your system's color scheme

## Installation

### Developer Mode (For Testing)

1. Open Chrome and navigate to `chrome://extensions/`
2. Enable **Developer mode** by toggling the switch in the top right
3. Click **Load unpacked**
4. Select the `chrome_extension_qr_generater` folder
5. The extension will appear in your Chrome toolbar

### Files Structure

```
chrome_extension_qr_generater/
├── manifest.json          # Extension configuration
├── popup.html            # Extension popup UI
├── popup.js              # QR code generation logic
├── popup.css             # Styling
├── lib/
│   └── qrcode.min.js     # QR code library
└── images/
    ├── icon-16.png       # Extension icons
    ├── icon-32.png
    ├── icon-48.png
    └── icon-128.png
```

## Usage

1. Navigate to any webpage
2. Click the QR Code Generator extension icon in your toolbar
3. A popup will appear with the QR code for the current page
4. Use the dropdown to adjust the size if needed
5. Click **Download** to save the QR code as an image
6. Click **Copy** to copy the QR code to your clipboard

## Technologies Used

- Chrome Extension Manifest V3
- JavaScript (ES6+)
- HTML5 Canvas
- qrcode.js library for QR code generation

## Permissions

The extension requires minimal permissions:
- `activeTab` - To get the URL of the current tab
- `storage` - To save user preferences (future feature)

## License

MIT