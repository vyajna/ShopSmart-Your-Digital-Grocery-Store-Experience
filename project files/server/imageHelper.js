// Helper function to create product image data URIs
function createProductImage(productName, bgColor, textColor = 'white') {
  const svg = `
    <svg width="400" height="300" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="grad-${productName.replace(/\s/g, '')}" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:${bgColor};stop-opacity:1" />
          <stop offset="100%" style="stop-color:${darkenColor(bgColor, 20)};stop-opacity:1" />
        </linearGradient>
      </defs>
      <rect width="400" height="300" fill="url(#grad-${productName.replace(/\s/g, '')})" />
      <text x="50%" y="45%" font-family="Arial, sans-serif" font-size="28" font-weight="bold" fill="${textColor}" text-anchor="middle">${productName}</text>
      <text x="50%" y="55%" font-family="Arial, sans-serif" font-size="18" fill="${textColor}" text-anchor="middle" opacity="0.9">Fresh & Organic</text>
    </svg>
  `.trim();
  
  return `data:image/svg+xml;base64,${Buffer.from(svg).toString('base64')}`;
}

function darkenColor(color, percent) {
  const num = parseInt(color.replace("#",""), 16);
  const amt = Math.round(2.55 * percent);
  const R = (num >> 16) - amt;
  const G = (num >> 8 & 0x00FF) - amt;
  const B = (num & 0x0000FF) - amt;
  return "#" + (0x1000000 + (R<255?R<1?0:R:255)*0x10000 + (G<255?G<1?0:G:255)*0x100 + (B<255?B<1?0:B:255)).toString(16).slice(1);
}

module.exports = { createProductImage };
