let currentUrl = '';
let qrCodeInstance = null;

document.addEventListener('DOMContentLoaded', async () => {
  try {
    // Get current tab URL
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    currentUrl = tab.url;

    // Set URL in input field
    const urlInput = document.getElementById('urlInput');
    urlInput.value = currentUrl;

    // Generate initial QR code
    generateQRCode();

    // Set up event listeners
    document.getElementById('generateBtn').addEventListener('click', () => {
      const newUrl = urlInput.value.trim();
      if (newUrl) {
        currentUrl = newUrl;
        generateQRCode();
      } else {
        showNotification('Please enter a valid URL', 'error');
      }
    });

    // Allow Enter key to generate QR code
    urlInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        const newUrl = urlInput.value.trim();
        if (newUrl) {
          currentUrl = newUrl;
          generateQRCode();
        } else {
          showNotification('Please enter a valid URL', 'error');
        }
      }
    });

    document.getElementById('sizeSelect').addEventListener('change', generateQRCode);
    document.getElementById('downloadBtn').addEventListener('click', downloadQRCode);
    document.getElementById('copyBtn').addEventListener('click', copyQRCode);

    // Add click tracking for donation links (optional)
    document.querySelectorAll('.coffee-btn, .amount-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        showNotification('Thank you for your support! ☕', 'success');
      });
    });

  } catch (error) {
    console.error('Error:', error);
    showNotification('Error loading page URL', 'error');
  }
});

function isValidUrl(string) {
  // Allow any text for QR code generation, not just URLs
  // This allows generating QR codes for any text content
  return string && string.length > 0;
}

function generateQRCode() {
  const canvas = document.getElementById('qrCanvas');
  const size = parseInt(document.getElementById('sizeSelect').value);
  const loading = document.getElementById('loadingMessage');

  // Validate input
  if (!isValidUrl(currentUrl)) {
    showNotification('Please enter valid text or URL', 'error');
    canvas.style.display = 'none';
    return;
  }

  // Show loading
  loading.style.display = 'block';
  canvas.style.display = 'none';

  // Clear existing QR code
  if (qrCodeInstance) {
    qrCodeInstance = null;
  }

  // Generate new QR code
  try {
    QRCode.toCanvas(canvas, currentUrl, {
      width: size,
      height: size,
      margin: 2,
      color: {
        dark: '#000000',
        light: '#FFFFFF'
      },
      errorCorrectionLevel: 'M'
    }, (error) => {
      loading.style.display = 'none';
      if (error) {
        console.error('Error generating QR code:', error);
        showNotification('Error generating QR code', 'error');
      } else {
        canvas.style.display = 'block';
      }
    });
  } catch (error) {
    loading.style.display = 'none';
    console.error('Error:', error);
    showNotification('Error generating QR code', 'error');
  }
}

function downloadQRCode() {
  const canvas = document.getElementById('qrCanvas');
  const link = document.createElement('a');

  // Convert canvas to blob and download
  canvas.toBlob((blob) => {
    const url = URL.createObjectURL(blob);
    const timestamp = new Date().getTime();
    link.download = `qrcode_${timestamp}.png`;
    link.href = url;
    link.click();
    URL.revokeObjectURL(url);
    showNotification('QR code downloaded!', 'success');
  });
}

async function copyQRCode() {
  const canvas = document.getElementById('qrCanvas');

  try {
    // Convert canvas to blob
    const blob = await new Promise(resolve => canvas.toBlob(resolve));

    // Copy to clipboard using the Clipboard API
    await navigator.clipboard.write([
      new ClipboardItem({
        'image/png': blob
      })
    ]);

    showNotification('QR code copied to clipboard!', 'success');
  } catch (error) {
    console.error('Error copying to clipboard:', error);

    // Fallback: try to copy the URL instead
    try {
      await navigator.clipboard.writeText(currentUrl);
      showNotification('URL copied to clipboard!', 'success');
    } catch (fallbackError) {
      showNotification('Could not copy to clipboard', 'error');
    }
  }
}

function showNotification(message, type = 'info') {
  const notification = document.getElementById('notification');
  notification.textContent = message;
  notification.className = `notification ${type} show`;

  // Hide after 3 seconds
  setTimeout(() => {
    notification.classList.remove('show');
  }, 3000);
}