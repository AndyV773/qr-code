const input = document.getElementById('input');
const qrcodeContainer = document.getElementById('qrcode');
const qrColor = document.getElementById('qrColor');
const bgColor = document.getElementById('bgColor');
const qrSize = document.getElementById('qrSize');
const mode = document.getElementById('mode');
const modeLabel = document.getElementById('mode-label')
const downloadBtn = document.getElementById('downloadBtn');

function generateQRCode() {
    const text = input.value.trim() || 'https://github.com/AndyV773/qr-code/raw/main/assets/images/sharky.jpg';
    const size = parseInt(qrSize.value);
    const fg = qrColor.value;
    const bg = bgColor.value;
    qrcodeContainer.innerHTML = '';

    // Use QRCode.js
    QRCode.toCanvas(text, {
      width: size,
      margin: 2,
      color: {
        dark: fg,
        light: bg
      }
    }, function (err, canvas) {
      if (err) return console.error(err);
      qrcodeContainer.appendChild(canvas);
    });
}

function downloadQRCode() {
    const canvas = qrcodeContainer.querySelector('canvas');
    const size = parseInt(qrSize.value);
    const fg = qrColor.value;
    const bg = bgColor.value;

    if (canvas) {
        const link = document.createElement('a');
        link.href = canvas.toDataURL('image/png');
        link.download = `${size}${fg}${bg}.png`;
        link.click();
    }
}

function toggleMode() {
  document.body.classList.toggle('dark-mode', mode.checked);
  
  if (mode.checked) {
        modeLabel.innerHTML = `<i class="fa-regular fa-sun"></i>`
    } else {
        modeLabel.innerHTML = `<i class="fa-regular fa-moon"></i>`
    }
}

// Events
[input, qrColor, bgColor, qrSize].forEach(el =>
  el.addEventListener('input', generateQRCode)
);
mode.addEventListener('change', toggleMode);
downloadBtn.addEventListener('click', downloadQRCode);

// function call
generateQRCode();
toggleMode();
